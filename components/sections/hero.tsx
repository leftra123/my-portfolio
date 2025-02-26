"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import { GithubIcon, LinkedinIcon, X, Instagram, File } from "lucide-react"
import Image from "next/image"
import React from "react"

const socialLinks = [
  { icon: <GithubIcon className="w-5 h-5" />, link: 'https://github.com/leftra123', label: 'Github' },
  { icon: <LinkedinIcon className="w-5 h-5" />, link: 'https://linkedin.com/in/eric-aguayo-quintriqueo-b36783220', label: 'LinkedIn' },
  { icon: <X className="w-5 h-5" />, link: 'https://x.com/leftra123', label: 'X (Twitter)' },
  { icon: <Instagram className="w-5 h-5" />, link: 'https://www.instagram.com/analema.x/', label: 'Instagram' },
  { icon: <File className="w-5 h-5" />, link: 'https://drive.google.com/file/d/1aqNROgnTe8nnH6YoIJ__5t6XxpRtuVI9/view', label: 'CV en PDF' }
]

function scrollToSection(id: string) {
  const section = document.getElementById(id)
  section?.scrollIntoView({ behavior: 'smooth' })
}

export function HeroSection() {
  return (
    <div className="min-h-screen snap-start flex flex-col items-center justify-center relative px-4 py-8 md:py-12" id="hero">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center w-full max-w-4xl"
      >
        {/* Contenedor de imagen */}
        <div className="relative w-64 h-64 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 animate-spin"></div>
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <Image
              src="https://media.licdn.com/dms/image/v2/D4E03AQGxNzYNbH4cTg/profile-displayphoto-shrink_800_800/B4EZR0iOZxHMAk-/0/1737121918154?e=1745452800&v=beta&t=DmiJYuunNF1GhUsAlnZJM6UAugce8K8yYZLBEM1dNoQ"
              alt="Foto de perfil de Eric Aguayo Quintriqueo"
              fill
              className="rounded-full border-4 border-primary/20 object-cover"
            />
          </div>
        </div>

        {/* Títulos */}
        <motion.h1
          className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 px-2"
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
        <div className="flex flex-col md:flex-row gap-3 justify-center mb-8 md:mb-12 px-2">
          <Button
            size="lg"
            className="w-full md:w-auto"
            onClick={() => scrollToSection('projects')}
          >
            Ver Proyectos
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full md:w-auto"
            onClick={() => scrollToSection('contacto')}
          >
            Contacto
          </Button>
        </div>

        {/* Redes sociales */}
        <div className="flex flex-wrap gap-2 justify-center px-2">
          {socialLinks.map((item) => (
            <Button
              key={item.link}
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full"
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
        className="absolute bottom-4 md:bottom-8"
      >
        <div className="animate-bounce">
          <div className="w-5 h-8 md:w-6 md:h-10 rounded-full border-2 border-primary flex items-start justify-center p-1.5 md:p-2">
            <div className="w-1 h-2 md:h-3 bg-primary rounded-full animate-scroll" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
