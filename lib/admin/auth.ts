import { createHash, timingSafeEqual } from "node:crypto";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { adminSecret, SESSION_COOKIE, verifySessionToken } from "@/lib/admin/session";

/** Toda página y acción del admin llama a esto: el proxy solo es la primera barrera. */
export async function requireAdmin() {
  const store = await cookies();
  const ok = await verifySessionToken(store.get(SESSION_COOKIE)?.value, adminSecret());
  if (!ok) redirect("/admin/acceso");
}

export async function isAdmin() {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value, adminSecret());
}

export function passwordMatches(candidate: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const a = createHash("sha256").update(candidate).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

/* Freno simple contra fuerza bruta: 5 intentos fallidos por IP cada 15 minutos (en memoria, no se guarda). */
const attempts = new Map<string, { count: number; until: number }>();
const WINDOW = 15 * 60 * 1000;

export async function clientKey() {
  const list = await headers();
  return list.get("x-forwarded-for")?.split(",")[0]?.trim() || list.get("x-real-ip") || "local";
}

export function isLocked(key: string) {
  const entry = attempts.get(key);
  return Boolean(entry && entry.count >= 5 && entry.until > Date.now());
}

export function registerFailure(key: string) {
  const entry = attempts.get(key);
  if (!entry || entry.until < Date.now()) attempts.set(key, { count: 1, until: Date.now() + WINDOW });
  else entry.count += 1;
}

export function clearFailures(key: string) {
  attempts.delete(key);
}
