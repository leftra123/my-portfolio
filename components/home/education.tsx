import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SectionHeading, type SectionProps } from "@/components/section-heading";
import { certifications, education } from "@/lib/data";

export function Education({ index }: SectionProps) {
  const highlights = certifications.filter((cert) => cert.highlight);

  return (
    <section id="formacion" className="scroll-mt-24 border-t border-line py-24 sm:py-32" aria-labelledby="formacion-title">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          id="formacion-title"
          index={index}
          eyebrow="Formación"
          title={
            <>
              Formación del fundador. <span className="text-fg-muted">Estudio mientras construyo.</span>
            </>
          }
        />

        <div className="mt-16 grid gap-12 md:grid-cols-12 md:gap-8">
          <ol className="md:col-span-5 md:col-start-4">
            {education.map((item) => (
              <li key={item.title} className="reveal border-t border-line py-6 first:border-t-0 first:pt-0">
                <p className="font-mono text-xs text-fg-subtle tabular-nums">{item.period}</p>
                <h3 className="mt-2 font-display text-lg font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-1 text-sm text-fg-muted">
                  {item.org}
                  {"note" in item && item.note ? <span className="text-fg-subtle"> · {item.note}</span> : null}
                </p>
              </li>
            ))}
          </ol>

          <div className="md:col-span-4">
            <h3 className="font-mono text-xs tracking-wider text-fg-subtle uppercase">Certificaciones destacadas</h3>
            <ul className="mt-5 grid gap-2">
              {highlights.map((cert) => (
                <li key={cert.title} className="reveal">
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start justify-between gap-4 rounded-2xl border border-line p-4 transition-colors hover:border-line-strong hover:bg-fg/[0.03]"
                  >
                    <span>
                      <span className="block text-sm text-fg">{cert.title}</span>
                      <span className="mt-1 block font-mono text-[11px] text-fg-subtle">
                        {cert.issuer} · {cert.date}
                      </span>
                    </span>
                    <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-fg-subtle transition-all duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                    <span className="sr-only">(verificar credencial, se abre en otra pestaña)</span>
                  </a>
                </li>
              ))}
            </ul>
            <Link
              href="/formacion"
              className="group mt-5 inline-flex items-center gap-2 text-sm text-fg-muted hover:text-fg"
            >
              <span className="link-underline">Ver las {certifications.length} certificaciones</span>
              <ArrowRight className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
