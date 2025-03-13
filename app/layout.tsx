import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const sansFont = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Optimiza la carga de fuentes
});

const monoFont = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Eric Aguayo Quintriqueo | Portfolio",
  description: "Portfolio de Eric Aguayo Quintriqueo - Estudiante de Ingeniería en Informática y Analista Programador",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5", // Mejor para accesibilidad
  keywords: ["desarrollador", "programador", "portfolio", "web", "React", "NextJS", "ingeniería informática"],
  authors: [{ name: "Eric Aguayo Quintriqueo" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CL" suppressHydrationWarning>
      <head>
        {/* Mejora el color de la barra de estado en móviles */}
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" />
      </head>
      <body
        className={`${sansFont.variable} ${monoFont.variable} antialiased min-h-screen overflow-x-hidden`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}