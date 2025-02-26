"use client"
import { useState } from 'react'
import { EducationCard } from "@/components/ui/education-card"
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
    }
  ].sort((a, b) => parseInt(b.date) - parseInt(a.date))

  const displayedCertifications = showAllCerts
    ? certifications
    : certifications.slice(0, 4)


    return (
      <section
        className="min-h-screen snap-start flex flex-col items-center justify-center py-12"
        id="educacion"
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12">Educación y Certificaciones</h2>
  
          {/* Contenedor que apila verticalmente ambas secciones */}
          <div className="space-y-12">
            {/* Sección Educación Formal */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">Educación Formal</h3>
              {/* Aquí cada EducationCard se mostrará en un grid de 2 columnas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <EducationCard
                  institution="INACAP, Chile - Temuco"
                  degree="Técnico de Nivel Superior Analista Programador"
                  period="2021 - 2022"
                  description="Titulado"
                />
                <EducationCard
                  institution="Liceo Pablo Neruda Temuco, Chile"
                  degree="Educación Media"
                  period="2012 - 2016"
                  description="Titulado"
                />
                {/* ... si tuvieras más EducationCard, agrégalas aquí */}
              </div>
            </div>
  
            {/* Sección Especializaciones y Certificaciones */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">
                Especializaciones y Certificaciones
              </h3>
              {/* Cada CertificationBadge en un grid de 2 columnas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayedCertifications.map((cert, index) => (
                  <CertificationBadge
                    key={cert.id || index}
                    title={cert.title}
                    issuer={cert.issuer}
                    date={cert.date}
                    verificationUrl={cert.verificationUrl}
                    description={cert.description}
                  />
                ))}
              </div>
              {certifications.length > 4 && (
                <button
                  onClick={() => setShowAllCerts(!showAllCerts)}
                  className="mt-4 text-primary hover:text-primary/80 font-medium"
                >
                  {showAllCerts
                    ? "Mostrar menos"
                    : `Ver ${certifications.length - 4} más`}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  }