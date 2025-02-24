"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GithubIcon, LinkedinIcon, X, Instagram, File } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="min-h-screen snap-start flex flex-col items-center justify-center border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Columna 1: Logo y redes */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Eric Aguayo Quintriqueo</h3>
            <p className="text-sm text-muted-foreground">
              Desarrollando soluciones digitales innovadoras
            </p>
            <div className="flex gap-2">
              {[
                { icon: <GithubIcon className="w-5 h-5" />, link: 'https://github.com/leftra123' },
                { icon: <LinkedinIcon className="w-5 h-5" />, link: 'https://linkedin.com/in/eric-aguayo-quintriqueo-b36783220' },
                { icon: <X className="w-5 h-5" />, link: 'https://x.com/leftra123' },
                { icon: <Instagram className="w-5 h-5" />, link: 'https://www.instagram.com/analema.x/' },
              ].map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full"
                  asChild
                >
                  <Link href={item.link} target="_blank" rel="noopener">
                    {item.icon}
                  </Link>
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Columna 2: Navegación */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <h4 className="text-lg font-semibold">Navegación</h4>
            <nav className="flex flex-col space-y-1">
              {[
                { label: 'Inicio', href: '#hero' },
                { label: 'Experiencia', href: '#experiencia' },
                { label: 'Educación', href: '#educacion' },
                { label: 'Proyectos', href: '#projects' },
                { label: 'Contacto', href: '#contacto' },
              ].map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Columna 3: Recursos */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <h4 className="text-lg font-semibold">Recursos</h4>
            <div className="flex flex-col space-y-1">
              <Button variant="link" className="justify-start h-auto p-0" asChild>
                <Link
                  href="https://drive.google.com/file/d/1aqNROgnTe8nnH6YoIJ__5t6XxpRtuVI9/view"
                  target="_blank"
                  className="text-muted-foreground hover:text-primary"
                >
                  <File className="w-4 h-4 mr-2" />
                  Curriculum Vitae
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Derechos de autor */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t pt-8 text-center text-sm text-muted-foreground"
        >
          <p>© {currentYear} Eric Aguayo Quintriqueo. Todos los derechos reservados.</p>
          <p>Desarrollado con Next.js, Tailwind CSS y Vercel</p>
        </motion.div>

        {/* Botón flotante para ir arriba */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="fixed bottom-8 right-8"
        >
          <Button
            variant="outline"
            size="icon"
            className="rounded-full shadow-lg"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            ↑
          </Button>
        </motion.div>
      </div>
    </footer>
  )
}