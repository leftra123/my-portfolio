"use client";

import {
  Activity,
  Archive,
  BadgeCheck,
  BookOpenText,
  BriefcaseBusiness,
  Building2,
  FolderKanban,
  ListChecks,
  Mic,
  Shapes,
  GraduationCap,
  Layers,
  LayoutDashboard,
  Link2,
  UserRound,
  Wand,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const groups = [
  {
    label: "General",
    items: [
      { href: "/admin", label: "Panel", icon: LayoutDashboard },
      { href: "/admin/auditoria", label: "Auditoría", icon: Activity },
      { href: "/admin/generador", label: "Generador", icon: Wand },
    ],
  },
  {
    label: "Empresa",
    items: [
      { href: "/admin/sitio", label: "Sitio", icon: Building2 },
      { href: "/admin/contenido/servicios", label: "Servicios", icon: Shapes },
      { href: "/admin/proyectos", label: "Proyectos", icon: FolderKanban },
      { href: "/admin/contenido/proceso", label: "Proceso", icon: ListChecks },
      { href: "/admin/contenido/archivo", label: "Archivo", icon: Archive },
      { href: "/admin/contenido/stack", label: "Stack", icon: Layers },
    ],
  },
  {
    label: "Tú",
    items: [
      { href: "/admin/perfil", label: "Perfil", icon: UserRound },
      { href: "/admin/contenido/historia", label: "Historia", icon: BookOpenText },
      { href: "/admin/contenido/trayectoria", label: "Experiencia", icon: BriefcaseBusiness },
      { href: "/admin/contenido/charlas", label: "Charlas", icon: Mic },
      { href: "/admin/contenido/formacion", label: "Formación", icon: GraduationCap },
      { href: "/admin/contenido/certificaciones", label: "Certificaciones", icon: BadgeCheck },
      { href: "/admin/contenido/redes", label: "Redes", icon: Link2 },
    ],
  },
];

export function AdminNav() {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));

  return (
    <nav aria-label="Admin" className="flex gap-6 overflow-x-auto lg:flex-col lg:gap-7 lg:overflow-visible">
      {groups.map((group) => (
        <div key={group.label} className="shrink-0">
          <p className="mb-2 hidden px-3 font-mono text-[10.5px] tracking-wider text-fg-subtle uppercase lg:block">{group.label}</p>
          <ul className="flex gap-1 lg:flex-col">
            {group.items.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm whitespace-nowrap transition-colors",
                      active ? "bg-fg/[0.07] text-fg" : "text-fg-muted hover:bg-fg/[0.04] hover:text-fg",
                    )}
                  >
                    <Icon className={cn("size-4", active ? "text-accent" : "text-fg-subtle")} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
