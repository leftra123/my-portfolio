import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListEditor } from "@/components/admin/list-editor";
import { PageHeader } from "@/components/admin/page-header";
import { listConfigs } from "@/lib/admin/fields";
import { canWrite, isCollection, readCollection } from "@/lib/admin/store";

export async function generateMetadata({ params }: { params: Promise<{ coleccion: string }> }): Promise<Metadata> {
  const { coleccion } = await params;
  return { title: listConfigs[coleccion]?.title ?? "Contenido" };
}

export default async function CollectionPage({ params }: { params: Promise<{ coleccion: string }> }) {
  const { coleccion } = await params;
  const config = listConfigs[coleccion];
  if (!config || !isCollection(coleccion)) notFound();
  const items = (await readCollection(coleccion)) as Record<string, unknown>[];

  return (
    <>
      <PageHeader eyebrow="Contenido" title={config.title} description={config.description} />
      <ListEditor key={coleccion} name={coleccion} initial={items} readOnly={!canWrite()} />
    </>
  );
}
