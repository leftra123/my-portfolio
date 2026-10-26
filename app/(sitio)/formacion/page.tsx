import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { certifications, education } from "@/lib/data";

export const metadata: Metadata = {
  title: "Formación y certificaciones",
  description: `Formación académica en INACAP y ${certifications.length} certificaciones en desarrollo, datos, nube e IA.`,
  alternates: { canonical: "/formacion" },
};

export default function EducationPage() {
  const years = [...new Set(certifications.map((cert) => cert.year))].sort((a, b) => b - a);
  const issuers = new Set(certifications.map((cert) => cert.issuer)).size;

  return (
    <div className="mx-auto max-w-6xl px-5 pt-32 sm:px-8 sm:pt-40">
      <PageIntro
        eyebrow="Formación"
        title={
          <>
            {certifications.length} certificaciones <span className="text-fg-muted">de {issuers} instituciones, todas verificables.</span>
          </>
        }
        lead="Cada certificación enlaza a su credencial original. La formación formal está primero."
      />

      <section aria-labelledby="formal" className="mt-20 grid gap-6 md:grid-cols-12 md:gap-8">
        <h2 id="formal" className="self-start font-mono text-xs tracking-wider text-fg-subtle uppercase md:col-span-3 md:pt-1">
          Formación formal
        </h2>
        <ol className={`grid gap-px overflow-hidden rounded-[28px] border border-line bg-line md:col-span-9 ${education.length % 3 === 0 ? "sm:grid-cols-3" : "grid-fill-2 sm:grid-cols-2"}`}>
          {education.map((item) => (
            <li key={item.title} className="bg-bg p-6">
              <p className="font-mono text-xs text-fg-subtle tabular-nums">{item.period}</p>
              <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-1 text-sm text-fg-muted">{item.org}</p>
              {"note" in item && item.note ? <p className="mt-3 text-xs text-accent">{item.note}</p> : null}
            </li>
          ))}
        </ol>
      </section>

      {years.map((year) => (
        <section key={year} aria-labelledby={`y-${year}`} className="mt-16 grid gap-6 md:grid-cols-12 md:gap-8">
          <h2 id={`y-${year}`} className="self-start font-display text-3xl font-medium tracking-tight tabular-nums md:col-span-3">
            {year}
          </h2>
          <ul className="dim-siblings border-t border-line md:col-span-9">
            {certifications
              .filter((cert) => cert.year === year)
              .map((cert) => (
                <li key={cert.title} className="reveal border-b border-line">
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-6 py-4"
                  >
                    <span>
                      <span className="text-fg">{cert.title}</span>
                      <span className="mt-0.5 block text-sm text-fg-subtle">{cert.issuer}</span>
                    </span>
                    <span className="flex shrink-0 items-center gap-4">
                      <span className="hidden font-mono text-xs text-fg-subtle sm:block">{cert.date}</span>
                      <ArrowUpRight className="size-4 text-fg-subtle transition-all duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                    </span>
                    <span className="sr-only">(verificar credencial, se abre en otra pestaña)</span>
                  </a>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
