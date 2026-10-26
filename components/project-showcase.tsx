import Image from "next/image";
import { ViewTransition } from "react";
import { ProjectVisual } from "@/components/project-visual";
import type { Project } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * Composición de capturas reales: escritorio de fondo y celular al frente, sin marcos de navegador
 * (los marcos con puntitos de macOS ya son un cliché). Si no hay captura pública, usa la ilustración.
 */
export function ProjectShowcase({ project, priority, className }: { project: Project; priority?: boolean; className?: string }) {
  if (!project.cover) {
    return (
      <div className={cn("relative grid h-full place-items-center bg-bg-inset p-4 sm:p-8", className)}>
        <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
        <ProjectVisual project={project} className="relative w-full max-w-2xl" />
      </div>
    );
  }

  return (
    <div className={cn("relative h-full min-h-72 overflow-hidden bg-bg-inset", className)}>
      <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
      <div aria-hidden className="aura-halo absolute -right-1/4 -bottom-1/3 size-[520px] opacity-60" />

      {/* La captura se inclina con el puntero (Tilt) y se transforma en la portada del caso al navegar. */}
      <div className="tilt-target absolute inset-y-[9%] left-[7%] right-[-14%]">
        <ViewTransition name={`portada-${project.slug}`} share="morph" default="none">
          <div className="tilt-glare absolute inset-0 overflow-hidden rounded-2xl border border-line-strong shadow-[0_40px_80px_-40px_rgb(0_0_0/0.7)]">
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 760px, 110vw"
              className="object-cover object-[left_top] transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.02]"
            />
          </div>
        </ViewTransition>
      </div>

      {project.mobile ? (
        <div className="tilt-target tilt-near absolute right-[6%] bottom-[7%] aspect-[390/844] w-[21%] min-w-[72px] max-w-[190px] sm:w-[25%] overflow-hidden rounded-[22px] border-[3px] border-bg-elevated shadow-[0_30px_60px_-20px_rgb(0_0_0/0.75)] ring-1 ring-line-strong">
          <Image src={project.mobile.src} alt={project.mobile.alt} fill sizes="190px" className="object-cover object-top" />
        </div>
      ) : null}
    </div>
  );
}
