import { ArrowUpRight, Check } from "lucide-react";
import type { Metadata } from "next";
import { ArchitectureStack } from "@/components/architecture-stack";
import { CopyButton } from "@/components/copy-button";
import { PageIntro } from "@/components/page-intro";
import { PageMetricsPanel } from "@/components/page-metrics";
import { ShortcutList } from "@/components/shortcuts";
import { builtAtLabel, stackVersions } from "@/lib/build-info";
import { site } from "@/lib/data";
import { brandTokens, textTokens } from "@/lib/design-tokens";

export const metadata: Metadata = {
  title: "Cómo está hecho",
  description: "La arquitectura, el stack, el sistema de diseño, las métricas en vivo y la versión para asistentes de IA de este sitio.",
  alternates: { canonical: "/como-esta-hecho" },
};

const layers = [
  {
    title: "Interfaz",
    tech: ["React Server Components", "Tailwind v4", "CSS 3D"],
    body: "HTML generado al compilar y JavaScript solo donde hace falta. El 3D es CSS puro y el buscador ⌘K se descarga en tiempo ocioso.",
  },
  {
    title: "Contenido",
    tech: ["JSON", "Zod"],
    body: "Cada texto vive en un archivo de datos y se valida con un esquema antes de publicarse: un error de tipeo no llega al sitio.",
  },
  {
    title: "Admin",
    tech: ["Server Actions", "HMAC"],
    body: "Panel privado con sesión firmada: edita el contenido, ordena proyectos y genera casos de estudio y capturas.",
  },
  {
    title: "Medición",
    tech: ["sendBeacon", "Sin cookies"],
    body: "Visitas y clics sin IP ni identificadores. Si el navegador pide no ser medido (GPC o DNT), no se envía nada.",
  },
  {
    title: "Entrega",
    tech: ["Vercel", "CDN"],
    body: "Las páginas públicas son estáticas y se sirven desde el borde, cerca de quien visita.",
  },
];

const principles = [
  { title: "Estático primero", body: "Las páginas públicas se generan una vez al compilar. Nada que esperar de un servidor." },
  { title: "Sin cookies", body: "No hay rastreadores ni avisos molestos. La medición es propia y anónima." },
  { title: "Accesible", body: "Contraste AA verificado, foco visible, navegación con teclado y sin animaciones si lo pides." },
  { title: "Contenido como datos", body: "Los textos se editan sin tocar código y se validan antes de publicarse." },
  { title: "Rápido en cualquier red", body: "Fuentes propias, imágenes AVIF/WebP y nada de librerías pesadas en el primer pantallazo." },
  { title: "Legible por máquinas", body: "Markdown, llms.txt, datos estructurados y un servidor MCP para asistentes de IA." },
];

const typeScale = [
  { name: "Display", className: "text-display font-semibold", sample: "Aa", font: "Sora · clamp(2.75rem → 6.25rem)" },
  { name: "Titular", className: "text-headline font-medium", sample: "Del problema al sistema", font: "Sora · clamp(2rem → 3.5rem)" },
  { name: "Título", className: "text-title font-semibold", sample: "Arquitectura por capas", font: "Sora · clamp(1.375rem → 1.875rem)" },
  { name: "Texto", className: "text-lg leading-relaxed", sample: "Software a medida para el sur de Chile.", font: "Geist · 18 px" },
  { name: "Código", className: "font-mono text-sm", sample: "SELECT … FOR UPDATE", font: "Geist Mono · 14 px" },
];

const ratio = (value: number) => new Intl.NumberFormat("es-CL", { maximumFractionDigits: 1, minimumFractionDigits: 1 }).format(value);

