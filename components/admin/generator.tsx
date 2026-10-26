"use client";

import { Camera, Check, Copy, FileText, FolderGit2, GitCommitHorizontal, PenLine, TestTube2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { FieldsEditor, inputClass } from "@/components/admin/fields-editor";
import { issuesToErrors } from "@/components/admin/save-bar";
import { captureScreenshot, draftProject, inspectSource, linkedinPost, saveDraft } from "@/lib/admin/generator-actions";
import { clean, projectFields } from "@/lib/admin/fields";
import type { RepoFacts } from "@/lib/generator/repo";
import { cn } from "@/lib/utils";

type Tab = "repo" | "captura" | "post";

type GeneratorProps = {
  aiReady: boolean;
  screenshotReady: boolean;
  projects: { slug: string; name: string }[];
  examples: string[];
};

export function Generator({ aiReady, screenshotReady, projects, examples }: GeneratorProps) {
  const [tab, setTab] = useState<Tab>("repo");
  const tabs: { id: Tab; label: string; icon: typeof FolderGit2 }[] = [
    { id: "repo", label: "Proyecto desde un repo", icon: FolderGit2 },
    { id: "captura", label: "Captura de un sitio", icon: Camera },
    { id: "post", label: "Post para LinkedIn", icon: PenLine },
  ];

  return (
    <div>
      <div role="tablist" aria-label="Herramientas" className="mb-5 flex flex-wrap gap-1 rounded-2xl border border-line p-1 sm:inline-flex">
        {tabs.map((item) => (
          <button
            key={item.id}
            role="tab"
            type="button"
            aria-selected={tab === item.id}
            onClick={() => setTab(item.id)}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm transition-colors",
              tab === item.id ? "bg-fg/[0.08] text-fg" : "text-fg-muted hover:text-fg",
            )}
          >
            <item.icon className={cn("size-4", tab === item.id ? "text-accent" : "text-fg-subtle")} />
            {item.label}
          </button>
        ))}
      </div>

      <div role="tabpanel">
        {tab === "repo" ? <RepoTool aiReady={aiReady} examples={examples} /> : null}
        {tab === "captura" ? <CaptureTool ready={screenshotReady} projects={projects} /> : null}
        {tab === "post" ? <PostTool aiReady={aiReady} projects={projects} /> : null}
      </div>
    </div>
  );
}

/* ── 1. Proyecto desde un repo ─────────────────────────────── */

