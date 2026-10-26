import { NextResponse, type NextRequest } from "next/server";
import { adminSecret, SESSION_COOKIE, verifySessionToken } from "@/lib/admin/session";

/*
 * Chequeo optimista del admin: sin sesión válida, a /admin/acceso.
 * La autorización real se repite en cada página y acción del servidor (requireAdmin).
 */
export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  if (pathname.startsWith("/admin/acceso")) return NextResponse.next();

  const ok = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value, adminSecret());
  if (ok) return NextResponse.next();

  const login = new URL("/admin/acceso", request.url);
  login.searchParams.set("volver", `${pathname}${search}`);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
