import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { archive } from "@/lib/data";

export const metadata: Metadata = {
  title: "Archivo de proyectos",
  description: "Todos los proyectos de Eric Aguayo Quintriqueo desde 2022: plataformas en producción, trabajos para clientes, prototipos y proyectos académicos.",
  alternates: { canonical: "/archivo" },
};

export default function ArchivePage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-32 sm:px-8 sm:pt-40">
      <PageIntro
        eyebrow="Archivo"
        title={
          <>
            {archive.length} proyectos, <span className="text-fg-muted">del primer Arduino a una plataforma con 453 usuarios.</span>
          </>
        }
        lead="Incluye trabajos académicos y prototipos: muestran cómo aprendí lo que hoy uso en producción."
      />

      <table className="mt-16 w-full text-left text-sm">
        <caption className="sr-only">Proyectos ordenados del más reciente al más antiguo</caption>
        <thead>
          <tr className="border-b border-line-strong font-mono text-[11px] tracking-wider text-fg-subtle uppercase">
            <th scope="col" className="w-20 py-3 pr-4 font-normal">Año</th>
            <th scope="col" className="py-3 pr-4 font-normal">Proyecto</th>
            <th scope="col" className="hidden py-3 pr-4 font-normal md:table-cell">Descripción</th>
            <th scope="col" className="hidden py-3 pr-4 font-normal lg:table-cell">Stack</th>
            <th scope="col" className="w-10 py-3 font-normal">
              <span className="sr-only">Enlace</span>
            </th>
          </tr>
        </thead>
        <tbody className="dim-siblings">
          {archive.map((item, index) => {
            const showYear = index === 0 || archive[index - 1]?.year !== item.year;
            const href = item.slug ? `/proyectos/${item.slug}` : item.href;
            const internal = Boolean(item.slug);
            return (
              <tr key={`${item.year}-${item.name}`} className="group relative border-b border-line">
                <td className="py-4 pr-4 align-top font-mono text-xs text-fg-subtle tabular-nums">
                  {showYear ? item.year : <span className="sr-only">{item.year}</span>}
                </td>
                <td className="py-4 pr-4 align-top">
                  {href ? (
                    <Link
                      href={href}
                      target={internal ? undefined : "_blank"}
                      rel={internal ? undefined : "noopener noreferrer"}
                      className="font-medium text-fg outline-none after:absolute after:inset-0 after:content-[''] focus-visible:after:outline-2 focus-visible:after:outline-[var(--accent)]"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <span className="font-medium text-fg">{item.name}</span>
                  )}
                  <span className="mt-1 block text-fg-muted md:hidden">{item.note}</span>
                </td>
                <td className="hidden py-4 pr-4 align-top text-fg-muted md:table-cell">{item.note}</td>
                <td className="hidden py-4 pr-4 align-top lg:table-cell">
                  <span className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-fg-subtle">
                    {item.stack.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </span>
                </td>
                <td className="py-4 align-top text-right">
                  {href ? (
                    internal ? (
                      <ArrowRight aria-hidden className="ml-auto size-4 text-fg-subtle transition-all duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:text-accent" />
                    ) : (
                      <ArrowUpRight aria-hidden className="ml-auto size-4 text-fg-subtle transition-all duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                    )
                  ) : (
                    <span className="font-mono text-[10px] text-fg-subtle">privado</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
