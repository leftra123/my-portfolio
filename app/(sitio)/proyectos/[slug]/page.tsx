import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { ArchitectureStack } from "@/components/architecture-stack";
import { ProjectVisual } from "@/components/project-visual";
import { StatusBadge } from "@/components/status-badge";
import { getProject, projects, site } from "@/lib/data";
import { projectMdPath } from "@/lib/markdown";

type Params = { slug: string };

export const dynamicParams = false;

const METRIC_COLS: Record<number, string> = { 1: "lg:grid-cols-1", 2: "lg:grid-cols-2", 3: "lg:grid-cols-3", 4: "lg:grid-cols-4" };

export function generateStaticParams(): Params[] {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const title = `${project.name}: ${project.kicker}`;
  return {
    title,
    description: project.summary,
    alternates: { canonical: `/proyectos/${project.slug}`, types: { "text/markdown": projectMdPath(project.slug) } },
    openGraph: { title, description: project.summary, url: `${site.url}/proyectos/${project.slug}`, type: "article" },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(index + 1) % projects.length]!;

  const meta = [
    { label: "Rol", value: project.role },
    { label: "Organización", value: project.client },
    ...(project.engagement ? [{ label: "Modalidad", value: project.engagement }] : []),
    { label: "Año", value: project.year },
  ];

  // Cada caso como obra creativa del fundador, enlazada al grafo del sitio (ver el layout).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    headline: `${project.name}: ${project.kicker}`,
    description: project.summary,
    url: `${site.url}/proyectos/${project.slug}`,
    inLanguage: "es-CL",
    keywords: project.stack.join(", "),
    creator: { "@id": `${site.url}/#fundador` },
    isPartOf: { "@id": `${site.url}/#sitio` },
    ...(project.url ? { sameAs: project.url } : {}),
  };

  return (
    <article className="pt-32 sm:pt-40">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Link
          href="/#trabajo"
          className="enter group inline-flex items-center gap-2 font-mono text-xs text-fg-subtle hover:text-fg"
        >
          <ArrowLeft className="size-3.5 transition-transform duration-300 ease-out-expo group-hover:-translate-x-0.5" />
          Trabajo
        </Link>

        <header className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <p className="enter flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-fg-subtle" style={{ "--i": 0 } as React.CSSProperties}>
              <span>
                {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </span>
              <StatusBadge status={project.status} />
            </p>
            <h1 className="enter mt-6 font-display text-[clamp(2.5rem,1.2rem+3.6vw,4.5rem)] leading-[1] font-semibold tracking-[-0.04em] [overflow-wrap:anywhere]" style={{ "--i": 1 } as React.CSSProperties}>
              <ViewTransition name={`titulo-${project.slug}`} share="morph" default="none">
                <span className="inline-block">{project.name}</span>
              </ViewTransition>
            </h1>
            <p className="enter mt-6 max-w-2xl text-xl leading-relaxed text-fg-muted" style={{ "--i": 2 } as React.CSSProperties}>
              {project.summary}
            </p>
          </div>

          <dl className="enter grid content-end gap-5 self-end border-t border-line pt-6 lg:col-span-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8" style={{ "--i": 3 } as React.CSSProperties}>
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="font-mono text-[11px] tracking-wider text-fg-subtle uppercase">{item.label}</dt>
                <dd className="mt-1 text-sm">{item.value}</dd>
              </div>
            ))}
            {project.partner ? (
              <div>
                <dt className="font-mono text-[11px] tracking-wider text-fg-subtle uppercase">En conjunto con</dt>
                <dd className="mt-1 text-sm">
                  {project.partner.url ? (
                    <a href={project.partner.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1 text-accent">
                      <span className="link-underline">{project.partner.name}</span>
                      <ArrowUpRight className="size-3.5 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  ) : (
                    project.partner.name
                  )}
                </dd>
              </div>
            ) : null}
            {project.url ? (
              <div>
                <dt className="font-mono text-[11px] tracking-wider text-fg-subtle uppercase">Sitio</dt>
                <dd className="mt-1 text-sm">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-accent"
                  >
                    <span className="link-underline">{new URL(project.url).hostname.replace(/^www\./, "")}</span>
                    <ArrowUpRight className="size-3.5 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </dd>
              </div>
            ) : null}
          </dl>
        </header>

        <div className="enter mt-16 grid items-end gap-4 md:grid-cols-12" style={{ "--i": 4 } as React.CSSProperties}>
          <ProjectVisual
            project={project}
            priority
            ratio="wide"
            sizes="(min-width: 1152px) 900px, 100vw"
            className={project.mobile ? "md:col-span-9" : "md:col-span-12"}
          />
          {project.mobile ? (
            <figure className="mx-auto w-full max-w-[260px] md:col-span-3 md:max-w-none">
              <div className="relative aspect-[390/844] overflow-hidden rounded-[28px] border-[3px] border-bg-elevated shadow-[0_30px_60px_-24px_rgb(0_0_0/0.7)] ring-1 ring-line-strong">
                <Image src={project.mobile.src} alt={project.mobile.alt} fill sizes="(min-width: 768px) 260px, 70vw" className="object-cover object-top" />
              </div>
              <figcaption className="mt-3 text-center font-mono text-[11px] text-fg-subtle">En el celular</figcaption>
            </figure>
          ) : null}
        </div>

        {project.metrics.length ? (
        <ul className={`mt-12 grid grid-cols-2 gap-y-8 border-b border-line pb-12 max-lg:[&>li:last-child:nth-of-type(odd)]:col-span-2 ${METRIC_COLS[Math.min(project.metrics.length, 4)] ?? "lg:grid-cols-4"}`}>
          {project.metrics.map((metric) => (
            <li key={metric.label} className="reveal">
              <p className="font-display text-[clamp(2rem,1.5rem+2vw,3rem)] leading-none font-medium tracking-[-0.04em] tabular-nums">
                {metric.value}
              </p>
              <p className="mt-2 text-sm text-fg-muted">{metric.label}</p>
            </li>
          ))}
        </ul>
        ) : null}

        <Block label="Contexto">
          <p className="max-w-3xl text-xl leading-relaxed text-fg sm:text-2xl sm:leading-snug">{project.context}</p>
        </Block>

        <Block label="Qué construí">
          <ol className="grid-fill-2 grid gap-px overflow-hidden rounded-[28px] border border-line bg-line sm:grid-cols-2">
            {project.built.map((item, itemIndex) => (
              <li key={item.title} className="reveal bg-bg p-6 sm:p-7">
                <p className="font-mono text-xs text-accent">{String(itemIndex + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{item.body}</p>
              </li>
            ))}
          </ol>
        </Block>

        {project.architecture?.length ? (
          <Block label="Arquitectura">
            <ArchitectureStack layers={project.architecture} />
          </Block>
        ) : null}

        <Block label="Decisiones técnicas">
          <ul className="max-w-3xl divide-y divide-line border-y border-line">
            {project.decisions.map((decision) => (
              <li key={decision} className="reveal flex gap-4 py-4 leading-relaxed text-fg-muted">
                <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                {decision}
              </li>
            ))}
          </ul>
        </Block>

        {/* Si hay arquitectura, el stack ya aparece capa por capa. */}
        {project.architecture?.length ? null : (
          <Block label="Stack">
            <ul className="flex max-w-3xl flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li key={tech} className="rounded-full border border-line px-3 py-1.5 font-mono text-xs text-fg-muted">
                  {tech}
                </li>
              ))}
            </ul>
          </Block>
        )}

        {project.gallery?.length ? (
          <Block label="Más pantallas">
            <div className="grid gap-6">
              {project.gallery.map((shot) => (
                <figure key={shot.src} className="straighten overflow-hidden rounded-2xl border border-line-strong">
                  <div className="relative aspect-[16/10]">
                    <Image src={shot.src} alt={shot.alt} fill sizes="(min-width: 1024px) 860px, 100vw" className="object-cover object-top" />
                  </div>
                </figure>
              ))}
            </div>
          </Block>
        ) : null}

        <Block label="Resultado">
          <p className="max-w-3xl text-xl leading-relaxed text-fg sm:text-2xl sm:leading-snug">{project.outcome}</p>
        </Block>

        <nav aria-label="Siguiente proyecto" className="mt-24 border-t border-line pt-10">
          <Link href={`/proyectos/${next.slug}`} className="group flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <span>
              <span className="font-mono text-xs text-fg-subtle">Siguiente caso</span>
              <span className="mt-3 block font-display text-headline font-medium transition-colors group-hover:text-accent">
                {next.name}
              </span>
              <span className="mt-2 block text-fg-muted">{next.kicker}</span>
            </span>
            <ArrowRight className="size-8 text-fg-subtle transition-all duration-500 ease-out-expo group-hover:translate-x-1 group-hover:text-accent" />
          </Link>
        </nav>
      </div>
    </article>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mt-20 grid gap-6 md:grid-cols-12 md:gap-8">
      <h2 className="reveal self-start font-mono text-xs tracking-wider text-fg-subtle uppercase md:col-span-3 md:pt-2">
        {label}
      </h2>
      <div className="md:col-span-9">{children}</div>
    </section>
  );
}
