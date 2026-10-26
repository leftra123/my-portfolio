"use server";

import { z } from "zod";
import { saveProject } from "@/lib/admin/actions";
import { requireAdmin } from "@/lib/admin/auth";
import { logChange, readCollection, writeCollection } from "@/lib/admin/store";
import { SITE_URL } from "@/lib/data";
import { aiDraft, aiPost, factsDraft, type DraftOutcome } from "@/lib/generator/draft";
import { githubFacts, localFacts, parseSource, type RepoFacts } from "@/lib/generator/repo";
import { captureSite } from "@/lib/generator/screenshot";

type Result<T> = ({ ok: true } & T) | { ok: false; error: string };

const message = (error: unknown) => (error instanceof Error ? error.message : "Algo falló. Intenta de nuevo.");

export async function inspectSource(input: string): Promise<Result<{ facts: RepoFacts }>> {
  await requireAdmin();
  const source = parseSource(input);
  if (!source) return { ok: false, error: "Escribe usuario/repo, una URL de GitHub o una ruta local (~/…)." };
  try {
    const facts = source.kind === "github" ? await githubFacts(source.owner, source.repo) : await localFacts(source.path);
    return { ok: true, facts };
  } catch (error) {
    return { ok: false, error: message(error) };
  }
}

const factsSchema = z.object({
  source: z.string(),
  kind: z.enum(["github", "local"]),
  name: z.string().min(1),
  description: z.string().optional(),
  homepage: z.string().optional(),
  repoUrl: z.string().optional(),
  isPrivate: z.boolean().optional(),
  languages: z.array(z.string()),
  stack: z.array(z.string()),
  topics: z.array(z.string()),
  commits: z.number().optional(),
  firstCommit: z.string().optional(),
  lastCommit: z.string().optional(),
  testFiles: z.number().optional(),
  readme: z.string().max(10_000).optional(),
});

export async function draftProject(rawFacts: unknown, useAI: boolean): Promise<Result<DraftOutcome>> {
  await requireAdmin();
  const parsed = factsSchema.safeParse(rawFacts);
  if (!parsed.success) return { ok: false, error: "Los datos del repo no son válidos; vuelve a analizarlo." };
  const outcome = useAI ? await aiDraft(parsed.data) : { project: factsDraft(parsed.data), usedAI: false };
  return { ok: true, ...outcome };
}

export async function saveDraft(project: unknown) {
  const result = await saveProject(null, project);
  return result;
}

export async function captureScreenshot(url: string, slug: string, assignTo?: string): Promise<Result<{ src: string }>> {
  await requireAdmin();
  try {
    const src = await captureSite(url, slug);
    await logChange({ coleccion: "capturas", detalle: `Capturó ${new URL(url).hostname} → ${src}` });
    if (assignTo) {
      const list = await readCollection("proyectos");
      const index = list.findIndex((item) => item.slug === assignTo);
      if (index >= 0) {
        const project = list[index]!;
        const cover = { src, alt: project.cover?.alt ?? `Captura de ${project.name} en ${new URL(url).hostname}.` };
        const result = await writeCollection("proyectos", list.with(index, { ...project, cover }), `Asignó captura a ${project.name}`);
        if (!result.ok) return { ok: false, error: result.error };
      }
    }
    return { ok: true, src };
  } catch (error) {
    return { ok: false, error: message(error) };
  }
}

export async function linkedinPost(slug: string): Promise<Result<{ text: string; usedAI: boolean; note?: string }>> {
  await requireAdmin();
  const project = (await readCollection("proyectos")).find((item) => item.slug === slug);
  if (!project) return { ok: false, error: "El proyecto no existe." };
  const post = await aiPost(project, SITE_URL);
  return { ok: true, ...post };
}
