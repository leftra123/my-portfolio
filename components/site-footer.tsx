import { ArrowUp, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { PageMetricsInline } from "@/components/page-metrics";
import { builtAtLabel, short, stackVersions } from "@/lib/build-info";
import { site, socials } from "@/lib/data";

const updated = new Intl.DateTimeFormat("es-CL", { month: "long", year: "numeric" }).format(
  new Date(`${site.updated}T12:00:00`),
);

const pages = [
  { href: "/archivo", label: "Archivo" },
  { href: "/cv", label: "Currículum" },
  { href: "/formacion", label: "Formación" },
  { href: "/privacidad", label: "Privacidad · sin cookies" },
  { href: "/como-esta-hecho", label: "Cómo está hecho" },
];

const version = (pkg: string) => short(stackVersions.find((item) => item.pkg === pkg)?.version ?? "");

/** Pie corto: marca, páginas que no están en el menú y redes. El contacto ya está justo arriba. */
export function SiteFooter() {
  return (
    <footer className="relative mt-24 border-t border-line print:hidden">
      <div className="mx-auto max-w-6xl px-5 pt-12 pb-10 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            {/* Logotipo oficial: AURA está dibujado a mano, no se reescribe con una fuente. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/aura-tech-horizontal-color-oscuro-lema.svg"
              alt={`${site.company} — ${site.motto}`}
              width={1000}
              height={240}
              className="h-auto w-52 dark:hidden"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/aura-tech-horizontal-color-claro-lema.svg"
              alt={`${site.company} — ${site.motto}`}
              width={1000}
              height={240}
              className="hidden h-auto w-52 dark:block"
            />
            <p className="mt-4 text-sm text-fg-subtle">Fundada por {site.name} en La Araucanía.</p>
          </div>

          <nav aria-label="Más páginas y redes" className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            {pages.map((page) => (
              <Link key={page.href} href={page.href} className="link-underline text-fg-muted hover:text-fg">
                {page.label}
              </Link>
            ))}
            {socials
              .filter((social) => social.label !== "WhatsApp")
              .map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-fg-muted hover:text-fg"
                >
                  <span className="link-underline">{social.label}</span>
                  <ArrowUpRight className="size-3.5 transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5" aria-hidden />
                </a>
              ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 font-mono text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.company} · actualizado en {updated}
          </p>
          <a href="#" className="inline-flex items-center gap-1.5 hover:text-fg" aria-label="Volver arriba">
            Arriba <ArrowUp className="size-3" />
          </a>
        </div>
        {/* Ficha técnica: versiones reales al compilar y lo que pesó esta visita, medido en el navegador. */}
        <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-fg-subtle">
          <span>
            Next.js {version("next")} · React {version("react")} · Tailwind {version("tailwindcss")}
          </span>
          <span aria-hidden>·</span>
          <span>compilado el {builtAtLabel}</span>
          <span aria-hidden>·</span>
          <PageMetricsInline />
          <span aria-hidden className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">
            pulsa <kbd className="rounded border border-line px-1">?</kbd> para ver los atajos
          </span>
        </p>
      </div>
    </footer>
  );
}
