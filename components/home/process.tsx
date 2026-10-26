import { SectionHeading, type SectionProps } from "@/components/section-heading";
import { settings, stack, steps } from "@/lib/data";

const LG_COLS: Record<number, string> = { 1: "lg:grid-cols-1", 2: "lg:grid-cols-2", 3: "lg:grid-cols-3", 4: "lg:grid-cols-4" };

/** Cómo trabaja AuraTech: cuatro pasos y, debajo, las herramientas en una línea por grupo. */
export function Process({ index }: SectionProps) {
  return (
    <section id="proceso" className="scroll-mt-24 border-t border-line py-24 sm:py-32" aria-labelledby="proceso-title">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          id="proceso-title"
          index={index}
          eyebrow="Proceso"
          title={
            <>
              Cómo trabaja {settings.company}. <span className="text-fg-muted">Con IA, y con criterio.</span>
            </>
          }
        />

        <ol className={`sm:max-lg:[&>li:last-child:nth-of-type(odd)]:col-span-2 mt-14 grid gap-px overflow-hidden rounded-[28px] border border-line bg-line sm:mt-16 sm:grid-cols-2 ${LG_COLS[Math.min(steps.length, 4)] ?? "lg:grid-cols-4"}`}>
          {steps.map((step, position) => (
            <li key={step.title} className="reveal bg-bg p-6 sm:p-7">
              <p className="font-mono text-xs text-accent">{String(position + 1).padStart(2, "0")}</p>
              <h3 className="mt-6 font-display text-lg font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{step.body}</p>
            </li>
          ))}
        </ol>

        <dl className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {stack.map((group) => (
            <div key={group.group} className="reveal grid gap-1 border-t border-line pt-4 lg:grid-cols-[11rem_1fr] lg:gap-4">
              <dt className="font-mono text-[11px] tracking-wider text-fg-subtle uppercase">{group.group}</dt>
              <dd className="text-sm leading-relaxed text-fg-muted">{group.items.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
