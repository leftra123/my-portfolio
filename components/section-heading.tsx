import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  className?: string;
  id?: string;
};

/** Encabezado editorial: índice en mono, título grande y bajada opcional. */
export function SectionHeading({ index, eyebrow, title, lead, className, id }: SectionHeadingProps) {
  return (
    <header className={cn("reveal grid gap-6 md:grid-cols-12 md:gap-8", className)}>
      <p className="flex items-center gap-3 self-start font-mono text-xs tracking-wider text-fg-subtle uppercase md:col-span-3 md:pt-3">
        <span className="text-accent">{index}</span>
        <span aria-hidden className="h-px w-6 bg-line-strong" />
        {eyebrow}
      </p>
      <div className="md:col-span-9">
        <h2 id={id} className="text-headline font-medium">
          {title}
        </h2>
        {lead ? <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted">{lead}</p> : null}
      </div>
    </header>
  );
}

/** Número de sección a partir del orden configurado en el admin. */
export type SectionProps = { index: string };
