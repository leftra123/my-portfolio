"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/ui/project-card"
import { Code, Users, Award } from "lucide-react"

interface Proyecto {
  id: number
  title: string
  description: string
  tech: string[]
  image: string
  repoUrl: string
  category: string
}

const proyectos: Proyecto[] = [
  {
    id: 1,
    title: "RemuPro (colab)",
    description:
      "Solución para procesamiento automatizado de remuneraciones en el sector educativo (SEP, PIE y NORMAL). Interfaz amigable con PyQt5 y cálculos avanzados en Python.",
    tech: ["Python", "PyQt5"],
    image: "https://images.unsplash.com/photo-1603570416953-44dbece210f2",
    repoUrl: "https://github.com/leftra123/colab",
    category: "datos"
  },
  {
    id: 2,
    title: "Transporte_2",
    description:
      "Aplicación web para calcular horas extras y pagos a conductores, gestionando rutas de furgones y proveedores.",
    tech: ["Python", "Backend"],
    image: "https://images.unsplash.com/photo-1522204523234-872ce1d86d1a",
    repoUrl: "https://github.com/leftra123/transporte_2",
    category: "backend"
  },
  {
    id: 3,
    title: "Landing Tesla",
    description:
      "Clon de la página de Tesla realizado con HTML, CSS, JavaScript, Astro y TailwindCSS. Desplegado en Netlify.",
    tech: ["HTML", "CSS", "JavaScript", "Astro", "TailwindCSS"],
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0",
    repoUrl: "https://github.com/leftra123/landing-tesla",
    category: "frontend"
  },
  {
    id: 4,
    title: "Juan del Sur (Tarjeta Felicitación)",
    description:
      "Tarjeta digital con contador para 'Osito', animaciones, audio y mensajes progresivos hasta la fecha estimada de nacimiento.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    repoUrl: "https://github.com/leftra123/juan-del-sur",
    category: "frontend"
  },
  {
    id: 5,
    title: "Gestión Educativa API",
    description:
      "Sistema de gestión educativa con Django en el servidor y React + Tailwind en el cliente. CRUD de establecimientos, docentes y asistentes.",
    tech: ["Django", "React", "TailwindCSS"],
    image: "https://images.unsplash.com/photo-1532614338840-84c4e58f48f8",
    repoUrl: "https://github.com/leftra123/gestion-educativa-api",
    category: "fullstack"
  },
  {
    id: 6,
    title: "Arduino Project",
    description:
      "Proyecto en C para Arduino: controla LEDs, buzzer y muestra mensajes según valores numéricos y potenciómetro.",
    tech: ["C", "Arduino"],
    image: "https://images.unsplash.com/photo-1611078481827-4d7b83f18c6e",
    repoUrl: "https://github.com/leftra123/arduino",
    category: "hardware"
  },
  {
    id: 7,
    title: "Devolución Project (Django)",
    description:
      "Sistema de control de devoluciones para Ideal S.A. con roles administrativos y consulta de API REST para valor del dólar.",
    tech: ["Python", "Django", "MySQL"],
    image: "https://images.unsplash.com/photo-1557625581-5c9aceaf8c56",
    repoUrl: "https://github.com/leftra123/devolucion-project-django",
    category: "backend"
  },
  {
    id: 8,
    title: "Innovación Emprendimiento II",
    description:
      "Proyecto para compartir ideas y proyectos de la comunidad, utilizando HTML, CSS y JavaScript.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998",
    repoUrl: "https://github.com/leftra123/innovacionemprendimientoII",
    category: "frontend"
  },
  {
    id: 9,
    title: "Incidentes Inacap",
    description:
      "Aplicación móvil que une Java con Firebase para gestionar incidentes, desarrollada como evaluación académica.",
    tech: ["Java", "Firebase", "Mobile"],
    image: "https://images.unsplash.com/photo-1618913869524-9d6d8e157f1b",
    repoUrl: "https://github.com/leftra123/incidentes_inacap_evaluacion_3",
    category: "movil"
  },
  // Nuevos proyectos
  {
    id: 10,
    title: "NextJS Context CRUD",
    description:
      "Aplicación hecha con Next.js que guarda información en la memoria caché del equipo. Permite operaciones CRUD sin base de datos y está desplegada en Vercel.",
    tech: ["Next.js", "JavaScript"],
    image: "https://images.unsplash.com/photo-1584697964404-463f7b1b4b1f",
    repoUrl: "https://github.com/leftra123/nextjs-context-crud-first",
    category: "fullstack"
  },
  {
    id: 11,
    title: "Tasks",
    description:
      "Aplicación de tareas hecha con React que guarda información en la memoria local. Desplegada con Docker.",
    tech: ["React", "JavaScript", "Docker"],
    image: "https://images.unsplash.com/photo-1573164574391-1a4c9d6a75b0",
    repoUrl: "https://github.com/leftra123/tasks",
    category: "frontend"
  },
  {
    id: 12,
    title: "ERP Project",
    description:
      "Sistema ERP con Django en el backend y template en HTML, CSS y JavaScript en el frontend, diseñado para optimizar la gestión empresarial. Desplegado con Docker.",
    tech: ["Django", "HTML", "CSS", "JavaScript", "Docker"],
    image: "https://images.unsplash.com/photo-1556155092-8707de31f9c4",
    repoUrl: "https://github.com/patoag/erp-project",
    category: "fullstack"
  }
]