export default function BuiltPage() {
  const mcpUrl = `${site.url}/mcp`;
  const mcpCommand = `claude mcp add --transport http auratech ${mcpUrl}`;

  return (
    <div className="mx-auto max-w-6xl px-5 pt-32 sm:px-8 sm:pt-40">
      <PageIntro
        eyebrow="Cómo está hecho"
        title={
          <>
            Este sitio también es un caso de estudio. <span className="text-fg-muted">Revísalo con lupa.</span>
          </>
        }
        lead="La arquitectura, el stack, el sistema de diseño y cómo lo leen personas y asistentes de IA. Las cifras de esta visita se miden en vivo, en tu navegador."
      />

      <Block label="Esta visita">
        <PageMetricsPanel />
        <p className="mt-4 max-w-2xl text-sm text-fg-subtle">
          Medido ahora mismo con la API Performance de tu navegador. No se envía a ningún lado; recarga para medir de nuevo.
        </p>
      </Block>

      <Block label="Arquitectura">
        <ArchitectureStack layers={layers} />
      </Block>

      <Block label="Principios">
        <ul className="grid-fill-2 grid gap-px overflow-hidden rounded-[28px] border border-line bg-line sm:grid-cols-2">
          {principles.map((principle) => (
            <li key={principle.title} className="reveal bg-bg p-6 sm:p-7">
              <h3 className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight">
                <Check className="size-4 text-accent" aria-hidden />
                {principle.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{principle.body}</p>
            </li>
          ))}
        </ul>
      </Block>

      <Block label="Stack">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">Versiones instaladas al compilar</caption>
          <thead className="font-mono text-[11px] tracking-wider text-fg-subtle uppercase">
            <tr className="border-b border-line">
              <th scope="col" className="pb-3 font-normal">Pieza</th>
              <th scope="col" className="pb-3 font-normal">Versión</th>
              <th scope="col" className="hidden pb-3 font-normal sm:table-cell">Para qué</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {stackVersions.map((item) => (
              <tr key={item.pkg}>
                <th scope="row" className="py-3 pr-4 font-medium">{item.name}</th>
                <td className="py-3 pr-4 font-mono text-xs text-accent tabular-nums">{item.version}</td>
                <td className="hidden py-3 text-fg-muted sm:table-cell">{item.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 font-mono text-xs text-fg-subtle">Versiones leídas de lo instalado al compilar · compilado el {builtAtLabel}</p>
      </Block>

      <Block label="Sistema de diseño">
        <h3 className="font-mono text-xs tracking-wider text-fg-subtle uppercase">Colores de marca</h3>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {brandTokens.map((token) => (
            <li key={token.token} className="overflow-hidden rounded-2xl border border-line">
              <div className="h-20 border-b border-line" style={{ background: token.color }} />
              <div className="p-3">
                <p className="text-sm font-medium">{token.label}</p>
                <p className="font-mono text-[11px] text-fg-subtle uppercase">{token.color}</p>
                <p className="mt-1 text-xs text-fg-muted">{token.note}</p>
              </div>
            </li>
          ))}
        </ul>

        <h3 className="mt-12 font-mono text-xs tracking-wider text-fg-subtle uppercase">Contraste del texto sobre el fondo</h3>
        <table className="mt-4 w-full text-left text-sm">
          <caption className="sr-only">Razón de contraste WCAG de cada color de texto, en ambos temas</caption>
          <thead className="font-mono text-[11px] tracking-wider text-fg-subtle uppercase">
            <tr className="border-b border-line">
              <th scope="col" className="pb-3 font-normal">Uso</th>
              <th scope="col" className="pb-3 font-normal">Claro</th>
              <th scope="col" className="pb-3 font-normal">Oscuro</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {textTokens.map((token) => (
              <tr key={token.token}>
                <th scope="row" className="py-3 pr-4 font-medium">{token.label}</th>
                {token.themes.map((theme) => (
                  <td key={theme.theme} className="py-3 pr-4">
                    <span className="inline-flex items-center gap-2.5">
                      <span
                        aria-hidden
                        className="grid size-7 place-items-center rounded-lg border border-line font-display text-xs font-semibold"
                        style={{ background: theme.bg, color: theme.color }}
                      >
                        Aa
                      </span>
                      <span className="font-mono text-xs tabular-nums">{ratio(theme.ratio)}:1</span>
                      <span className={`font-mono text-[10px] ${theme.ratio >= 4.5 ? "text-accent" : "text-rose-400"}`}>
                        {theme.ratio >= 7 ? "AAA" : theme.ratio >= 4.5 ? "AA" : "bajo AA"}
                      </span>
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 text-sm text-fg-subtle">Los colores se leen del CSS real al compilar y el contraste se calcula con la fórmula de WCAG 2.1.</p>

        <h3 className="mt-12 font-mono text-xs tracking-wider text-fg-subtle uppercase">Tipografía</h3>
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {typeScale.map((type) => (
            <li key={type.name} className="grid gap-2 py-5 sm:grid-cols-[12rem_1fr] sm:items-baseline sm:gap-6">
              <div>
                <p className="text-sm font-medium">{type.name}</p>
                <p className="font-mono text-[11px] text-fg-subtle">{type.font}</p>
              </div>
              <p className={`${type.className} min-w-0 truncate`}>{type.sample}</p>
            </li>
          ))}
        </ul>

        <h3 className="mt-12 font-mono text-xs tracking-wider text-fg-subtle uppercase">Movimiento</h3>
        <p className="mt-4 max-w-2xl leading-relaxed text-fg-muted">
          Una sola curva para casi todo, <span className="font-mono text-sm text-fg">cubic-bezier(0.16, 1, 0.3, 1)</span>: rápida al
          empezar y suave al llegar. Las animaciones al bajar usan <span className="font-mono text-sm text-fg">animation-timeline</span>{" "}
          (CSS, sin JavaScript), el 3D usa <span className="font-mono text-sm text-fg">perspective</span> y capas en Z, y todo se
          detiene si tu sistema pide reducir el movimiento.
        </p>
      </Block>

      <Block label="Para personas y máquinas">
        <div className="grid gap-px overflow-hidden rounded-[28px] border border-line bg-line sm:grid-cols-2">
          <MachineLink href="/llms.txt" title="llms.txt" body="Índice del sitio pensado para modelos de lenguaje." />
          <MachineLink href="/index.md" title="Markdown" body="Cada página tiene su versión .md, por ejemplo /proyectos/edugalvarino.md." />
          <MachineLink href="/llms-full.txt" title="llms-full.txt" body="Todo el contenido en un solo archivo de texto." />
          <MachineLink href="/sitemap.xml" title="sitemap.xml" body="Mapa del sitio. Además, cada página lleva datos estructurados de Schema.org." />
        </div>

        <div className="mt-6 rounded-[28px] border border-line p-6 sm:p-7">
          <h3 className="font-display text-lg font-semibold tracking-tight">Servidor MCP</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-fg-muted">
            Conecta tu asistente de IA (Claude, ChatGPT, Cursor u otro compatible con MCP) y pregúntale por los proyectos y servicios de
            AuraTech: los consulta directamente aquí, en modo solo lectura.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <code className="min-w-0 flex-1 rounded-xl border border-line bg-bg-inset px-4 py-2.5 font-mono text-xs break-all text-fg">{mcpCommand}</code>
            <CopyButton value={mcpCommand} label="Copiar comando" trackAs="hecho:copiar-mcp" className="shrink-0 self-start sm:self-auto" />
          </div>
          <p className="mt-3 font-mono text-[11px] text-fg-subtle">
            Herramientas: listar_proyectos · ver_proyecto · servicios · buscar · contacto
          </p>
        </div>
      </Block>

      <Block label="Accesibilidad">
        <div className="max-w-3xl space-y-4 leading-relaxed text-fg-muted">
          <p>
            El objetivo es <span className="text-fg">WCAG 2.1 nivel AA</span>. Cada versión se revisa con axe-core en escritorio y en
            celular, en tema claro y oscuro, además de navegar todo el sitio solo con el teclado.
          </p>
          <p>
            Si algo no te funciona con tu lector de pantalla o tu forma de navegar, escríbenos a{" "}
            <a href={`mailto:${site.email}`} className="link-underline text-accent">
              {site.email}
            </a>{" "}
            y lo corregimos.
          </p>
        </div>
      </Block>

      <Block label="Atajos de teclado">
        <ShortcutList className="max-w-xl border-y border-line" />
      </Block>
    </div>
  );
}

function MachineLink({ href, title, body }: { href: string; title: string; body: string }) {
  return (
    <a href={href} className="group bg-bg p-6 transition-colors hover:bg-bg-elevated sm:p-7" data-track={`hecho:${title.toLowerCase()}`}>
      <span className="flex items-center justify-between gap-3 font-mono text-sm text-fg">
        {title}
        <ArrowUpRight className="size-4 text-fg-subtle transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
      </span>
      <span className="mt-2 block text-sm leading-relaxed text-fg-muted">{body}</span>
    </a>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mt-20 grid gap-6 md:grid-cols-12 md:gap-8">
      <h2 className="self-start font-mono text-xs tracking-wider text-fg-subtle uppercase md:col-span-3 md:pt-1">{label}</h2>
      <div className="min-w-0 md:col-span-9">{children}</div>
    </section>
  );
}
