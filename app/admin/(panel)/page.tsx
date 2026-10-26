import { ArrowRight, Building2, FolderPlus, Wand } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { BarList } from "@/components/admin/bar-list";
import { DailyChart } from "@/components/admin/daily-chart";
import { PageHeader } from "@/components/admin/page-header";
import { Card, formatTime, Kpi, percent, StatusPill } from "@/components/admin/ui";
import { canWrite, readChanges, readCollection } from "@/lib/admin/store";
import { analyticsWritable, readEvents } from "@/lib/analytics/store";
import { summarize } from "@/lib/analytics/summary";

export const metadata: Metadata = { title: "Panel" };

const today = new Intl.DateTimeFormat("es-CL", { weekday: "long", day: "numeric", month: "long", timeZone: "America/Santiago" });

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

export default async function AdminHome() {
  const [events, changes, projects, profile, site] = await Promise.all([
    readEvents(30),
    readChanges(6),
    readCollection("proyectos"),
    readCollection("perfil"),
    readCollection("sitio"),
  ]);
  const summary = summarize(events, 30);
  const projectViews = summary.topPages.filter((page) => page.key.startsWith("/proyectos/"));
  const names = new Map(projects.map((project) => [`/proyectos/${project.slug}`, project.name]));
  const drafts = projects.filter((project) => project.draft).length;

  return (
    <>
      <PageHeader
        eyebrow="Panel"
        title={`Hola, ${profile.shortName.split(" ")[0]}`}
        description={capitalize(today.format(new Date()))}
        actions={
          <div className="flex flex-wrap gap-2">
            <StatusPill ok={canWrite()}>{canWrite() ? "Edición local activa" : "Solo lectura"}</StatusPill>
            <StatusPill ok={Boolean(process.env.ANTHROPIC_API_KEY)}>
              {process.env.ANTHROPIC_API_KEY ? "IA conectada" : "IA sin clave"}
            </StatusPill>
            <StatusPill ok={analyticsWritable()}>Medición sin cookies</StatusPill>
          </div>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label="Visitas · 30 días" value={String(summary.views)} />
        <Kpi label="Clics" value={String(summary.clicks)} />
        <Kpi label="Contactos" value={String(summary.contact)} hint="Correo, WhatsApp o copiar correo" />
        <Kpi label="Tasa de contacto" value={percent(summary.contactRate)} hint="Contactos por visita" />
      </div>

      <Card title="Visitas por día" className="mt-3" action={<Link href="/admin/auditoria" className="text-xs text-fg-muted hover:text-fg">Auditoría completa →</Link>}>
        <DailyChart data={summary.series} />
      </Card>

      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        <Card title="Proyectos más vistos">
          <BarList
            empty="Aún no hay visitas a casos de estudio."
            items={projectViews.map((page) => ({ key: page.key, label: names.get(page.key) ?? page.key, count: page.count }))}
          />
        </Card>
        <Card title="Últimos cambios" action={<Link href="/admin/auditoria#cambios" className="text-xs text-fg-muted hover:text-fg">Historial →</Link>}>
          {changes.length ? (
            <ol className="grid gap-3">
              {changes.map((change) => (
                <li key={change.ts} className="flex items-baseline justify-between gap-4 text-sm">
                  <span className="text-fg">{change.detalle}</span>
                  <span className="shrink-0 font-mono text-[11px] text-fg-subtle">{formatTime(change.ts)}</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="py-6 text-sm text-fg-subtle">Todavía no hay cambios desde el admin.</p>
          )}
        </Card>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {[
          { href: "/admin/proyectos/nuevo", icon: FolderPlus, title: "Nuevo proyecto", body: `${projects.length} proyectos${drafts ? ` · ${drafts} en borrador` : ""}` },
          { href: "/admin/generador", icon: Wand, title: "Generar desde un repo", body: "Ficha, captura y textos automáticos" },
          { href: "/admin/sitio", icon: Building2, title: `Configurar ${site.company}`, body: site.available ? "Agenda abierta" : "Agenda cerrada" },
        ].map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="group flex items-center gap-4 rounded-2xl border border-line bg-bg-elevated/40 p-4 transition-colors hover:border-line-strong"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-accent-soft text-accent">
              <action.icon className="size-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium">{action.title}</span>
              <span className="block truncate text-xs text-fg-subtle">{action.body}</span>
            </span>
            <ArrowRight className="size-4 text-fg-subtle transition-transform group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>
    </>
  );
}
