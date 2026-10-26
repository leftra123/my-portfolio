import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/page-header";
import { ProfileEditor } from "@/components/admin/profile-editor";
import { canWrite, readCollection } from "@/lib/admin/store";

export const metadata: Metadata = { title: "Perfil" };

export default async function ProfilePage() {
  const profile = await readCollection("perfil");
  return (
    <>
      <PageHeader
        eyebrow="Contenido"
        title="Perfil del fundador"
        description="Tus datos como fundador: aparecen en Historia, en el CV y en el contacto."
      />
      <ProfileEditor initial={profile} readOnly={!canWrite()} />
    </>
  );
}
