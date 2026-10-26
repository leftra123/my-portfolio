import { cn } from "@/lib/utils";

export function Card({ title, action, children, className }: { title?: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn("lit rounded-2xl border border-line bg-bg-elevated/40 p-5", className)}>
      {title ? (
        <header className="mb-4 flex items-center justify-between gap-3">
          <h2 className="font-mono text-[11px] tracking-wider text-fg-subtle uppercase">{title}</h2>
          {action}
        </header>
      ) : null}
      {children}
    </section>
  );
}

export function Kpi({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-line bg-bg-elevated/40 p-4">
      <p className="text-xs text-fg-subtle">{label}</p>
      <p className="mt-2 font-display text-3xl font-medium tracking-tight tabular-nums">{value}</p>
      {hint ? <p className="mt-1 text-xs text-fg-subtle">{hint}</p> : null}
    </div>
  );
}

export function StatusPill({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs text-fg-muted">
      <span className={cn("size-1.5 rounded-full", ok ? "bg-emerald-400" : "bg-amber-400")} aria-hidden />
      {children}
    </span>
  );
}

const timeFormatter = new Intl.DateTimeFormat("es-CL", {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "America/Santiago",
});

export function formatTime(iso: string) {
  return timeFormatter.format(new Date(iso));
}

export const percent = (value: number) => `${(value * 100).toFixed(value > 0 && value < 0.1 ? 1 : 0)}%`;
