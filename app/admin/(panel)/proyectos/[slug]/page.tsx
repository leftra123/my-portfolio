import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/page-header";
import { ProjectEditor } from "@/components/admin/project-editor";
import { canWrite, readCollection } from "@/lib/admin/store";

export const metadata: Metadata = { title: "Proyecto" };

const BLANK = {
  slug: "",
  name: "",
  kicker: "",
  summary: "",
  year: String(new Date().getFullYear()),
  role: "Desarrollo full-stack",
  client: "",
  status: "En desarrollo",
  stack: [],
  metrics: [],
  motif: "grid",
  context: "",
  built: [],
  decisions: [],
  outcome: "",
  featured: false,
  draft: true,
};

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const isNew = slug === "nuevo";
  const project = isNew ? BLANK : (await readCollection("proyectos")).find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <>
      <Link href="/admin/proyectos" className="font-mono text-xs text-fg-subtle hover:text-fg">
        ← Proyectos
      </Link>
      <div className="mt-4">
        <PageHeader
          eyebrow={isNew ? "Nuevo proyecto" : "Editar proyecto"}
          title={isNew ? "Nuevo proyecto" : project.name}
          description={
            isNew
              ? "Empieza como borrador: no se publica hasta que desmarques «Borrador». Si tienes el repo, el generador lo completa por ti."
              : "Los cambios se ven en el sitio apenas guardas."
          }
        />
      </div>
      <ProjectEditor key={slug} initial={project} originalSlug={isNew ? null : slug} readOnly={!canWrite()} />
    </>
  );
}
