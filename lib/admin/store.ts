import { appendFile, mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { z } from "zod";
import {
  archiveItemSchema,
  certificationSchema,
  chapterSchema,
  educationSchema,
  profileSchema,
  projectSchema,
  roleSchema,
  serviceSchema,
  siteSchema,
  socialSchema,
  stackGroupSchema,
  stepSchema,
  talkSchema,
} from "@/lib/schemas";

/*
 * Almacén del contenido: los JSON de content/.
 * En local se escriben directo y Next recarga el sitio; en Vercel el disco es de solo lectura,
 * así que ahí el admin muestra el contenido sin permitir guardar (hasta conectar un almacén remoto).
 */

const ROOT = process.cwd();
const CONTENT_DIR = join(ROOT, "content");
export const DATA_DIR = join(ROOT, ".data");

export const collections = {
  sitio: siteSchema,
  perfil: profileSchema,
  servicios: z.array(serviceSchema),
  historia: z.array(chapterSchema),
  charlas: z.array(talkSchema),
  proceso: z.array(stepSchema),
  redes: z.array(socialSchema),
  proyectos: z.array(projectSchema),
  archivo: z.array(archiveItemSchema),
  trayectoria: z.array(roleSchema),
  stack: z.array(stackGroupSchema),
  formacion: z.array(educationSchema),
  certificaciones: z.array(certificationSchema),
} as const;

export type CollectionName = keyof typeof collections;
export type CollectionValue<N extends CollectionName> = z.infer<(typeof collections)[N]>;

export function isCollection(name: string): name is CollectionName {
  return Object.hasOwn(collections, name);
}

export function canWrite() {
  return !process.env.VERCEL;
}

export async function readCollection<N extends CollectionName>(name: N): Promise<CollectionValue<N>> {
  const raw = await readFile(join(CONTENT_DIR, `${name}.json`), "utf8");
  return JSON.parse(raw) as CollectionValue<N>;
}

export type WriteResult = { ok: true } | { ok: false; error: string; issues?: { path: string; message: string }[] };

/** Valida, escribe de forma atómica, marca la fecha de actualización y deja registro del cambio. */
export async function writeCollection<N extends CollectionName>(
  name: N,
  value: unknown,
  detail: string,
): Promise<WriteResult> {
  if (!canWrite()) {
    return { ok: false, error: "En producción el contenido es de solo lectura. Edita en local y publica con un deploy." };
  }
  // Sitio guarda la fecha de actualización: se marca sola con cada cambio.
  const input = name === "sitio" && value && typeof value === "object" ? { ...value, updated: todayInChile() } : value;
  const parsed = collections[name].safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Hay campos por corregir.",
      issues: parsed.error.issues.map((issue) => ({ path: issue.path.join("."), message: issue.message })),
    };
  }

  await writeJson(join(CONTENT_DIR, `${name}.json`), parsed.data);
  if (name !== "sitio") await touchUpdated();
  await logChange({ coleccion: name, detalle: detail });
  return { ok: true };
}

async function writeJson(file: string, data: unknown) {
  const tmp = `${file}.${process.pid}.tmp`;
  await writeFile(tmp, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  await rename(tmp, file);
}

export function todayInChile() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Santiago" }).format(new Date());
}

/** El pie, el sitemap y el CV muestran esta fecha: se actualiza sola con cada cambio. */
async function touchUpdated() {
  const file = join(CONTENT_DIR, "sitio.json");
  const profile = JSON.parse(await readFile(file, "utf8")) as { updated: string };
  const today = todayInChile();
  if (profile.updated === today) return;
  profile.updated = today;
  await writeJson(file, profile);
}

/* ── Historial de cambios del admin ─────────────────────────── */

export type ChangeEntry = { ts: string; coleccion: string; detalle: string };

const CHANGES_FILE = join(DATA_DIR, "cambios.jsonl");

export async function logChange(entry: Omit<ChangeEntry, "ts">) {
  await mkdir(DATA_DIR, { recursive: true });
  await appendFile(CHANGES_FILE, `${JSON.stringify({ ts: new Date().toISOString(), ...entry })}\n`, "utf8");
}

export async function readChanges(limit = 50): Promise<ChangeEntry[]> {
  try {
    const raw = await readFile(CHANGES_FILE, "utf8");
    return raw
      .trim()
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line) as ChangeEntry)
      .reverse()
      .slice(0, limit);
  } catch {
    return [];
  }
}
