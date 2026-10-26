/*
 * Descriptores de formularios del admin. Un solo editor genérico (FieldsEditor) dibuja
 * cualquier colección a partir de estas listas, así agregar un campo es tocar una línea.
 */

export type Field =
  | {
      key: string;
      label: string;
      kind: "text" | "textarea" | "url" | "email" | "number";
      hint?: string;
      placeholder?: string;
      optional?: boolean;
      wide?: boolean;
    }
  | { key: string; label: string; kind: "boolean"; hint?: string }
  | { key: string; label: string; kind: "select"; options: readonly string[]; optional?: boolean; hint?: string }
  | { key: string; label: string; kind: "tags" | "lines"; hint?: string; optional?: boolean; wide?: boolean }
  | { key: string; label: string; kind: "group"; fields: Field[]; optional?: boolean; hint?: string }
  | { key: string; label: string; kind: "repeat"; fields: Field[]; itemLabel: string; optional?: boolean; hint?: string };

const pair = (a: [string, string], b: [string, string]): Field[] => [
  { key: a[0], label: a[1], kind: "text" },
  { key: b[0], label: b[1], kind: "text" },
];

/** Tú, como fundador: aparece en Historia, el CV y los datos de contacto. */
export const profileFields: Field[] = [
  { key: "name", label: "Nombre completo", kind: "text" },
  { key: "shortName", label: "Nombre corto", kind: "text" },
  { key: "role", label: "Rol en la empresa", kind: "text", placeholder: "Fundador de AuraTech" },
  { key: "handle", label: "Usuario", kind: "text" },
  { key: "bio", label: "Bio corta", kind: "textarea", wide: true, hint: "Se muestra en tu tarjeta de Historia." },
  { key: "location", label: "Ubicación", kind: "text" },
  { key: "email", label: "Correo de contacto", kind: "email" },
  { key: "whatsapp", label: "WhatsApp (visible)", kind: "text" },
  { key: "whatsappUrl", label: "Enlace de WhatsApp", kind: "url" },
];

const SECTION_OPTIONS = ["servicios", "trabajo", "historia", "experiencia", "charlas", "proceso", "formacion", "contacto"] as const;

/** La empresa y el sitio: marca, hero, anuncio, secciones y tema. */
export const siteFields: Field[] = [
  { key: "company", label: "Nombre de la empresa", kind: "text" },
  { key: "motto", label: "Lema", kind: "text" },
  { key: "tagline", label: "Qué hace, en una línea", kind: "text", wide: true },
  { key: "available", label: "Agenda abierta para nuevos proyectos", kind: "boolean", hint: "Muestra el punto verde en el hero." },
  {
    key: "defaultTheme",
    label: "Tema por defecto",
    kind: "select",
    options: ["dark", "light", "system"],
    hint: "dark = oscuro · light = claro · system = el del dispositivo",
  },
  {
    key: "announcement",
    label: "Anuncio en el hero",
    kind: "group",
    hint: "Reemplaza a «Agenda abierta» mientras esté activo. Útil para un lanzamiento o una charla.",
    fields: [
      { key: "enabled", label: "Mostrar anuncio", kind: "boolean" },
      { key: "text", label: "Texto", kind: "text", placeholder: "Nueva charla: IA en la sala de clases" },
      { key: "href", label: "Enlace", kind: "url", optional: true },
    ],
  },
  {
    key: "hero",
    label: "Hero (primera pantalla)",
    kind: "group",
    fields: [
      { key: "eyebrow", label: "Etiqueta superior", kind: "text" },
      { key: "title", label: "Título", kind: "text", wide: true },
      { key: "highlight", label: "Palabra con el degradado de marca", kind: "text", hint: "Debe aparecer tal cual en el título." },
      { key: "subtitle", label: "Bajada", kind: "textarea" },
      { key: "primaryLabel", label: "Botón principal", kind: "text" },
      { key: "secondaryLabel", label: "Botón secundario", kind: "text" },
    ],
  },
  { key: "manifesto", label: "Frase de Historia (se ilumina al bajar)", kind: "textarea", wide: true },
  {
    key: "sections",
    label: "Secciones de la portada",
    kind: "repeat",
    itemLabel: "Sección",
    hint: "Ordénalas con las flechas y apaga las que no quieras mostrar.",
    fields: [
      { key: "id", label: "Sección", kind: "select", options: SECTION_OPTIONS },
      { key: "visible", label: "Visible", kind: "boolean" },
    ],
  },
  { key: "seoTitle", label: "Título para Google", kind: "text", wide: true },
  { key: "seoDescription", label: "Descripción para Google", kind: "textarea", wide: true },
];

