"use client";

import { useEffect, useState } from "react";

/*
 * Mide esta visita con la API Performance del navegador. Nada sale de tu equipo:
 * solo se muestra. Incluye lo transferido por la red (comprimido); lo que vino de caché pesa 0.
 */

type Metrics = {
  /** Hasta el evento load, en ms. */
  load: number;
  /** Largest Contentful Paint, en ms (si el navegador lo informa). */
  lcp?: number;
  /** Cumulative Layout Shift. */
  cls?: number;
  kb: number;
  jsKb: number;
  requests: number;
};

function usePageMetrics() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    let lcp: number | undefined;
    let cls: number | undefined;
    const observers: PerformanceObserver[] = [];
    const observe = (type: string, onEntries: (entries: PerformanceEntryList) => void) => {
      if (!PerformanceObserver.supportedEntryTypes?.includes(type)) return;
      const observer = new PerformanceObserver((list) => onEntries(list.getEntries()));
      observer.observe({ type, buffered: true });
      observers.push(observer);
    };
    observe("largest-contentful-paint", (entries) => {
      lcp = entries.at(-1)?.startTime;
    });
    observe("layout-shift", (entries) => {
      for (const entry of entries as (PerformanceEntry & { value: number; hadRecentInput: boolean })[]) {
        if (!entry.hadRecentInput) cls = (cls ?? 0) + entry.value;
      }
    });

    const read = () => {
      const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      if (!nav) return;
      const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
      const bytes = nav.transferSize + resources.reduce((sum, entry) => sum + (entry.transferSize || 0), 0);
      const js = resources.filter((entry) => entry.initiatorType === "script").reduce((sum, entry) => sum + (entry.transferSize || 0), 0);
      setMetrics({
        load: (nav.loadEventEnd || nav.domContentLoadedEventEnd) - nav.startTime,
        lcp,
        cls,
        kb: bytes / 1024,
        jsKb: js / 1024,
        requests: resources.length + 1,
      });
    };

    // Se lee un poco después del load, cuando ya terminó de pintar lo principal.
    let timer = 0;
    const schedule = () => {
      timer = window.setTimeout(read, 600);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", schedule);
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return metrics;
}

const seconds = (ms: number) => `${new Intl.NumberFormat("es-CL", { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(ms / 1000)} s`;
const kilobytes = (kb: number) => (kb < 1 ? "desde caché" : `${new Intl.NumberFormat("es-CL", { maximumFractionDigits: 0 }).format(kb)} KB`);

/** Versión corta para el pie: "Esta visita: 0,41 s · 186 KB". */
export function PageMetricsInline() {
  const metrics = usePageMetrics();
  if (!metrics) return <span className="opacity-0">Midiendo esta visita…</span>;
  return (
    <span title="Medido en tu navegador con la API Performance; no se envía a ningún lado.">
      Esta visita: {seconds(metrics.lcp ?? metrics.load)} · {kilobytes(metrics.kb)}
    </span>
  );
}

/** Versión completa para /como-esta-hecho. */
export function PageMetricsPanel() {
  const metrics = usePageMetrics();
  const tiles = [
    { label: "Contenido principal visible", hint: "LCP", value: metrics?.lcp !== undefined ? seconds(metrics.lcp) : metrics ? "no disponible" : "…" },
    { label: "Carga completa", hint: "load", value: metrics ? seconds(metrics.load) : "…" },
    {
      label: "Saltos de diseño",
      hint: "CLS",
      value: metrics?.cls !== undefined ? new Intl.NumberFormat("es-CL", { maximumFractionDigits: 3 }).format(metrics.cls) : metrics ? "0" : "…",
    },
    { label: "Transferido por la red", hint: "comprimido", value: metrics ? kilobytes(metrics.kb) : "…" },
    { label: "JavaScript transferido", hint: "scripts", value: metrics ? kilobytes(metrics.jsKb) : "…" },
    { label: "Solicitudes", hint: "HTML, CSS, JS, fuentes, imágenes", value: metrics ? String(metrics.requests) : "…" },
  ];

  return (
    <div aria-live="polite">
      <ul className="grid gap-px overflow-hidden rounded-[28px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((tile) => (
          <li key={tile.label} className="bg-bg p-6">
            <p className="font-display text-[clamp(1.75rem,1.4rem+1.2vw,2.5rem)] leading-none font-medium tracking-[-0.04em] tabular-nums">{tile.value}</p>
            <p className="mt-3 text-sm text-fg">{tile.label}</p>
            <p className="mt-0.5 font-mono text-[11px] text-fg-subtle">{tile.hint}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
