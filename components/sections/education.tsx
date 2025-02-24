"use client"
import { useState } from 'react'
import { EducationCard } from "@/components/ui/education-card"
import { CertificationBadge } from "@/components/ui/certification-badge"

export function EducationSection() {
  const [showAllCerts, setShowAllCerts] = useState(false)

  // Se ordenan las certificaciones de forma descendente por fecha(aaño)
  const certifications = [
    {
      title: "Educación Financiera para la Ciudadanía",
      issuer: "Universidad de Chile",
      date: "2025",
      id: "68045b7d18394f9a9af1229690b42cf3",
      verificationUrl:"https://www.linkedin.com/in/eric-aguayo-quintriqueo-b36783220/details/certifications/"
    },
    {
      title: "Negociación",
      issuer: "Santander Open Academy",
      date: "2025",
      id: "OA-2025-0210000803168"
    },
    {
      title: "SEO y Content Marketing",
      issuer: "Santander Open Academy",
      date: "2025",
      id: "OA-2025-0210000803163"
    },
    {
      title: "Curso de Herramientas de IA para Developers",
      issuer: "Platzi",
      date: "2023",
      id: "c917f58f-8605-4b4f-b51b-40154aa35b69"
    },
    {
      title: "Curso para Entender tus Emociones Básicas",
      issuer: "Platzi",
      date: "2023",
      id: "ed4d61d8-7f51-4583-bcf2-2bb78309b38d"
    },
    {
      title: "Curso Básico de MongoDB",
      issuer: "Platzi",
      date: "2023",
      id: "22e1c4e7-5c2e-43cd-82c0-b886823f9e99"
    },
    {
      title: "Curso Profesional de Git y GitHub",
      issuer: "Platzi",
      date: "2023",
      id: "ac944a58-f273-41dd-90a6-45df4260a3b6"
    },
    {
      title: "Curso de Frontend Developer",
      issuer: "Platzi",
      date: "2023",
      id: "e8c222b8-d3e5-43bf-be5e-eba71dc43594"
    },
    {
      title: "Curso de Pensamiento Lógico: Algoritmos y Diagramas de Flujo",
      issuer: "Platzi",
      date: "2023",
      id: "e75409d5-91ef-45fd-8194-6aace0c60736"
    },
    {
      title: "DESARROLLADOR FULL STACK",
      issuer: "INACAP",
      date: "2023",
      description: "Ingeniería y tecnología"
    },
    {
      title: "SOPORTE COMPUTACIONAL",
      issuer: "INACAP",
      date: "2022",
      description: "Ingeniería y tecnología"
    },
    {
      title: "DISEÑO Y GESTIÓN DE BASE DE DATOS",
      issuer: "INACAP",
      date: "2022",
      description: "Ingeniería y tecnología"
    },
    {
      title: "DISEÑO ÁGIL DE SISTEMAS",
      issuer: "INACAP",
      date: "2022",
      description: "Ingeniería y tecnología"
    },
    {
      title: "DESARROLLO DE APLICACIONES BÁSICAS",
      issuer: "INACAP",
      date: "2022",
      description: "Ingeniería y tecnología"
    },
    {
      title: "Curso Definitivo de HTML y CSS",
      issuer: "Platzi",
      date: "2022",
      id: "592fa0f8-ac05-4d72-916c-19f1a3f9e315"
    },
    {
      title: "Curso de Máquinas Virtuales con Google Cloud Platform",
      issuer: "Platzi",
      date: "2022",
      id: "4d67d770-e9a4-4a95-81ff-a80b8711f9d7"
    },
    {
      title: "Curso de Oratoria para Hablar en Público",
      issuer: "Platzi",
      date: "2022",
      id: "09975333-ccce-4f1f-9c48-db0c20be5c1f"
    },
    {
      title: "Curso Básico de Python",
      issuer: "Platzi",
      date: "2022",
      id: "730bdfe5-70e8-4a23-a734-31ad922d0818"
    }
  ].sort((a, b) => parseInt(b.date) - parseInt(a.date))

  // Se muestran las primeras 4 certificaciones a menos que se active "mostrar todo"
  const displayedCertifications = showAllCerts ? certifications : certifications.slice(0, 4)

  return (
    <section className="min-h-screen snap-start flex flex-col items-center justify-center py-20" id="educacion">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12">Educación y Certificaciones</h2>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          
          {/* Columna de Educación Formal */}
          <div className="space-y-6 pt-6">
            <h3 className="text-2xl font-semibold mb-6">Educación Formal</h3>
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
          </div>
          
          {/* Columna de Especializaciones y Certificaciones */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold mb-6">Especializaciones y Certificaciones</h3>
            <div className="grid gap-4">
              {displayedCertifications.map((cert, index) => (
                <CertificationBadge
                  key={cert.id || index}
                  title={cert.title}
                  issuer={cert.issuer}
                  date={cert.date}
                  description={cert.description}
                  verificationUrl='https://www.linkedin.com/in/eric-aguayo-quintriqueo-b36783220/details/certifications/'
                />
              ))}
            </div>
            {certifications.length > 4 && (
              <button
                onClick={() => setShowAllCerts(!showAllCerts)}
                className="mt-4 text-primary hover:text-primary/80 font-medium"
              >
                {showAllCerts ? 'Mostrar menos' : `Ver ${certifications.length - 4} más`}
              </button>
            )}
          </div>
          
        </div>
      </div>
    </section>
  )
}
