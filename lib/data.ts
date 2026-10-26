/*
 * Contenido del sitio. Los textos viven en content/*.json y se editan desde /admin;
 * este módulo solo los tipa y deriva lo que necesitan los componentes.
 * En desarrollo, guardar un JSON recarga el sitio al instante; en producción se publica con el deploy.
 */

import archivoJson from "@/content/archivo.json";
import certificacionesJson from "@/content/certificaciones.json";
import charlasJson from "@/content/charlas.json";
import formacionJson from "@/content/formacion.json";
import historiaJson from "@/content/historia.json";
import perfilJson from "@/content/perfil.json";
import procesoJson from "@/content/proceso.json";
import proyectosJson from "@/content/proyectos.json";
import redesJson from "@/content/redes.json";
import serviciosJson from "@/content/servicios.json";
import sitioJson from "@/content/sitio.json";
import stackJson from "@/content/stack.json";
import trayectoriaJson from "@/content/trayectoria.json";
import type {
  ArchiveItem,
  Certification,
  Chapter,
  Education,
  Profile,
  Project,
  Role,
  SectionId,
  Service,
  SiteSettings,
  Social,
  StackGroup,
  Step,
  Talk,
} from "@/lib/schemas";

export type { ArchiveItem, Certification, Metric, Project, Role, SectionId, Shot } from "@/lib/schemas";

export const SITE_URL = "https://leftra123.vercel.app";

/** La empresa y la configuración del sitio (se edita en Admin → Sitio). */
export const settings = sitioJson as SiteSettings;

/** El fundador (se edita en Admin → Perfil). */
export const founder = perfilJson as Profile;

/** Vista combinada que usan los componentes: marca, SEO y contacto. */
export const site = {
  url: SITE_URL,
  ...founder,
  company: settings.company,
  brand: settings.company,
  tagline: settings.tagline,
  motto: settings.motto,
  title: settings.seoTitle,
  description: settings.seoDescription,
  available: settings.available,
  updated: settings.updated,
};

export const socials = redesJson as Social[];

const NAV_LABELS: Partial<Record<SectionId, string>> = {
  servicios: "Servicios",
  trabajo: "Proyectos",
  historia: "Historia",
  charlas: "Charlas",
  contacto: "Contacto",
};

/** Secciones visibles de la portada, en el orden elegido en el admin. */
export const sections = settings.sections.filter((section) => section.visible).map((section) => section.id);

export const nav = sections
  .filter((id) => NAV_LABELS[id])
  .map((id) => ({ id, label: NAV_LABELS[id]! }));

export const services = serviciosJson as Service[];
export const story = historiaJson as Chapter[];
export const talks = charlasJson as Talk[];
export const steps = procesoJson as Step[];

/** Los borradores del generador quedan fuera del sitio público. */
export const projects = (proyectosJson as Project[]).filter((project) => !project.draft);

export const featuredSlugs = projects.filter((project) => project.featured).map((project) => project.slug);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const archive = archivoJson as ArchiveItem[];

export const experience = trayectoriaJson as Role[];

export const stack = stackJson as StackGroup[];

export const education = formacionJson as Education[];

export const certifications = certificacionesJson as Certification[];
