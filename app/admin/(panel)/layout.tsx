import { ExternalLink, LogOut } from "lucide-react";
import Link from "next/link";
import { AdminNav } from "@/components/admin/admin-nav";
import { Isotipo } from "@/components/brand/isotipo";
import { ThemeToggle } from "@/components/theme-toggle";
import { logout } from "@/lib/admin/actions";
import { requireAdmin } from "@/lib/admin/auth";
import { canWrite } from "@/lib/admin/store";

export default async function PanelLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  await requireAdmin();
  const writable = canWrite();

  return (
    <div className="mx-auto grid min-h-dvh max-w-[1400px] lg:grid-cols-[248px_1fr]">
      <aside className="min-w-0 border-b border-line px-4 py-4 lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col lg:border-r lg:border-b-0 lg:px-4 lg:py-6">
        <div className="mb-4 flex items-center justify-between lg:mb-8 lg:px-3">
          <Link href="/admin" className="flex items-center gap-2.5">
            <Isotipo className="h-5 w-auto" />
            <span className="font-display text-[15px] font-semibold tracking-tight">Tu espacio</span>
          </Link>
          <div className="flex items-center gap-1 lg:hidden">
            <ThemeToggle />
            <form action={logout}>
              <button
                type="submit"
                aria-label="Cerrar sesión"
                className="grid size-9 place-items-center rounded-full text-fg-muted hover:bg-fg/[0.06] hover:text-fg"
              >
                <LogOut className="size-4" />
              </button>
            </form>
          </div>
        </div>
        <AdminNav />
        <div className="mt-auto hidden gap-1 pt-6 lg:grid">
          <p className="mb-2 flex items-center gap-2 px-3 font-mono text-[10.5px] text-fg-subtle">
            <span className={`size-1.5 rounded-full ${writable ? "bg-emerald-400" : "bg-amber-400"}`} aria-hidden />
            {writable ? "Edición local activa" : "Producción · solo lectura"}
          </p>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-fg-muted hover:bg-fg/[0.04] hover:text-fg"
          >
            <ExternalLink className="size-4 text-fg-subtle" /> Ver sitio
          </a>
          <div className="flex items-center justify-between">
            <form action={logout}>
              <button
                type="submit"
                className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-fg-muted hover:bg-fg/[0.04] hover:text-fg"
              >
                <LogOut className="size-4 text-fg-subtle" /> Cerrar sesión
              </button>
            </form>
            <ThemeToggle />
          </div>
        </div>
      </aside>
      <main id="contenido" className="min-w-0 px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
        {children}
      </main>
    </div>
  );
}
