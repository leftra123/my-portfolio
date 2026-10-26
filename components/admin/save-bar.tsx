"use client";

import { Check, CircleAlert, LoaderCircle } from "lucide-react";
import type { WriteResult } from "@/lib/admin/store";
import { cn } from "@/lib/utils";

export type SaveStatus = { kind: "idle" } | { kind: "saving" } | { kind: "saved"; at: Date } | { kind: "error"; message: string };

export function issuesToErrors(result: WriteResult) {
  if (result.ok || !result.issues) return {};
  return Object.fromEntries(result.issues.map((issue) => [issue.path, issue.message]));
}

/** Barra de guardado fija al pie del formulario: estado claro y un solo botón primario. */
export function SaveBar({
  status,
  dirty,
  onSave,
  readOnly,
  extra,
}: {
  status: SaveStatus;
  dirty: boolean;
  onSave: () => void;
  readOnly?: boolean;
  extra?: React.ReactNode;
}) {
  return (
    <div className="sticky bottom-4 z-20 mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line-strong bg-bg-elevated/90 px-4 py-3 shadow-xl backdrop-blur-xl">
      <p className="flex items-center gap-2 text-sm" role="status" aria-live="polite">
        {readOnly ? (
          <span className="text-fg-subtle">Solo lectura en producción: edita en local.</span>
        ) : status.kind === "saving" ? (
          <>
            <LoaderCircle className="size-4 animate-spin text-fg-subtle" /> Guardando…
          </>
        ) : status.kind === "error" ? (
          <>
            <CircleAlert className="size-4 text-rose-400" /> <span className="text-rose-300">{status.message}</span>
          </>
        ) : status.kind === "saved" && !dirty ? (
          <>
            <Check className="size-4 text-emerald-400" /> Guardado. El sitio ya se actualizó.
          </>
        ) : dirty ? (
          <span className="text-fg-muted">Cambios sin guardar</span>
        ) : (
          <span className="text-fg-subtle">Sin cambios</span>
        )}
      </p>
      <div className="flex items-center gap-2">
        {extra}
        <button
          type="button"
          onClick={onSave}
          disabled={readOnly || !dirty || status.kind === "saving"}
          className={cn(
            "inline-flex h-9 items-center gap-2 rounded-full bg-btn px-5 text-sm font-medium text-btn-fg transition-opacity",
            "disabled:cursor-not-allowed disabled:opacity-40",
          )}
        >
          Guardar
          <kbd className="hidden rounded bg-btn-fg/10 px-1.5 font-mono text-[10px] sm:inline">⌘S</kbd>
        </button>
      </div>
    </div>
  );
}
