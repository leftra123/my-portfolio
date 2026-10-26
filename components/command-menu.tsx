"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const loadPalette = () => import("@/components/command-palette");
const CommandPalette = dynamic(loadPalette, { ssr: false });

/** Escucha ⌘K / Ctrl K, "/" y el evento "command-menu:open"; la paleta se descarga recién cuando hace falta. */
export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    const show = () => {
      setRequested(true);
      setOpen(true);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setRequested(true);
        setOpen((value) => !value);
        return;
      }
      // "/" también abre la paleta, salvo que se esté escribiendo en un campo.
      const target = event.target;
      const typing = target instanceof Element && target.closest("input, textarea, select, [contenteditable='true']");
      if (event.key === "/" && !typing && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault();
        show();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("command-menu:open", show);

    // Precarga en tiempo ocioso: fuera del camino crítico, pero lista antes del primer ⌘K.
    const idle = window.requestIdleCallback?.(() => void loadPalette(), { timeout: 4000 });

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("command-menu:open", show);
      if (idle) window.cancelIdleCallback?.(idle);
    };
  }, []);

  return requested ? <CommandPalette open={open} onOpenChange={setOpen} /> : null;
}
