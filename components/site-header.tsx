"use client";

import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { nav, site } from "@/lib/data";
import { cn } from "@/lib/utils";

export function openCommandMenu() {
  window.dispatchEvent(new CustomEvent("command-menu:open"));
}

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    setIsMac(/mac|iphone|ipad/i.test(navigator.userAgent));
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Sección activa: la que cruza la franja central de la pantalla.
  useEffect(() => {
    if (!isHome) {
      setActive(null);
      return;
    }
    // Se observan todas las secciones (no solo las del menú) para apagar el resaltado fuera de ellas.
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  const hrefFor = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4 print:hidden">
      {/* Fondo sólido que se desvanece: al bajar, el contenido no se lee detrás de la cabecera. */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-bg via-bg/90 to-transparent transition-opacity duration-500",
          scrolled || open ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        className={cn(
          "mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 rounded-full border pr-1.5 pl-4 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-out-quart",
          scrolled || open
            ? "border-line bg-bg-elevated/95 shadow-[0_10px_40px_-18px_rgb(0_0_0/0.45)] backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent",
        )}
      >
        <Link href="/" className="group flex items-center rounded-full py-1" aria-label={`${site.company}, inicio`}>
          {/* Logotipo oficial (las letras de AURA están dibujadas a mano). */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/aura-tech-horizontal-color-oscuro.svg"
            alt=""
            width={1000}
            height={240}
            className="h-7 w-auto transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 dark:hidden"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/aura-tech-horizontal-color-claro.svg"
            alt=""
            width={1000}
            height={240}
            className="hidden h-7 w-auto transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 dark:block"
          />
        </Link>

        <nav aria-label="Secciones" className="hidden md:block">
          <ul className="flex items-center gap-0.5">
            {nav.map((item) => (
              <li key={item.id}>
                <Link
                  href={hrefFor(item.id)}
                  aria-current={active === item.id ? "true" : undefined}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-sm transition-colors duration-300",
                    active === item.id ? "bg-fg/[0.07] text-fg" : "text-fg-muted hover:text-fg",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={openCommandMenu}
            className="hidden h-9 items-center gap-2 rounded-full border border-line pr-1.5 pl-3 text-sm text-fg-muted transition-colors hover:border-line-strong hover:text-fg sm:flex"
            aria-label="Abrir buscador de comandos"
            data-track="ui:buscador"
          >
            <Search className="size-3.5" />
            <span>Buscar</span>
            <kbd className="rounded-full bg-fg/[0.07] px-2 py-0.5 font-mono text-[11px] tracking-wide">
              {isMac ? "⌘K" : "Ctrl K"}
            </kbd>
          </button>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid size-9 place-items-center rounded-full text-fg-muted transition-colors hover:bg-accent-soft hover:text-fg md:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {open ? <X className="size-[18px]" /> : <Menu className="size-[18px]" />}
          </button>
        </div>
      </div>

      <div
        id="menu-movil"
        hidden={!open}
        className="mx-auto mt-2 max-w-6xl rounded-3xl border border-line bg-bg-elevated/95 p-2 shadow-2xl backdrop-blur-xl md:hidden"
      >
        <ul className="grid">
          {nav.map((item, index) => (
            <li key={item.id}>
              <Link
                href={hrefFor(item.id)}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between rounded-2xl px-4 py-3.5 font-display text-xl tracking-tight transition-colors hover:bg-fg/[0.05]"
              >
                {item.label}
                <span className="font-mono text-xs text-fg-subtle">0{index + 1}</span>
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            openCommandMenu();
          }}
          className="mt-1 flex w-full items-center gap-2 rounded-2xl px-4 py-3.5 text-left text-sm text-fg-muted transition-colors hover:bg-fg/[0.05] hover:text-fg"
        >
          <Search className="size-4" /> Buscar proyectos y acciones
        </button>
      </div>
    </header>
  );
}
