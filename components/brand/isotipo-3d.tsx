"use client";

import { useEffect, useRef } from "react";
import { Isotipo } from "@/components/brand/isotipo";
import { cn } from "@/lib/utils";

const LAYERS = 14;

/**
 * El isotipo con volumen: copias apiladas en Z (CSS 3D, sin WebGL) que giran apenas siguiendo
 * al puntero. Decorativo. Con pantalla táctil o "menos movimiento" queda quieto en un ángulo fijo.
 */
export function Isotipo3D({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!node || !fine || reduce) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;
        node.style.setProperty("--ry", `${x * 34}deg`);
        node.style.setProperty("--rx", `${-y * 22}deg`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className={cn("logo-3d", className)}>
      <div className="logo-3d-sway">
        <div className="logo-3d-body">
          {Array.from({ length: LAYERS }, (_, layer) => (
            <Isotipo
              key={layer}
              variant={layer === LAYERS - 1 ? "color" : "mono"}
              className="logo-3d-layer"
              style={{ "--l": layer, "--n": LAYERS } as React.CSSProperties}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
