"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type CopyButtonProps = {
  value: string;
  label?: string;
  className?: string;
  /** Nombre del evento en la medición anónima. */
  trackAs?: string;
};

export function CopyButton({ value, label = "Copiar", className, trackAs = "contacto:copiar-correo" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(id);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
        } catch {
          if (value.includes("@")) window.location.href = `mailto:${value}`;
        }
      }}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-2 font-mono text-xs text-fg-muted transition-colors hover:border-line-strong hover:text-fg",
        className,
      )}
      aria-live="polite"
      data-track={trackAs}
    >
      <span className="relative grid size-3.5 place-items-center">
        <Copy
          className={cn(
            "absolute size-3.5 transition-all duration-300 ease-out-expo",
            copied && "scale-50 opacity-0",
          )}
        />
        <Check
          className={cn(
            "absolute size-3.5 text-accent transition-all duration-300 ease-out-expo",
            !copied && "scale-50 opacity-0",
          )}
        />
      </span>
      {copied ? "Copiado" : label}
    </button>
  );
}
