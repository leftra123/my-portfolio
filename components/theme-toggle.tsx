"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import type { MouseEvent } from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  // El tema nuevo se revela como un círculo que crece desde el botón (View Transitions).
  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    const next = isDark ? "light" : "dark";
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) {
      setTheme(next);
      return;
    }
    const x = event.clientX || window.innerWidth - 40;
    const y = event.clientY || 40;
    root.style.setProperty("--vt-x", `${x}px`);
    root.style.setProperty("--vt-y", `${y}px`);
    root.style.setProperty(
      "--vt-r",
      `${Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))}px`,
    );
    // La clase limita la animación en círculo a este cambio; al navegar se usa otra.
    root.classList.add("theme-vt");
    const transition = document.startViewTransition(() => {
      root.classList.toggle("dark", next === "dark");
      root.style.colorScheme = next;
      setTheme(next);
    });
    transition.finished.finally(() => root.classList.remove("theme-vt"));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "relative grid size-9 place-items-center rounded-full text-fg-muted transition-colors hover:bg-accent-soft hover:text-fg",
        className,
      )}
      aria-label="Cambiar entre tema claro y oscuro"
      data-track="ui:tema"
      title="Cambiar tema"
    >
      <Sun className="size-[17px] scale-100 rotate-0 transition-transform duration-500 ease-out-expo dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute size-[17px] scale-0 rotate-90 transition-transform duration-500 ease-out-expo dark:scale-100 dark:rotate-0" />
    </button>
  );
}
