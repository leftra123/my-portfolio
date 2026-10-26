import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Isotipo } from "@/components/brand/isotipo";
import { LoginForm } from "@/components/admin/login-form";
import { isAdmin } from "@/lib/admin/auth";
import { adminEnabled } from "@/lib/admin/session";

export const metadata: Metadata = { title: "Acceso" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ volver?: string }> }) {
  const { volver = "/admin" } = await searchParams;
  if (await isAdmin()) redirect(volver.startsWith("/admin") ? volver : "/admin");
  const enabled = adminEnabled();

  return (
    <main id="contenido" className="relative isolate grid min-h-dvh place-items-center px-5">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
      <div aria-hidden className="aura-halo absolute top-[-20%] left-1/2 -z-10 size-[640px] -translate-x-1/2" />
      <div className="lit w-full max-w-sm rounded-[28px] border border-line bg-bg-elevated/80 p-8 backdrop-blur-xl">
        <Isotipo className="h-9 w-auto" />
        <h1 className="mt-6 font-display text-2xl font-semibold tracking-tight">Tu espacio</h1>
        <p className="mt-1 text-sm text-fg-muted">Edita el sitio, revisa la auditoría y genera contenido.</p>
        {!enabled ? (
          <p className="mt-6 rounded-xl border border-amber-400/30 bg-amber-400/10 p-3 text-sm text-amber-200">
            El admin está deshabilitado. Define <code className="font-mono">ADMIN_PASSWORD</code> y{" "}
            <code className="font-mono">ADMIN_SECRET</code> en <code className="font-mono">.env.local</code>.
          </p>
        ) : null}
        <LoginForm volver={volver} disabled={!enabled} />
        <Link href="/" className="mt-6 inline-block font-mono text-xs text-fg-subtle hover:text-fg">
          ← Volver al sitio
        </Link>
      </div>
    </main>
  );
}
