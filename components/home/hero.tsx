import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { IsotipoOutline } from "@/components/brand/isotipo";
import { Isotipo3D } from "@/components/brand/isotipo-3d";
import { sections, settings, site } from "@/lib/data";

/** Separa el título para pintar con el degradado de marca solo la palabra destacada. */
function Title({ title, highlight }: { title: string; highlight: string }) {
  const index = highlight ? title.lastIndexOf(highlight) : -1;
  if (index < 0) return <>{title}</>;
  return (
    <>
      {title.slice(0, index)}
      <span className="text-aura">{highlight}</span>
      {title.slice(index + highlight.length)}
    </>
  );
}

export function Hero() {
  const { hero, announcement, available, company, motto } = settings;
  // Si una sección está apagada en el admin, el botón apunta a una alternativa que sí existe.
  const workHref = sections.includes("trabajo") ? "#trabajo" : "/archivo";
  const contactHref = sections.includes("contacto") ? "#contacto" : `mailto:${site.email}`;

  return (
    <section id="inicio" className="relative isolate flex min-h-svh flex-col overflow-hidden" aria-labelledby="hero-title">
      {/* Fondo: retícula que se desvanece + un único halo, el "aura" de la marca. */}
      <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="aura-halo absolute top-[-12%] right-[-30%] size-[760px] opacity-80 sm:right-[-18%] lg:top-[-4%] lg:right-[-10%]" />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 pt-28 pb-12 sm:px-8 sm:pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8 xl:col-span-9">
            <p
              className="enter inline-flex max-w-full flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-line bg-bg-elevated/60 py-1.5 pr-4 pl-2.5 font-mono text-xs text-fg-muted backdrop-blur"
              style={{ "--i": 0 } as React.CSSProperties}
            >
              {announcement.enabled && announcement.text ? (
                announcement.href ? (
                  <a href={announcement.href} className="inline-flex items-center gap-2 text-fg hover:text-accent">
                    <span className="status-dot relative size-2 rounded-full bg-electric" aria-hidden />
                    {announcement.text}
                    <ArrowUpRight className="size-3.5" />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 text-fg">
                    <span className="status-dot relative size-2 rounded-full bg-electric" aria-hidden />
                    {announcement.text}
                  </span>
                )
              ) : available ? (
                <span className="inline-flex items-center gap-2 text-fg">
                  <span className="status-dot relative size-2 rounded-full bg-emerald-400" aria-hidden />
                  Agenda abierta para nuevos proyectos
                </span>
              ) : null}
              <span aria-hidden className="hidden text-fg-subtle sm:inline">
                /
              </span>
              <span className="hidden sm:inline">{hero.eyebrow}</span>
            </p>

            <h1 id="hero-title" className="enter mt-8 text-display font-semibold" style={{ "--i": 1 } as React.CSSProperties}>
              <span className="sr-only">{company}: </span>
              <Title title={hero.title} highlight={hero.highlight} />
            </h1>

            <p
              className="enter mt-8 max-w-2xl text-lg leading-relaxed text-fg-muted sm:text-xl"
              style={{ "--i": 2 } as React.CSSProperties}
            >
              {hero.subtitle}
            </p>

            <div className="enter mt-10 flex flex-wrap items-center gap-3" style={{ "--i": 3 } as React.CSSProperties}>
              <Link
                href={workHref}
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-btn pr-5 pl-6 text-sm font-medium text-btn-fg transition-transform duration-300 ease-out-expo hover:-translate-y-0.5 active:translate-y-0"
              >
                {hero.primaryLabel}
                <ArrowDownRight className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </Link>
              <Link
                href={contactHref}
                className="inline-flex h-12 items-center rounded-full border border-line-strong px-6 text-sm font-medium transition-colors hover:bg-fg/[0.05]"
              >
                {hero.secondaryLabel}
              </Link>
            </div>
          </div>

          {/* Firma de marca: el isotipo con volumen (CSS 3D) y su "aura" que se expande, lenta y en silencio. */}
          <div
            aria-hidden
            className="enter relative hidden h-full min-h-72 place-items-center lg:col-span-4 lg:grid xl:col-span-3"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            <div className="aura-halo absolute size-[420px] animate-[breathe_8s_ease-in-out_infinite]" />
            {[0, 1, 2].map((ring) => (
              <IsotipoOutline key={ring} className="aura-ripple absolute w-36" style={{ "--d": `${ring * 3}s` } as React.CSSProperties} />
            ))}
            <Isotipo3D className="relative w-36" />
          </div>
        </div>
      </div>

      <div className="enter mx-auto w-full max-w-6xl px-5 sm:px-8" style={{ "--i": 4 } as React.CSSProperties}>
        <div className="flex items-center justify-between gap-4 border-t border-line py-6">
          <p className="font-mono text-[11px] tracking-[0.18em] text-fg-subtle uppercase">{motto}</p>
          <a href={sections[0] ? `#${sections[0]}` : workHref} aria-label="Bajar a la siguiente sección" className="group flex items-center p-2 hover:text-fg">
            <span aria-hidden className="relative block h-8 w-px overflow-hidden bg-line">
              <span className="scroll-cue absolute inset-0 bg-accent" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
