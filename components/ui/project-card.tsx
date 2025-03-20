import React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface ProjectCardProps {
  id: number
  title: string
  description: string
  tech: string[]
  image?: string
  repoUrl: string
  category: string
}

export function ProjectCard({
  title,
  description,
  tech,
  image,
  repoUrl
}: ProjectCardProps) {
  const defaultImage = "https://via.placeholder.com/300x200?text=No+Image"
  
  return (
    <div className="bg-card rounded-lg shadow-md overflow-hidden flex flex-col h-full">
      {/* Imagen optimizada con next/image */}
      <div className="relative w-full h-48">
        <Image
          src={image && image.trim() !== "" ? image : defaultImage}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
          className="object-cover"
        />
      </div>

      {/* Contenido */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground break-words flex-1 mb-4">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((t, index) => (
            <span
              key={index}
              className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
            >
              {t}
            </span>
          ))}
        </div>
        {/* Botón anclado al fondo */}
        <Button className="mt-auto" onClick={() => window.open(repoUrl, "_blank")}>
          Ver Repo
        </Button>
      </div>
    </div>
  )
}