import { z } from "zod";
import { adminSecret, SESSION_COOKIE, verifySessionToken } from "@/lib/admin/session";
import { storeEvent } from "@/lib/analytics/store";

/*
 * Recibe eventos anónimos del sitio. No guarda IP ni agente de usuario:
 * la IP solo se usa en memoria para frenar abusos y se descarta.
 */

const eventSchema = z.object({
  t: z.enum(["view", "click"]),
  p: z.string().startsWith("/").max(200),
  k: z.string().max(120).optional(),
  r: z.string().max(100).optional(),
  w: z.number().int().min(0).max(10000).optional(),
});

const BOTS = /bot|crawler|spider|crawling|headless|lighthouse|preview|facebookexternalhit|slurp/i;
const hits = new Map<string, { count: number; until: number }>();

function limited(key: string) {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || entry.until < now) {
    hits.set(key, { count: 1, until: now + 60_000 });
    return false;
  }
  entry.count += 1;
  return entry.count > 120;
}

export async function POST(request: Request) {
  const done = () => new Response(null, { status: 204 });

  if (BOTS.test(request.headers.get("user-agent") ?? "")) return done();
  if (limited(request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local")) return done();

  // Las visitas del dueño (con sesión de admin) no ensucian la auditoría.
  const cookie = request.headers.get("cookie")?.match(new RegExp(`${SESSION_COOKIE}=([^;]+)`))?.[1];
  if (await verifySessionToken(cookie, adminSecret())) return done();

  const text = await request.text();
  if (text.length > 1024) return done();
  let json: unknown;
  try {
    json = JSON.parse(text);
  } catch {
    return done();
  }
  const parsed = eventSchema.safeParse(json);
  if (!parsed.success || parsed.data.p.startsWith("/admin")) return done();

  const { t, p, k, r, w } = parsed.data;
  await storeEvent({
    ts: new Date().toISOString(),
    t,
    p,
    ...(k ? { k } : {}),
    ...(r ? { r } : {}),
    d: (w ?? 1024) < 768 ? "movil" : "escritorio",
  });
  return done();
}
