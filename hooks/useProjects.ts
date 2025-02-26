"use client"
import { useState, useMemo } from "react"

export interface Proyecto {
  id: number
  title: string
  description: string
  tech: string[]
  image?: string
  repoUrl: string
  category: string
}

export function useProjects(proyectos: Proyecto[]) {
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [showAllProjects, setShowAllProjects] = useState(false)

  // Filtrar proyectos según la categoría seleccionada
  const filteredProjects = useMemo(() => {
    return proyectos.filter((proyecto) =>
      selectedCategory === "todos" ? true : proyecto.category === selectedCategory
    )
  }, [proyectos, selectedCategory])

  // Determinar cuántos proyectos mostrar: 4 o todos
  const projectsToShow = useMemo(() => {
    return showAllProjects ? filteredProjects : filteredProjects.slice(0, 3)
  }, [filteredProjects, showAllProjects])

  return {
    selectedCategory,
    setSelectedCategory,
    showAllProjects,
    setShowAllProjects,
    filteredProjects,
    projectsToShow,
  }
}
