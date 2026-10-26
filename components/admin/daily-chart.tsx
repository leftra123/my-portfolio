"use client";

import { useState } from "react";
import type { DayPoint } from "@/lib/analytics/summary";

const dateLabel = new Intl.DateTimeFormat("es-CL", { day: "numeric", month: "short", timeZone: "UTC" });
const fmt = (date: string) => dateLabel.format(new Date(`${date}T12:00:00Z`));

/**
 * Visitas por día: una sola serie (sin leyenda; el título la nombra), barras finas ancladas a la base,
 * 2px de separación, grilla tenue y tooltip por barra con visitas y clics. Incluye vista de tabla.
 */
export function DailyChart({ data }: { data: DayPoint[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(4, ...data.map((point) => point.views));
  const nice = Math.ceil(max / 4) * 4;
  const ticks = [0, nice / 2, nice];
  const W = 720;
  const H = 180;
  const left = 28;
  const plotW = W - left;
  const step = plotW / data.length;
  const barW = Math.max(2, step - 2);
  const TOP = 10;
  const y = (value: number) => TOP + (H - TOP) - (value / nice) * (H - TOP);
  const active = hover !== null ? data[hover] : null;

  return (
    <figure>
      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H + 22}`} className="h-auto w-full" role="img" aria-label="Visitas por día">
          {ticks.map((tick) => (
            <g key={tick}>
              <line x1={left} x2={W} y1={y(tick)} y2={y(tick)} stroke="var(--line)" strokeWidth="1" />
              <text x={left - 8} y={y(tick) + 3} textAnchor="end" className="fill-[var(--fg-subtle)] font-mono text-[10px]">
                {tick}
              </text>
            </g>
          ))}
          {data.map((point, index) => {
            const x = left + index * step + 1;
            const height = H - y(point.views);
            const radius = Math.min(4, barW / 2, height);
            return (
              <g key={point.date}>
                {height > 0 ? (
                  <path
                    d={`M${x},${H} V${H - height + radius} Q${x},${H - height} ${x + radius},${H - height} H${x + barW - radius} Q${x + barW},${H - height} ${x + barW},${H - height + radius} V${H} Z`}
                    fill="var(--aura-blue)"
                    opacity={hover === null || hover === index ? 1 : 0.45}
                  />
                ) : null}
                {/* Zona de hover más grande que la barra */}
                <rect
                  x={left + index * step}
                  y={0}
                  width={step}
                  height={H}
                  fill="transparent"
                  onPointerEnter={() => setHover(index)}
                  onPointerLeave={() => setHover(null)}
                />
              </g>
            );
          })}
          {[0, Math.floor(data.length / 2), data.length - 1].map((index) =>
            data[index] ? (
              <text
                key={index}
                x={left + index * step + step / 2}
                y={H + 16}
                textAnchor={index === 0 ? "start" : index === data.length - 1 ? "end" : "middle"}
                className="fill-[var(--fg-subtle)] font-mono text-[10px]"
              >
                {fmt(data[index].date)}
              </text>
            ) : null,
          )}
        </svg>
        {active && hover !== null ? (
          <div
            className="pointer-events-none absolute top-0 z-10 -translate-x-1/2 rounded-xl border border-line-strong bg-bg-elevated px-3 py-2 text-xs shadow-xl"
            style={{ left: `${((left + hover * step + step / 2) / W) * 100}%` }}
          >
            <p className="font-mono text-fg-subtle">{fmt(active.date)}</p>
            <p className="mt-1 text-fg">
              <span className="tabular-nums">{active.views}</span> visitas
            </p>
            <p className="text-fg-muted">
              <span className="tabular-nums">{active.clicks}</span> clics
            </p>
          </div>
        ) : null}
      </div>
      <details className="mt-3 text-xs text-fg-subtle">
        <summary className="cursor-pointer hover:text-fg">Ver como tabla</summary>
        <table className="mt-2 w-full text-left">
          <thead>
            <tr className="border-b border-line">
              <th className="py-1 font-normal">Día</th>
              <th className="py-1 text-right font-normal">Visitas</th>
              <th className="py-1 text-right font-normal">Clics</th>
            </tr>
          </thead>
          <tbody>
            {data.map((point) => (
              <tr key={point.date} className="border-b border-line/60">
                <td className="py-1">{fmt(point.date)}</td>
                <td className="py-1 text-right tabular-nums text-fg-muted">{point.views}</td>
                <td className="py-1 text-right tabular-nums text-fg-muted">{point.clicks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}
