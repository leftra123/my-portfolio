import { ogSize, renderOg } from "@/lib/og";

export const alt = "AuraTech — Software a medida en La Araucanía";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    eyebrow: "Software a medida",
    title: "De la planilla al sistema en producción.",
    subtitle: "Plataformas, automatización e integraciones para instituciones y pymes del sur de Chile.",
  });
}
