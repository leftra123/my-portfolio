"use client"

import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/ui/project-card"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

// Definición del tipo Proyecto
interface Proyecto {
  id: number
  title: string
  description: string
  tech: string[]
  image?: string
  repoUrl: string
  category: string
  educational?: boolean
}

// Lista de proyectos
const proyectos: Proyecto[] = [
  {
    id: 1,
    title: "RemuPro (colab)",
    description:
      "Solución para procesamiento automatizado de remuneraciones en el sector educativo. Interfaz desarrollada con PyQt5 y cálculos avanzados en Python.",
    tech: ["Python", "PyQt5", "Pandas"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    repoUrl: "https://github.com/leftra123/colab",
    category: "datos",
    educational: true
  },
  {
    id: 2,
    title: "Sistema de Transporte",
    description:
      "Aplicación web para calcular horas extras y pagos a conductores, gestionando rutas y proveedores de transporte escolar.",
    tech: ["Python", "Django", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    repoUrl: "https://github.com/leftra123/transporte_2",
    category: "backend",
    educational: true
  },
  {
    id: 3,
    title: "Landing Tesla",
    description:
      "Clon de la página principal de Tesla desarrollado con HTML, CSS, JavaScript, Astro y TailwindCSS. Desplegado en Netlify. Proyecto realizado como ejercicio académico.",
    tech: ["HTML", "CSS", "JavaScript", "Astro", "TailwindCSS"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    repoUrl: "https://github.com/leftra123/landing-tesla",
    category: "frontend",
    educational: true
  },
  {
    id: 4,
    title: "Tarjeta de Felicitación Digital",
    description:
      "Tarjeta interactiva con contador, animaciones, audio y mensajes progresivos. Una experiencia web personalizada con efectos visuales y sonoros.",
    tech: ["HTML", "CSS", "JavaScript", "Animaciones"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    repoUrl: "https://github.com/leftra123/juan-del-sur",
    category: "frontend"
  },
  {
    id: 5,
    title: "Sistema de Gestión Educativa",
    description:
      "Plataforma completa para gestión educativa desarrollada con Django en el servidor y React + Tailwind en el cliente. CRUD completo para establecimientos y personal.",
    tech: ["Django", "React", "TailwindCSS", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    repoUrl: "https://github.com/leftra123/gestion-educativa-api",
    category: "fullstack",
    educational: true
  },
  {
    id: 6,
    title: "Proyecto Arduino",
    description:
      "Sistema en C para Arduino que controla LEDs, buzzer y displays según valores numéricos y entradas de potenciómetro. Desarrollado como proyecto de curso de electrónica.",
    tech: ["C", "Arduino", "Hardware"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    repoUrl: "https://github.com/leftra123/arduino",
    category: "hardware",
    educational: true
  },
  {
    id: 7,
    title: "Sistema de Devoluciones",
    description:
      "Plataforma para control de devoluciones con roles administrativos y consulta de API REST para valor del dólar. Desarrollado con Django y MySQL durante mi formación académica.",
    tech: ["Python", "Django", "MySQL", "API REST"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    repoUrl: "https://github.com/leftra123/devolucion-project-django",
    category: "backend",
    educational: true
  },
  {
    id: 8,
    title: "Portal de Innovación y Emprendimiento",
    description:
      "Plataforma para compartir ideas y proyectos dentro de la comunidad educativa, desarrollada con tecnologías web modernas como parte de un proyecto de curso.",
    tech: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    repoUrl: "https://github.com/leftra123/innovacionemprendimientoII",
    category: "frontend",
    educational: true
  },
  {
    id: 9,
    title: "App Gestión de Incidentes",
    description:
      "Aplicación móvil que integra Java con Firebase para gestionar y reportar incidentes en tiempo real. Proyecto académico del curso de desarrollo móvil.",
    tech: ["Java", "Firebase", "Android Studio"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    repoUrl: "https://github.com/leftra123/incidentes_inacap_evaluacion_3",
    category: "movil",
    educational: true
  },
  {
    id: 10,
    title: "NextJS CRUD con Context API",
    description:
      "Aplicación desarrollada con Next.js para gestión de datos utilizando Context API. Desplegada en Vercel. Proyecto realizado para aprender sobre React Context.",
    tech: ["Next.js", "React", "Context API", "Vercel"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    repoUrl: "https://github.com/leftra123/nextjs-context-crud-first",
    category: "fullstack",
    educational: true
  },
  {
    id: 11,
    title: "Aplicación de Tareas",
    description:
      "Aplicación de gestión de tareas hecha con React que almacena información en localStorage. Desplegada con Docker. Proyecto personal para aprender sobre persistencia de datos.",
    tech: ["React", "JavaScript", "Docker", "LocalStorage"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    repoUrl: "https://github.com/leftra123/tasks",
    category: "frontend",
    educational: true
  },
  {
    id: 12,
    title: "Sistema ERP",
    description:
      "Sistema de planificación de recursos empresariales con Django en el backend y HTML/CSS/JS en el frontend. Optimizado para gestión empresarial y desplegado con Docker.",
    tech: ["Django", "HTML", "CSS", "JavaScript", "Docker"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    repoUrl: "https://github.com/patoag/erp-project",
    category: "fullstack",
    educational: true
  }
]

// Categorías para filtrar proyectos
const categorias = [
  { id: "todos", label: "Todos" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "fullstack", label: "Full Stack" },
  { id: "datos", label: "Datos" },
  { id: "hardware", label: "Hardware" },
  { id: "movil", label: "Móvil" },
]

// Hook personalizado para gestionar proyectos
const useProjects = (projects: Proyecto[]) => {
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [showAllProjects, setShowAllProjects] = useState(false)

  // Filtrar proyectos por categoría
  const filteredProjects = selectedCategory === "todos"
    ? projects
    : projects.filter(project => project.category === selectedCategory)

  // Mostrar todos los proyectos o solo los primeros 3
  const projectsToShow = showAllProjects 
    ? filteredProjects 
    : filteredProjects.slice(0, 3)

  return {
    selectedCategory,
    setSelectedCategory,
    showAllProjects,
    setShowAllProjects,
    filteredProjects,
    projectsToShow,
  }
}

export function ProjectsSection() {
  const {
    selectedCategory,
    setSelectedCategory,
    showAllProjects,
    setShowAllProjects,
    filteredProjects,
    projectsToShow,
  } = useProjects(proyectos)

  return (
    <section
      className="py-20 md:py-24 bg-gradient-to-b from-background to-background/80"
      id="projects"
    >
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Proyectos
          </h2>
          <p className="text-muted-foreground max-w-4xl">
            Una colección de proyectos desarrollados durante mi formación académica y exploración personal. La mayoría de estos proyectos fueron realizados con fines educativos y para fortalecer habilidades específicas.
          </p>
        </motion.div>

        {/* Botones de Categorías */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-2 mb-10 pb-2 w-full max-w-full overflow-x-auto py-2"
        >
          {categorias.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.05 * index }}
            >
              <Button
                variant={selectedCategory === cat.id ? "default" : "outline"}
                onClick={() => {
                  setSelectedCategory(cat.id)
                  setShowAllProjects(false)
                }}
                className="whitespace-nowrap"
              >
                {cat.label}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Lista de Proyectos con animación */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
          >
            {projectsToShow.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <ProjectCard
                  {...project}
                  description={project.educational ? 
                    `${project.description} ${project.description.includes("académic") ? "" : "(Proyecto educativo)"}` : 
                    project.description}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Botón "Ver más" */}
        {filteredProjects.length > 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center mt-12"
          >
            <Button
              variant="outline"
              className="bg-background/80 backdrop-blur-sm rounded-full px-6 hover:bg-background/90 transition-all duration-300"
              onClick={() => setShowAllProjects(!showAllProjects)}
            >
              {showAllProjects ? "Ver menos" : `Ver ${filteredProjects.length - 3} proyectos más`}
            </Button>
          </motion.div>
        )}
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground italic max-w-4xl mx-auto">
            Nota: Los proyectos mostrados fueron desarrollados principalmente con fines educativos y de aprendizaje durante mi formación como Analista Programador y actualmente en Ingeniería en Informática.
          </p>
        </motion.div>
      </div>
    </section>
  )
}