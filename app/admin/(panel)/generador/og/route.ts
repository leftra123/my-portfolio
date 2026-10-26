import { isAdmin } from "@/lib/admin/auth";
import { getProject } from "@/lib/data";
import { renderOg } from "@/lib/og";

/** Vista previa de la imagen para compartir de cada proyecto (la pública lleva un sufijo con hash). */
export async function GET(request: Request) {
  if (!(await isAdmin())) return new Response("No autorizado", { status: 401 });
  const slug = new URL(request.url).searchParams.get("slug") ?? "";
  const project = getProject(slug);
  if (!project) return new Response("No existe", { status: 404 });
  return renderOg({ eyebrow: "Caso de estudio", title: project.name, subtitle: project.kicker, path: `/proyectos/${slug}` });
}
