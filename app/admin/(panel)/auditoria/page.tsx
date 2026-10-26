import { Download } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { BarList } from "@/components/admin/bar-list";
import { DailyChart } from "@/components/admin/daily-chart";
import { PageHeader } from "@/components/admin/page-header";
import { Card, formatTime, Kpi, percent } from "@/components/admin/ui";
import { readChanges } from "@/lib/admin/store";
import { analyticsWritable, readEvents } from "@/lib/analytics/store";
import { describeKey, summarize } from "@/lib/analytics/summary";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Auditoría" };

const RANGES = [7, 30, 90] as const;

export default async function AuditPage({ searchParams }: { searchParams: Promise<{ dias?: string }> }) {
  const { dias } = await searchParams;
  const days = RANGES.find((range) => String(range) === dias) ?? 30;
  const [events, changes] = await Promise.all([readEvents(days), readChanges(100)]);
  const summary = summarize(events, days);

  return (
    <>
      <PageHeader
        eyebrow="Auditoría"
        title="Visitas, clics y cambios"
        description="Medición anónima y sin cookies: página, clic, origen y tipo de pantalla. Tus propias visitas con sesión iniciada no se cuentan."
        actions={
          <>
            <div role="group" aria-label="Periodo" className="flex rounded-full border border-line p-0.5">
              {RANGES.map((range) => (
                <Link
                  key={range}
                  href={`/admin/auditoria?dias=${range}`}
                  aria-current={range === days ? "true" : undefined}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs transition-colors",
                    range === days ? "bg-fg/[0.08] text-fg" : "text-fg-muted hover:text-fg",
                  )}
                >
                  {range} días
                </Link>
              ))}
            </div>
            <a
              href={`/admin/auditoria/exportar?dias=${days}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-fg-muted hover:text-fg"
            >
              <Download className="size-3.5" /> CSV
            </a>
          </>
        }
      />

      {!analyticsWritable() ? (
        <p className="mb-4 rounded-xl border border-amber-400/30 bg-amber-400/10 p-3 text-sm text-amber-200">
          En producción los eventos aún no se guardan: falta conectar un almacenamiento remoto. En local funciona completo.
        </p>
      ) : null}

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label={`Visitas · ${days} días`} value={String(summary.views)} />
        <Kpi label="Clics" value={String(summary.clicks)} />
        <Kpi label="Tasa de contacto" value={percent(summary.contactRate)} hint={`${summary.contact} contactos`} />
        <Kpi label="Desde el celular" value={percent(summary.mobileShare)} hint="Del total de visitas" />
      </div>

      <Card title="Visitas por día" className="mt-3">
        <DailyChart data={summary.series} />
      </Card>

      <div className="mt-3 grid gap-3 lg:grid-cols-3">
        <Card title="Páginas más vistas">
          <BarList empty="Sin visitas en este periodo." items={summary.topPages.map((page) => ({ key: page.key, label: page.key, count: page.count }))} />
        </Card>
        <Card title="Clics">
          <BarList
            empty="Sin clics en este periodo."
            items={summary.topClicks.map((click) => {
              const described = describeKey(click.key);
              return { key: click.key, label: described.label, hint: described.group, count: click.count };
            })}
          />
        </Card>
        <Card title="De dónde llegan">
          <BarList empty="Sin orígenes externos todavía." items={summary.referrers.map((ref) => ({ key: ref.key, label: ref.key, count: ref.count }))} />
        </Card>
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        <Card title="Últimos clics">
          {summary.recentClicks.length ? (
            <ol className="divide-y divide-line">
              {summary.recentClicks.map((click, index) => {
                const described = describeKey(click.k ?? "");
                return (
                  <li key={`${click.ts}-${index}`} className="flex items-baseline justify-between gap-4 py-2 text-sm">
                    <span className="min-w-0 truncate">
                      <span className="text-fg">{described.label}</span>
                      <span className="ml-2 text-xs text-fg-subtle">
                        {described.group} · en {click.p} · {click.d}
                      </span>
                    </span>
                    <span className="shrink-0 font-mono text-[11px] text-fg-subtle">{formatTime(click.ts)}</span>
                  </li>
                );
              })}
            </ol>
          ) : (
            <p className="py-6 text-sm text-fg-subtle">Sin clics todavía.</p>
          )}
        </Card>

        <Card title="Historial de cambios del admin">
          <div id="cambios" className="scroll-mt-8" />
          {changes.length ? (
            <ol className="max-h-[420px] divide-y divide-line overflow-y-auto pr-1">
              {changes.map((change) => (
                <li key={change.ts} className="flex items-baseline justify-between gap-4 py-2 text-sm">
                  <span className="text-fg">{change.detalle}</span>
                  <span className="shrink-0 font-mono text-[11px] text-fg-subtle">{formatTime(change.ts)}</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="py-6 text-sm text-fg-subtle">Sin cambios registrados.</p>
          )}
        </Card>
      </div>
    </>
  );
}
