"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

/** Contenedor que expone la posición del cursor como --mx / --my para el foco de luz. */
export function Spotlight({ className, children, ...props }: ComponentPropsWithoutRef<"div">) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      onPointerMove={(event) => {
        const node = ref.current;
        if (!node || event.pointerType !== "mouse") return;
        const rect = node.getBoundingClientRect();
        node.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        node.style.setProperty("--my", `${event.clientY - rect.top}px`);
      }}
      className={cn("spotlight relative", className)}
      {...props}
    >
      {children}
    </div>
  );
}
