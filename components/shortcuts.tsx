"use client";

import { X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { shortcuts, type Shortcut } from "@/lib/shortcuts";
import { track } from "@/lib/track";

const SEQUENCE_MS = 1200;

/**
 * Atajos de teclado al estilo de las apps de escritorio: "?" muestra la ayuda,
 * "G" + letra navega y "T" cambia el tema. Nunca actúa mientras se escribe en un campo.
 */
export function Shortcuts({ sections }: { sections: string[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    let timer = 0;
    let waiting = false;

    const go = (shortcut: Shortcut) => {
      track(`atajo:${shortcut.keys.join("").toLowerCase()}`);
      if (shortcut.href) router.push(shortcut.href);
      if (shortcut.section) {
        if (!sections.includes(shortcut.section)) return;
        if (pathname === "/") {
          document.getElementById(shortcut.section)?.scrollIntoView({ behavior: "smooth", block: "start" });
          history.replaceState(null, "", `#${shortcut.section}`);
        } else {
          router.push(`/#${shortcut.section}`);
        }
      }
    };

    const onKey = (event: KeyboardEvent) => {
      const target = event.target;
      if (target instanceof Element && target.closest("input, textarea, select, dialog, [contenteditable='true'], [cmdk-root]")) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const key = event.key.toLowerCase();

      if (waiting) {
        waiting = false;
        setPending(false);
        window.clearTimeout(timer);
        const match = shortcuts.find((item) => item.keys.length === 2 && item.keys[0] === "G" && item.keys[1]?.toLowerCase() === key);
        if (match) {
          event.preventDefault();
          go(match);
        }
        return;
      }

      if (event.key === "?") {
        event.preventDefault();
        track("atajo:ayuda");
        dialog.current?.showModal();
      } else if (key === "g") {
        waiting = true;
        setPending(true);
        timer = window.setTimeout(() => {
          waiting = false;
          setPending(false);
        }, SEQUENCE_MS);
      } else if (key === "t") {
        track("atajo:tema");
        setTheme(resolvedTheme === "light" ? "dark" : "light");
      }
    };

    const open = () => dialog.current?.showModal();
    window.addEventListener("keydown", onKey);
    window.addEventListener("atajos:abrir", open);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("atajos:abrir", open);
      window.clearTimeout(timer);
    };
  }, [pathname, resolvedTheme, router, sections, setTheme]);

  return (
    <>
      <dialog
        ref={dialog}
        aria-labelledby="atajos-titulo"
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        className="m-auto w-[min(480px,calc(100vw-2rem))] rounded-3xl border border-line-strong bg-bg-elevated p-0 text-fg shadow-[inset_0_1px_0_var(--highlight),0_30px_120px_-30px_rgb(0_0_0/0.65)] backdrop:bg-ink/50 backdrop:backdrop-blur-[2px] open:animate-[pop_260ms_cubic-bezier(0.16,1,0.3,1)]"
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h2 id="atajos-titulo" className="font-display text-lg font-semibold tracking-tight">
            Atajos de teclado
          </h2>
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            aria-label="Cerrar"
            className="grid size-8 place-items-center rounded-full text-fg-subtle hover:bg-fg/[0.06] hover:text-fg"
          >
            <X className="size-4" />
          </button>
        </div>
        <ShortcutList className="px-6 py-3" />
        <p className="border-t border-line px-6 py-3 font-mono text-[11px] text-fg-subtle">Funcionan en todo el sitio, salvo mientras escribes en un campo.</p>
      </dialog>

      <div
        aria-hidden
        className={`pointer-events-none fixed bottom-6 left-1/2 z-[95] -translate-x-1/2 rounded-full border border-line-strong bg-bg-elevated px-3 py-1.5 font-mono text-xs text-fg-muted shadow-xl transition-all duration-300 ${
          pending ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        <Kbd>G</Kbd> <span className="ml-1">y luego…</span>
      </div>
    </>
  );
}

export function ShortcutList({ className }: { className?: string }) {
  return (
    <dl className={`divide-y divide-line ${className ?? ""}`}>
      {shortcuts.map((shortcut) => (
        <div key={shortcut.keys.join("+") + shortcut.label} className="flex items-center justify-between gap-6 py-2.5 text-sm">
          <dt className="text-fg-muted">{shortcut.label}</dt>
          <dd className="flex shrink-0 items-center gap-1">
            {shortcut.keys.map((key, index) => (
              <span key={key + index} className="flex items-center gap-1">
                {index > 0 && shortcut.keys[0] === "G" ? <span className="font-mono text-[10px] text-fg-subtle">luego</span> : null}
                <Kbd>{key}</Kbd>
              </span>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-grid min-w-6 place-items-center rounded-md border border-line-strong bg-bg px-1.5 py-0.5 font-mono text-[11px] text-fg shadow-[inset_0_-1px_0_var(--line-strong)]">
      {children}
    </kbd>
  );
}
