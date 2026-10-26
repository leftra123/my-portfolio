import { SectionHeading, type SectionProps } from "@/components/section-heading";
import { experience } from "@/lib/data";

/** Experiencia para leer en segundos: periodo, cargo, organización y una línea. */
export function Experience({ index }: SectionProps) {
  return (
    <section id="experiencia" className="scroll-mt-24 border-t border-line py-24 sm:py-32" aria-labelledby="experiencia-title">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          id="experiencia-title"
          index={index}
          eyebrow="Experiencia"
          title={
            <>
              Del inventario <span className="text-fg-muted">a la plataforma.</span>
            </>
          }
        />

        <ol className="dim-siblings mt-14 border-t border-line sm:mt-16">
          {experience.map((role) => (
            <li
              key={`${role.period}-${role.title}`}
              className="reveal grid gap-1 border-b border-line py-5 sm:grid-cols-[9.5rem_1fr] sm:gap-6 md:grid-cols-12 md:items-baseline md:gap-8"
            >
              <p className="font-mono text-xs text-fg-subtle tabular-nums md:col-span-3">{role.period}</p>
              <div className="md:col-span-9 md:grid md:grid-cols-9 md:items-baseline md:gap-8">
                <h3 className="text-[15px] leading-snug font-medium md:col-span-5">
                  {role.title} <span className="text-accent">· {role.org}</span>
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-fg-muted md:col-span-4 md:mt-0">{role.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
