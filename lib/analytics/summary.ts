import type { StoredEvent } from "@/lib/analytics/store";

export type DayPoint = { date: string; views: number; clicks: number };
export type Ranked = { key: string; count: number };

const dayFormatter = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Santiago" });

function rank(values: (string | undefined)[], limit = 8): Ranked[] {
  const counts = new Map<string, number>();
  for (const value of values) if (value) counts.set(value, (counts.get(value) ?? 0) + 1);
  return [...counts.entries()]
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count || a.key.localeCompare(b.key))
    .slice(0, limit);
}

/** Resume los eventos de los últimos `days` días (hora de Chile). */
export function summarize(events: StoredEvent[], days: number) {
  const views = events.filter((event) => event.t === "view");
  const clicks = events.filter((event) => event.t === "click");
  const contact = clicks.filter((event) => event.k?.startsWith("contacto:"));

  const byDay = new Map<string, DayPoint>();
  for (let offset = days - 1; offset >= 0; offset--) {
    const date = dayFormatter.format(new Date(Date.now() - offset * 86_400_000));
    byDay.set(date, { date, views: 0, clicks: 0 });
  }
  for (const event of events) {
    const point = byDay.get(dayFormatter.format(new Date(event.ts)));
    if (!point) continue;
    if (event.t === "view") point.views += 1;
    else point.clicks += 1;
  }

  const mobile = views.filter((event) => event.d === "movil").length;

  return {
    views: views.length,
    clicks: clicks.length,
    contact: contact.length,
    contactRate: views.length ? contact.length / views.length : 0,
    mobileShare: views.length ? mobile / views.length : 0,
    series: [...byDay.values()],
    topPages: rank(views.map((event) => event.p)),
    topClicks: rank(clicks.map((event) => event.k)),
    referrers: rank(views.map((event) => event.r)),
    recentClicks: clicks.slice(-12).reverse(),
  };
}

export type Summary = ReturnType<typeof summarize>;

/** Nombres legibles para las claves de clic de la auditoría. */
export function describeKey(key: string) {
  const [kind, ...rest] = key.split(":");
  const value = rest.join(":");
  switch (kind) {
    case "contacto":
      return { group: "Contacto", label: value === "copiar-correo" ? "Copió el correo" : value === "correo" ? "Escribió al correo" : value === "whatsapp" ? "Abrió WhatsApp" : value };
    case "salida":
      return { group: "Salida", label: value };
    case "proyecto":
      return { group: "Proyecto", label: value };
    case "seccion":
      return { group: "Sección", label: `#${value}` };
    case "pagina":
      return { group: "Página", label: value };
    case "buscador":
      return { group: "Buscador ⌘K", label: value };
    case "cv":
      return { group: "CV", label: value === "imprimir" ? "Imprimió o guardó PDF" : value };
    case "ui":
      return { group: "Interfaz", label: value === "tema" ? "Cambió el tema" : value === "buscador" ? "Abrió el buscador" : value };
    case "aviso":
      return { group: "Aviso", label: "Cerró el aviso de privacidad" };
    case "atajo":
      return { group: "Atajos de teclado", label: value === "ayuda" ? "Abrió la ayuda (?)" : value === "tema" ? "Cambió el tema (T)" : value.toUpperCase().split("").join(" luego ") };
    case "hecho":
      return { group: "Cómo está hecho", label: value };
    case "mcp":
      return { group: "Asistentes de IA (MCP)", label: value };
    default:
      return { group: "Otro", label: key };
  }
}