export const projectFields: Field[] = [
  { key: "name", label: "Nombre", kind: "text" },
  { key: "slug", label: "Slug (URL)", kind: "text", hint: "Solo minúsculas, números y guiones: /proyectos/slug." },
  { key: "kicker", label: "Bajada corta", kind: "text", wide: true },
  { key: "summary", label: "Resumen", kind: "textarea", wide: true },
  { key: "status", label: "Estado", kind: "select", options: ["En producción", "En uso interno", "En desarrollo", "Académico", "Preview"] },
  { key: "year", label: "Año", kind: "text" },
  { key: "role", label: "Rol", kind: "text" },
  { key: "client", label: "Organización", kind: "text", hint: "Cliente, institución o carrera." },
  {
    key: "engagement",
    label: "Modalidad",
    kind: "text",
    optional: true,
    wide: true,
    hint: "Solo si no fue un encargo a la empresa. Ej.: Profesional externo del DAEM.",
  },
  { key: "featured", label: "Destacado en la portada", kind: "boolean" },
  { key: "draft", label: "Borrador (no se publica)", kind: "boolean" },
  { key: "url", label: "Sitio", kind: "url", optional: true },
  { key: "repo", label: "Repositorio", kind: "url", optional: true },
  { key: "stack", label: "Stack", kind: "tags", wide: true, hint: "Escribe y presiona Enter." },
  {
    key: "metrics",
    label: "Cifras",
    kind: "repeat",
    itemLabel: "Cifra",
    fields: pair(["value", "Valor"], ["label", "Descripción"]),
  },
  {
    key: "cover",
    label: "Captura de portada",
    kind: "group",
    optional: true,
    hint: "Ruta en /public, por ejemplo /work/mi-proyecto.jpg. El generador puede crearla.",
    fields: [
      { key: "src", label: "Imagen", kind: "text" },
      { key: "alt", label: "Texto alternativo", kind: "text" },
    ],
  },
  {
    key: "mobile",
    label: "Captura en celular",
    kind: "group",
    optional: true,
    hint: "Se muestra junto a la de escritorio.",
    fields: [
      { key: "src", label: "Imagen", kind: "text" },
      { key: "alt", label: "Texto alternativo", kind: "text" },
    ],
  },
  {
    key: "partner",
    label: "Hecho en conjunto con",
    kind: "group",
    optional: true,
    fields: [
      { key: "name", label: "Empresa", kind: "text" },
      { key: "url", label: "Sitio", kind: "url", optional: true },
    ],
  },
  { key: "motif", label: "Ilustración si no hay captura", kind: "select", options: ["grid", "ledger", "cold"], optional: true },
  { key: "context", label: "Contexto", kind: "textarea", wide: true },
  {
    key: "built",
    label: "Qué construí",
    kind: "repeat",
    itemLabel: "Pieza",
    fields: [
      { key: "title", label: "Título", kind: "text" },
      { key: "body", label: "Texto", kind: "textarea" },
    ],
  },
  {
    key: "architecture",
    label: "Arquitectura por capas",
    kind: "repeat",
    itemLabel: "Capa",
    optional: true,
    hint: "De lo que ve el usuario (arriba) a la infraestructura (abajo). Se dibuja en 3D en el caso de estudio y reemplaza la lista de stack.",
    fields: [
      { key: "title", label: "Capa", kind: "text" },
      { key: "tech", label: "Tecnologías", kind: "tags" },
      { key: "body", label: "Qué hace", kind: "textarea" },
    ],
  },
  { key: "decisions", label: "Decisiones técnicas", kind: "lines", wide: true, hint: "Una por línea." },
  { key: "outcome", label: "Resultado", kind: "textarea", wide: true },
  {
    key: "gallery",
    label: "Más pantallas",
    kind: "repeat",
    itemLabel: "Pantalla",
    optional: true,
    fields: [
      { key: "src", label: "Imagen", kind: "text" },
      { key: "alt", label: "Texto alternativo", kind: "text" },
    ],
  },
];

