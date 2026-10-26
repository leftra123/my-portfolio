import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Isotipo3D } from "@/components/brand/isotipo-3d";

export const metadata: Metadata = { title: "Página no encontrada" };

export default function NotFound() {
  return (
    <main id="contenido" className="relative isolate grid min-h-svh place-items-center overflow-hidden px-5 pt-28 pb-24 text-center">
      {/* Un horizonte que avanza hacia ninguna parte: CSS 3D, sin imágenes. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="floor" />
        <div className="aura-halo absolute top-1/4 left-1/2 size-[560px] -translate-x-1/2 opacity-70" />
      </div>
      <div>
        <div className="enter mx-auto w-24">
          <Isotipo3D />
        </div>
        <p className="enter mt-10 font-mono text-xs tracking-wider text-fg-subtle uppercase" style={{ "--i": 1 } as React.CSSProperties}>
          Error 404
        </p>
        <h1 className="enter mt-4 text-headline font-medium" style={{ "--i": 2 } as React.CSSProperties}>
          Esta página no está <span className="text-fg-muted">en el inventario.</span>
        </h1>
        <p className="enter mx-auto mt-5 max-w-md text-fg-muted" style={{ "--i": 3 } as React.CSSProperties}>
          Puede que el enlace haya cambiado. Prueba con el buscador (⌘K) o vuelve al inicio.
        </p>
        <Link
          href="/"
          className="enter group mt-10 inline-flex h-12 items-center gap-2 rounded-full bg-btn px-6 text-sm font-medium text-btn-fg"
          style={{ "--i": 4 } as React.CSSProperties}
        >
          <ArrowLeft className="size-4 transition-transform duration-300 ease-out-expo group-hover:-translate-x-0.5" />
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
