import { Bot, Cable, Globe, LayoutDashboard, ShoppingBag, Workflow } from "lucide-react";
import type { SectionProps } from "@/components/section-heading";
import { services, settings, steps } from "@/lib/data";
import type { Service } from "@/lib/schemas";

const ICONS: Record<Service["icon"], typeof Bot> = {
  plataformas: LayoutDashboard,
  automatizacion: Workflow,
  comercio: ShoppingBag,
  ia: Bot,
  integraciones: Cable,
  sitios: Globe,
};

const LG_COLS: Record<number, string> = { 1: "lg:grid-cols-1", 2: "lg:grid-cols-2", 3: "lg:grid-cols-3", 4: "lg:grid-cols-4" };

/**
 * Qué hace la empresa y cómo trabaja, en una sola sección.
 * Formato distinto al resto: título fijo a la izquierda, lista editorial a la derecha y el proceso en una línea.
 */
export function Services({ index }: SectionProps) {
  return (
    <section id="servicios" className="scroll-mt-24 border-t border-line py-24 sm:py-32" aria-labelledby="servicios-title">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <header className="reveal md:col-span-5">
            <div className="md:sticky md:top-32">
              <p className="flex items-center gap-3 font-mono text-xs tracking-wider text-fg-subtle uppercase">
                <span className="text-accent">{index}</span>
                <span aria-hidden className="h-px w-6 bg-line-strong" />
                Servicios
              </p>
              <h2 id="servicios-title" className="mt-6 text-headline font-medium">
                Qué hacemos y cómo.
              </h2>
              <p className="mt-5 max-w-sm text-lg leading-relaxed text-fg-muted">
                {settings.company} construye el software que un proceso concreto necesita. Nada genérico.
              </p>
            </div>
          </header>

          <ol className="dim-siblings border-t border-line md:col-span-7">
            {services.map((service, position) => {
              const Icon = ICONS[service.icon];
              return (
                <li key={service.title} className="reveal grid grid-cols-[auto_1fr] gap-x-5 border-b border-line py-7 sm:gap-x-8">
                  <span className="grid size-11 place-items-center rounded-2xl bg-accent-soft text-accent">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="flex items-baseline gap-3 font-display text-xl font-semibold tracking-tight sm:text-2xl">
                      {service.title}
                      <span className="font-mono text-xs font-normal text-fg-subtle">{String(position + 1).padStart(2, "0")}</span>
                    </h3>
                    <p className="mt-2 max-w-lg leading-relaxed text-fg-muted">{service.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {steps.length ? (
          <div className="reveal mt-20">
            <h3 className="font-mono text-xs tracking-wider text-fg-subtle uppercase">Cómo trabajamos</h3>
            <div className="relative mt-8">
            <span aria-hidden className="absolute top-[7px] right-0 left-0 hidden h-px bg-gradient-to-r from-accent via-line-strong to-transparent lg:block" />
            <ol className={`sm:max-lg:[&>li:last-child:nth-of-type(odd)]:col-span-2 relative grid gap-8 sm:grid-cols-2 lg:gap-6 ${LG_COLS[Math.min(steps.length, 4)] ?? "lg:grid-cols-4"}`}>
              {steps.map((step, position) => (
                <li key={step.title} className="relative">
                  <span
                    aria-hidden
                    className={`relative block size-[15px] rounded-full border-2 ${position === 0 ? "border-accent bg-accent" : "border-line-strong bg-bg"}`}
                  />
                  <p className="mt-5 font-mono text-xs text-accent">{String(position + 1).padStart(2, "0")}</p>
                  <h4 className="mt-2 font-display text-lg font-semibold tracking-tight">{step.title}</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{step.body}</p>
                </li>
              ))}
            </ol>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
