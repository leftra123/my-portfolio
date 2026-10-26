/*
 * Sesión del admin: un token "v1.<expira>.<firma>" firmado con HMAC-SHA256.
 * Solo usa Web Crypto, así sirve igual en proxy.ts y en el servidor.
 */

export const SESSION_COOKIE = "aura_admin";
export const SESSION_MAX_AGE = 60 * 60 * 12; // 12 horas

const encoder = new TextEncoder();

function base64url(buffer: ArrayBuffer) {
  let binary = "";
  for (const byte of new Uint8Array(buffer)) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function sign(payload: string, secret: string) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
  ]);
  return base64url(await crypto.subtle.sign("HMAC", key, encoder.encode(payload)));
}

/** Comparación en tiempo constante para no filtrar información por tiempos de respuesta. */
function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function adminSecret() {
  const secret = process.env.ADMIN_SECRET ?? "";
  return secret.length >= 32 ? secret : null;
}

/** El admin solo existe si hay contraseña y secreto: sin variables de entorno queda deshabilitado. */
export function adminEnabled() {
  return Boolean(process.env.ADMIN_PASSWORD && adminSecret());
}

export async function createSessionToken(secret: string) {
  const payload = `v1.${Date.now() + SESSION_MAX_AGE * 1000}`;
  return `${payload}.${await sign(payload, secret)}`;
}

export async function verifySessionToken(token: string | undefined, secret: string | null) {
  if (!token || !secret) return false;
  const [version, expires, signature] = token.split(".");
  if (version !== "v1" || !expires || !signature) return false;
  if (!/^\d+$/.test(expires) || Number(expires) < Date.now()) return false;
  return safeEqual(signature, await sign(`${version}.${expires}`, secret));
}
