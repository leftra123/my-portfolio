"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import { FaFileAlt, FaGithub, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa"

export function Footer() {
  const currentYear = new Date().getFullYear()

  // Array de iconos sociales
  const socialLinks = [
    { icon: <FaGithub className="w-5 h-5" />, link: 'https://github.com/leftra123', label: 'GitHub' },
    { icon: <FaLinkedinIn className="w-5 h-5" />, link: 'https://linkedin.com/in/eric-aguayo-quintriqueo-b36783220', label: 'LinkedIn' },
    { icon: <FaInstagram className="w-5 h-5" />, link: 'https://www.instagram.com/analema.x/', label: 'Instagram' },
    { icon: <FaWhatsapp className="w-5 h-5" />, link: 'https://wa.me/+56930518083', label: 'WhatsApp' },
  ]

  // Links de navegación
  const navLinks = [
    { label: 'Inicio', href: '#hero' },
    { label: 'Experiencia', href: '#experiencia' },
    { label: 'Educación', href: '#educacion' },
    { label: 'Proyectos', href: '#projects' },
    { label: 'Logros', href: '#logros' },
    { label: 'Contacto', href: '#contacto' },
  ]

  // Función para manejar el scroll
  const handleScroll = (href: string) => {
    const sectionId = href.split('#')[1]
    const section = document.getElementById(sectionId)

    if (section) {
      const offsetTop = section.getBoundingClientRect().top + window.pageYOffset
      const navbarHeight = 80 // ajustar según la altura de tu navbar

      window.scrollTo({
        top: offsetTop - navbarHeight,
        behavior: 'smooth'
      })
    }
  }

  return (
    <footer className="py-16 md:py-20 bg-gradient-to-b from-background to-background/80 border-t border-border/10">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        {/* Logo y descripción centrados */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 mb-2">
            Eric Aguayo Quintriqueo
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Estudiante de Ingeniería en Informática y Analista Programador
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Columna 1: Redes sociales */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-12 after:bg-primary">
              Conecta
            </h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full border-border/50 bg-background/50 hover:bg-primary/10 hover:border-primary transition-all duration-300"
                    asChild
                  >
                    <Link href={item.link} target="_blank" rel="noopener" aria-label={item.label}>
                      {item.icon}
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Columna 2: Navegación */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-12 after:bg-primary">
              Navegación
            </h3>
            <nav className="grid grid-cols-2 gap-2">
              {navLinks.map((item, index) => (
                <Button
                  key={index}
                  variant="link"
                  className="p-0 h-auto justify-start text-muted-foreground hover:text-primary"
                  onClick={() => handleScroll(item.href)}
                >
                  <span className="text-primary mr-2">•</span>
                  {item.label}
                </Button>
              ))}
            </nav>
          </motion.div>

          {/* Columna 3: Contacto rápido */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-12 after:bg-primary">
              Recursos
            </h3>
            <div className="space-y-4">
              <Button variant="ghost" className="justify-start h-auto p-0 group" asChild>
                <Link
                  href="https://drive.google.com/file/d/1aqNROgnTe8nnH6YoIJ__5t6XxpRtuVI9/view"
                  target="_blank"
                  className="text-muted-foreground hover:text-primary flex items-center"
                >
                  <FaFileAlt className="w-4 h-4 mr-2 group-hover:text-primary transition-colors" />
                  <span className="group-hover:underline">Curriculum Vitae</span>
                </Link>
              </Button>
              <p className="text-sm text-muted-foreground">
                ¿Interesado en colaborar? Contáctame por correo:
                <Button variant="link" className="h-auto p-0 mt-1" asChild>
                  <a href="mailto:eric04232013@gmail.com" className="text-primary font-medium">
                    eric04232013@gmail.com
                  </a>
                </Button>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Línea divisoria estilizada */}
        <div className="relative py-2 my-6">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        </div>

        {/* Derechos de autor */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-sm text-muted-foreground"
        >
          <p className="mb-1">© {currentYear} Eric Aguayo Quintriqueo. Todos los derechos reservados.</p>
          <p>Desarrollado con Next.js, TailwindCSS y React</p>
        </motion.div>
      </div>
    </footer>
  )
}