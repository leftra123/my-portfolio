import { Plus, Star } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/admin/page-header";
import { ProjectOrder } from "@/components/admin/project-order";
import { StatusBadge } from "@/components/status-badge";
import { canWrite, readCollection } from "@/lib/admin/store";

export const metadata: Metadata = { title: "Proyectos" };

export default async function ProjectsPage() {
  const projects = await readCollection("proyectos");
  return (
    <>
      <PageHeader
        eyebrow="Contenido"
        title="Proyectos"
        description="Casos de estudio. El orden de esta lista es el orden del sitio; los destacados van a la portada."
        actions={
          <Link
            href="/admin/proyectos/nuevo"
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-btn px-4 text-sm font-medium text-btn-fg"
          >
            <Plus className="size-4" /> Nuevo
          </Link>
        }
      />
      <ol className="grid gap-2">
        {projects.map((project, index) => (
          <li key={project.slug} className="flex items-center gap-3 rounded-2xl border border-line bg-bg-elevated/40 py-2 pr-2 pl-4 transition-colors hover:border-line-strong">
            <span className="font-mono text-[11px] text-fg-subtle tabular-nums">{String(index + 1).padStart(2, "0")}</span>
            <Link href={`/admin/proyectos/${project.slug}`} className="min-w-0 flex-1 py-1">
              <span className="flex items-center gap-2 text-sm text-fg">
                {project.name}
                {project.featured ? <Star className="size-3.5 fill-current text-amber-300" aria-label="Destacado" /> : null}
                {project.draft ? <span className="rounded-full border border-line px-2 py-px font-mono text-[10px] text-fg-subtle">borrador</span> : null}
              </span>
              <span className="block truncate text-xs text-fg-subtle">{project.kicker}</span>
            </Link>
            <StatusBadge status={project.status} className="hidden sm:inline-flex" />
            <ProjectOrder slug={project.slug} first={index === 0} last={index === projects.length - 1} disabled={!canWrite()} />
          </li>
        ))}
      </ol>
    </>
  );
}
