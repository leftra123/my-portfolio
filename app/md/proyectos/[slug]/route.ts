import { getProject, projects } from "@/lib/data";
import { markdownResponse, projectMarkdown } from "@/lib/markdown";

/*
 * Cada caso de estudio en Markdown. Se publica como /proyectos/<slug>.md
 * mediante una reescritura en next.config.ts.
 */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return new Response("No encontrado", { status: 404 });
  return markdownResponse(projectMarkdown(project), `/proyectos/${project.slug}`);
}
