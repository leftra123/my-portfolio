import { execFile } from "node:child_process";
import { readdir, readFile, stat } from "node:fs/promises";
import { homedir } from "node:os";
import { basename, join, relative, resolve, sep } from "node:path";
import { promisify } from "node:util";

/*
 * Lee los hechos de un proyecto (repo de GitHub o carpeta local) para generar su ficha.
 * Nunca abre archivos .env ni sube nada: solo README, manifiestos, conteos y fechas de git.
 */

const run = promisify(execFile);

export type RepoFacts = {
  source: string;
  kind: "github" | "local";
  name: string;
  description?: string;
  homepage?: string;
  repoUrl?: string;
  isPrivate?: boolean;
  languages: string[];
  stack: string[];
  topics: string[];
  commits?: number;
  firstCommit?: string;
  lastCommit?: string;
  testFiles?: number;
  readme?: string;
};

export type Source = { kind: "github"; owner: string; repo: string } | { kind: "local"; path: string };

export function parseSource(input: string): Source | null {
  const value = input.trim();
  const github = value.match(/^(?:https?:\/\/github\.com\/)?([\w.-]+)\/([\w.-]+?)(?:\.git)?\/?$/);
  if (github && !value.startsWith("/") && !value.startsWith("~") && !value.startsWith(".")) {
    return { kind: "github", owner: github[1]!, repo: github[2]! };
  }
  if (value.startsWith("/") || value.startsWith("~")) {
    return { kind: "local", path: value.startsWith("~") ? join(homedir(), value.slice(1)) : value };
  }
  return null;
}

/* ── Detección de stack a partir de dependencias ─────────────── */

const KNOWN: [RegExp, string][] = [
  [/^next$/, "Next.js"],
  [/^react$/, "React"],
  [/^astro$/, "Astro"],
  [/^vite$/, "Vite"],
  [/^@sveltejs\/kit$/, "SvelteKit"],
  [/^expo$/, "Expo"],
  [/^react-native$/, "React Native"],
  [/^tailwindcss$/, "Tailwind CSS"],
  [/^@supabase\/supabase-js$|^@supabase\/ssr$/, "Supabase"],
  [/^drizzle-orm$/, "Drizzle"],
  [/^prisma$|^@prisma\/client$/, "Prisma"],
  [/^@tanstack\/react-query$/, "TanStack Query"],
  [/^zustand$/, "Zustand"],
  [/^zod$/, "Zod"],
  [/^express$/, "Express"],
  [/^leaflet$|^react-leaflet$/, "Leaflet"],
  [/^three$|^@react-three\/fiber$/, "Three.js"],
  [/^recharts$/, "Recharts"],
  [/^jspdf$/, "jsPDF"],
  [/^@anthropic-ai\/sdk$/, "Claude API"],
  [/^@google\/generative-ai$|^@google\/genai$/, "Gemini"],
  [/^@mastra\//, "Mastra"],
  [/^resend$/, "Resend"],
  [/^@sentry\//, "Sentry"],
  [/^vitest$/, "Vitest"],
  [/^jest$/, "Jest"],
  [/^@playwright\/test$/, "Playwright"],
  [/^dexie$/, "Dexie"],
  [/^fastapi$/, "FastAPI"],
  [/^django$/, "Django"],
  [/^djangorestframework$/, "Django REST Framework"],
  [/^streamlit$/, "Streamlit"],
  [/^pandas$/, "pandas"],
  [/^sqlalchemy$/, "SQLAlchemy"],
  [/^alembic$/, "Alembic"],
  [/^pyqt5$/, "PyQt5"],
  [/^pytest$/, "pytest"],
  [/^openpyxl$/, "openpyxl"],
  [/^plotly$/, "Plotly"],
];

export function detectStack(dependencies: string[]) {
  const found = new Set<string>();
  for (const dep of dependencies) {
    const name = dep.toLowerCase();
    for (const [pattern, label] of KNOWN) if (pattern.test(name)) found.add(label);
  }
  return [...found];
}

function readmeExcerpt(raw: string) {
  return raw
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[!\[[^\]]*\]\([^)]*\)\]\([^)]*\)/g, "")
    .slice(0, 8000);
}

/* ── GitHub ───────────────────────────────────────────────────── */

