import { z } from "zod";

/*
 * Esquemas del contenido editable (content/*.json).
 * Son la fuente de verdad de los tipos y validan todo lo que escribe el admin.
 * Los componentes públicos importan solo los tipos (import type), así zod no llega al navegador.
 */

const text = z.string().trim().min(1, "Obligatorio");
const optionalUrl = z.union([z.url("URL no válida"), z.literal("")]).optional();

export const metricSchema = z.object({ value: text, label: text });
export const shotSchema = z.object({ src: text, alt: text });
export const titledSchema = z.object({ title: text, body: text });

export const projectStatuses = ["En producción", "En uso interno", "En desarrollo", "Académico", "Preview"] as const;
export const projectMotifs = ["grid", "ledger", "cold"] as const;

export const projectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, "Solo minúsculas, números y guiones"),
  name: text,
  kicker: text,
  summary: text,
  year: text,
  role: text,
  client: text,
  status: z.enum(projectStatuses),
  url: optionalUrl,
  repo: optionalUrl,
  stack: z.array(text),
  metrics: z.array(metricSchema),
  cover: shotSchema.optional(),
  /** Captura en celular: se muestra junto a la de escritorio. */
  mobile: shotSchema.optional(),
  gallery: z.array(shotSchema).optional(),
  /** Proyecto hecho en conjunto con otra empresa. */
  partner: z.object({ name: text, url: optionalUrl }).optional(),
  /** Cuando no fue un encargo a la empresa: por ejemplo, como profesional externo de la organización. */
  engagement: z.string().trim().optional(),
  motif: z.enum(projectMotifs).optional(),
  context: text,
  built: z.array(titledSchema),
  /** Capas de la arquitectura, de lo que ve el usuario a la infraestructura. */
  architecture: z.array(z.object({ title: text, body: text, tech: z.array(text) })).optional(),
  decisions: z.array(text),
  outcome: text,
  featured: z.boolean().default(false),
  /** Los borradores (por ejemplo, los que crea el generador) no se publican. */
  draft: z.boolean().optional(),
});

export const archiveItemSchema = z.object({
  year: text,
  name: text,
  note: text,
  stack: z.array(text),
  href: optionalUrl,
  slug: z.string().optional(),
});

export const roleSchema = z.object({
  period: text,
  title: text,
  org: text,
  body: text,
  tags: z.array(text).optional(),
});

export const stackGroupSchema = z.object({ group: text, items: z.array(text) });

export const educationSchema = z.object({
  period: text,
  title: text,
  org: text,
  note: z.string().optional(),
});

export const certificationSchema = z.object({
  title: text,
  issuer: text,
  date: text,
  year: z.coerce.number().int().min(1990).max(2100),
  url: z.url("URL no válida"),
  highlight: z.boolean().optional(),
});

export const socialSchema = z.object({ label: text, handle: text, href: z.url("URL no válida") });

/** El fundador (tú): nombre, rol y contacto. */
export const profileSchema = z.object({
  name: text,
  shortName: text,
  handle: text,
  role: text,
  bio: text,
  location: text,
  email: z.email("Correo no válido"),
  whatsapp: text,
  whatsappUrl: z.url("URL no válida"),
});

export const sectionIds = ["servicios", "trabajo", "historia", "experiencia", "charlas", "proceso", "formacion", "contacto"] as const;
export const themeOptions = ["dark", "light", "system"] as const;

/** La empresa (AuraTech) y la configuración del sitio. */
export const siteSchema = z.object({
  company: text,
  tagline: text,
  motto: text,
  seoTitle: text,
  seoDescription: text,
  available: z.boolean(),
  announcement: z.object({ enabled: z.boolean(), text: z.string(), href: optionalUrl }),
  hero: z.object({
    eyebrow: text,
    title: text,
    highlight: z.string(),
    subtitle: text,
    primaryLabel: text,
    secondaryLabel: text,
  }),
  manifesto: text,
  sections: z
    .array(z.object({ id: z.enum(sectionIds), visible: z.boolean() }))
    .refine((list) => new Set(list.map((section) => section.id)).size === list.length, "Cada sección puede aparecer una sola vez."),
  defaultTheme: z.enum(themeOptions),
  updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const serviceIcons = ["plataformas", "automatizacion", "comercio", "ia", "integraciones", "sitios"] as const;

export const serviceSchema = z.object({
  title: text,
  body: text,
  icon: z.enum(serviceIcons),
  examples: z.array(z.string()).optional(),
});

export const chapterSchema = z.object({ kicker: text, title: text, body: text, href: optionalUrl });

export const talkSchema = z.object({
  title: text,
  event: text,
  date: text,
  year: z.coerce.number().int().min(1990).max(2100),
  audience: z.string().optional(),
  url: optionalUrl,
});

export const stepSchema = z.object({ title: text, body: text });

export type Metric = z.infer<typeof metricSchema>;
export type Shot = z.infer<typeof shotSchema>;
export type Project = z.infer<typeof projectSchema>;
export type ArchiveItem = z.infer<typeof archiveItemSchema>;
export type Role = z.infer<typeof roleSchema>;
export type StackGroup = z.infer<typeof stackGroupSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Certification = z.infer<typeof certificationSchema>;
export type Social = z.infer<typeof socialSchema>;
export type Profile = z.infer<typeof profileSchema>;
export type SiteSettings = z.infer<typeof siteSchema>;
export type SectionId = (typeof sectionIds)[number];
export type Service = z.infer<typeof serviceSchema>;
export type Chapter = z.infer<typeof chapterSchema>;
export type Talk = z.infer<typeof talkSchema>;
export type Step = z.infer<typeof stepSchema>;
