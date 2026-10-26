import { getProject, projects } from "@/lib/data";
import { ogSize, renderOg } from "@/lib/og";

export const alt = "Caso de estudio";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return renderOg({
    eyebrow: "Caso de estudio",
    title: project?.name ?? "Proyecto",
    subtitle: project?.kicker ?? "",
    path: `/proyectos/${slug}`,
  });
}
