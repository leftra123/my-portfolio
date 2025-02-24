"use client"
import { Timeline, TimelineItem } from "@/components/ui/timeline"

export function ExperienceSection() {
  return (
    <section className="min-h-screen snap-start flex flex-col items-center justify-center py-20 bg-gradient-to-b from-background to-background/80" id="experiencia">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12">Experiencia Profesional</h2>
        
        <Timeline>
          <TimelineItem 
            title="Encargado de Inventarios y Procesos Administrativos"
            company="Departamento de Educación | Ilustre Municipalidad de Galvarino"
            date="Ene 2024 - Dic 2024"
            description="Gestión y control de inventarios, Sistema de Admisión Escolar (SAE), y declaraciones BRP. Desarrollé habilidades de organización y coordinación en procesos administrativos críticos."
            tech={['SAE', 'BRP', 'Gestión de Inventarios', 'Procesos Administrativos']}
          />
          <TimelineItem 
            title="Encargado de bienes e inventario"
            company="Departamento de Educación | Ilustre Municipalidad de Galvarino"
            date="Ago 2023 - Dic 2023"
            description="Implementación de metodologías ágiles para la optimización de procesos y la protección de la información, realizando reportes periódicos para la toma de decisiones."
            tech={['Metodologías Ágiles', 'Gestión de Inventarios', 'Reportes', 'Optimización de Procesos']}
          />
          <TimelineItem 
            title="Analista de Datos Financieros"
            company="Departamento de Educación | Ilustre Municipalidad de Galvarino"
            date="Jun 2023 - Jul 2023"
            description="Desarrollo de análisis de datos financieros utilizando Google Colab y Python, generando reportes de gestión y propuestas de optimización."
            tech={['Python', 'Google Colab', 'Análisis de Datos', 'Reportes Financieros']}
          />
          <TimelineItem 
            title="Práctica profesional"
            company="Departamento de Educación | Ilustre Municipalidad de Galvarino"
            date="Mar 2023 - Jun 2023"
            description="Desarrollo de software utilizando Django Rest Framework como API y React para el front-end. Implementación de endpoints y pruebas de funcionalidad."
            tech={['Django Rest Framework', 'React', 'API', 'Base de Datos']}
          />
        </Timeline>
      </div>
    </section>
  )
}