function RepoTool({ aiReady, examples }: { aiReady: boolean; examples: string[] }) {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [facts, setFacts] = useState<RepoFacts | null>(null);
  const [draft, setDraft] = useState<Record<string, unknown> | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState<"idle" | "inspecting" | "drafting" | "saving">("idle");
  const [, start] = useTransition();

  const inspect = (value = input) =>
    start(async () => {
      setPhase("inspecting");
      setError(null);
      setFacts(null);
      setDraft(null);
      const result = await inspectSource(value);
      setPhase("idle");
      if (result.ok) setFacts(result.facts);
      else setError(result.error);
    });

  const compose = (useAI: boolean) =>
    start(async () => {
      if (!facts) return;
      setPhase("drafting");
      setError(null);
      const result = await draftProject(facts, useAI);
      setPhase("idle");
      if (!result.ok) return setError(result.error);
      setDraft(result.project as unknown as Record<string, unknown>);
      setNote(result.usedAI ? "Redactado con Claude a partir de los hechos del repo. Revísalo antes de publicar." : (result.note ?? "Borrador armado solo con los hechos del repo."));
    });

  const save = () =>
    start(async () => {
      if (!draft) return;
      setPhase("saving");
      const result = await saveDraft(clean(draft, projectFields));
      setPhase("idle");
      if (result.ok && result.slug) router.push(`/admin/proyectos/${result.slug}`);
      else if (!result.ok) {
        setErrors(issuesToErrors(result));
        setError(result.error);
      }
    });

  return (
    <div className="grid gap-4">
      <section className="rounded-2xl border border-line bg-bg-elevated/40 p-5">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            inspect();
          }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="fuente" className="sr-only">
            Repositorio o carpeta
          </label>
          <input
            id="fuente"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="leftra123/teleprompter, una URL de GitHub o ~/Documents/01-Proyectos-Dev/…"
            className={cn(inputClass, "h-11 font-mono text-[13px]")}
          />
          <button
            type="submit"
            disabled={!input.trim() || phase !== "idle"}
            className="h-11 shrink-0 rounded-full bg-btn px-5 text-sm font-medium text-btn-fg disabled:opacity-40"
          >
            Analizar
          </button>
        </form>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-fg-subtle">
          Prueba con:
          {examples.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => {
                setInput(example);
                inspect(example);
              }}
              className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-fg-muted hover:border-line-strong hover:text-fg"
            >
              {example}
            </button>
          ))}
        </div>
      </section>

      {error ? <p className="rounded-xl border border-rose-400/30 bg-rose-400/10 p-3 text-sm text-rose-200">{error}</p> : null}

      {phase === "inspecting" ? <FactsSkeleton /> : null}

      {facts ? (
        <section className="rounded-2xl border border-line bg-bg-elevated/40 p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] text-fg-subtle">{facts.source}</p>
              <h2 className="mt-1 font-display text-xl font-semibold tracking-tight">{facts.name}</h2>
              {facts.description ? <p className="mt-1 text-sm text-fg-muted">{facts.description}</p> : null}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => compose(true)}
                disabled={!aiReady || phase !== "idle"}
                title={aiReady ? undefined : "Agrega ANTHROPIC_API_KEY en .env.local para usar la IA"}
                className="h-9 rounded-full bg-btn px-4 text-sm font-medium text-btn-fg disabled:opacity-40"
              >
                Redactar con IA
              </button>
              <button
                type="button"
                onClick={() => compose(false)}
                disabled={phase !== "idle"}
                className="h-9 rounded-full border border-line-strong px-4 text-sm hover:bg-fg/[0.05] disabled:opacity-40"
              >
                Armar sin IA
              </button>
            </div>
          </div>
          <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Fact icon={GitCommitHorizontal} label="Commits" value={facts.commits?.toLocaleString("es-CL")} />
            <Fact icon={TestTube2} label="Archivos de prueba" value={facts.testFiles?.toLocaleString("es-CL")} />
            <Fact label="Primer commit" value={facts.firstCommit} />
            <Fact label="Último commit" value={facts.lastCommit} />
          </dl>
          {facts.stack.length || facts.languages.length ? (
            <p className="mt-4 flex flex-wrap gap-1.5">
              {(facts.stack.length ? facts.stack : facts.languages).map((tech) => (
                <span key={tech} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-fg-muted">
                  {tech}
                </span>
              ))}
            </p>
          ) : null}
          {!aiReady ? (
            <p className="mt-4 text-xs text-fg-subtle">
              Para redactar con IA agrega <code className="font-mono">ANTHROPIC_API_KEY</code> a <code className="font-mono">.env.local</code> y reinicia el servidor.
            </p>
          ) : null}
        </section>
      ) : null}

      {phase === "drafting" ? <DraftSkeleton /> : null}

      {draft ? (
        <section className="rounded-2xl border border-line-strong bg-bg-elevated/40 p-5">
          <header className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-lg font-semibold tracking-tight">Borrador del caso de estudio</h2>
              {note ? <p className="mt-1 text-xs text-fg-subtle">{note}</p> : null}
            </div>
            <button
              type="button"
              onClick={save}
              disabled={phase !== "idle"}
              className="h-9 rounded-full bg-btn px-5 text-sm font-medium text-btn-fg disabled:opacity-40"
            >
              Guardar como borrador
            </button>
          </header>
          <FieldsEditor fields={projectFields} value={draft} onChange={setDraft} errors={errors} />
        </section>
      ) : null}
    </div>
  );
}

function Fact({ label, value, icon: Icon }: { label: string; value?: string; icon?: typeof GitCommitHorizontal }) {
  return (
    <div className="rounded-xl border border-line p-3">
      <dt className="flex items-center gap-1.5 text-[11px] text-fg-subtle">
        {Icon ? <Icon className="size-3.5" /> : null}
        {label}
      </dt>
      <dd className="mt-1 font-mono text-sm text-fg tabular-nums">{value ?? "—"}</dd>
    </div>
  );
}

/* Esqueletos con la forma real del contenido que viene. */
function Bone({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return <span aria-hidden style={style} className={cn("block animate-pulse rounded-md bg-fg/[0.07]", className)} />;
}

function FactsSkeleton() {
  return (
    <section aria-busy="true" aria-label="Analizando el repositorio" className="rounded-2xl border border-line bg-bg-elevated/40 p-5">
      <Bone className="h-3 w-40" />
      <Bone className="mt-3 h-6 w-56" />
      <Bone className="mt-2 h-4 w-80 max-w-full" />
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[0, 1, 2, 3].map((index) => (
          <div key={index} className="rounded-xl border border-line p-3">
            <Bone className="h-3 w-20" />
            <Bone className="mt-2 h-4 w-14" />
          </div>
        ))}
      </div>
    </section>
  );
}

