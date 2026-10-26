import { appendFile, mkdir, readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { DATA_DIR } from "@/lib/admin/store";

/*
 * Eventos anónimos en .data/eventos/AAAA-MM.jsonl (una línea por evento).
 * Sin IP, sin identificadores, sin agente de usuario: solo qué página y qué clic.
 */

export type StoredEvent = {
  ts: string;
  t: "view" | "click";
  p: string;
  k?: string;
  r?: string;
  d: "movil" | "escritorio";
};

const EVENTS_DIR = join(DATA_DIR, "eventos");

export function analyticsWritable() {
  return !process.env.VERCEL;
}

export async function storeEvent(event: StoredEvent) {
  if (!analyticsWritable()) return;
  await mkdir(EVENTS_DIR, { recursive: true });
  const month = event.ts.slice(0, 7);
  await appendFile(join(EVENTS_DIR, `${month}.jsonl`), `${JSON.stringify(event)}\n`, "utf8");
}

export async function readEvents(sinceDays: number): Promise<StoredEvent[]> {
  const since = Date.now() - sinceDays * 24 * 60 * 60 * 1000;
  let files: string[] = [];
  try {
    files = (await readdir(EVENTS_DIR)).filter((file) => file.endsWith(".jsonl")).sort();
  } catch {
    return [];
  }
  const events: StoredEvent[] = [];
  for (const file of files) {
    const raw = await readFile(join(EVENTS_DIR, file), "utf8");
    for (const line of raw.split("\n")) {
      if (!line) continue;
      try {
        const event = JSON.parse(line) as StoredEvent;
        if (Date.parse(event.ts) >= since) events.push(event);
      } catch {
        // línea corrupta: se ignora
      }
    }
  }
  return events;
}
