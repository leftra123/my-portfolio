import { ArrowUpRight } from "lucide-react";
import { Isotipo } from "@/components/brand/isotipo";
import { CopyButton } from "@/components/copy-button";
import type { SectionProps } from "@/components/section-heading";
import { settings, site, socials } from "@/lib/data";

export function Contact({ index }: SectionProps) {
  return (
    <section id="contacto" className="flex min-h-svh scroll-mt-24 flex-col justify-center border-t border-line py-24 sm:py-32" aria-labelledby="contacto-title">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="lit relative isolate overflow-hidden rounded-[32px] border border-line bg-bg-elevated px-6 py-16 sm:px-12 sm:py-24">
          <div aria-hidden className="bg-grid absolute inset-0 -z-10 opacity-70" />
          <div aria-hidden className="aura-halo absolute -top-1/2 left-1/2 -z-10 size-[720px] -translate-x-1/2" />

          <div className="reveal mx-auto max-w-3xl text-center">
            <Isotipo className="mx-auto h-10 w-auto" />
            <p className="mt-8 font-mono text-xs tracking-wider text-fg-subtle uppercase">
              {index} — Conversemos con {settings.company}
            </p>
            <h2 id="contacto-title" className="mt-4 text-headline font-medium">
              ¿Tienes un proceso que todavía vive <span className="text-fg-muted">en una planilla?</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
              Cuéntanos qué hace tu equipo hoy y conversemos cómo convertirlo en un sistema que funcione solo.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4">
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent(`Hola ${settings.company}, tengo un proyecto`)}`}
                className="group inline-flex items-center gap-2 font-display text-[clamp(1.25rem,0.9rem+1.6vw,2rem)] font-medium tracking-tight"
              >
                <span className="link-underline">{site.email}</span>
                <ArrowUpRight className="size-6 text-accent transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <CopyButton value={site.email} label="Copiar correo" />
            </div>

            <ul className="mt-12 flex flex-wrap items-center justify-center gap-2">
              {socials
                .filter((social) => social.label === "WhatsApp" || social.label === "LinkedIn")
                .map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
                  >
                    {social.label}
                    <ArrowUpRight className="size-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