function DraftSkeleton() {
  return (
    <section aria-busy="true" aria-label="Redactando el borrador" className="rounded-2xl border border-line bg-bg-elevated/40 p-5">
      <Bone className="h-5 w-64" />
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {[0, 1, 2, 3].map((index) => (
          <div key={index}>
            <Bone className="h-3 w-24" />
            <Bone className="mt-2 h-9 w-full" />
          </div>
        ))}
        <div className="sm:col-span-2">
          <Bone className="h-3 w-24" />
          <Bone className="mt-2 h-20 w-full" />
        </div>
      </div>
    </section>
  );
}

/* ── 2. Captura de un sitio ────────────────────────────────── */

function CaptureTool({ ready, projects }: { ready: boolean; projects: { slug: string; name: string }[] }) {
  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [assign, setAssign] = useState("");
  const [result, setResult] = useState<{ src: string; at: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  const suggestSlug = (value: string) => {
    try {
      return new URL(value).hostname.replace(/^www\./, "").split(".")[0] ?? "";
    } catch {
      return "";
    }
  };

  return (
    <div className="grid gap-4">
      <section className="rounded-2xl border border-line bg-bg-elevated/40 p-5">
        {!ready ? (
          <p className="mb-4 rounded-xl border border-amber-400/30 bg-amber-400/10 p-3 text-sm text-amber-200">
            Las capturas necesitan Google Chrome y solo funcionan en local.
          </p>
        ) : null}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            start(async () => {
              setError(null);
              const response = await captureScreenshot(url, slug, assign || undefined);
              if (response.ok) setResult({ src: response.src, at: Date.now() });
              else setError(response.error);
            });
          }}
          className="grid gap-4 sm:grid-cols-2"
        >
          <div className="sm:col-span-2">
            <label htmlFor="cap-url" className="mb-1.5 block text-xs font-medium text-fg-muted">
              Sitio
            </label>
            <input
              id="cap-url"
              type="url"
              required
              value={url}
              placeholder="https://www.ejemplo.cl"
              onChange={(event) => {
                setUrl(event.target.value);
                if (!slug) setSlug(suggestSlug(event.target.value));
              }}
              className={cn(inputClass, "h-11 font-mono text-[13px]")}
            />
          </div>
          <div>
            <label htmlFor="cap-slug" className="mb-1.5 block text-xs font-medium text-fg-muted">
              Nombre del archivo
            </label>
            <input id="cap-slug" required value={slug} onChange={(event) => setSlug(event.target.value)} className={cn(inputClass, "font-mono")} />
            <p className="mt-1 text-[11px] text-fg-subtle">Se guarda en /public/work/{slug || "nombre"}.jpg</p>
          </div>
          <div>
            <label htmlFor="cap-assign" className="mb-1.5 block text-xs font-medium text-fg-muted">
              Usar como portada de
            </label>
            <select id="cap-assign" value={assign} onChange={(event) => setAssign(event.target.value)} className={inputClass}>
              <option value="">Ningún proyecto</option>
              {projects.map((project) => (
                <option key={project.slug} value={project.slug}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <button type="submit" disabled={!ready || pending} className="h-10 rounded-full bg-btn px-5 text-sm font-medium text-btn-fg disabled:opacity-40">
              {pending ? "Capturando…" : "Tomar captura"}
            </button>
          </div>
        </form>
      </section>

      {error ? <p className="rounded-xl border border-rose-400/30 bg-rose-400/10 p-3 text-sm text-rose-200">{error}</p> : null}

      {pending ? (
        <div aria-busy="true" aria-label="Tomando la captura" className="overflow-hidden rounded-2xl border border-line">
          <Bone className="aspect-[16/10] w-full rounded-none" />
        </div>
      ) : result ? (
        <figure className="overflow-hidden rounded-2xl border border-line-strong">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${result.src}?v=${result.at}`} alt="Captura generada" className="aspect-[16/10] w-full object-cover object-top" />
          <figcaption className="flex items-center justify-between gap-3 border-t border-line bg-bg-elevated px-4 py-2.5 text-xs text-fg-muted">
            <span className="font-mono">{result.src}</span>
            {assign ? (
              <Link href={`/admin/proyectos/${assign}`} className="text-accent">
                Ver proyecto →
              </Link>
            ) : null}
          </figcaption>
        </figure>
      ) : null}
    </div>
  );
}

/* ── 3. Post para LinkedIn ─────────────────────────────────── */

function PostTool({ aiReady, projects }: { aiReady: boolean; projects: { slug: string; name: string }[] }) {
  const [slug, setSlug] = useState(projects[0]?.slug ?? "");
  const [text, setText] = useState("");
  const [note, setNote] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [pending, start] = useTransition();

  return (
    <div className="grid gap-4">
      <section className="flex flex-col gap-3 rounded-2xl border border-line bg-bg-elevated/40 p-5 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor="post-proyecto" className="mb-1.5 block text-xs font-medium text-fg-muted">
            Proyecto
          </label>
          <select id="post-proyecto" value={slug} onChange={(event) => setSlug(event.target.value)} className={inputClass}>
            {projects.map((project) => (
              <option key={project.slug} value={project.slug}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          disabled={!slug || pending}
          onClick={() =>
            start(async () => {
              const result = await linkedinPost(slug);
              if (result.ok) {
                setText(result.text);
                setNote(result.usedAI ? "Redactado con Claude." : (result.note ?? "Plantilla con los datos del proyecto."));
              } else setNote(result.error);
            })
          }
          className="h-10 rounded-full bg-btn px-5 text-sm font-medium text-btn-fg disabled:opacity-40"
        >
          {aiReady ? "Redactar post" : "Armar con plantilla"}
        </button>
      </section>

      {pending ? (
        <div aria-busy="true" aria-label="Redactando" className="grid gap-2 rounded-2xl border border-line p-5">
          {[90, 75, 85, 60, 80].map((width, index) => (
            <Bone key={index} className="h-3.5" style={{ width: `${width}%` }} />
          ))}
        </div>
      ) : text ? (
        <section className="rounded-2xl border border-line-strong bg-bg-elevated/40 p-5">
          <textarea
            aria-label="Post"
            value={text}
            onChange={(event) => setText(event.target.value)}
            rows={14}
            className={cn(inputClass, "resize-y leading-relaxed")}
          />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-fg-subtle">
            <span>
              {note} <span className={cn("font-mono", text.length > 3000 && "text-rose-300")}>{text.length.toLocaleString("es-CL")} / 3.000</span>
            </span>
            <button
              type="button"
              onClick={async () => {
                await navigator.clipboard.writeText(text);
                setCopied(true);
                window.setTimeout(() => setCopied(false), 1600);
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-fg-muted hover:text-fg"
            >
              {copied ? <Check className="size-3.5 text-accent" /> : <Copy className="size-3.5" />}
              {copied ? "Copiado" : "Copiar"}
            </button>
          </div>
        </section>
      ) : null}
    </div>
  );
}

export function AutoGenerated({ projects }: { projects: { slug: string; name: string }[] }) {
  return (
    <section className="mt-10">
      <h2 className="font-mono text-[11px] tracking-wider text-fg-subtle uppercase">Se generan solos con cada cambio</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <a href="/cv" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl border border-line bg-bg-elevated/40 p-4 hover:border-line-strong">
          <FileText className="size-5 text-accent" />
          <span>
            <span className="block text-sm">Currículum imprimible</span>
            <span className="block text-xs text-fg-subtle">/cv · sale de tu trayectoria y proyectos</span>
          </span>
        </a>
        <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl border border-line bg-bg-elevated/40 p-4 hover:border-line-strong">
          <FileText className="size-5 text-accent" />
          <span>
            <span className="block text-sm">Sitemap para Google</span>
            <span className="block text-xs text-fg-subtle">/sitemap.xml · con fecha de actualización</span>
          </span>
        </a>
      </div>
      <p className="mt-6 text-xs text-fg-subtle">Imágenes para compartir en redes (una por proyecto):</p>
      <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[{ slug: "", name: "Portada" }, ...projects].map((project) => {
          const href = project.slug ? `/admin/generador/og?slug=${project.slug}` : "/opengraph-image";
          return (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group overflow-hidden rounded-xl border border-line hover:border-line-strong ${project.slug ? "" : "col-span-2"}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={href} alt={`Imagen para compartir: ${project.name}`} loading="lazy" className="aspect-[1200/630] w-full bg-bg-inset object-cover" />
              <span className="block truncate px-3 py-2 text-xs text-fg-muted group-hover:text-fg">{project.name}</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
