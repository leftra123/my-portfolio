"use client"
import { Button } from "@/components/ui/button"
import { CertificationBadge } from "@/components/ui/certification-badge"
import { EducationCard } from "@/components/ui/education-card"
import { motion } from "framer-motion"
import { useState } from 'react'

export function EducationSection() {
  const [showAllCerts, setShowAllCerts] = useState(false)

  const certifications = [
    {
      title: "Curso de Looker Studio",
      issuer: "Platzi",
      date: "Abril 2025",
      id: "667c7403-82e5-48d4-b611-f1537d861d96",
      verificationUrl: "https://platzi.com/p/eric.x/curso/11972-course/diploma/detalle/",
      badges: ["Looker Studio", "Visualización de datos", "Dashboards", "Business Intelligence", "Google Analytics", "Reportes interactivos", "Data Studio"]
    },
    {
      title: "Curso de Excel Avanzado con Macros",
      issuer: "Platzi",
      date: "Abril 2025",
      id: "d57b1e8a-3fef-41eb-8b21-286f3542a6e9",
      verificationUrl: "https://platzi.com/p/eric.x/curso/4294-excel-avanzado-macros/diploma/detalle/",
      badges: ["VBA", "Macros", "Automatización", "Excel Avanzado", "Funciones personalizadas", "Dashboards dinámicos", "Programación en Excel"]
    },
    {
      title: "Curso de Data Warehousing y Data Lakes",
      issuer: "Platzi",
      date: "Abril 2025",
      id: "9170dbaa-b031-4439-9d5d-f94b6a9a08b5",
      verificationUrl: "https://platzi.com/p/eric.x/curso/11586-data-warehousing/diploma/detalle/",
      badges: ["Data Warehousing", "Data Lakes", "ETL", "Modelado dimensional", "AWS Redshift", "Amazon S3", "Análisis de datos"]
    },
    {
      title: "Curso de Excel Intermedio para Analistas con Tableros y Fórmulas",
      issuer: "Platzi",
      date: "Marzo 2025",
      id: "2d765fb1-7f22-4f76-8a57-4b4765ec2971",
      verificationUrl: "https://platzi.com/p/eric.x/curso/4037-excel-intermedio/diploma/detalle/",
      badges: ["Excel", "Análisis de datos", "Tableros dinámicos", "Fórmulas avanzadas"]
    },
    {
      title: "Curso de Excel Básico: Tablas y Fórmulas para la Gestión de Datos",
      issuer: "Platzi",
      date: "Marzo 2025",
      id: "f633d1ae-2085-4c1e-827e-cba350969fd2",
      verificationUrl: "https://platzi.com/p/eric.x/curso/4036-excel-basico/diploma/detalle/",
      badges: ["Excel", "Tablas", "Fórmulas básicas", "Gestión de datos"]
    },  
    {
      title: "Curso de Inteligencia Artificial para Finanzas",
      issuer: "Platzi",
      date: "Marzo 2025",
      id: "84c01da0-7ed2-4aee-85be-cfc68e887d50",
      verificationUrl: "https://platzi.com/p/eric.x/curso/7966-ia-finanzas/diploma/detalle/",
      badges: ["IA", "Finanzas", "Análisis predictivo", "Automatización"]
    },
    {
      title: "Curso de Power BI",
      issuer: "Platzi",
      date: "Marzo 2025",
      id: "11a2521f-155b-48cc-9d7f-4e7e35a9200b",
      verificationUrl: "https://platzi.com/p/eric.x/curso/10200-powerbi/diploma/detalle/",
      badges: ["Power BI", "Dashboards", "Visualización", "ETL"]
    },
    {
      title: "Fundamentos profesionales de IA generativa, por Microsoft y LinkedIn",
      issuer: "Microsoft y LinkedIn",
      date: "Marzo 2025",
      id: "f2ad4481ce72e96bc73170c6a3cf8f1fc66ebe26207e1e183f9c2ec08d5ce19e",
      verificationUrl: "https://www.linkedin.com/learning/certificates/f2ad4481ce72e96bc73170c6a3cf8f1fc66ebe26207e1e183f9c2ec08d5ce19e",
      badges: ["IA generativa", "LLMs", "Microsoft", "Prompting"]
    },
    {
      title: "Educación Financiera para la Ciudadanía",
      issuer: "Universidad de Chile",
      date: "Febrero 2025",
      id: "68045b7d18394f9a9af1229690b42cf3",
      verificationUrl: "https://open.uchile.cl/certificates/68045b7d18394f9a9af1229690b42cf3",
      badges: ["Finanzas personales", "Ahorro", "Inversión", "Presupuesto"]
    },
    {
      title: "Negociación",
      issuer: "Santander Open Academy",
      date: "Febrero 2025",
      id: "OA-2025-0210000803168",
      verificationUrl: "https://www.linkedin.com/in/eric-aguayo-quintriqueo-b36783220/details/certifications/1739178796895/single-media-viewer/?profileId=ACoAADektpoBaDkB3ZbuAtOMpc3CaRFWkuGaQh0",
      badges: ["Negociación", "Resolución de conflictos", "Comunicación", "Persuasión"]
    },
    {
      title: "SEO y Content Marketing",
      issuer: "Santander Open Academy",
      date: "Febrero 2025",
      id: "OA-2025-0210000803163",
      verificationUrl: "https://www.linkedin.com/in/eric-aguayo-quintriqueo-b36783220/details/certifications/1739177356567/single-media-viewer/?profileId=ACoAADektpoBaDkB3ZbuAtOMpc3CaRFWkuGaQh0",
      badges: ["SEO", "Marketing de contenidos", "Keywords", "Posicionamiento web"]
    },
    {
      title: "Curso de Herramientas de IA para Developers",
      issuer: "Platzi",
      date: "Julio 2023",
      id: "c917f58f-8605-4b4f-b51b-40154aa35b69",
      verificationUrl: "https://platzi.com/p/eric.x/curso/7964-ia-devs/diploma/detalle/",
      badges: ["IA", "Desarrollo", "APIs", "Integración"]
    },
    {
      title: "Curso para Entender tus Emociones Básicas",
      issuer: "Platzi",
      date: "Julio 2023",
      id: "ed4d61d8-7f51-4583-bcf2-2bb78309b38d",
      verificationUrl: "https://platzi.com/p/eric.x/curso/2581-emociones-basicas/diploma/detalle/",
      badges: ["Inteligencia emocional", "Autoconocimiento", "Soft skills", "Mindfulness"]
    },
    {
      title: "DESARROLLADOR FULL STACK",
      issuer: "INACAP",
      date: "Mayo 2023",
      id: "AAE5588C72680139",
      verificationUrl: "https://www.linkedin.com/in/eric-aguayo-quintriqueo-b36783220/details/certifications/1740559537067/single-media-viewer/?profileId=ACoAADektpoBaDkB3ZbuAtOMpc3CaRFWkuGaQh0",
      badges: ["Frontend", "Backend", "Desarrollo web", "Fullstack"]
    },
    {
      title: "Curso Básico de MongoDB",
      issuer: "Platzi",
      date: "Febrero 2023",
      id: "22e1c4e7-5c2e-43cd-82c0-b886823f9e99",
      verificationUrl: "https://platzi.com/p/eric.x/curso/1533-mongodb-basico/diploma/detalle/",
      badges: ["MongoDB", "NoSQL", "Bases de datos", "CRUD"]
    },
    {
      title: "Curso Profesional de Git y GitHub",
      issuer: "Platzi",
      date: "Febrero 2023",
      id: "ac944a58-f273-41dd-90a6-45df4260a3b6",
      verificationUrl: "https://platzi.com/p/eric.x/curso/1557-git-github/diploma/detalle/",
      badges: ["Git", "GitHub", "Control de versiones", "Colaboración"]
    },
    {
      title: "Curso de Frontend Developer",
      issuer: "Platzi",
      date: "Febrero 2023",
      id: "e8c222b8-d3e5-43bf-be5e-eba71dc43594",
      verificationUrl: "https://platzi.com/p/eric.x/curso/2467-frontend-developer/diploma/detalle/",
      badges: ["HTML", "CSS", "JavaScript", "Responsive design"]
    },
    {
      title: "Curso de Pensamiento Lógico: Algoritmos y Diagramas de Flujo",
      issuer: "Platzi",
      date: "Febrero 2023",
      id: "e75409d5-91ef-45fd-8194-6aace0c60736",
      verificationUrl: "https://platzi.com/p/eric.x/curso/3221-pensamiento-logico/diploma/detalle/",
      badges: ["Algoritmos", "Lógica", "Diagramas de flujo", "Pseudocódigo"]
    },
    {
      title: "SOPORTE COMPUTACIONAL",
      issuer: "INACAP",
      date: "Noviembre 2022",
      id: "8A3C7FDF2D34F249",
      verificationUrl: "https://www.linkedin.com/in/eric-aguayo-quintriqueo-b36783220/details/certifications/1740560177700/single-media-viewer/?profileId=ACoAADektpoBaDkB3ZbuAtOMpc3CaRFWkuGaQh0",
      badges: ["Hardware", "Software", "Redes", "Troubleshooting"]
    },
    {
      title: "DISEÑO Y GESTIÓN DE BASE DE DATOS",
      issuer: "INACAP",
      date: "Noviembre 2022",
      id: "92071FEA26B44AFA",
      verificationUrl: "https://www.linkedin.com/in/eric-aguayo-quintriqueo-b36783220/details/certifications/1740560049695/single-media-viewer/?profileId=ACoAADektpoBaDkB3ZbuAtOMpc3CaRFWkuGaQh0",
      badges: ["SQL", "Modelado de datos", "Normalización", "Administración BD"]
    },
    {
      title: "DISEÑO ÁGIL DE SISTEMAS",
      issuer: "INACAP",
      date: "Noviembre 2022",
      id: "9A565319096F8258",
      verificationUrl: "https://www.linkedin.com/in/eric-aguayo-quintriqueo-b36783220/details/certifications/1740559874469/single-media-viewer/?profileId=ACoAADektpoBaDkB3ZbuAtOMpc3CaRFWkuGaQh0",
      badges: ["Scrum", "Metodologías ágiles", "Kanban", "Desarrollo iterativo"]
    },
    {
      title: "DESARROLLO DE APLICACIONES BÁSICAS",
      issuer: "INACAP",
      date: "Noviembre 2022",
      id: "AE3D78C1F9901E0C",
      verificationUrl: "https://www.linkedin.com/in/eric-aguayo-quintriqueo-b36783220/details/certifications/1740559726716/single-media-viewer/?profileId=ACoAADektpoBaDkB3ZbuAtOMpc3CaRFWkuGaQh0",
      badges: ["Programación", "Estructuras de datos", "POO", "Aplicaciones"]
    },
    {
      title: "Curso Definitivo de HTML y CSS",
      issuer: "Platzi",
      date: "Octubre 2022",
      id: "592fa0f8-ac05-4d72-916c-19f1a3f9e315",
      verificationUrl: "https://platzi.com/p/eric.x/curso/2008-html-css/diploma/detalle/",
      badges: ["HTML", "CSS", "Web", "Responsive design"]
    },
    {
      title: "Curso de Máquinas Virtuales con Google Cloud Platform",
      issuer: "Platzi",
      date: "Octubre 2022",
      id: "4d67d770-e9a4-4a95-81ff-a80b8711f9d7",
      verificationUrl: "https://platzi.com/p/eric.x/curso/2470-maquinas-virtuales-gcp/diploma/detalle/",
      badges: ["GCP", "Cloud", "Virtualización", "Infraestructura"]
    },
    {
      title: "Curso de Oratoria para Hablar en Público",
      issuer: "Platzi",
      date: "Octubre 2022",
      id: "09975333-ccce-4f1f-9c48-db0c20be5c1f",
      verificationUrl: "https://platzi.com/p/eric.x/curso/1285-hablar-en-publico/diploma/detalle/",
      badges: ["Oratoria", "Comunicación", "Presentaciones", "Lenguaje corporal"]
    },
    {
      title: "Curso Básico de Python",
      issuer: "Platzi",
      date: "Agosto 2022",
      id: "730bdfe5-70e8-4a23-a734-31ad922d0818",
      verificationUrl: "https://platzi.com/p/eric.x/curso/1937-python-basico/diploma/detalle/",
      badges: ["Python", "Programación", "Estructuras de datos", "Scripts"]
    },
    {
      title: "Curso de Computación Básica",
      issuer: "Platzi",
      date: "Enero 2021",
      id: "ef46ec4d-241f-428e-a40a-74ce9733eddb",
      verificationUrl: "https://platzi.com/p/eric.x/curso/1741-computacion-basica-2019/diploma/detalle/",
      badges: ["Informática", "Sistemas operativos", "Ofimática", "Digital"]
    }
].sort((a, b) => parseInt(b.date) - parseInt(a.date))

  const displayedCertifications = showAllCerts
    ? certifications
    : certifications.slice(0, 4)

  return (
    <section
      className="py-20 md:py-24 bg-gradient-to-b from-background to-background/80"
      id="educacion"
    >
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12"
        >
          Educación y Certificaciones
        </motion.h2>

        <div className="space-y-16">
          {/* Sección Educación Formal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold mb-6 pb-2 border-b border-border/30">Formación Académica</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <EducationCard
                  institution="INACAP Sede Temuco, Chile"
                  degree="Ingeniería en Informática"
                  period="2025 - Actualidad"
                  // description="En curso. Profundizando conocimientos en desarrollo de software, arquitectura de sistemas y gestión de proyectos tecnológicos."
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <EducationCard
                  institution="INACAP Sede Temuco, Chile"
                  degree="Analista Programador – Titulado"
                  period="2021 - 2022"
                  // description="Desarrollo de habilidades en programación, bases de datos, y metodologías ágiles para la creación de soluciones de software."
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="md:col-span-2"
              >
                <EducationCard
                  institution="Liceo Pablo Neruda Temuco, Chile"
                  degree="Educación Media"
                  period="2012 - 2016"
                  // description="Formación general con énfasis en matemáticas y ciencias."
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Sección Especializaciones y Certificaciones */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-6 pb-2 border-b border-border/30">
              Certificaciones
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayedCertifications.map((cert, index) => (
                <motion.div
                  key={cert.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                >
                  <CertificationBadge
                    title={cert.title}
                    issuer={cert.issuer}
                    date={cert.date}
                    verificationUrl={cert.verificationUrl}
                    badges={cert.badges}
                  />
                </motion.div>
              ))}
            </div>
            
            {certifications.length > 4 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="flex justify-center mt-10"
              >
                <Button
                  onClick={() => setShowAllCerts(!showAllCerts)}
                  variant="outline"
                  className="bg-background/80 backdrop-blur-sm rounded-full px-6 hover:bg-background/90 transition-all duration-300"
                >
                  {showAllCerts
                    ? "Mostrar menos"
                    : `Ver ${certifications.length - 4} certificaciones más`}
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}