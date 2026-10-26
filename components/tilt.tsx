"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Expone la posición del puntero como ángulos (--rx / --ry) y brillo (--gx / --gy) para que los
 * elementos .tilt-target de adentro se inclinen en 3D. Solo con mouse; el CSS lo apaga con menos movimiento.
 */
export function Tilt({ className, children, ...props }: ComponentPropsWithoutRef<"div">) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  const set = (rx: number, ry: number, gx: number, gy: number) => {
    const node = ref.current;
    if (!node) return;
    node.style.setProperty("--rx", `${rx}deg`);
    node.style.setProperty("--ry", `${ry}deg`);
    node.style.setProperty("--gx", `${gx}%`);
    node.style.setProperty("--gy", `${gy}%`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse" || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        cancelAnimationFrame(frame.current);
        frame.current = requestAnimationFrame(() => set((0.5 - y) * 7, (x - 0.5) * 9, x * 100, y * 100));
      }}
      onPointerLeave={() => {
        cancelAnimationFrame(frame.current);
        set(0, 0, 50, 50);
      }}
      className={cn("tilt", className)}
      {...props}
    >
      {children}
    </div>
  );
}
