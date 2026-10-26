import { readFileSync } from "node:fs";
import { join } from "node:path";

/*
 * Datos de la compilación, leídos al generar las páginas estáticas:
 * las versiones instaladas de verdad (no los rangos de package.json) y la fecha.
 */

function installed(name: string) {
  try {
    const pkg = JSON.parse(readFileSync(join(process.cwd(), "node_modules", name, "package.json"), "utf8")) as { version: string };
    return pkg.version;
  } catch {
    return "—";
  }
}

export const stackVersions = [
  { name: "Next.js", pkg: "next", role: "Framework: páginas estáticas, rutas y acciones del servidor" },
  { name: "React", pkg: "react", role: "Componentes de servidor y transiciones de vista" },
  { name: "Tailwind CSS", pkg: "tailwindcss", role: "Estilos a partir de tokens de marca" },
  { name: "TypeScript", pkg: "typescript", role: "Tipos estrictos de punta a punta" },
  { name: "Zod", pkg: "zod", role: "Valida cada contenido antes de publicarlo" },
  { name: "cmdk", pkg: "cmdk", role: "La paleta ⌘K, cargada solo cuando hace falta" },
].map((item) => ({ ...item, version: installed(item.pkg) }));

export const builtAt = new Date();

export const builtAtLabel = new Intl.DateTimeFormat("es-CL", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "America/Santiago",
}).format(builtAt);

/** "16.4" a partir de "16.4.0": suficiente para el pie. */
export const short = (version: string) => version.split(".").slice(0, 2).join(".");
