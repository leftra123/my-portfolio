import { readFileSync } from "node:fs";
import { join } from "node:path";

/*
 * Lee los tokens de color directamente de app/globals.css al compilar,
 * así la página del sistema de diseño nunca se desactualiza respecto del CSS real,
 * y calcula el contraste WCAG de cada color de texto contra el fondo.
 */

const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");

function block(selector: string) {
  const start = css.indexOf(`${selector} {`);
  const body = css.slice(start, css.indexOf("}", start));
  return Object.fromEntries([...body.matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})\b/gi)].map((match) => [match[1]!, match[2]!.toLowerCase()]));
}

const light = block(":root");
const dark = { ...light, ...block(".dark") };

function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const channel = Number.parseInt(hex.slice(i, i + 2), 16) / 255;
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r! + 0.7152 * g! + 0.0722 * b!;
}

export function contrast(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi! + 0.05) / (lo! + 0.05);
}

const TEXT_ROLES = [
  { token: "fg", label: "Texto principal" },
  { token: "fg-muted", label: "Texto secundario" },
  { token: "fg-subtle", label: "Texto tenue" },
  { token: "accent", label: "Enlaces y acentos" },
];

export const textTokens = TEXT_ROLES.map((role) => ({
  ...role,
  themes: [
    { theme: "Claro", color: light[role.token]!, bg: light.bg!, ratio: contrast(light[role.token]!, light.bg!) },
    { theme: "Oscuro", color: dark[role.token]!, bg: dark.bg!, ratio: contrast(dark[role.token]!, dark.bg!) },
  ],
}));

export const brandTokens = [
  { token: "deep-ink", label: "Deep Ink", note: "Fondo oscuro" },
  { token: "aura-blue", label: "Aura Blue", note: "Color de marca" },
  { token: "electric-blue", label: "Electric", note: "Acento en oscuro" },
  { token: "aura-mist", label: "Aura Mist", note: "Texto en oscuro" },
].map((item) => ({ ...item, color: light[item.token]! }));