export type ListConfig = {
  title: string;
  description: string;
  itemLabel: string;
  /** Campo que se usa como título de cada elemento en la lista. */
  titleKey: string;
  subtitleKey?: string;
  fields: Field[];
  blank: Record<string, unknown>;
};

export const listConfigs: Record<string, ListConfig> = {
  servicios: {
    title: "Servicios",
    description: "Lo que hace la empresa: una o dos frases por servicio. Se muestran junto al proceso.",
    itemLabel: "servicio",
    titleKey: "title",
    fields: [
      { key: "title", label: "Nombre", kind: "text" },
      {
        key: "icon",
        label: "Ícono",
        kind: "select",
        options: ["plataformas", "automatizacion", "comercio", "ia", "integraciones", "sitios"],
      },
      { key: "body", label: "Descripción", kind: "textarea", wide: true },
    ],
    blank: { title: "", body: "", icon: "plataformas" },
  },
  historia: {
    title: "Historia",
    description: "Tu camino en capítulos cortos. Una o dos frases por capítulo: se lee de corrido.",
    itemLabel: "capítulo",
    titleKey: "title",
    subtitleKey: "kicker",
    fields: [
      { key: "kicker", label: "Etiqueta (año o momento)", kind: "text", placeholder: "2026" },
      { key: "title", label: "Título", kind: "text" },
      { key: "body", label: "Texto", kind: "textarea", wide: true },
      { key: "href", label: "Enlace (charla, publicación…)", kind: "url", optional: true, wide: true },
    ],
    blank: { kicker: "", title: "", body: "" },
  },
  charlas: {
    title: "Charlas",
    description: "Charlas, talleres y presentaciones. Se muestran cuando activas la sección Charlas en Sitio (hoy la charla destacada vive en Historia).",
    itemLabel: "charla",
    titleKey: "title",
    subtitleKey: "event",
    fields: [
      { key: "title", label: "Título", kind: "text", wide: true },
      { key: "event", label: "Evento u organización", kind: "text" },
      { key: "date", label: "Fecha visible", kind: "text", placeholder: "Jun 2025" },
      { key: "year", label: "Año", kind: "number" },
      { key: "audience", label: "Público", kind: "text", optional: true },
      { key: "url", label: "Enlace (publicación o video)", kind: "url", optional: true, wide: true },
    ],
    blank: { title: "", event: "", date: "", year: new Date().getFullYear() },
  },
  proceso: {
    title: "Proceso",
    description: "Cómo trabaja la empresa, en pasos cortos. Se muestran en la sección Servicios.",
    itemLabel: "paso",
    titleKey: "title",
    fields: [
      { key: "title", label: "Paso", kind: "text" },
      { key: "body", label: "Descripción", kind: "textarea", wide: true },
    ],
    blank: { title: "", body: "" },
  },
  trayectoria: {
    title: "Experiencia",
    description: "Cargos del CV (y de la sección Experiencia si la activas en Sitio), del más reciente al más antiguo. Una línea por cargo.",
    itemLabel: "cargo",
    titleKey: "title",
    subtitleKey: "period",
    fields: [
      { key: "period", label: "Periodo", kind: "text", placeholder: "2026 — hoy" },
      { key: "org", label: "Organización", kind: "text" },
      { key: "title", label: "Cargo", kind: "text", wide: true },
      { key: "body", label: "Descripción", kind: "textarea", wide: true },
      { key: "tags", label: "Etiquetas", kind: "tags", optional: true, wide: true },
    ],
    blank: { period: "", title: "", org: "", body: "", tags: [] },
  },
  archivo: {
    title: "Archivo",
    description: "Todos los proyectos de /archivo. Si tiene caso de estudio, completa el slug.",
    itemLabel: "proyecto",
    titleKey: "name",
    subtitleKey: "year",
    fields: [
      { key: "year", label: "Año", kind: "text" },
      { key: "name", label: "Nombre", kind: "text" },
      { key: "note", label: "Descripción", kind: "text", wide: true },
      { key: "stack", label: "Stack", kind: "tags", wide: true },
      { key: "href", label: "Enlace externo", kind: "url", optional: true },
      { key: "slug", label: "Slug del caso de estudio", kind: "text", optional: true },
    ],
    blank: { year: String(new Date().getFullYear()), name: "", note: "", stack: [] },
  },
  stack: {
    title: "Stack",
    description: "Grupos de herramientas de la sección Stack y del CV.",
    itemLabel: "grupo",
    titleKey: "group",
    fields: [
      { key: "group", label: "Grupo", kind: "text" },
      { key: "items", label: "Herramientas", kind: "tags", wide: true },
    ],
    blank: { group: "", items: [] },
  },
  formacion: {
    title: "Formación",
    description: "Estudios formales.",
    itemLabel: "estudio",
    titleKey: "title",
    subtitleKey: "period",
    fields: [
      { key: "period", label: "Periodo", kind: "text" },
      { key: "title", label: "Título", kind: "text" },
      { key: "org", label: "Institución", kind: "text" },
      { key: "note", label: "Nota", kind: "text", optional: true },
    ],
    blank: { period: "", title: "", org: "" },
  },
  certificaciones: {
    title: "Certificaciones",
    description: "Las destacadas aparecen en la portada y en el CV; todas aparecen en /formacion.",
    itemLabel: "certificación",
    titleKey: "title",
    subtitleKey: "issuer",
    fields: [
      { key: "title", label: "Nombre", kind: "text", wide: true },
      { key: "issuer", label: "Emisor", kind: "text" },
      { key: "date", label: "Fecha visible", kind: "text", placeholder: "Oct 2026" },
      { key: "year", label: "Año", kind: "number" },
      { key: "url", label: "Enlace de verificación", kind: "url" },
      { key: "highlight", label: "Destacada", kind: "boolean" },
    ],
    blank: { title: "", issuer: "", date: "", year: new Date().getFullYear(), url: "", highlight: false },
  },
  redes: {
    title: "Redes",
    description: "Enlaces del contacto, del pie y del buscador.",
    itemLabel: "red",
    titleKey: "label",
    subtitleKey: "handle",
    fields: [
      { key: "label", label: "Nombre", kind: "text" },
      { key: "handle", label: "Usuario visible", kind: "text" },
      { key: "href", label: "Enlace", kind: "url", wide: true },
    ],
    blank: { label: "", handle: "", href: "" },
  },
};

