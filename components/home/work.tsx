import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ViewTransition } from "react";
import { ProjectShowcase } from "@/components/project-showcase";
import { ProjectVisual } from "@/components/project-visual";
import { SectionHeading, type SectionProps } from "@/components/section-heading";
import { Spotlight } from "@/components/spotlight";
import { StatusBadge } from "@/components/status-badge";
import { Tilt } from "@/components/tilt";
import { archive, featuredSlugs, projects, type Project } from "@/lib/data";

export function Work({ index }: SectionProps) {
  const featured = projects.filter((project) => featuredSlugs.includes(project.slug));
  const more = projects.filter((project) => !featuredSlugs.includes(project.slug));

  return (
    <section id="trabajo" className="scroll-mt-24 py-24 sm:py-32" aria-labelledby="trabajo-title">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          id="trabajo-title"
          index={index}
          eyebrow="Proyectos"
          title={
            <>
              Software que hoy usa <span className="text-fg-muted">gente real.</span>
            </>
          }
          lead="Plataformas, reservas con pago, comercio y automatización. Cada una tiene su caso de estudio."
        />

        {/* Tarjetas apiladas: en escritorio cada proyecto ocupa la pantalla y el siguiente se monta encima. */}
        <ol className="mt-14 grid gap-5 sm:mt-16 lg:block">
          {featured.map((project, position) => (
            <li
              key={project.slug}
              className="lg:sticky lg:pb-10"
              style={{ top: `calc(6.5rem + ${position * 16}px)` }}
            >
              <ProjectPanel project={project} position={position} total={featured.length} />
            </li>
          ))}
        </ol>

        {more.length ? (
          <ul className="md:grid-fill-2 mt-6 grid gap-5 md:grid-cols-2 lg:mt-4">
            {more.map((project) => (
              <li key={project.slug}>
                <CompactCard project={project} />
              </li>
            ))}
          </ul>
        ) : null}

        <div className="reveal mt-14 flex justify-center">
          <Link
            href="/archivo"
            className="group inline-flex items-center gap-3 rounded-full border border-line px-5 py-3 text-sm text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
          >
            Ver el archivo completo
            <span className="font-mono text-xs text-fg-subtle">{archive.length} proyectos</span>
            <ArrowRight className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProjectPanel({ project, position, total }: { project: Project; position: number; total: number }) {
  return (
    <Tilt>
    <article className="group lit relative grid overflow-hidden rounded-[32px] border border-line bg-bg-elevated lg:min-h-[min(620px,calc(100svh-9rem))] lg:grid-cols-12">
      <div className="order-2 flex flex-col p-6 sm:p-8 lg:order-1 lg:col-span-5 lg:p-10">
        <div className="flex items-center justify-between gap-4 font-mono text-[11px] text-fg-subtle">
          <span className="tabular-nums">
            {String(position + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <StatusBadge status={project.status} />
        </div>

        <h3 className="mt-6 text-title font-semibold lg:mt-10">
          <ViewTransition name={`titulo-${project.slug}`} share="morph" default="none">
          <Link
            href={`/proyectos/${project.slug}`}
            className="inline-block outline-none after:absolute after:inset-0 after:rounded-[32px] after:content-[''] focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-[var(--accent)]"
          >
            {project.name}
          </Link>
          </ViewTransition>
        </h3>
        <p className="mt-1 text-fg-muted">{project.kicker}</p>
        <p className="mt-4 max-w-md leading-relaxed text-fg-muted">{project.summary}</p>

        {project.metrics.length ? (
          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-4 border-t border-line pt-6 lg:mt-auto">
            {project.metrics.slice(0, 3).map((metric) => (
              <div key={metric.label} className="min-w-0">
                <dt className="sr-only">{metric.label}</dt>
                <dd className="font-display text-2xl font-medium tracking-tight tabular-nums">{metric.value}</dd>
                <dd className="mt-0.5 max-w-[18ch] text-xs text-fg-subtle">{metric.label}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        <div className={`mt-6 flex flex-wrap items-center justify-between gap-3 ${project.metrics.length ? "" : "lg:mt-auto"}`}>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-fg">
            Ver caso de estudio
            <ArrowUpRight className="size-4 text-accent transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
          {project.partner ? <PartnerTag partner={project.partner} /> : null}
          {project.engagement ? (
            <span className="inline-flex items-center rounded-full border border-line px-3 py-1 text-xs text-fg-subtle">{project.engagement}</span>
          ) : null}
        </div>
      </div>

      <ProjectShowcase
        project={project}
        priority={position === 0}
        className="order-1 aspect-[16/11] lg:order-2 lg:col-span-7 lg:aspect-auto"
      />
    </article>
    </Tilt>
  );
}

export function PartnerTag({ partner }: { partner: NonNullable<Project["partner"]> }) {
  const content = (
    <>
      <span className="text-fg-subtle">En conjunto con</span> <span className="text-fg">{partner.name}</span>
      {partner.url ? <ArrowUpRight className="size-3" aria-hidden /> : null}
    </>
  );
  return partner.url ? (
    <a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative z-10 inline-flex items-center gap-1 rounded-full border border-line px-3 py-1 text-xs transition-colors hover:border-line-strong"
    >
      {content}
    </a>
  ) : (
    <span className="inline-flex items-center gap-1 rounded-full border border-line px-3 py-1 text-xs">{content}</span>
  );
}

function CompactCard({ project }: { project: Project }) {
  return (
    <Spotlight className="lit group reveal h-full rounded-[28px] border border-line bg-bg-elevated/50 p-2.5 transition-colors duration-500 hover:border-line-strong sm:p-3">
      <article className="flex h-full flex-col">
        <ProjectVisual project={project} sizes="(min-width: 768px) 540px, 100vw" />
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <StatusBadge status={project.status} />
          <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">
            <ViewTransition name={`titulo-${project.slug}`} share="morph" default="none">
              <Link
                href={`/proyectos/${project.slug}`}
                className="inline-block outline-none after:absolute after:inset-0 after:rounded-[28px] after:content-[''] focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-[var(--accent)]"
              >
                {project.name}
              </Link>
            </ViewTransition>
          </h3>
          <p className="mt-1 font-mono text-[11px] text-fg-subtle">{project.client}</p>
          <p className="mt-3 text-sm leading-relaxed text-fg-muted">{project.summary}</p>
        </div>
      </article>
    </Spotlight>
  );
}
