import { storeEvent } from "@/lib/analytics/store";
import { founder, getProject, projects, services, settings, site, socials, steps } from "@/lib/data";
import { projectMarkdown } from "@/lib/markdown";

/*
 * Servidor MCP de solo lectura (Model Context Protocol, transporte HTTP sin estado).
 * Un asistente de IA puede consultar los proyectos y servicios de AuraTech directamente aquí.
 * Implementa lo mínimo del protocolo: initialize, ping, tools/list y tools/call. Sin dependencias.
 */

const SUPPORTED_VERSIONS = ["2025-11-25", "2025-06-18", "2025-03-26", "2024-11-05"];
const MAX_BODY = 64_000;

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "content-type, accept, mcp-protocol-version, mcp-session-id",
};

const readOnly = { readOnlyHint: true, destructiveHint: false, openWorldHint: false };
const noInput = { type: "object", properties: {}, additionalProperties: false };

const TOOLS = [
  {
    name: "listar_proyectos",
    title: "Listar proyectos",
    description: "Lista los proyectos publicados de AuraTech con estado, año, organización y enlace al caso de estudio.",
    inputSchema: noInput,
    annotations: readOnly,
  },
  {
    name: "ver_proyecto",
    title: "Ver un caso de estudio",
    description: "Devuelve el caso de estudio completo en Markdown: contexto, qué se construyó, arquitectura por capas, decisiones técnicas y resultado.",
    inputSchema: {
      type: "object",
      properties: { slug: { type: "string", enum: projects.map((project) => project.slug), description: "Identificador del proyecto (ver listar_proyectos)." } },
      required: ["slug"],
      additionalProperties: false,
    },
    annotations: readOnly,
  },
  {
    name: "servicios",
    title: "Servicios y forma de trabajo",
    description: "Qué ofrece AuraTech y cómo trabaja un proyecto, de la primera conversación a la puesta en marcha.",
    inputSchema: noInput,
    annotations: readOnly,
  },
  {
    name: "buscar",
    title: "Buscar en proyectos y servicios",
    description: "Busca una palabra o tecnología (por ejemplo «Webpay», «PostgreSQL» o «horarios») en proyectos y servicios.",
    inputSchema: {
      type: "object",
      properties: { consulta: { type: "string", minLength: 2, maxLength: 80, description: "Palabra o frase a buscar." } },
      required: ["consulta"],
      additionalProperties: false,
    },
    annotations: readOnly,
  },
  {
    name: "contacto",
    title: "Contacto",
    description: "Cómo contactar a AuraTech para conversar un proyecto y qué información conviene incluir.",
    inputSchema: noInput,
    annotations: readOnly,
  },
];

const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

const caseUrl = (slug: string) => `${site.url}/proyectos/${slug}`;

function callTool(name: string, args: Record<string, unknown>): { text: string; isError?: boolean } {
  switch (name) {
    case "listar_proyectos":
      return {
        text: projects
          .map((project) => `- ${project.name} (${project.slug}): ${project.kicker}. ${project.status}, ${project.year}. ${project.client}. ${caseUrl(project.slug)}`)
          .join("\n"),
      };
    case "ver_proyecto": {
      const project = typeof args.slug === "string" ? getProject(args.slug) : undefined;
      if (!project) return { text: `No existe ese proyecto. Opciones: ${projects.map((item) => item.slug).join(", ")}.`, isError: true };
      return { text: projectMarkdown(project) };
    }
    case "servicios":
      return {
        text: [
          `${settings.company}: ${settings.tagline}.`,
          "",
          ...services.map((service) => `- ${service.title}: ${service.body}`),
          "",
          "Cómo trabajamos:",
          ...steps.map((step, index) => `${index + 1}. ${step.title}: ${step.body}`),
        ].join("\n"),
      };
    case "buscar": {
      const query = typeof args.consulta === "string" ? normalize(args.consulta.trim()).slice(0, 80) : "";
      if (query.length < 2) return { text: "Escribe al menos dos letras.", isError: true };
      const hits = [
        ...projects
          .filter((project) =>
            normalize(
              [project.name, project.kicker, project.summary, project.context, ...project.stack, ...project.decisions, ...project.built.flatMap((item) => [item.title, item.body])].join(" "),
            ).includes(query),
          )
          .map((project) => `- Proyecto ${project.name}: ${project.kicker}. ${caseUrl(project.slug)}`),
        ...services.filter((service) => normalize(`${service.title} ${service.body}`).includes(query)).map((service) => `- Servicio ${service.title}: ${service.body}`),
      ];
      return { text: hits.length ? hits.join("\n") : `Sin resultados para «${args.consulta}».` };
    }
    case "contacto": {
      const linkedin = socials.find((social) => social.label === "LinkedIn");
      return {
        text: [
          `Correo: ${site.email}`,
          `WhatsApp: ${founder.whatsapp}`,
          linkedin ? `LinkedIn: ${linkedin.href}` : "",
          `Ubicación: ${founder.location}`,
          "",
          "Para cotizar, cuenta qué proceso quieres resolver, qué tipo de organización eres, para cuándo lo necesitas y un presupuesto aproximado.",
        ]
          .filter((line) => line !== "")
          .join("\n"),
      };
    }
    default:
      return { text: `Herramienta desconocida: ${name}.`, isError: true };
  }
}

