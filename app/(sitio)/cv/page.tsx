import type { Metadata } from "next";
import { Isotipo } from "@/components/brand/isotipo";
import { PrintButton } from "@/components/print-button";
import { certifications, education, experience, featuredSlugs, projects, site, socials, stack } from "@/lib/data";

export const metadata: Metadata = {
  title: "Currículum",
  description: `Currículum de ${site.name}, ${site.role.toLowerCase()} en ${site.location}.`,
  alternates: { canonical: "/cv" },
};

const updated = new Intl.DateTimeFormat("es-CL", { month: "long", year: "numeric" }).format(
  new Date(`${site.updated}T12:00:00`),
);

/** Currículum de una página, generado desde lib/data.ts. Se imprime o guarda como PDF desde el navegador. */
export default function CvPage() {
  const featured = projects.filter((project) => (featuredSlugs as readonly string[]).includes(project.slug));
  const certs = certifications.filter((cert) => cert.highlight);
  const host = new URL(site.url).host;

  return (
    <div className="mx-auto max-w-4xl px-5 pt-32 pb-8 sm:px-8 sm:pt-40 print:max-w-none print:p-0">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <p className="font-mono text-xs text-fg-subtle">Actualizado en {updated} · se genera desde el mismo contenido del sitio</p>
        <PrintButton />
      </div>

      <article className="lit rounded-[28px] border border-line bg-bg-elevated p-6 text-[15px] leading-relaxed sm:p-10 print:rounded-none print:border-0 print:bg-transparent print:p-0 print:shadow-none print:text-[10.5pt] print:leading-snug">
        <header className="flex flex-col gap-6 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-4">
            <Isotipo className="h-11 w-auto print:h-9" />
            <div>
              <h1 className="font-display text-3xl font-semibold tracking-tight print:text-[20pt]">{site.name}</h1>
              <p className="text-fg-muted">
                {site.role} · {site.location}
              </p>
            </div>
          </div>
          <ul className="grid gap-0.5 font-mono text-xs text-fg-muted sm:text-right print:text-[8.5pt]">
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>{site.whatsapp}</li>
            <li>
              <a href={site.url}>{host}</a>
            </li>
            {socials
              .filter((social) => social.label !== "WhatsApp")
              .map((social) => (
                <li key={social.label}>
                  <a href={social.href}>
                    {social.label.toLowerCase()}/{social.handle.replace(/^@/, "")}
                  </a>
                </li>
              ))}
          </ul>
        </header>

        <CvSection title="Perfil">
          <p className="text-fg-muted">
            Fundador de {site.company} y Administrador de Plataformas Digitales y Desarrollador Web en el DAEM Galvarino.
            Diseño y opero sistemas en producción con Next.js, Supabase y Python: EduGalvarino, la plataforma de las 21
            escuelas municipales de Galvarino, y proyectos para pymes con pagos en línea y automatización de procesos.
          </p>
        </CvSection>

        <CvSection title="Experiencia">
          <ol className="grid gap-4">
            {experience.map((role) => (
              <li key={`${role.period}-${role.title}`} className="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-4 print:grid-cols-[7.5rem_1fr] print:break-inside-avoid">
                <p className="font-mono text-xs text-fg-subtle tabular-nums print:text-[8.5pt]">{role.period}</p>
                <div>
                  <h3 className="font-semibold">
                    {role.title} <span className="font-normal text-fg-muted">· {role.org}</span>
                  </h3>
                  <p className="text-fg-muted">{role.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </CvSection>

        <CvSection title="Proyectos">
          <ul className="grid-fill-2 grid gap-3 sm:grid-cols-2 print:grid-cols-2">
            {featured.map((project) => (
              <li key={project.slug} className="print:break-inside-avoid">
                <h3 className="font-semibold">
                  {project.name} <span className="font-normal text-fg-muted">· {project.kicker}</span>
                </h3>
                <p className="text-fg-muted">{project.metrics.slice(0, 2).map((m) => `${m.value} ${m.label}`).join(" · ")}</p>
                <p className="font-mono text-[11px] text-fg-subtle print:text-[8pt]">{project.stack.slice(0, 5).join(" · ")}</p>
              </li>
            ))}
          </ul>
        </CvSection>

        <div className="grid gap-x-10 sm:grid-cols-2 print:grid-cols-2">
          <CvSection title="Formación">
            <ul className="grid gap-2">
              {education.slice(0, 2).map((item) => (
                <li key={item.title}>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-fg-muted">
                    {item.org} · {item.period}
                    {"note" in item && item.note ? ` · ${item.note}` : ""}
                  </p>
                </li>
              ))}
            </ul>
          </CvSection>

          <CvSection title={`Certificaciones · ${certifications.length} en total`}>
            <ul className="grid gap-1">
              {certs.map((cert) => (
                <li key={cert.title} className="text-fg-muted">
                  <span className="text-fg">{cert.title}</span> · {cert.issuer}, {cert.year}
                </li>
              ))}
            </ul>
          </CvSection>
        </div>

        <CvSection title="Stack">
          <dl className="grid gap-1.5">
            {stack.map((group) => (
              <div key={group.group} className="grid gap-x-4 sm:grid-cols-[9rem_1fr] print:grid-cols-[7.5rem_1fr]">
                <dt className="font-semibold">{group.group}</dt>
                <dd className="text-fg-muted">{group.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </CvSection>
      </article>
    </div>
  );
}

function CvSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-7 print:mt-4">
      <h2 className="mb-3 font-mono text-[11px] tracking-wider text-accent uppercase print:mb-1.5 print:text-[8pt]">{title}</h2>
      {children}
    </section>
  );
}
