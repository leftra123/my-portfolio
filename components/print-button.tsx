"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      data-track="cv:imprimir"
      className="inline-flex h-10 items-center gap-2 rounded-full bg-btn px-5 text-sm font-medium text-btn-fg transition-transform duration-300 ease-out-expo hover:-translate-y-0.5"
    >
      <Printer className="size-4" />
      Imprimir o guardar PDF
    </button>
  );
}
