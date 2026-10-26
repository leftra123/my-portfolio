import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { SectionProps } from "@/components/section-heading";
import { founder, settings, socials, story } from "@/lib/data";

/** Historia: la frase sobre la IA a pantalla completa y, debajo, el camino en capítulos cortos. */
export function Story({ index }: SectionProps) {
  const words = settings.manifesto.split(/\s+/);
  const linkedin = socials.find((social) => social.label === "LinkedIn");

  return (
    <section id="historia" className="scroll-mt-24 border-t border-line" aria-labelledby="historia-title">
      {/* Manifiesto: se ilumina palabra por palabra al bajar. */}
      <div className="mx-auto grid min-h-[85svh] max-w-6xl content-center px-5 py-24 sm:px-8">
        <h2 id="historia-title" className="flex items-center gap-3 font-mono text-xs tracking-wider text-fg-subtle uppercase">
          <span className="text-accent">{index}</span>
          <span aria-hidden className="h-px w-6 bg-line-strong" />
          Historia
        </h2>
        <p className="word-reveal mt-8 max-w-5xl font-display text-[clamp(1.75rem,1.1rem+3vw,3.5rem)] leading-[1.22] font-medium tracking-[-0.03em]">
          {words.map((word, position) => (
            <span key={position}>{word} </span>
          ))}
        </p>
        <p className="mt-8 text-sm text-fg-subtle">— {founder.name}, fundador de {settings.company}</p>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-24 sm:px-8 sm:pb-32">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          {/* Tarjeta del fundador: queda fija mientras se leen los capítulos. */}
          <aside className="md:col-span-4 lg:col-span-3">
            <div className="lit rounded-[28px] border border-line bg-bg-elevated/50 p-3 md:sticky md:top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[20px]">
                <Image
                  src="/images/eric-aguayo.jpg"
                  alt={`Retrato de ${founder.name}`}
                  fill
                  sizes="(min-width: 768px) 300px, 90vw"
                  className="object-cover object-[50%_30%]"
                />
              </div>
              <div className="p-3 pt-4">
                <p className="font-display text-lg font-semibold tracking-tight">{founder.name}</p>
                <p className="mt-0.5 text-sm text-accent">{founder.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{founder.bio}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {linkedin ? (
                    <a
                      href={linkedin.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-full border border-line px-3 py-1.5 text-xs text-fg-muted hover:border-line-strong hover:text-fg"
                    >
                      LinkedIn <ArrowUpRight className="size-3" aria-hidden />
                    </a>
                  ) : null}
                  <Link
                    href="/cv"
                    className="inline-flex items-center gap-1 rounded-full border border-line px-3 py-1.5 text-xs text-fg-muted hover:border-line-strong hover:text-fg"
                  >
                    Currículum
                  </Link>
                </div>
              </div>
            </div>
          </aside>

          {/* Capítulos: una frase o dos cada uno, para leer de corrido. */}
          <div className="relative md:col-span-8 md:col-start-5 lg:col-span-8 lg:col-start-5">
            <span aria-hidden className="absolute top-2 bottom-2 left-[5px] w-px bg-gradient-to-b from-accent via-line-strong to-transparent" />
            <ol className="relative">
            {story.map((chapter, position) => (
              <li key={chapter.title} className="reveal relative pb-12 pl-10 last:pb-0">
                <span
                  aria-hidden
                  className={`absolute top-1.5 left-0 size-[11px] rounded-full border-2 ${
                    position === story.length - 1 ? "border-accent bg-accent" : "border-line-strong bg-bg"
                  }`}
                />
                <p className="font-mono text-xs tracking-wider text-fg-subtle uppercase">{chapter.kicker}</p>
                <h3 className="mt-2 font-display text-xl font-semibold tracking-tight sm:text-2xl">{chapter.title}</h3>
                <p className="mt-2 max-w-xl leading-relaxed text-fg-muted">{chapter.body}</p>
                {chapter.href ? (
                  <a
                    href={chapter.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-3 inline-flex items-center gap-1.5 text-sm text-fg hover:text-accent"
                  >
                    <span className="link-underline">Ver la charla</span>
                    <ArrowUpRight className="size-4 text-accent transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                  </a>
                ) : null}
              </li>
            ))}
          </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
