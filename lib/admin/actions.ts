"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  clearFailures,
  clientKey,
  isLocked,
  passwordMatches,
  registerFailure,
  requireAdmin,
} from "@/lib/admin/auth";
import { adminEnabled, adminSecret, createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/admin/session";
import { isCollection, logChange, readCollection, writeCollection, type WriteResult } from "@/lib/admin/store";
import { projectSchema, type Project } from "@/lib/schemas";

/* ── Acceso ─────────────────────────────────────────────────── */

export type LoginState = { error?: string };

export async function login(_prev: LoginState, form: FormData): Promise<LoginState> {
  if (!adminEnabled()) return { error: "El admin está deshabilitado: falta ADMIN_PASSWORD o ADMIN_SECRET." };

  const key = await clientKey();
  if (isLocked(key)) return { error: "Demasiados intentos. Espera 15 minutos." };

  const password = String(form.get("password") ?? "");
  if (!passwordMatches(password)) {
    registerFailure(key);
    return { error: "Contraseña incorrecta." };
  }
  clearFailures(key);

  const store = await cookies();
  store.set(SESSION_COOKIE, await createSessionToken(adminSecret()!), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  await logChange({ coleccion: "sesion", detalle: "Inicio de sesión" });

  const next = String(form.get("volver") ?? "");
  redirect(next.startsWith("/admin") && !next.startsWith("//") ? next : "/admin");
}

export async function logout() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect("/admin/acceso");
}

/* ── Contenido ─────────────────────────────────────────────── */

export async function saveProfile(value: unknown): Promise<WriteResult> {
  await requireAdmin();
  return writeCollection("perfil", value, "Editó el perfil");
}

export async function saveSite(value: unknown): Promise<WriteResult> {
  await requireAdmin();
  return writeCollection("sitio", value, "Editó la configuración del sitio");
}

const LIST_LABELS: Record<string, string> = {
  servicios: "los servicios",
  historia: "la historia",
  charlas: "las charlas",
  proceso: "el proceso",
  redes: "las redes",
  archivo: "el archivo",
  trayectoria: "la trayectoria",
  stack: "el stack",
  formacion: "la formación",
  certificaciones: "las certificaciones",
};

export async function saveList(name: string, items: unknown): Promise<WriteResult> {
  await requireAdmin();
  if (!isCollection(name) || name === "perfil" || name === "sitio" || name === "proyectos") {
    return { ok: false, error: "Colección no válida." };
  }
  const count = Array.isArray(items) ? items.length : 0;
  return writeCollection(name, items, `Editó ${LIST_LABELS[name] ?? name} (${count} elementos)`);
}

export type ProjectResult = WriteResult & { slug?: string };

export async function saveProject(originalSlug: string | null, value: unknown): Promise<ProjectResult> {
  await requireAdmin();
  const parsed = projectSchema.safeParse(value);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Hay campos por corregir.",
      issues: parsed.error.issues.map((issue) => ({ path: issue.path.join("."), message: issue.message })),
    };
  }
  const project = parsed.data;
  const list = await readCollection("proyectos");
  const clash = list.find((item) => item.slug === project.slug && item.slug !== originalSlug);
  if (clash) return { ok: false, error: `Ya existe un proyecto con el slug «${project.slug}».` };

  const index = originalSlug ? list.findIndex((item) => item.slug === originalSlug) : -1;
  const next: Project[] = index >= 0 ? list.with(index, project) : [...list, project];
  const detail = index >= 0 ? `Editó el proyecto ${project.name}` : `Creó el proyecto ${project.name}`;
  const result = await writeCollection("proyectos", next, detail);
  return result.ok ? { ok: true, slug: project.slug } : result;
}

export async function deleteProject(slug: string): Promise<WriteResult> {
  await requireAdmin();
  const list = await readCollection("proyectos");
  const project = list.find((item) => item.slug === slug);
  if (!project) return { ok: false, error: "El proyecto no existe." };
  return writeCollection(
    "proyectos",
    list.filter((item) => item.slug !== slug),
    `Eliminó el proyecto ${project.name}`,
  );
}

export async function moveProject(slug: string, direction: -1 | 1): Promise<WriteResult> {
  await requireAdmin();
  const list = await readCollection("proyectos");
  const from = list.findIndex((item) => item.slug === slug);
  const to = from + direction;
  if (from < 0 || to < 0 || to >= list.length) return { ok: true };
  const next = [...list];
  [next[from], next[to]] = [next[to]!, next[from]!];
  return writeCollection("proyectos", next, `Reordenó los proyectos (${list[from]!.name})`);
}
