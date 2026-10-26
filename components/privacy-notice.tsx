"use client";

import { Cookie, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const KEY = "aviso-privacidad-v1";

/**
 * Aviso discreto: el sitio no usa cookies. No bloquea la navegación ni pide consentimiento,
 * porque no hay nada que consentir; solo informa. Al cerrarlo se recuerda en este navegador.
 */
export function PrivacyNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = window.localStorage.getItem(KEY) === "1";
    } catch {
      // sin almacenamiento disponible: se muestra igual
    }
    if (seen) return;
    const id = window.setTimeout(() => setVisible(true), 1400);
    return () => window.clearTimeout(id);
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      window.localStorage.setItem(KEY, "1");
    } catch {
      // nada que hacer
    }
  };

  if (!visible) return null;

  return (
    <aside
      aria-label="Aviso de privacidad"
      className="lit fixed bottom-4 left-4 z-[65] w-[min(360px,calc(100vw-2rem))] animate-[pop_420ms_var(--ease-out-expo)] rounded-2xl border border-line-strong bg-bg-elevated/95 p-4 shadow-2xl backdrop-blur-xl print:hidden"
    >
      <div className="flex items-start gap-3">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
          <Cookie className="size-4" aria-hidden />
        </span>
        <div className="text-sm">
          <p className="font-medium text-fg">Este sitio no usa cookies.</p>
          <p className="mt-1 leading-relaxed text-fg-muted">
            Contamos visitas y clics de forma anónima, sin datos personales ni servicios de terceros.
          </p>
          <div className="mt-3 flex items-center gap-4">
            <button
              type="button"
              onClick={dismiss}
              data-track="aviso:entendido"
              className="rounded-full bg-btn px-3.5 py-1.5 text-xs font-medium text-btn-fg"
            >
              Entendido
            </button>
            <Link href="/privacidad" onClick={dismiss} className="link-underline text-xs text-fg-muted hover:text-fg">
              Cómo funciona
            </Link>
          </div>
        </div>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Cerrar aviso"
          className="-mt-1 -mr-1 grid size-7 shrink-0 place-items-center rounded-full text-fg-subtle hover:bg-fg/[0.06] hover:text-fg"
        >
          <X className="size-3.5" />
        </button>
      </div>
    </aside>
  );
}
