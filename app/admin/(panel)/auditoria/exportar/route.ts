import { isAdmin } from "@/lib/admin/auth";
import { readEvents } from "@/lib/analytics/store";

/** Exporta los eventos anónimos del periodo como CSV (solo con sesión de admin). */
export async function GET(request: Request) {
  if (!(await isAdmin())) return new Response("No autorizado", { status: 401 });
  const days = Math.min(365, Math.max(1, Number(new URL(request.url).searchParams.get("dias")) || 30));
  const events = await readEvents(days);
  const escape = (value: string | undefined) => `"${(value ?? "").replace(/"/g, '""')}"`;
  const rows = [
    "fecha,tipo,pagina,clic,origen,dispositivo",
    ...events.map((event) => [event.ts, event.t, escape(event.p), escape(event.k), escape(event.r), event.d].join(",")),
  ];
  return new Response(`${rows.join("\n")}\n`, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="auditoria-${days}-dias.csv"`,
      "cache-control": "no-store",
    },
  });
}
