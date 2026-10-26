/** Lista ordenada con barra de magnitud: una sola tinta (Aura Blue), el número en texto, nunca en color. */
export function BarList({
  items,
  empty,
}: {
  items: { key: string; label: React.ReactNode; hint?: string; count: number }[];
  empty: string;
}) {
  if (!items.length) return <p className="py-6 text-sm text-fg-subtle">{empty}</p>;
  const max = Math.max(...items.map((item) => item.count));
  return (
    <ul className="grid gap-2.5">
      {items.map((item) => (
        <li key={item.key}>
          <div className="flex items-baseline justify-between gap-3 text-sm">
            <span className="min-w-0 truncate text-fg">
              {item.label}
              {item.hint ? <span className="ml-2 text-xs text-fg-subtle">{item.hint}</span> : null}
            </span>
            <span className="font-mono text-xs text-fg-muted tabular-nums">{item.count}</span>
          </div>
          <div className="mt-1 h-1.5 rounded-full bg-fg/[0.05]">
            <div className="h-full rounded-full bg-aura" style={{ width: `${Math.max(3, (item.count / max) * 100)}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}
