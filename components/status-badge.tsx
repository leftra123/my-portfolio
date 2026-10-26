import type { Project } from "@/lib/data";
import { cn } from "@/lib/utils";

const dot: Record<Project["status"], string> = {
  "En producción": "bg-emerald-400",
  "En uso interno": "bg-electric",
  Preview: "bg-amber-400",
  "En desarrollo": "bg-amber-400",
  Académico: "bg-fg-subtle",
};

export function StatusBadge({ status, className }: { status: Project["status"]; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-mono text-[11px] text-fg-muted", className)}>
      <span className={cn("size-1.5 rounded-full", dot[status])} aria-hidden />
      {status}
    </span>
  );
}
