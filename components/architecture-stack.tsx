import type { Project } from "@/lib/data";

type Layer = NonNullable<Project["architecture"]>[number];

/**
 * Arquitectura en capas con perspectiva isométrica (vista explotada).
 * Los planos son decorativos y se separan al entrar en pantalla (scroll-driven, CSS puro);
 * el contenido real es la lista. Al pasar por una capa de la lista, se ilumina su plano.
 */
export function ArchitectureStack({ layers }: { layers: Layer[] }) {
  return (
    <div className="arch grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12">
      <div aria-hidden className="arch-scene relative mx-auto aspect-[1/0.9] w-full max-w-[400px]">
        <div className="arch-stack">
          {layers.map((layer, position) => (
            <div key={layer.title} className="arch-plane" style={{ "--z": layers.length - 1 - position } as React.CSSProperties}>
              <span className="arch-label">
                <span className="text-accent">{String(position + 1).padStart(2, "0")}</span> {layer.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <ol className="arch-list divide-y divide-line border-y border-line">
        {layers.map((layer, position) => (
          <li key={layer.title} className="py-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
              <h3 className="flex items-baseline gap-3 font-display text-lg font-semibold tracking-tight">
                <span className="font-mono text-xs font-normal text-accent">{String(position + 1).padStart(2, "0")}</span>
                {layer.title}
              </h3>
              <ul className="flex flex-wrap gap-1.5" aria-label={`Tecnologías de ${layer.title}`}>
                {layer.tech.map((tech) => (
                  <li key={tech} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-fg-muted">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">{layer.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
