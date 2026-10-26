import { execFile } from "node:child_process";
import { access, mkdir, rename, rm } from "node:fs/promises";
import { join } from "node:path";
import { promisify } from "node:util";
import { DATA_DIR } from "@/lib/admin/store";

/*
 * Captura automática de un sitio con Chrome sin ventana (1440×900 a 2x).
 * Solo funciona en tu computador: en Vercel no hay Chrome.
 */

const run = promisify(execFile);
const CHROME = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PRIVATE_HOST = /^(localhost|127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|0\.0\.0\.0|\[?::1\]?$)/;

export async function screenshotAvailable() {
  if (process.env.VERCEL) return false;
  return access(CHROME).then(
    () => true,
    () => false,
  );
}

export async function captureSite(rawUrl: string, slug: string) {
  if (!(await screenshotAvailable())) throw new Error("Las capturas solo funcionan en local con Google Chrome instalado.");
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    throw new Error("La URL no es válida.");
  }
  if (!/^https?:$/.test(url.protocol) || PRIVATE_HOST.test(url.hostname)) {
    throw new Error("Solo capturo sitios públicos (http o https).");
  }
  if (!/^[a-z0-9-]{1,60}$/.test(slug)) throw new Error("El nombre del archivo debe ir en minúsculas, números y guiones.");

  const tmpDir = join(DATA_DIR, "capturas");
  await mkdir(tmpDir, { recursive: true });
  const png = join(tmpDir, `${slug}.png`);
  const profile = join(tmpDir, "perfil-chrome");

  await run(
    CHROME,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--force-device-scale-factor=2",
      "--window-size=1440,900",
      "--virtual-time-budget=6000",
      `--user-data-dir=${profile}`,
      `--screenshot=${png}`,
      url.toString(),
    ],
    { timeout: 60_000 },
  );

  const publicDir = join(process.cwd(), "public", "work");
  await mkdir(publicDir, { recursive: true });

  // En macOS se comprime a JPEG con sips; si no existe, se publica el PNG tal cual.
  try {
    await run("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "80", "-Z", "1800", png, "--out", join(publicDir, `${slug}.jpg`)], {
      timeout: 30_000,
    });
    await rm(png, { force: true });
    return `/work/${slug}.jpg`;
  } catch {
    await rename(png, join(publicDir, `${slug}.png`));
    return `/work/${slug}.png`;
  }
}
