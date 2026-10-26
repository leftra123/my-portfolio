import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/data";

export const ogSize = { width: 1200, height: 630 };

type OgProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  path?: string;
};

/** Imagen Open Graph con la identidad Aura Tech (Deep Ink, halo azul, Sora). */
export async function renderOg({ eyebrow, title, subtitle, path = "" }: OgProps) {
  const root = process.cwd();
  const [sora400, sora600, isotipo] = await Promise.all([
    readFile(join(root, "assets/fonts/Sora-400.ttf")),
    readFile(join(root, "assets/fonts/Sora-600.ttf")),
    readFile(join(root, "public/brand/aura-tech-isotipo-color.svg")),
  ]);
  const logo = `data:image/svg+xml;base64,${isotipo.toString("base64")}`;
  const host = new URL(site.url).host;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: "#07111F",
          backgroundImage:
            "radial-gradient(circle at 88% 18%, rgba(22,139,255,0.38), rgba(7,17,31,0) 46%), radial-gradient(circle at 0% 100%, rgba(66,181,255,0.10), rgba(7,17,31,0) 40%)",
          color: "#EEF7FF",
          fontFamily: "Sora",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} width={64} height={64} alt="" />
            <span style={{ fontSize: 26, fontWeight: 600, letterSpacing: -0.5 }}>{site.company}</span>
          </div>
          <span style={{ fontSize: 20, color: "#8494AB", letterSpacing: 2, textTransform: "uppercase" }}>{eyebrow}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 960 }}>
          <span style={{ fontSize: title.length > 34 ? 66 : 82, fontWeight: 600, lineHeight: 1.02, letterSpacing: -3 }}>
            {title}
          </span>
          <span style={{ fontSize: 28, lineHeight: 1.35, color: "#A7B4C6" }}>{subtitle}</span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(238,247,255,0.12)",
            paddingTop: 26,
            fontSize: 20,
            color: "#8494AB",
          }}
        >
          <span>
            {host}
            {path}
          </span>
          <span style={{ color: "#42B5FF" }}>{site.motto}</span>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Sora", data: sora400, weight: 400, style: "normal" },
        { name: "Sora", data: sora600, weight: 600, style: "normal" },
      ],
    },
  );
}