// Categorías en español
const categorias = [
  { id: "todos", label: "Todos" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "fullstack", label: "Full Stack" },
  { id: "datos", label: "Procesamiento de Datos" },
  { id: "hardware", label: "Hardware" },
  { id: "movil", label: "Móvil" }
]

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [showAllProjects, setShowAllProjects] = useState(false)

  // Filtrar proyectos según la categoría seleccionada
  let proyectosFiltrados = proyectos.filter((proyecto) => {
    if (selectedCategory === "todos") return true
    return proyecto.category === selectedCategory
  })

  // Determinar cuántos proyectos mostrar: 3 o todos
  const proyectosAMostrar = showAllProjects
    ? proyectosFiltrados
    : proyectosFiltrados.slice(0, 3)

  return (
    <section className="min-h-screen snap-start flex flex-col items-center justify-center py-20 bg-gradient-to-b from-background to-background/80" id="projects">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12">Proyectos</h2>

        {/* Botones de Categorías */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categorias.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              onClick={() => {
                setSelectedCategory(cat.id)
                setShowAllProjects(false)
              }}
              className="whitespace-nowrap"
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Lista de Proyectos con animación */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {proyectosAMostrar.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Botón "Ver más" solo si hay más de 3 proyectos filtrados */}
        {proyectosFiltrados.length > 3 && (
          <div className="mt-8 flex justify-center">
            <Button onClick={() => setShowAllProjects(!showAllProjects)}>
              {showAllProjects ? "Ver menos" : "Ver más"}
            </Button>
          </div>
        )}

        {/* Sección de Logros */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold mb-8">Logros</h3>
          <div className="grid md:grid-cols-3 gap-6">
  <div className="flex flex-col items-center text-center">
    <Code className="w-6 h-6 mb-2" />
    <p className="text-lg font-bold">5+ Años</p>
    <p className="text-sm text-muted-foreground">de Experiencia</p>
  </div>
  <div className="flex flex-col items-center text-center">
    <Users className="w-6 h-6 mb-2" />
    <p className="text-lg font-bold">10+ Proyectos</p>
    <p className="text-sm text-muted-foreground">en Producción</p>
  </div>
  <div className="flex flex-col items-center text-center">
    <Award className="w-6 h-6 mb-2" />
    <p className="text-lg font-bold">15+ Certificaciones</p>
    <p className="text-sm text-muted-foreground">Obtenidas</p>
  </div>
</div>

        </div>
      </div>
    </section>
  )
}
