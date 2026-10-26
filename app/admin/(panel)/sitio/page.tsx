import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/page-header";
import { SiteEditor } from "@/components/admin/site-editor";
import { canWrite, readCollection } from "@/lib/admin/store";

export const metadata: Metadata = { title: "Sitio" };

export default async function SitePage() {
  const site = await readCollection("sitio");
  return (
    <>
      <PageHeader
        eyebrow="Empresa"
        title={site.company}
        description={`Marca, primera pantalla, anuncio, secciones de la portada y tema. Última actualización: ${site.updated} (se marca sola al guardar).`}
      />
      <SiteEditor initial={site} readOnly={!canWrite()} />
    </>
  );
}
