"use client";

import { Command } from "cmdk";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Code2,
  Copy,
  FileText,
  FolderOpen,
  GraduationCap,
  Home,
  Keyboard,
  Mail,
  MessageCircle,
  MoonStar,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Isotipo } from "@/components/brand/isotipo";
import { archive, certifications, nav, projects, site, socials } from "@/lib/data";
import { track } from "@/lib/track";

const SUGGESTIONS = ["EduGalvarino", "contacto", "CV", "archivo"];

const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

/** Cada palabra buscada debe aparecer (sin tildes) en el valor o en las palabras clave; prioriza los prefijos. */
function filter(value: string, search: string, keywords?: string[]) {
  const haystack = normalize(`${value} ${keywords?.join(" ") ?? ""}`);
  const terms = normalize(search).split(/\s+/).filter(Boolean);
  if (!terms.every((term) => haystack.includes(term))) return 0;
  return terms.some((term) => haystack.split(/\s+/).some((word) => word.startsWith(term))) ? 1 : 0.5;
}

type CommandPaletteProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/** Paleta ⌘K. Se carga diferida desde <CommandMenu /> para no pesar en el primer pantallazo. */
export default function CommandPalette({ open, onOpenChange: setOpen }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 1800);
    return () => window.clearTimeout(id);
  }, [toast]);

  const run = useCallback(
    (action: () => void) => {
      setOpen(false);
      action();
    },
    [setOpen],
  );

  const goToSection = (id: string) => {
    if (pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    } else {
      router.push(`/#${id}`);
    }
  };

  const external = (href: string) => window.open(href, "_blank", "noopener,noreferrer");

  return (
    <>
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Buscador de comandos"
        filter={filter}
        loop
        overlayClassName="fixed inset-0 z-[80] bg-ink/40 backdrop-blur-[2px] data-[state=open]:animate-[fade_200ms_ease-out]"
        contentClassName="fixed top-[12vh] left-1/2 z-[90] w-[min(640px,calc(100vw-2rem))] -translate-x-1/2 data-[state=open]:animate-[pop_260ms_var(--ease-out-expo)]"
        className="overflow-hidden rounded-3xl border border-line-strong bg-bg-elevated shadow-[inset_0_1px_0_var(--highlight),0_30px_120px_-30px_rgb(0_0_0/0.65)]"
      >
        <div className="flex items-center gap-3 border-b border-line px-5">
          <Isotipo className="h-4 w-auto" />
          <Command.Input
            value={query}
            onValueChange={setQuery}
            placeholder="Busca un proyecto, una sección o una acción…"
            className="h-14 w-full bg-transparent text-[15px] text-fg outline-none placeholder:text-fg-subtle"
          />
          <kbd className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px] text-fg-subtle">ESC</kbd>
        </div>

        <Command.List className="max-h-[min(60vh,440px)] scroll-py-2 overflow-y-auto overscroll-contain p-2">
          <Command.Empty className="px-4 py-10 text-center text-sm text-fg-muted">
            <p>
              Nada para «<span className="text-fg">{query}</span>».
            </p>
            <p className="mt-2 text-fg-subtle">
              Prueba con{" "}
              {SUGGESTIONS.map((word, index) => (
                <span key={word}>
                  <button type="button" onClick={() => setQuery(word)} className="text-accent link-underline">
                    {word}
                  </button>
                  {index < SUGGESTIONS.length - 1 ? ", " : "."}
                </span>
              ))}
            </p>
          </Command.Empty>

          <Group heading="Proyectos">
            {projects.map((project) => (
              <Item
                key={project.slug}
                value={`proyecto ${project.name} ${project.kicker}`}
                keywords={project.stack}
                icon={<span className="font-mono text-[10px] text-fg-subtle">{project.year.slice(0, 4)}</span>}
                hint={project.kicker}
                onSelect={() => run(() => router.push(`/proyectos/${project.slug}`))}
              >
                {project.name}
              </Item>
            ))}
            <Item
              value="archivo todos los proyectos"
              icon={<FolderOpen className="size-4" />}
              hint={`${archive.length} proyectos`}
              onSelect={() => run(() => router.push("/archivo"))}
            >
              Archivo completo
            </Item>
          </Group>

          <Group heading="Secciones">
            <Item value="inicio portada" icon={<Home className="size-4" />} onSelect={() => run(() => (pathname === "/" ? window.scrollTo({ top: 0, behavior: "smooth" }) : router.push("/")))}>
              Inicio
            </Item>
            {nav.map((item) => (
              <Item
                key={item.id}
                value={`seccion ${item.label}`}
                icon={<ArrowRight className="size-4" />}
                onSelect={() => run(() => goToSection(item.id))}
              >
                {item.label}
              </Item>
            ))}
            <Item
              value="como esta hecho arquitectura stack tecnologia diseño metricas"
              icon={<Code2 className="size-4" />}
              hint="Arquitectura, stack y métricas en vivo"
              onSelect={() => run(() => router.push("/como-esta-hecho"))}
            >
              Cómo está hecho
            </Item>
            <Item
              value="formacion certificaciones cursos estudios"
              icon={<GraduationCap className="size-4" />}
              hint={`${certifications.length} certificaciones`}
              onSelect={() => run(() => router.push("/formacion"))}
            >
              Formación y certificaciones
            </Item>
          </Group>

          <Group heading="Acciones">
            <Item
              value="copiar correo email"
              icon={<Copy className="size-4" />}
              hint={site.email}
              onSelect={() =>
                run(() => {
                  navigator.clipboard?.writeText(site.email).then(() => setToast("Correo copiado"));
                })
              }
            >
              Copiar correo
            </Item>
            <Item value="escribir correo mail" icon={<Mail className="size-4" />} onSelect={() => run(() => (window.location.href = `mailto:${site.email}`))}>
              Escribir un correo
            </Item>
            <Item value="whatsapp mensaje" icon={<MessageCircle className="size-4" />} onSelect={() => run(() => external(site.whatsappUrl))}>
              Hablar por WhatsApp
            </Item>
            <Item value="cv curriculum pdf" icon={<FileText className="size-4" />} hint="Imprimible en PDF" onSelect={() => run(() => router.push("/cv"))}>
              Ver currículum
            </Item>
            <Item
              value="atajos de teclado ayuda shortcuts"
              icon={<Keyboard className="size-4" />}
              hint="También con ?"
              onSelect={() => run(() => window.dispatchEvent(new Event("atajos:abrir")))}
            >
              Ver atajos de teclado
            </Item>
            <Item
              value="mcp asistente ia claude conectar agente"
              icon={<Bot className="size-4" />}
              hint="Copia el comando para tu asistente"
              onSelect={() =>
                run(() => {
                  navigator.clipboard
                    ?.writeText(`claude mcp add --transport http auratech ${site.url}/mcp`)
                    .then(() => setToast("Comando MCP copiado"));
                })
              }
            >
              Conectar un asistente de IA (MCP)
            </Item>
            <Item
              value="tema oscuro claro modo"
              icon={<MoonStar className="size-4" />}
              hint={resolvedTheme === "light" ? "Pasar a oscuro" : "Pasar a claro"}
              onSelect={() => run(() => setTheme(resolvedTheme === "light" ? "dark" : "light"))}
            >
              Cambiar tema
            </Item>
          </Group>

          <Group heading="Enlaces">
            {socials
              .filter((social) => social.label !== "WhatsApp")
              .map((social) => (
                <Item
                  key={social.label}
                  value={`red ${social.label}`}
                  icon={<ArrowUpRight className="size-4" />}
                  hint={social.handle}
                  onSelect={() => run(() => external(social.href))}
                >
                  {social.label}
                </Item>
              ))}
          </Group>
        </Command.List>

        <div className="flex items-center justify-between border-t border-line px-5 py-3 font-mono text-[11px] text-fg-subtle">
          <span>↑↓ navegar · ↵ abrir</span>
          <span>{site.brand}</span>
        </div>
      </Command.Dialog>

      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-none fixed bottom-6 left-1/2 z-[95] -translate-x-1/2 rounded-full border border-line-strong bg-bg-elevated px-4 py-2 text-sm shadow-xl transition-all duration-300 ease-out-expo ${
          toast ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        {toast}
      </div>
    </>
  );
}

function Group({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <Command.Group
      heading={heading}
      className="mb-1 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-fg-subtle [&_[cmdk-group-heading]]:uppercase"
    >
      {children}
    </Command.Group>
  );
}

type ItemProps = {
  value: string;
  keywords?: string[];
  icon: ReactNode;
  hint?: string;
  onSelect: () => void;
  children: ReactNode;
};

function Item({ value, keywords, icon, hint, onSelect, children }: ItemProps) {
  return (
    <Command.Item
      value={value}
      keywords={keywords}
      onSelect={() => {
        track(`buscador:${value.split(" ").slice(0, 2).join("-").toLowerCase()}`);
        onSelect();
      }}
      className="group flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-fg-muted transition-colors data-[selected=true]:bg-fg/[0.06] data-[selected=true]:text-fg"
    >
      <span className="grid size-7 shrink-0 place-items-center rounded-lg border border-line text-fg-subtle group-data-[selected=true]:border-line-strong group-data-[selected=true]:text-accent">
        {icon}
      </span>
      <span className="flex-1 truncate">{children}</span>
      {hint ? <span className="hidden truncate text-xs text-fg-subtle sm:block">{hint}</span> : null}
    </Command.Item>
  );
}
