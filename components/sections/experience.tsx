"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Timeline, TimelineItem } from "@/components/ui/timeline"

export function ExperienceSection() {
  const [showAll, setShowAll] = useState(false)

  const experiences = [
    {
      title: "Encargado de Inventarios y Procesos Administrativos",
      company: "Departamento de Educación | Ilustre Municipalidad de Galvarino",
      date: "Ene 2024 - Dic 2024",
      description: "Gestión y control de inventarios, asegurando la correcta administración de los activos y recursos disponibles. Gestión del Sistema de Admisión Escolar (SAE), seguimiento de procesos de admisión y actualización de datos en la plataforma oficial. Preparación y verificación de Declaraciones BRP (Bono de Reconocimiento Profesional), cálculo y gestión de bienios del personal docente. Desarrollé habilidades de organización, comunicación y coordinación, gestionando simultáneamente varios procesos administrativos críticos.",
      tech: ['SAE', 'BRP', 'Gestión de Inventarios', 'Procesos Administrativos', 'Bienios']
    },
    {
      title: "Encargado de bienes e inventario",
      company: "Departamento de Educación | Ilustre Municipalidad de Galvarino",
      date: "Ago 2023 - Dic 2023",
      description: "Gestión y mantención del inventario de bienes, garantizando un registro actualizado y confiable. Implementación de metodologías ágiles para la optimización de procesos y la protección de la información, realizando reportes periódicos para la toma de decisiones y brindando soporte al equipo de adquisiciones.",
      tech: ['Metodologías Ágiles', 'Gestión de Inventarios', 'Reportes', 'Optimización de Procesos']
    },
    {
      title: "Analista de Datos Financieros",
      company: "Departamento de Educación | Ilustre Municipalidad de Galvarino",
      date: "Jun 2023 - Jul 2023",
      description: "Desarrollo de un proyecto de análisis de datos financieros empleando Google Colab y Python, generando reportes de gestión y proponiendo optimizaciones en la administración de estos datos. Presentación de un plan de acción basado en la interpretación de los datos, mejorando la visibilidad de los indicadores financieros para la toma de decisiones.",
      tech: ['Python', 'Google Colab', 'Análisis de Datos', 'Reportes Financieros']
    },
    {
      title: "Práctica profesional",
      company: "Departamento de Educación | Ilustre Municipalidad de Galvarino",
      date: "Mar 2023 - Jun 2023",
      description: "Realicé inicialmente tareas de soporte de hardware (diagnóstico y mantenimiento de equipos) y posteriormente la creación de un software para el Departamento de Educación. El desarrollo se llevó a cabo utilizando Django Rest Framework como API y React para el front-end. Me encargué de la implementación de endpoints, pruebas de funcionalidad y la integración con la base de datos.",
      tech: ['Django Rest Framework', 'React', 'API', 'Base de Datos', 'Soporte de Hardware']
    },
    {
      title: "Reponedor",
      company: "Comercial Lily Lmtda",
      date: "Mar 2021 - Abr 2022",
      description: "Me desempeñé como reponedor, encargándome de la organización y rotación de productos en sala, y manteniendo un control de inventario básico para optimizar la exhibición y evitar quiebres de stock. Apliqué conocimientos de administración para mejorar la gestión de las reposiciones y la coordinación con proveedores y personal de bodega.",
      tech: ['Control de Inventario', 'Organización', 'Gestión de Productos', 'Coordinación']
    },
    {
      title: "Apoyo de Verano, Cajero, Control de Caja, Área Panadería",
      company: "Comercial Lily Lmtda",
      date: "Dic 2018 - Nov 2020",
      description: "Inicié como Apoyo de Verano ofreciendo atención y asistencia en caja. Posteriormente fui contratado como Cajero, encargándome del manejo de efectivo, emisión de comprobantes y cuadratura diaria. Con el tiempo, asumí mayores responsabilidades supervisando el registro de ventas y coordinando el equipo de cajeros. Finalmente, trabajé en el Área de Panadería supervisando la reposición de productos, manteniendo el orden del área y gestionando la rotación de inventario.",
      tech: ['Atención al Cliente', 'Manejo de Caja', 'Supervisión', 'Gestión de Inventario']
    },
    {
      title: "Operador de bodega",
      company: "Embonor Coca Cola SA",
      date: "Dic 2017 - Feb 2018",
      description: "Recepción y despacho de pedidos, asegurando la integridad de los productos y la precisión de las entregas. Apoyo en el control de existencias, clasificación y bebidas para un manejo eficiente del stock. Revisión de órdenes, picking y embalaje para la distribución a clientes. Colaboración diaria con el personal de bodega y reparto para optimizar los procesos de carga y despacho.",
      tech: ['Gestión de Inventario', 'Picking', 'Distribución', 'Trabajo en Equipo']
    }
  ]

  // Se muestran las 3 primeras experiencias a menos que se active "Ver más"
  const experiencesToShow = showAll ? experiences : experiences.slice(0, 3)

  return (
    <section className="min-h-screen snap-start flex flex-col items-center justify-center py-12 bg-gradient-to-b from-background to-background/80" id="experiencia">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12">Experiencia Profesional</h2>
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
          <div className="flex justify-center mt-8">
            <Button
              onClick={() => setShowAll(!showAll)}
              variant="outline"
              className="bg-background/80 backdrop-blur-sm shadow-lg rounded-full px-6"
            >
              {showAll ? "Mostrar menos" : `Ver ${experiences.length - 3} más`}
            </Button>
          </div>
        )}



      </div>
    </section>
  )
}