type Message = { jsonrpc?: string; id?: string | number | null; method?: string; params?: Record<string, unknown> };

const result = (id: Message["id"], value: unknown) => ({ jsonrpc: "2.0", id, result: value });
const failure = (id: Message["id"], code: number, message: string) => ({ jsonrpc: "2.0", id: id ?? null, error: { code, message } });

async function handle(message: Message) {
  if (message?.jsonrpc !== "2.0" || typeof message.method !== "string") return failure(message?.id, -32600, "Solicitud inválida");
  const { id, method, params = {} } = message;

  switch (method) {
    case "initialize": {
      const requested = String(params.protocolVersion ?? "");
      return result(id, {
        protocolVersion: SUPPORTED_VERSIONS.includes(requested) ? requested : SUPPORTED_VERSIONS[0],
        capabilities: { tools: { listChanged: false } },
        serverInfo: { name: "auratech", title: settings.company, version: "1.0.0", websiteUrl: site.url },
        instructions: `Servidor de solo lectura de ${settings.company}, estudio de software de La Araucanía, Chile. Responde en español. Usa listar_proyectos y ver_proyecto para hablar de su trabajo; nunca inventes precios ni plazos: para eso, contacto.`,
      });
    }
    case "ping":
      return result(id, {});
    case "tools/list":
      return result(id, { tools: TOOLS });
    case "tools/call": {
      const name = String(params.name ?? "");
      const args = (params.arguments && typeof params.arguments === "object" ? params.arguments : {}) as Record<string, unknown>;
      const output = callTool(name, args);
      if (TOOLS.some((tool) => tool.name === name)) {
        // Cuenta qué herramientas usan los asistentes, sin datos de quién (igual que el resto de la medición).
        await storeEvent({ ts: new Date().toISOString(), t: "click", p: "/mcp", k: `mcp:${name}`, d: "escritorio" }).catch(() => {});
      }
      return result(id, { content: [{ type: "text", text: output.text }], isError: Boolean(output.isError) });
    }
    default:
      return failure(id, -32601, `Método no soportado: ${method}`);
  }
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", ...CORS } });

export async function POST(request: Request) {
  const text = await request.text();
  if (text.length > MAX_BODY) return json(failure(null, -32600, "Solicitud demasiado grande"), 413);

  let payload: Message | Message[];
  try {
    payload = JSON.parse(text);
  } catch {
    return json(failure(null, -32700, "JSON inválido"), 400);
  }

  const messages = Array.isArray(payload) ? payload.slice(0, 20) : [payload];
  const requests = messages.filter((message) => message && message.id !== undefined && message.id !== null);
  // Solo notificaciones (por ejemplo, notifications/initialized): se aceptan sin cuerpo.
  if (!requests.length) return new Response(null, { status: 202, headers: CORS });

  const replies = await Promise.all(requests.map(handle));
  return json(Array.isArray(payload) ? replies : replies[0]);
}

/** Este servidor no abre un flujo de eventos (SSE): todo va por POST. */
export function GET() {
  return new Response("Servidor MCP de AuraTech. Usa POST con JSON-RPC (transporte HTTP de MCP).", {
    status: 405,
    headers: { Allow: "POST, OPTIONS", "Content-Type": "text/plain; charset=utf-8", ...CORS },
  });
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}
