import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import { AuraDefs } from "@/components/brand/isotipo";
import { ThemeProvider } from "@/components/theme-provider";
import { settings, site } from "@/lib/data";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${site.company}` },
  description: site.description,
  applicationName: site.company,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.company,
  keywords: [
    "desarrollador full-stack",
    "Next.js",
    "Supabase",
    "La Araucanía",
    "Temuco",
    "Galvarino",
    "software educación pública",
    "Webpay",
    "AuraTech",
    "software a medida",
    "Eric Aguayo Quintriqueo",
  ],
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: site.url,
    siteName: site.company,
    title: site.title,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  icons: {
    icon: [
      { url: "/icons/favicon.ico", sizes: "any" },
      { url: "/icons/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7fafe" },
    { media: "(prefers-color-scheme: dark)", color: "#07111f" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CL" suppressHydrationWarning data-scroll-behavior="smooth" className={`${sora.variable} ${geist.variable} ${geistMono.variable}`}>
      <body className="grain min-h-dvh overflow-x-clip">
        <ThemeProvider
          attribute="class"
          defaultTheme={settings.defaultTheme}
          enableSystem={settings.defaultTheme === "system"}
          disableTransitionOnChange
        >
          <AuraDefs />
          <a
            href="#contenido"
            className="sr-only z-[70] rounded-full bg-btn px-4 py-2 text-sm text-btn-fg focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
          >
            Saltar al contenido
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
