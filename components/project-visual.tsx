import { Lock } from "lucide-react";
import Image from "next/image";
import { ViewTransition } from "react";
import type { Project } from "@/lib/data";
import { cn } from "@/lib/utils";

type ProjectVisualProps = {
  project: Project;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** "wide" se usa en los casos de estudio para que las composiciones no se estiren. */
  ratio?: "default" | "wide";
};

/** Captura real dentro de un marco de navegador, o una composición ilustrativa si no hay captura pública. */
export function ProjectVisual({ project, priority, sizes, className, ratio = "default" }: ProjectVisualProps) {
  const domain = project.url ? new URL(project.url).hostname.replace(/^www\./, "") : `${project.slug}.app`;

  return (
    // Mismo nombre que la portada de la ficha: al abrir el caso, la captura viaja a su lugar.
    <ViewTransition name={`portada-${project.slug}`} share="morph" default="none">
    <figure
      className={cn(
        "overflow-hidden rounded-2xl border border-line-strong bg-bg-inset shadow-[0_30px_80px_-40px_rgb(0_0_0/0.6)]",
        className,
      )}
    >
      <div className="flex h-8 items-center justify-between border-b border-line bg-bg-elevated px-3.5 font-mono text-[10.5px] text-fg-subtle" aria-hidden>
        <span className="flex items-center gap-1.5 truncate">
          <Lock className="size-2.5 shrink-0" />
          {domain}
        </span>
        <span>{project.cover ? "captura real" : "ilustración"}</span>
      </div>
      <div className={cn("relative overflow-hidden", ratio === "wide" && !project.cover ? "aspect-[16/10] sm:aspect-[21/9]" : "aspect-[16/10]")}>
        {project.cover ? (
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            priority={priority}
            sizes={sizes ?? "(min-width: 1024px) 640px, 100vw"}
            className="object-cover object-top transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.025]"
          />
        ) : project.motif === "ledger" ? (
          <LedgerMotif />
        ) : project.motif === "cold" ? (
          <ColdChainMotif />
        ) : (
          <MovementsMotif />
        )}
      </div>
      {!project.cover ? (
        <figcaption className="sr-only">Composición ilustrativa de la interfaz de {project.name}, con datos de ejemplo.</figcaption>
      ) : null}
    </figure>
    </ViewTransition>
  );
}

/* ── Composiciones ilustrativas (datos de ejemplo, sin personas reales) ── */

const tone = ["bg-aura", "bg-electric", "bg-fg/25"] as const;

