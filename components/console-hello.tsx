"use client";

import { useEffect } from "react";

/** Un saludo para quien abre las herramientas de desarrollo. Se imprime una sola vez por visita. */
export function ConsoleHello({ email }: { email: string }) {
  useEffect(() => {
    const flags = window as unknown as Record<string, boolean>;
    if (flags.__auratechHola) return;
    flags.__auratechHola = true;
    const url = window.location.origin;
    console.log(
      "%c▲ AuraTech%c\n\n¿Revisando el código? Bien: así se elige a quién contratar.\n\nCómo está hecho → %s\nPara asistentes de IA → %s · MCP en %s\nConversemos → %s",
      "font: 600 22px/1.4 system-ui, sans-serif; color: #168bff",
      "font: 13px/1.6 ui-monospace, monospace; color: inherit",
      `${url}/como-esta-hecho`,
      `${url}/llms.txt`,
      `${url}/mcp`,
      email,
    );
  }, [email]);
  return null;
}
