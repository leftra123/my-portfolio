import { ArrowUpRight, Mic } from "lucide-react";
import { SectionHeading, type SectionProps } from "@/components/section-heading";
import { Spotlight } from "@/components/spotlight";
import { talks } from "@/lib/data";

export function Talks({ index }: SectionProps) {
  if (!talks.length) return null;
  const sorted = [...talks].sort((a, b) => b.year - a.year);

  return (
    <section id="charlas" className="scroll-mt-24 border-t border-line py-24 sm:py-32" aria-labelledby="charlas-title">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          id="charlas-title"
          index={index}
          eyebrow="Charlas"
          title={
            <>
              Compartir lo que aprendo, <span className="text-fg-muted">sobre todo en la sala de clases.</span>
            </>
          }
        />

        <ul className="md:grid-fill-2 mt-14 grid gap-4 sm:mt-16 md:grid-cols-2">
          {sorted.map((talk) => (
            <li key={talk.title} className="reveal">
              <Spotlight className="lit h-full rounded-[28px] border border-line bg-bg-elevated/50 p-6 transition-colors duration-500 hover:border-line-strong sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <span className="grid size-11 place-items-center rounded-2xl bg-accent-soft text-accent">
                    <Mic className="size-5" aria-hidden />
                  </span>
                  <span className="font-mono text-xs text-fg-subtle">{talk.date}</span>
                </div>
                <h3 className="mt-8 font-display text-xl font-semibold tracking-tight sm:text-2xl">
                  {talk.url ? (
                    <a
                      href={talk.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="outline-none after:absolute after:inset-0 after:rounded-[28px] after:content-[''] focus-visible:after:outline-2 focus-visible:after:outline-[var(--accent)]"
                    >
                      {talk.title}
                    </a>
                  ) : (
                    talk.title
                  )}
                </h3>
                <p className="mt-2 text-sm text-accent">{talk.event}</p>
                {talk.audience ? <p className="mt-3 text-sm leading-relaxed text-fg-muted">{talk.audience}</p> : null}
                {talk.url ? (
                  <p className="mt-6 inline-flex items-center gap-1.5 text-sm text-fg">
                    Ver la charla <ArrowUpRight className="size-4 text-accent" aria-hidden />
                  </p>
                ) : null}
              </Spotlight>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