async function gh(path: string) {
  const headers: Record<string, string> = { Accept: "application/vnd.github+json", "User-Agent": "aura-portfolio" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return fetch(`https://api.github.com${path}`, { headers, cache: "no-store" });
}

export async function githubFacts(owner: string, repo: string): Promise<RepoFacts> {
  const meta = await gh(`/repos/${owner}/${repo}`);
  if (meta.status === 404) throw new Error("No encontré ese repositorio (si es privado, agrega GITHUB_TOKEN).");
  if (!meta.ok) throw new Error(`GitHub respondió ${meta.status}. Puede ser el límite de consultas: intenta en unos minutos.`);
  const data = (await meta.json()) as {
    name: string;
    description: string | null;
    homepage: string | null;
    html_url: string;
    private: boolean;
    topics?: string[];
    default_branch: string;
  };

  const [languagesRes, commitsRes, readmeRes, packageRes, pyprojectRes] = await Promise.all([
    gh(`/repos/${owner}/${repo}/languages`),
    gh(`/repos/${owner}/${repo}/commits?per_page=1`),
    gh(`/repos/${owner}/${repo}/readme`),
    gh(`/repos/${owner}/${repo}/contents/package.json`),
    gh(`/repos/${owner}/${repo}/contents/pyproject.toml`),
  ]);

  const languages = languagesRes.ok ? Object.keys((await languagesRes.json()) as Record<string, number>) : [];

  // El total de commits sale del número de la última página con per_page=1.
  type CommitEntry = { commit: { author: { date: string } } };
  const pageOne = commitsRes.ok ? ((await commitsRes.json()) as CommitEntry[]) : [];
  const last = commitsRes.headers.get("link")?.match(/[?&]page=(\d+)>; rel="last"/);
  const commits = last ? Number(last[1]) : pageOne.length || undefined;
  const lastCommit = pageOne[0]?.commit.author.date.slice(0, 10);
  let firstCommit: string | undefined;
  if (last) {
    const oldest = await gh(`/repos/${owner}/${repo}/commits?per_page=1&page=${last[1]}`);
    if (oldest.ok) {
      const [entry] = (await oldest.json()) as CommitEntry[];
      firstCommit = entry?.commit.author.date.slice(0, 10);
    }
  }

  const decode = async (response: Response) => {
    if (!response.ok) return "";
    const file = (await response.json()) as { content?: string };
    return file.content ? Buffer.from(file.content, "base64").toString("utf8") : "";
  };
  const [readme, packageJson, pyproject] = await Promise.all([decode(readmeRes), decode(packageRes), decode(pyprojectRes)]);

  const dependencies = [...dependenciesFromPackage(packageJson), ...dependenciesFromPyproject(pyproject)];

  return {
    source: `${owner}/${repo}`,
    kind: "github",
    name: data.name,
    description: data.description ?? undefined,
    homepage: data.homepage || undefined,
    repoUrl: data.private ? undefined : data.html_url,
    isPrivate: data.private,
    languages,
    stack: detectStack(dependencies),
    topics: data.topics ?? [],
    commits,
    firstCommit,
    lastCommit,
    readme: readme ? readmeExcerpt(readme) : undefined,
  };
}

function dependenciesFromPackage(raw: string) {
  if (!raw) return [];
  try {
    const json = JSON.parse(raw) as { dependencies?: Record<string, string>; devDependencies?: Record<string, string> };
    return [...Object.keys(json.dependencies ?? {}), ...Object.keys(json.devDependencies ?? {})];
  } catch {
    return [];
  }
}

function dependenciesFromPyproject(raw: string) {
  if (!raw) return [];
  return [...raw.matchAll(/^\s*"?([A-Za-z0-9_.-]+)\s*[<>=~!]/gm)].map((match) => match[1]!.toLowerCase());
}

/* ── Carpeta local (solo en desarrollo) ──────────────────────── */

function projectsRoot() {
  const raw = process.env.PROJECTS_ROOT || "~/Documents/01-Proyectos-Dev";
  return resolve(raw.startsWith("~") ? join(homedir(), raw.slice(1)) : raw);
}

const SKIP = new Set(["node_modules", ".git", ".next", "dist", "build", ".venv", "venv", "__pycache__", ".turbo", "coverage", ".vercel"]);

async function countTests(dir: string, budget = { files: 0 }): Promise<number> {
  let count = 0;
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return 0;
  }
  for (const entry of entries) {
    if (budget.files++ > 40_000) break;
    if (entry.name.startsWith(".env")) continue;
    if (entry.isDirectory()) {
      if (!SKIP.has(entry.name)) count += await countTests(join(dir, entry.name), budget);
    } else if (/\.(test|spec)\.[cm]?[jt]sx?$/.test(entry.name) || /^test_.*\.py$|_test\.py$/.test(entry.name)) {
      count += 1;
    }
  }
  return count;
}

export async function localFacts(path: string): Promise<RepoFacts> {
  if (process.env.VERCEL) throw new Error("Leer carpetas locales solo funciona en tu computador.");
  const root = projectsRoot();
  const target = resolve(path);
  const inside = relative(root, target);
  if (inside.startsWith("..") || inside.startsWith(sep) || inside === "") {
    throw new Error(`Por seguridad solo leo carpetas dentro de ${root}.`);
  }
  const info = await stat(target).catch(() => null);
  if (!info?.isDirectory()) throw new Error("Esa carpeta no existe.");

  const read = (file: string) => readFile(join(target, file), "utf8").catch(() => "");
  const [readme, packageJson, pyproject, requirements] = await Promise.all([
    read("README.md"),
    read("package.json"),
    read("pyproject.toml"),
    read("requirements.txt"),
  ]);
  const dependencies = [
    ...dependenciesFromPackage(packageJson),
    ...dependenciesFromPyproject(pyproject),
    ...requirements.split("\n").map((line) => line.split(/[<>=~![\s]/)[0]!.trim().toLowerCase()).filter(Boolean),
  ];

  let pkg: { name?: string; description?: string; homepage?: string } = {};
  try {
    pkg = packageJson ? JSON.parse(packageJson) : {};
  } catch {
    pkg = {};
  }

  let commits: number | undefined;
  let firstCommit: string | undefined;
  let lastCommit: string | undefined;
  try {
    const count = await run("git", ["-C", target, "rev-list", "--count", "HEAD"], { timeout: 10_000 });
    commits = Number(count.stdout.trim()) || undefined;
    const dates = await run("git", ["-C", target, "log", "--format=%ad", "--date=short"], { timeout: 10_000, maxBuffer: 8_000_000 });
    const lines = dates.stdout.trim().split("\n").filter(Boolean);
    lastCommit = lines[0];
    firstCommit = lines.at(-1);
  } catch {
    // sin git: se omite
  }

  return {
    source: target.replace(homedir(), "~"),
    kind: "local",
    name: pkg.name && pkg.name !== "my-app" ? pkg.name : basename(target),
    description: pkg.description,
    homepage: pkg.homepage,
    languages: [],
    stack: detectStack(dependencies),
    topics: [],
    commits,
    firstCommit,
    lastCommit,
    testFiles: (await countTests(target)) || undefined,
    readme: readme ? readmeExcerpt(readme) : undefined,
  };
}
