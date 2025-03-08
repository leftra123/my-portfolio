"use client"
import { useState } from 'react'
import { motion } from "framer-motion"
import { EducationCard } from "@/components/ui/education-card"
import { Button } from "@/components/ui/button"
import { CertificationBadge } from "@/components/ui/certification-badge"

export function EducationSection() {
  const [showAllCerts, setShowAllCerts] = useState(false)

  const certifications = [
    {
      title: "Educación Financiera para la Ciudadanía",
      issuer: "Universidad de Chile",
      date: "2025",
      id: "68045b7d18394f9a9af1229690b42cf3",
      verificationUrl: "https://open.uchile.cl/certificates/68045b7d18394f9a9af1229690b42cf3"
    },
    {
      title: "Negociación",
      issuer: "Santander Open Academy",
      date: "2025",
      id: "OA-2025-0210000803168",
      verificationUrl: "https://www.linkedin.com/in/eric-aguayo-quintriqueo-b36783220/details/certifications/1739178796895/single-media-viewer/?profileId=ACoAADektpoBaDkB3ZbuAtOMpc3CaRFWkuGaQh0"
    },
    {
      title: "SEO y Content Marketing",
      issuer: "Santander Open Academy",
      date: "2025",
      id: "OA-2025-0210000803163",
      verificationUrl: "https://www.linkedin.com/in/eric-aguayo-quintriqueo-b36783220/details/certifications/1739177356567/single-media-viewer/?profileId=ACoAADektpoBaDkB3ZbuAtOMpc3CaRFWkuGaQh0"
    },
    {
      title: "Curso de Herramientas de IA para Developers",
      issuer: "Platzi",
      date: "2023",
      id: "c917f58f-8605-4b4f-b51b-40154aa35b69",
      verificationUrl: "https://platzi.com/p/eric.x/curso/7964-ia-devs/diploma/detalle/"
    },
    {
      title: "Curso para Entender tus Emociones Básicas",
      issuer: "Platzi",
      date: "2023",
      id: "ed4d61d8-7f51-4583-bcf2-2bb78309b38d",
      verificationUrl: "https://platzi.com/p/eric.x/curso/2581-emociones-basicas/diploma/detalle/"
    },
    {
      title: "Curso Básico de MongoDB",
      issuer: "Platzi",
      date: "2023",
      id: "22e1c4e7-5c2e-43cd-82c0-b886823f9e99",
      verificationUrl: "https://platzi.com/p/eric.x/curso/1533-mongodb-basico/diploma/detalle/"
    },
    {
      title: "Curso Profesional de Git y GitHub",
      issuer: "Platzi",
      date: "2023",
      id: "ac944a58-f273-41dd-90a6-45df4260a3b6",
      verificationUrl: "https://platzi.com/p/eric.x/curso/1557-git-github/diploma/detalle/"
    },
    {
      title: "Curso de Frontend Developer",
      issuer: "Platzi",
      date: "2023",
      id: "e8c222b8-d3e5-43bf-be5e-eba71dc43594",
      verificationUrl: "https://platzi.com/p/eric.x/curso/2467-frontend-developer/diploma/detalle/"
    },
    {
      title: "Curso de Pensamiento Lógico: Algoritmos y Diagramas de Flujo",
      issuer: "Platzi",
      date: "2023",
      id: "e75409d5-91ef-45fd-8194-6aace0c60736",
      verificationUrl: "https://platzi.com/p/eric.x/curso/3221-pensamiento-logico/diploma/detalle/"
    },
    {
      title: "DESARROLLADOR FULL STACK",
      issuer: "INACAP",
      date: "2023",
      description: "Ingeniería y tecnología",
      id: "inacap-1",
      verificationUrl: "https://www.linkedin.com/in/eric-aguayo-quintriqueo-b36783220/details/certifications/1740559537067/single-media-viewer/?profileId=ACoAADektpoBaDkB3ZbuAtOMpc3CaRFWkuGaQh0"
    },
    {
      title: "SOPORTE COMPUTACIONAL",
      issuer: "INACAP",
      date: "2022",
      description: "Ingeniería y tecnología",
      id: "inacap-2",
      verificationUrl: "https://www.linkedin.com/in/eric-aguayo-quintriqueo-b36783220/details/certifications/1740560177700/single-media-viewer/?profileId=ACoAADektpoBaDkB3ZbuAtOMpc3CaRFWkuGaQh0"
    },
    {
      title: "DISEÑO Y GESTIÓN DE BASE DE DATOS",
      issuer: "INACAP",
      date: "2022",
      description: "Ingeniería y tecnología",
      id: "inacap-3",
      verificationUrl: "https://www.linkedin.com/in/eric-aguayo-quintriqueo-b36783220/details/certifications/1740560049695/single-media-viewer/?profileId=ACoAADektpoBaDkB3ZbuAtOMpc3CaRFWkuGaQh0"
    },
    {
      title: "DISEÑO ÁGIL DE SISTEMAS",
      issuer: "INACAP",
      date: "2022",
      description: "Ingeniería y tecnología",
      id: "inacap-4",
      verificationUrl: "https://www.linkedin.com/in/eric-aguayo-quintriqueo-b36783220/details/certifications/1740559874469/single-media-viewer/?profileId=ACoAADektpoBaDkB3ZbuAtOMpc3CaRFWkuGaQh0"
    },
    {
      title: "DESARROLLO DE APLICACIONES BÁSICAS",
      issuer: "INACAP",
      date: "2022",
      description: "Ingeniería y tecnología",
      id: "inacap-5",
      verificationUrl: "https://www.linkedin.com/in/eric-aguayo-quintriqueo-b36783220/details/certifications/1740559726716/single-media-viewer/?profileId=ACoAADektpoBaDkB3ZbuAtOMpc3CaRFWkuGaQh0"
    },
    {
      title: "Curso Definitivo de HTML y CSS",
      issuer: "Platzi",
      date: "2022",
      id: "592fa0f8-ac05-4d72-916c-19f1a3f9e315",
      verificationUrl: "https://platzi.com/p/eric.x/curso/2008-html-css/diploma/detalle/"
    },
    {
      title: "Curso de Máquinas Virtuales con Google Cloud Platform",
      issuer: "Platzi",
      date: "2022",
      id: "4d67d770-e9a4-4a95-81ff-a80b8711f9d7",
      verificationUrl: "https://platzi.com/p/eric.x/curso/2470-maquinas-virtuales-gcp/diploma/detalle/"
    },
    {
      title: "Curso de Oratoria para Hablar en Público",
      issuer: "Platzi",
      date: "2022",
      id: "09975333-ccce-4f1f-9c48-db0c20be5c1f",
      verificationUrl: "https://platzi.com/p/eric.x/curso/1285-hablar-en-publico/diploma/detalle/"
    },
    {
      title: "Curso Básico de Python",
      issuer: "Platzi",
      date: "2022",
      id: "730bdfe5-70e8-4a23-a734-31ad922d0818",
      verificationUrl: "https://platzi.com/p/eric.x/curso/1937-python-basico/diploma/detalle/"
    },
    {
      title: "Curso de Computación Básica",
      issuer: "Platzi",
      date: "2021",
      id: "ef46ec4d-241f-428e-a40a-74ce9733eddb",
      verificationUrl: "https://platzi.com/p/eric04232013/curso/1741-computacion-basica-2019/diploma/detalle/"
    }
  ].sort((a, b) => parseInt(b.date) - parseInt(a.date))

  const displayedCertifications = showAllCerts
    ? certifications
    : certifications.slice(0, 4)

  return (
    <section
      className="pt-24 pb-16 md:pt-28 md:pb-20 lg:py-24 bg-gradient-to-b from-background to-background/80"
      id="educacion"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container max-w-4xl mx-auto px-4 sm:px-6"
      >
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
        >
          Educación y Certificaciones
        </motion.h2>

        {/* Contenedor que apila verticalmente ambas secciones */}
        <div className="space-y-12">
          {/* Sección Educación Formal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-2xl font-semibold mb-6">Educación Formal</h3>
            {/* Aquí cada EducationCard se mostrará en un grid de 2 columnas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <EducationCard
                  institution="INACAP Sede Temuco, Chile"
                  degree="Ingeniería en Informática"
                  period="2025"
                  description="En curso"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <EducationCard
                  institution="INACAP Sede Temuco, Chile"
                  degree="Técnico de Nivel Superior Analista Programador"
                  period="2021 - 2022"
                  description="Titulado"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <EducationCard
                  institution="Liceo Pablo Neruda Temuco, Chile"
                  degree="Educación Media"
                  period="2012 - 2016"
                  description="Titulado"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Sección Especializaciones y Certificaciones */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold mb-6">
              Especializaciones y Certificaciones
            </h3>
            {/* Cada CertificationBadge en un grid de 2 columnas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayedCertifications.map((cert, index) => (
                <motion.div
                  key={cert.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                >
                  <CertificationBadge
                    title={cert.title}
                    issuer={cert.issuer}
                    date={cert.date}
                    verificationUrl={cert.verificationUrl}
                    description={cert.description}
                  />
                </motion.div>
              ))}
            </div>
            {certifications.length > 4 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex justify-center mt-10 md:mt-12 mb-4"
              >
                <Button
                  onClick={() => setShowAllCerts(!showAllCerts)}
                  variant="outline"
                  className="bg-background/80 backdrop-blur-sm shadow-lg rounded-full px-6 hover:shadow-xl hover:bg-background/90 transition-all duration-300"
                >
                  {showAllCerts
                    ? "Mostrar menos"
                    : `Ver ${certifications.length - 4} más`}
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}