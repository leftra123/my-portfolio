"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/ui/project-card"
import { useProjects, Proyecto } from "@/hooks/useProjects"

const proyectos: Proyecto[] = [
  {
    id: 1,
    title: "RemuPro (colab)",
    description:
      "Solución para procesamiento automatizado de remuneraciones en el sector educativo (SEP, PIE y NORMAL). Interfaz amigable con PyQt5 y cálculos avanzados en Python.",
    tech: ["Python", "PyQt5"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    repoUrl: "https://github.com/leftra123/colab",
    category: "datos"
  },
  {
    id: 2,
    title: "Transporte_2",
    description:
      "Aplicación web para calcular horas extras y pagos a conductores, gestionando rutas de furgones y proveedores.",
    tech: ["Python", "Backend"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    repoUrl: "https://github.com/leftra123/transporte_2",
    category: "backend"
  },
  {
    id: 3,
    title: "Landing Tesla",
    description:
      "Clon de la página de Tesla realizado con HTML, CSS, JavaScript, Astro y TailwindCSS. Desplegado en Netlify.",
    tech: ["HTML", "CSS", "JavaScript", "Astro", "TailwindCSS"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
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
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    repoUrl: "https://github.com/leftra123/gestion-educativa-api",
    category: "fullstack"
  },
  {
    id: 6,
    title: "Arduino Project",
    description:
      "Proyecto en C para Arduino: controla LEDs, buzzer y muestra mensajes según valores numéricos y potenciómetro.",
    tech: ["C", "Arduino"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    repoUrl: "https://github.com/leftra123/arduino",
    category: "hardware"
  },
  {
    id: 7,
    title: "Devolución Project (Django)",
    description:
      "Sistema de control de devoluciones para Ideal S.A. con roles administrativos y consulta de API REST para valor del dólar.",
    tech: ["Python", "Django", "MySQL"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    repoUrl: "https://github.com/leftra123/devolucion-project-django",
    category: "backend"
  },
  {
    id: 8,
    title: "Innovación Emprendimiento II",
    description:
      "Proyecto para compartir ideas y proyectos de la comunidad, utilizando HTML, CSS y JavaScript.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    repoUrl: "https://github.com/leftra123/innovacionemprendimientoII",
    category: "frontend"
  },
  {
    id: 9,
    title: "Incidentes Inacap",
    description:
      "Aplicación móvil que une Java con Firebase para gestionar incidentes, desarrollada como evaluación académica.",
    tech: ["Java", "Firebase", "Mobile"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    repoUrl: "https://github.com/leftra123/incidentes_inacap_evaluacion_3",
    category: "movil"
  },
  {
    id: 10,
    title: "NextJS Context CRUD",
    description:
      "Aplicación hecha con Next.js que guarda información en la memoria caché del equipo. Permite operaciones CRUD sin base de datos y está desplegada en Vercel.",
    tech: ["Next.js", "JavaScript"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    repoUrl: "https://github.com/leftra123/nextjs-context-crud-first",
    category: "fullstack"
  },
  {
    id: 11,
    title: "Tasks",
    description:
      "Aplicación de tareas hecha con React que guarda información en la memoria local. Desplegada con Docker.",
    tech: ["React", "JavaScript", "Docker"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    repoUrl: "https://github.com/leftra123/tasks",
    category: "frontend"
  },
  {
    id: 12,
    title: "ERP Project",
    description:
      "Sistema ERP con Django en el backend y template en HTML, CSS y JavaScript en el frontend, diseñado para optimizar la gestión empresarial. Desplegado con Docker.",
    tech: ["Django", "HTML", "CSS", "JavaScript", "Docker"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    repoUrl: "https://github.com/patoag/erp-project",
    category: "fullstack"
  }
]

const categorias = [
  { id: "todos", label: "Todos" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "fullstack", label: "Full Stack" },
  { id: "datos", label: "Procesamiento de Datos" },
  { id: "hardware", label: "Hardware" },
  { id: "movil", label: "Móvil" },
]

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
      className="min-h-screen flex flex-col items-center justify-center py-20 pb-28 bg-gradient-to-b from-background to-background/80"
      id="projects"
    >
      <div className="max-w-7xl mx-auto px-4 w-full">
        <h2 className="text-4xl font-bold mb-12">Proyectos</h2>

        {/* Botones de Categorías */}
        <div className="flex flex-wrap gap-2 mb-8 pb-2 w-full max-w-full overflow-x-auto py-2">
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
          >
            {projectsToShow.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </motion.div>

        </AnimatePresence>

        {/* Botón "Ver más" solo si hay más de 675 proyectos filtrados */}
        {filteredProjects.length > 3 && (
          <div className="mt-12 mb-6 flex justify-center sticky -bottom-2">
            <Button
              variant="outline"
              className="bg-background/80 backdrop-blur-sm shadow-lg rounded-full px-6"
              onClick={() => setShowAllProjects(!showAllProjects)}
            >
              {showAllProjects ? "Ver menos" : "Ver más"}
            </Button>
          </div>
        )}

      </div>
    </section>
  )
}