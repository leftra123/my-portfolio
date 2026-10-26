/** Atajos de teclado del sitio público. Los usa <Shortcuts /> y se listan en /como-esta-hecho. */
export type Shortcut = { keys: string[]; label: string; href?: string; section?: string; action?: "tema" | "ayuda" | "buscador" };

export const shortcuts: Shortcut[] = [
  { keys: ["⌘", "K"], label: "Abrir el buscador", action: "buscador" },
  { keys: ["/"], label: "Abrir el buscador", action: "buscador" },
  { keys: ["?"], label: "Ver estos atajos", action: "ayuda" },
  { keys: ["G", "I"], label: "Ir al inicio", href: "/" },
  { keys: ["G", "P"], label: "Ir a proyectos", section: "trabajo" },
  { keys: ["G", "S"], label: "Ir a servicios", section: "servicios" },
  { keys: ["G", "H"], label: "Ir a la historia", section: "historia" },
  { keys: ["G", "C"], label: "Ir a contacto", section: "contacto" },
  { keys: ["G", "A"], label: "Abrir el archivo", href: "/archivo" },
  { keys: ["G", "E"], label: "Ver cómo está hecho", href: "/como-esta-hecho" },
  { keys: ["G", "V"], label: "Ver el currículum", href: "/cv" },
  { keys: ["T"], label: "Cambiar entre tema claro y oscuro", action: "tema" },
];
