import { founder, projects, services, settings, site, socials, steps, story, talks, type Project } from "@/lib/data";

/*
 * Versiones en Markdown del sitio para asistentes de IA y lectores de texto plano.
 * Salen del mismo contenido que las páginas HTML, así nunca se desalinean.
 */

const abs = (path: string) => `${site.url}${path}`;
export const projectMdPath = (slug: string) => `/proyectos/${slug}.md`;

function contactLines() {
  const linkedin = socials.find((social) => social.label === "LinkedIn");
  return [
    `- Correo: ${site.email}`,
    `- WhatsApp: ${founder.whatsapp}`,
    linkedin ? `- LinkedIn: ${linkedin.href}` : null,
    `- Ubicación: ${founder.location}`,
  ].filter(Boolean);
}

export function homeMarkdown() {
  return [
    `# ${settings.company}`,
    "",
    `> ${settings.tagline}. ${settings.motto}.`,
    "",
    settings.hero.subtitle,
    "",
    `Fundada por ${founder.name} (${founder.role}). ${founder.bio}`,
    "",
    "## Servicios",
    "",
    ...services.map((service) => `- **${service.title}**: ${service.body}`),
    "",
    "## Cómo trabajamos",
    "",
    ...steps.map((step, index) => `${index + 1}. **${step.title}**: ${step.body}`),
    "",
    "## Proyectos",
    "",
    ...projects.map(
      (project) =>
        `- [${project.name}](${abs(projectMdPath(project.slug))}): ${project.kicker}. ${project.summary} (${project.status}, ${project.year})`,
    ),
    "",
    "## Historia",
    "",
    settings.manifesto,
    "",
    ...story.map((chapter) => `- **${chapter.kicker} · ${chapter.title}**: ${chapter.body}`),
    "",
    ...(talks.length
      ? ["## Charlas", "", ...talks.map((talk) => `- **${talk.title}** (${talk.date}), ${talk.event}. ${talk.audience}.`), ""]
      : []),
    "## Contacto",
    "",
    ...contactLines(),
    "",
  ].join("\n");
}

export function projectMarkdown(project: Project) {
  const meta = [
    ["Organización", project.client],
    ["Modalidad", project.engagement],
    ["Rol", project.role],
    ["Año", project.year],
    ["Estado", project.status],
    ["En conjunto con", project.partner ? `${project.partner.name}${project.partner.url ? ` (${project.partner.url})` : ""}` : undefined],
    ["Sitio", project.url],
  ].filter((row): row is [string, string] => Boolean(row[1]));

  return [
    `# ${project.name}`,
    "",
    `> ${project.kicker}. ${project.summary}`,
    "",
    ...meta.map(([label, value]) => `- **${label}**: ${value}`),
    "",
    ...(project.metrics.length ? ["## Cifras", "", ...project.metrics.map((metric) => `- **${metric.value}** ${metric.label}`), ""] : []),
    "## Contexto",
    "",
    project.context,
    "",
    "## Qué se construyó",
    "",
    ...project.built.map((item) => `- **${item.title}**: ${item.body}`),
    "",
    ...(project.architecture?.length
      ? [
          "## Arquitectura (de la interfaz a la infraestructura)",
          "",
          ...project.architecture.map((layer, index) => `${index + 1}. **${layer.title}** (${layer.tech.join(", ")}): ${layer.body}`),
          "",
        ]
      : ["## Stack", "", project.stack.join(", "), ""]),
    "## Decisiones técnicas",
    "",
    ...project.decisions.map((decision) => `- ${decision}`),
    "",
    "## Resultado",
    "",
    project.outcome,
    "",
    `Caso completo: ${abs(`/proyectos/${project.slug}`)}`,
    "",
  ].join("\n");
}

/** Índice para modelos de lenguaje (formato llms.txt). */
export function llmsTxt() {
  return [
    `# ${settings.company}`,
    "",
    `> ${settings.seoDescription}`,
    "",
    `${settings.company} es un estudio de software de La Araucanía, Chile. Atiende a instituciones públicas y pymes con plataformas a medida, automatización de procesos, reservas y pagos en línea, e IA aplicada. Todo el contenido está en español de Chile.`,
    "",
    "Cómo pedir un proyecto: escribe a " +
      `${site.email} contando qué proceso quieres resolver, qué tipo de organización eres, para cuándo lo necesitas y un presupuesto aproximado. ` +
      "No hay formulario automático ni API para pedir cotizaciones.",
    "",
    "## Páginas",
    "",
    `- [Inicio](${abs("/index.md")}): servicios, forma de trabajo, proyectos, historia y contacto`,
    ...projects.map((project) => `- [${project.name}](${abs(projectMdPath(project.slug))}): ${project.kicker}`),
    "",
    "## Para agentes",
    "",
    `- [Servidor MCP](${abs("/mcp")}): solo lectura, transporte HTTP. Herramientas: listar_proyectos, ver_proyecto, servicios, buscar, contacto`,
    `- [Todo el contenido en un archivo](${abs("/llms-full.txt")})`,
    "",
    "## Opcional",
    "",
    `- [Cómo está hecho el sitio](${abs("/como-esta-hecho")}): arquitectura, stack y sistema de diseño`,
    `- [Currículum del fundador](${abs("/cv")})`,
    `- [Privacidad](${abs("/privacidad")}): el sitio no usa cookies`,
    "",
  ].join("\n");
}

export function llmsFullTxt() {
  return [homeMarkdown(), ...projects.map(projectMarkdown)].join("\n---\n\n");
}

/** Respuesta de texto con el enlace canónico a la página HTML equivalente. */
export function markdownResponse(body: string, canonicalPath?: string, type = "text/markdown") {
  const headers: Record<string, string> = { "Content-Type": `${type}; charset=utf-8` };
  if (canonicalPath) headers.Link = `<${abs(canonicalPath)}>; rel="canonical"`;
  return new Response(body, { headers });
}
