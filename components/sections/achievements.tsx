"use client"

import { Code, Users, Award } from "lucide-react"

export function AchievementsSection() {
  return (
    <section
      id="logros"
      className="min-h-screen snap-start flex flex-col items-center justify-center py-20 bg-gradient-to-b from-background to-background/80"
    >
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12">Logros</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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
    </section>
  )
}
