import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";
import type { RepoFacts } from "@/lib/generator/repo";
import type { Project } from "@/lib/schemas";

/*
 * Redacta la ficha de un proyecto. Hay dos caminos:
 * - sin IA: arma un borrador con los hechos del repo (siempre disponible);
 * - con Claude: redacta en español de Chile usando solo esos hechos, nunca cifras inventadas.
 */

export const MODEL = "claude-opus-5-5";

export function aiAvailable() {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

const slugify = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48) || "proyecto";

const titleCase = (value: string) =>
  value
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
    .trim();

const thousands = (value: number) => value.toLocaleString("es-CL");

/*
 * Las cifras de un proyecto son de impacto (usuarios, escuelas, ventas), nunca de proceso:
 * commits, pruebas o días de desarrollo los hace la IA y no le dicen nada a un cliente.
 * Por eso el borrador parte sin cifras y solo acepta las que aparecen escritas en el README.
 */
function metricsFromReadme(candidates: Project["metrics"], readme = "") {
  return candidates.filter((metric) => metric.value && readme.includes(metric.value)).slice(0, 3);
}

function readmeParagraph(readme = "") {
  return (
    readme
      .split(/\n\s*\n/)
      .map((block) => block.replace(/^#+\s.*$/gm, "").replace(/[*_`>#]/g, "").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").trim())
      .find((block) => block.length > 60 && !block.startsWith("|") && !block.startsWith("-")) ?? ""
  ).slice(0, 280);
}

function readmeSections(readme = "") {
  return [...readme.matchAll(/^#{2,3}\s+(.+)\n+([^#][\s\S]*?)(?=\n#{1,3}\s|$)/gm)]
    .map((match) => ({
      title: match[1]!.replace(/[*_`]/g, "").replace(/^[^\p{L}\p{N}]+/u, "").trim(),
      body: match[2]!.replace(/[*_`>]/g, "").replace(/\n+/g, " ").trim().slice(0, 220),
    }))
    .filter((section) => section.title && section.body.length > 30)
    .slice(0, 4);
}

/** Borrador sin IA: solo hechos verificables del repo; lo demás queda marcado para completar. */
export function factsDraft(facts: RepoFacts): Project {
  const summary = facts.description || readmeParagraph(facts.readme) || "Por completar: qué hace y para quién.";
  return {
    slug: slugify(facts.name),
    name: titleCase(facts.name),
    kicker: facts.description?.slice(0, 80) || "Por completar",
    summary,
    year: (facts.lastCommit ?? new Date().toISOString()).slice(0, 4),
    role: "Desarrollo full-stack",
    client: facts.kind === "github" && !facts.isPrivate ? "Proyecto personal" : "Por completar",
    status: "En desarrollo",
    url: facts.homepage || undefined,
    repo: facts.repoUrl || undefined,
    stack: facts.stack.length ? facts.stack : facts.languages.slice(0, 5),
    metrics: [],
    motif: "grid",
    context: readmeParagraph(facts.readme) || "Por completar: el problema que resolvía.",
    built: readmeSections(facts.readme),
    decisions: [],
    outcome: "Por completar.",
    featured: false,
    draft: true,
  };
}

/* ── Con Claude ─────────────────────────────────────────────── */

const DraftSchema = z.object({
  name: z.string().describe("Nombre del producto, con mayúsculas como marca."),
  kicker: z.string().describe("Bajada de 3 a 8 palabras: qué es. Sin punto final."),
  summary: z.string().describe("Una o dos frases: qué hace y para quién."),
  context: z.string().describe("El problema o la situación antes del proyecto, en 1 a 3 frases."),
  built: z
    .array(z.object({ title: z.string(), body: z.string() }))
    .describe("De 3 a 6 piezas concretas construidas. Título corto; texto de 1 a 2 frases."),
  decisions: z.array(z.string()).describe("De 2 a 5 decisiones técnicas concretas, una frase cada una."),
  outcome: z.string().describe("Resultado verificable con los hechos entregados; si no hay, el estado actual."),
  stack: z.array(z.string()).describe("Tecnologías principales, de 4 a 8, con su nombre oficial."),
  metrics: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .describe(
      "Hasta 3 cifras de impacto (usuarios, establecimientos, ventas, tiempo ahorrado) que aparezcan escritas en el README. Nunca commits, pruebas, líneas de código ni días de desarrollo. Si no hay, lista vacía.",
    ),
});

const SYSTEM = `Redactas fichas de casos de estudio para el portafolio de un desarrollador full-stack chileno.

Estilo:
- Español de Chile con tuteo estándar. Nunca voseo («hacés», «podés», «decime»).
- Editorial y concreto: frases cortas, verbos precisos, sin adjetivos vacíos («innovador», «robusto», «de vanguardia»), sin emojis, sin signos de exclamación.
- Describe lo que el sistema hace y las decisiones técnicas reales. Impersonal o en primera persona singular, nunca «nosotros».

Veracidad (lo más importante):
- Usa solo los hechos entregados: README, dependencias, conteos y fechas. No inventes usuarios, clientes, cifras ni resultados.
- Las cifras (metrics) son de impacto para el cliente y deben aparecer escritas en el README. Nunca uses commits, pruebas, líneas de código ni tiempos de desarrollo: eso lo hace la IA y no es mérito del proyecto. Si no hay cifras de impacto, devuelve una lista vacía.
- Si falta información para el contexto o el resultado, dilo con honestidad y brevedad (por ejemplo, «En desarrollo.»).`;

export type DraftOutcome = { project: Project; usedAI: boolean; note?: string };

export async function aiDraft(facts: RepoFacts): Promise<DraftOutcome> {
  const base = factsDraft(facts);
  if (!aiAvailable()) return { project: base, usedAI: false, note: "Falta ANTHROPIC_API_KEY: armé el borrador solo con los hechos del repo." };

  const client = new Anthropic();
  const facts4ai = {
    nombre: facts.name,
    descripcion: facts.description,
    sitio: facts.homepage,
    lenguajes: facts.languages,
    stack_detectado: facts.stack,
    temas: facts.topics,
    commits: facts.commits,
    primer_commit: facts.firstCommit,
    ultimo_commit: facts.lastCommit,
    archivos_de_prueba: facts.testFiles,
  };

  try {
    const response = await client.beta.messages.parse({
      model: MODEL,
      max_tokens: 16000,
      // Si un clasificador rechaza la petición, la API la reintenta con el modelo recomendado.
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: { effort: "medium", format: betaZodOutputFormat(DraftSchema) },
      system: SYSTEM,
      messages: [
        {
          role: "user",
          content: `Hechos del proyecto (JSON):\n${JSON.stringify(facts4ai, null, 2)}\n\nREADME (puede estar incompleto):\n<readme>\n${facts.readme ?? "(sin README)"}\n</readme>\n\nRedacta la ficha.`,
        },
      ],
    });

    if (response.stop_reason === "refusal") {
      return { project: base, usedAI: false, note: "La IA no pudo redactar este proyecto; dejé el borrador con los hechos." };
    }
    const draft = response.parsed_output;
    if (!draft) return { project: base, usedAI: false, note: "La respuesta de la IA no tuvo el formato esperado; dejé el borrador con los hechos." };

    // Las cifras solo pueden venir del README: si la IA trae otras, se descartan.
    const metrics = metricsFromReadme(draft.metrics, facts.readme);

    return {
      usedAI: true,
      project: {
        ...base,
        name: draft.name || base.name,
        kicker: draft.kicker || base.kicker,
        summary: draft.summary || base.summary,
        context: draft.context || base.context,
        built: draft.built.length ? draft.built : base.built,
        decisions: draft.decisions,
        outcome: draft.outcome || base.outcome,
        stack: draft.stack.length ? draft.stack : base.stack,
        metrics,
      },
    };
  } catch (error) {
    return { project: base, usedAI: false, note: describeError(error) };
  }
}

/* ── Post para LinkedIn ─────────────────────────────────────── */

const POST_SYSTEM = `Escribes posts de LinkedIn para un desarrollador full-stack chileno que presenta su trabajo.

- Español de Chile, tuteo estándar, nunca voseo. Primera persona singular.
- Entre 600 y 1.200 caracteres. Párrafos de una o dos frases. Sin emojis, sin hashtags en medio del texto; como máximo 3 hashtags al final.
- Estructura: el problema real en una frase, qué construiste, una decisión técnica interesante, el resultado con las cifras dadas, una invitación breve a conversar.
- Usa solo los datos entregados. No inventes cifras, clientes ni resultados.`;

/** Pasa a minúscula la primera letra solo si no es una sigla ni un nombre propio de varias palabras. */
function lowerFirst(text: string) {
  const [first = "", second] = text.split(" ");
  const plainWord = /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+[,:]?$/.test(first);
  const properNoun = second !== undefined && /^[A-ZÁÉÍÓÚÑ]/.test(second);
  return plainWord && !properNoun ? text.charAt(0).toLowerCase() + text.slice(1) : text;
}

export function templatePost(project: Project, siteUrl: string) {
  const metrics = project.metrics.slice(0, 2).map((metric) => `${metric.value} ${metric.label}`).join(" y ");
  const decision = project.decisions[0];
  return [
    project.context,
    `Por eso construí ${project.name}: ${lowerFirst(project.summary)}`,
    decision ? `Una decisión técnica que me gustó: ${lowerFirst(decision)}` : null,
    metrics ? `Hoy: ${metrics}.` : null,
    `El caso completo está en ${siteUrl}/proyectos/${project.slug}. Si tienes un proceso parecido, conversemos.`,
    `#${project.stack[0]?.replace(/\s*\d+(\.\d+)*$/, "").replace(/[^\p{L}\p{N}]/gu, "") || "Desarrollo"} #DesarrolloWeb #Chile`,
  ]
    .filter(Boolean)
    .join("\n\n");
}

export async function aiPost(project: Project, siteUrl: string): Promise<{ text: string; usedAI: boolean; note?: string }> {
  if (!aiAvailable()) return { text: templatePost(project, siteUrl), usedAI: false, note: "Falta ANTHROPIC_API_KEY: usé la plantilla." };
  const client = new Anthropic();
  try {
    const response = await client.beta.messages.create({
      model: MODEL,
      max_tokens: 16000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: { effort: "medium" },
      system: POST_SYSTEM,
      messages: [
        {
          role: "user",
          content: `Proyecto (JSON):\n${JSON.stringify(
            { ...project, enlace: `${siteUrl}/proyectos/${project.slug}` },
            null,
            2,
          )}\n\nEscribe el post. Responde solo con el texto del post.`,
        },
      ],
    });
    if (response.stop_reason === "refusal") {
      return { text: templatePost(project, siteUrl), usedAI: false, note: "La IA no pudo redactarlo; usé la plantilla." };
    }
    const text = response.content
      .filter((block): block is Anthropic.Beta.BetaTextBlock => block.type === "text")
      .map((block) => block.text)
      .join("")
      .trim();
    return text ? { text, usedAI: true } : { text: templatePost(project, siteUrl), usedAI: false, note: "Respuesta vacía; usé la plantilla." };
  } catch (error) {
    return { text: templatePost(project, siteUrl), usedAI: false, note: describeError(error) };
  }
}

function describeError(error: unknown) {
  if (error instanceof Anthropic.AuthenticationError) return "La clave de Anthropic no es válida. Revisa ANTHROPIC_API_KEY.";
  if (error instanceof Anthropic.RateLimitError) return "Límite de uso de la API alcanzado; intenta en un rato.";
  if (error instanceof Anthropic.BadRequestError) return `La API rechazó la petición: ${error.message}`;
  if (error instanceof Anthropic.APIConnectionError) return "No hay conexión con la API de Anthropic.";
  if (error instanceof Anthropic.APIError) return `Error de la API (${error.status}).`;
  return "No se pudo usar la IA; quedó el borrador con los hechos.";
}
