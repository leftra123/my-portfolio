import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type PageIntroProps = {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
};

/** Cabecera de páginas internas: volver, índice en mono y título grande. */
export function PageIntro({ eyebrow, title, lead }: PageIntroProps) {
  return (
    <header>
      <Link href="/" className="enter group inline-flex items-center gap-2 font-mono text-xs text-fg-subtle hover:text-fg">
        <ArrowLeft className="size-3.5 transition-transform duration-300 ease-out-expo group-hover:-translate-x-0.5" />
        Inicio
      </Link>
      <p className="enter mt-10 font-mono text-xs tracking-wider text-accent uppercase" style={{ "--i": 0 } as React.CSSProperties}>
        {eyebrow}
      </p>
      <h1 className="enter mt-4 max-w-4xl text-headline font-medium" style={{ "--i": 1 } as React.CSSProperties}>
        {title}
      </h1>
      {lead ? (
        <p className="enter mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted" style={{ "--i": 2 } as React.CSSProperties}>
          {lead}
        </p>
      ) : null}
    </header>
  );
}