/** Quita campos opcionales vacíos para que pasen la validación y el JSON quede limpio. */
export function clean(value: Record<string, unknown>, fields: Field[]): Record<string, unknown> {
  const out: Record<string, unknown> = { ...value };
  for (const field of fields) {
    const current = out[field.key];
    if (field.kind === "group" && current && typeof current === "object") {
      const inner = clean(current as Record<string, unknown>, field.fields);
      const empty = Object.values(inner).every((v) => v === "" || v === undefined);
      if (field.optional && empty) delete out[field.key];
      else out[field.key] = inner;
    } else if (field.kind === "repeat" && Array.isArray(current)) {
      const items = current.map((item) => clean(item as Record<string, unknown>, field.fields));
      if (field.optional && items.length === 0) delete out[field.key];
      else out[field.key] = items;
    } else if ((field.kind === "tags" || field.kind === "lines") && Array.isArray(current)) {
      const items = current.map((item) => String(item).trim()).filter(Boolean);
      if (field.optional && items.length === 0) delete out[field.key];
      else out[field.key] = items;
    } else if ("optional" in field && field.optional && (current === "" || current === undefined || current === null)) {
      delete out[field.key];
    } else if (field.kind === "number" && typeof current === "string") {
      out[field.key] = current === "" ? current : Number(current);
    }
  }
  return out;
}
