"use client"

import { Button } from "@/components/ui/button"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import { motion } from "framer-motion"
import Image from "next/image"
// Importamos React Icons
import { FaFileAlt, FaGithub, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa"

const socialLinks = [
  { icon: <FaGithub className="w-5 h-5" />, link: 'https://github.com/leftra123', label: 'Github' },
  { icon: <FaLinkedinIn className="w-5 h-5" />, link: 'https://linkedin.com/in/eric-aguayo-quintriqueo-b36783220', label: 'LinkedIn' },
  // { icon: <FaTwitter className="w-5 h-5" />, link: 'https://x.com/leftra123', label: 'X (Twitter)' },
  { icon: <FaInstagram className="w-5 h-5" />, link: 'https://www.instagram.com/analema.x/', label: 'Instagram' },
  { icon: <FaWhatsapp className="w-5 h-5" />, link: 'https://wa.me/+56930518083', label: 'WhatsApp' },
  { icon: <FaFileAlt className="w-5 h-5" />, link: 'https://drive.google.com/file/d/1aqNROgnTe8nnH6YoIJ__5t6XxpRtuVI9/view', label: 'CV en PDF' },
]

function scrollToSection(id: string) {
  const section = document.getElementById(id)
  section?.scrollIntoView({ behavior: 'smooth' })
}

export function HeroSection() {
  return (
    <div className="pt-24 pb-16 md:pt-28 md:pb-20 lg:py-24 bg-gradient-to-b from-background to-background/80" id="hero">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center w-full max-w-4xl md:max-w-5xl px-4 mx-auto"
      >
        {/* Contenedor de imagen mejorado */}
        <div className="relative w-60 h-60 sm:w-64 sm:h-64 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 animate-spin"></div>
          <div className="absolute inset-0 rounded-full blur-xl bg-gradient-to-r from-green-400/30 via-blue-500/30 to-purple-600/30 animate-pulse"></div>
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <Image
              src="/images/perfil.webp"
              alt="Foto de perfil de Eric Agu ayo Quintriqueo"
              fill
              priority
              sizes="(max-width: 640px) 240px, 256px"
              className="rounded-full border-4 border-primary/20 object-cover"
            />
          </div>
        </div>

        {/* Títulos */}
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6text-3xl mb-4 px-2 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Eric Aguayo Quintriqueo
        </motion.h1>

        <TypewriterEffect
          words={["Desarrollador Full Stack", "Especialista en IA", "Innovador Digital"]}
          className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 md:mb-8 px-4"
        />

        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 md:mb-8 px-2">
          Desarrollo experiencias digitales innovadoras con enfoque en React y soluciones de IA.
        </p>

        {/* Botones principales */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8 md:mb-12 px-2">
          <Button
            size="lg"
            className="w-full sm:w-auto bg-primary/90 hover:bg-primary transition-all duration-300"
            onClick={() => scrollToSection('projects')}
          >
            Ver Proyectos
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
            onClick={() => scrollToSection('contacto')}
          >
            Contacto
          </Button>
        </div>

        {/* Redes sociales */}
        <div className="flex flex-wrap gap-3 justify-center px-2">
          {socialLinks.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-primary/10 hover:scale-110 transition-all duration-300"
              onClick={() => window.open(item.link, '_blank')}
              aria-label={item.label}
            >
              {item.icon}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2"
      >
        <div className="animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-primary/80 rounded-full animate-pulse" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}