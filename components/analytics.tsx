"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { send } from "@/lib/track";

/** Convierte un clic en una clave legible para la auditoría, sin guardar textos ni datos de la persona. */
function keyFor(element: Element): string | null {
  const explicit = element.closest("[data-track]")?.getAttribute("data-track");
  if (explicit) return explicit;

  const anchor = element.closest("a");
  if (!anchor) return null;
  const href = anchor.getAttribute("href") ?? "";
  if (href.startsWith("mailto:")) return "contacto:correo";
  if (href.startsWith("tel:")) return "contacto:telefono";

  const url = new URL(anchor.href, window.location.href);
  if (url.hostname === "wa.me") return "contacto:whatsapp";
  if (url.origin !== window.location.origin) return `salida:${url.hostname.replace(/^www\./, "")}`;
  if (url.pathname === window.location.pathname && url.hash) return `seccion:${url.hash.slice(1)}`;
  if (url.pathname === "/" && url.hash) return `seccion:${url.hash.slice(1)}`;
  if (url.pathname.startsWith("/proyectos/")) return `proyecto:${url.pathname.split("/")[2]}`;
  return `pagina:${url.pathname}`;
}

// Evita contar dos veces la misma vista (React monta los efectos dos veces en desarrollo).
let lastView = { path: "", at: 0 };

export function Analytics() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    // El origen (solo el dominio) se manda una vez, al entrar al sitio.
    let referrer: string | undefined;
    if (first.current && document.referrer) {
      const host = new URL(document.referrer).hostname.replace(/^www\./, "");
      if (host !== window.location.hostname) referrer = host;
    }
    first.current = false;
    const now = Date.now();
    if (lastView.path === pathname && now - lastView.at < 1500) return;
    lastView = { path: pathname, at: now };
    send({ t: "view", p: pathname, r: referrer });
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const key = keyFor(target);
      if (key) send({ t: "click", p: window.location.pathname, k: key });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