function LedgerMotif() {
  const rows = [
    { name: "Docente 01", rbd: "2 RBD", parts: [46, 22, 32], hours: "44 h" },
    { name: "Docente 02", rbd: "1 RBD", parts: [60, 0, 40], hours: "38 h" },
    { name: "Docente 03", rbd: "3 RBD", parts: [30, 35, 35], hours: "44 h" },
    { name: "Docente 04", rbd: "1 RBD", parts: [52, 18, 30], hours: "30 h" },
    { name: "Docente 05", rbd: "2 RBD", parts: [38, 27, 35], hours: "42 h" },
  ];
  return (
    <div aria-hidden className="absolute inset-0 flex flex-col gap-4 p-5 sm:p-7">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-[10px] tracking-wider text-fg-subtle uppercase">BRP · lote anual</p>
          <p className="font-display text-base font-medium sm:text-lg">Distribución por subvención</p>
        </div>
        <div className="hidden gap-3 font-mono text-[10px] text-fg-muted sm:flex">
          {["SEP", "PIE", "Normal"].map((label, index) => (
            <span key={label} className="flex items-center gap-1.5">
              <span className={cn("size-2 rounded-sm", tone[index])} />
              {label}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-evenly gap-2 rounded-xl border border-line bg-bg-elevated p-3 sm:p-4">
        {rows.map((row) => (
          <div key={row.name} className="grid grid-cols-[5.5rem_1fr_2.75rem] items-center gap-3 sm:grid-cols-[7rem_3.5rem_1fr_3rem]">
            <span className="truncate text-[11px] text-fg-muted sm:text-xs">{row.name}</span>
            <span className="hidden rounded-full border border-line px-1.5 py-px text-center font-mono text-[9.5px] text-fg-subtle sm:block">
              {row.rbd}
            </span>
            <span className="flex h-2.5 overflow-hidden rounded-full bg-fg/[0.06]">
              {row.parts.map((part, index) => (
                <span key={index} className={cn("h-full", tone[index])} style={{ width: `${part}%` }} />
              ))}
            </span>
            <span className="text-right font-mono text-[10.5px] text-fg-muted tabular-nums">{row.hours}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between font-mono text-[10px] text-fg-subtle">
        <span>Tope legal 44 h · validado</span>
        <span className="text-accent">Informe .docx listo</span>
      </div>
    </div>
  );
}

function MovementsMotif() {
  const rows = [
    { time: "08:12", code: "OSC-014", kind: "Salida", qty: "−1", balance: "3" },
    { time: "08:40", code: "MUL-102", kind: "Entrada", qty: "+6", balance: "18" },
    { time: "09:05", code: "CAU-007", kind: "Salida", qty: "−2", balance: "0" },
    { time: "09:06", code: "CAU-007", kind: "Bloqueado", qty: "−1", balance: "0" },
    { time: "10:31", code: "SOL-220", kind: "Devolución", qty: "+1", balance: "9" },
  ];
  return (
    <div aria-hidden className="absolute inset-0 flex flex-col gap-4 p-5 sm:p-7">
      <div>
        <p className="font-mono text-[10px] tracking-wider text-fg-subtle uppercase">Pañol · solo inserción</p>
        <p className="font-display text-base font-medium sm:text-lg">Libro de movimientos</p>
      </div>
      <div className="flex-1 overflow-hidden rounded-xl border border-line bg-bg-elevated font-mono text-[10.5px] sm:text-[11px]">
        <div className="grid grid-cols-[3rem_1fr_5.5rem_2.5rem_2.5rem] gap-2 border-b border-line px-3 py-2 text-fg-subtle sm:px-4">
          <span>Hora</span>
          <span>Código</span>
          <span>Tipo</span>
          <span className="text-right">Cant.</span>
          <span className="text-right">Saldo</span>
        </div>
        {rows.map((row, index) => (
          <div
            key={index}
            className={cn(
              "grid grid-cols-[3rem_1fr_5.5rem_2.5rem_2.5rem] gap-2 border-b border-line px-3 py-2 last:border-0 sm:px-4",
              row.kind === "Bloqueado" ? "bg-accent-soft text-fg" : "text-fg-muted",
            )}
          >
            <span>{row.time}</span>
            <span>{row.code}</span>
            <span className={row.kind === "Bloqueado" ? "text-accent" : undefined}>{row.kind}</span>
            <span className="text-right tabular-nums">{row.qty}</span>
            <span className="text-right tabular-nums">{row.balance}</span>
          </div>
        ))}
      </div>
      <p className="font-mono text-[10px] text-fg-subtle">SELECT … FOR UPDATE · el saldo nunca queda en negativo</p>
    </div>
  );
}

function ColdChainMotif() {
  const trucks = Array.from({ length: 50 }, (_, index) => {
    const warn = index === 13 || index === 37;
    return warn ? "bg-amber-400" : index % 7 === 0 ? "bg-electric" : "bg-aura";
  });
  return (
    <div aria-hidden className="absolute inset-0 flex flex-col gap-4 p-5 sm:p-7">
      <div className="flex items-end justify-between">
        <div>
          <p className="font-mono text-[10px] tracking-wider text-fg-subtle uppercase">Flota refrigerada · en vivo</p>
          <p className="font-display text-base font-medium sm:text-lg">Temperatura de carga</p>
        </div>
        <p className="font-display text-2xl font-medium tracking-tight tabular-nums sm:text-3xl">−18,2 °C</p>
      </div>
      <div className="grid flex-1 grid-cols-[1fr] gap-3 sm:grid-cols-[1.1fr_1fr]">
        <div className="grid grid-cols-10 content-center gap-1.5 rounded-xl border border-line bg-bg-elevated p-3">
          {trucks.map((color, index) => (
            <span key={index} className={cn("aspect-square rounded-[3px] opacity-80", color)} />
          ))}
        </div>
        <div className="hidden rounded-xl border border-line bg-bg-elevated p-3 sm:block">
          <svg viewBox="0 0 200 100" className="h-full w-full" preserveAspectRatio="none">
            <path
              d="M0 62 C 20 58, 30 66, 50 60 S 80 52, 100 58 S 130 70, 150 55 S 180 48, 200 52"
              fill="none"
              stroke="var(--electric-blue)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
            <path d="M0 30 H200" stroke="var(--line-strong)" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
      </div>
      <p className="font-mono text-[10px] text-fg-subtle">50 camiones simulados · 2 alertas de umbral</p>
    </div>
  );
}
