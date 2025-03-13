"use client"
import { Button } from "@/components/ui/button"
import { Timeline, TimelineItem } from "@/components/ui/timeline"
import { motion } from "framer-motion"
import { useState } from "react"

export function ExperienceSection() {
  const [showAll, setShowAll] = useState(false)

  const experiences = [
    {
      title: "Encargado de Inventarios y Procesos Administrativos",
      company: "Departamento de Educación | Ilustre Municipalidad de Galvarino",
      date: "Ene 2024 - Dic 2024",
      description: "Gestión de inventarios, administración del Sistema de Admisión Escolar (SAE), y preparación de Declaraciones de Bono de reconocimiento profesional (BRP). Desarrollé habilidades organizativas y de coordinación manejando múltiples procesos administrativos críticos simultáneamente.",
      tech: ['SAE', 'BRP', 'Gestión de Inventarios', 'Procesos Administrativos']
    },
    {
      title: "Encargado de bienes e inventario",
      company: "Departamento de Educación | Ilustre Municipalidad de Galvarino",
      date: "Ago 2023 - Dic 2023",
      description: "Implementación de metodologías ágiles para optimizar procesos de inventario. Generación de reportes para la toma de decisiones y apoyo al equipo de adquisiciones.",
      tech: ['Metodologías Ágiles', 'Gestión de Inventarios', 'Reportes', 'Optimización de Procesos']
    },
    {
      title: "Analista de Datos Financieros",
      company: "Departamento de Educación | Ilustre Municipalidad de Galvarino",
      date: "Jun 2023 - Jul 2023",
      description: "Desarrollo de proyecto de análisis financiero utilizando Google Colab y Python. Generación de reportes de gestión y propuestas de optimización basadas en datos para mejorar indicadores financieros.",
      tech: ['Python', 'Google Colab', 'Análisis de Datos', 'Reportes Financieros']
    },
    {
      title: "Práctica profesional",
      company: "Departamento de Educación | Ilustre Municipalidad de Galvarino",
      date: "Mar 2023 - Jun 2023",
      description: "Desarrollo de software utilizando Django Rest Framework como backend y React para el frontend. Implementación de endpoints, pruebas de funcionalidad e integración con bases de datos. Soporte técnico de hardware.",
      tech: ['Django Rest Framework', 'React', 'API', 'Base de Datos', 'Soporte de Hardware']
    },
    {
      title: "Reponedor",
      company: "Comercial Lily Lmtda",
      date: "Mar 2021 - Abr 2022",
      description: "Organización y rotación de productos, control de inventario y coordinación con proveedores. Aplicación de conocimientos de administración para optimizar la gestión de reposiciones.",
      tech: ['Control de Inventario', 'Organización', 'Coordinación']
    },
    {
      title: "Apoyo de Verano, Cajero, Control de Caja",
      company: "Comercial Lily Lmtda",
      date: "Dic 2018 - Nov 2020",
      description: "Progresión desde apoyo de verano a cajero y supervisor. Manejo de efectivo, emisión de comprobantes, cuadratura diaria y supervisión de registros de ventas.",
      tech: ['Atención al Cliente', 'Manejo de Caja', 'Supervisión']
    },
    {
      title: "Operador de bodega",
      company: "Embonor Coca Cola SA",
      date: "Dic 2017 - Feb 2018",
      description: "Gestión de recepción y despacho de pedidos, control de existencias, picking y embalaje para distribución. Trabajo en equipo para optimizar procesos de carga y despacho.",
      tech: ['Gestión de Inventario', 'Picking', 'Distribución', 'Trabajo en Equipo']
    }
  ]

  // Se muestran las 3 primeras experiencias a menos que se active "Ver más"
  const experiencesToShow = showAll ? experiences : experiences.slice(0, 3)

  return (
    <section className="py-20 md:py-24 bg-gradient-to-b from-background to-background/80" id="experiencia">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        <motion.h2 
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12"
        >
          Experiencia Profesional
        </motion.h2>
        
        <Timeline>
          {experiencesToShow.map((exp, index) => (
            <TimelineItem
              key={index}
              title={exp.title}
              company={exp.company}
              date={exp.date}
              description={exp.description}
              tech={exp.tech}
            />
          ))}
        </Timeline>
        
        {experiences.length > 3 && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="flex justify-center mt-12"
          >
            <Button
              onClick={() => setShowAll(!showAll)}
              variant="outline"
              className="bg-background/80 backdrop-blur-sm rounded-full px-6 hover:bg-background/90 transition-all duration-300"
            >
              {showAll ? "Mostrar menos" : `Ver ${experiences.length - 3} experiencias más`}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  )
}