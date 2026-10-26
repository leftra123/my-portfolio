import { homeMarkdown, markdownResponse } from "@/lib/markdown";

export const dynamic = "force-static";

/** La portada en Markdown, para asistentes de IA. */
export function GET() {
  return markdownResponse(homeMarkdown(), "/");
}
