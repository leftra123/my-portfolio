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
    <div className="bg-card rounded-lg shadow-md overflow-hidden flex flex-col h-full border border-border/30 hover:shadow-lg hover:border-primary/20 transition-all duration-300">
      {/* Imagen optimizada con next/image */}
      <div className="relative w-full h-40 sm:h-48">
        <Image
          src={image && image.trim() !== "" ? image : defaultImage}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
          className="object-cover"
        />
      </div>

      {/* Contenido */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg sm:text-xl font-semibold mb-2 line-clamp-1">{title}</h3>
        <p className="text-sm text-muted-foreground break-words flex-1 mb-4 line-clamp-4 sm:line-clamp-3">
          {description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tech.slice(0, 4).map((t, index) => (
            <span
              key={index}
              className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded"
            >
              {t}
            </span>
          ))}
          {tech.length > 4 && (
            <span className="text-xs bg-secondary/50 text-secondary-foreground px-1.5 py-0.5 rounded">
              +{tech.length - 4}
            </span>
          )}
        </div>
        {/* Botón anclado al fondo */}
        <Button 
          className="mt-auto w-full sm:w-auto" 
          onClick={() => window.open(repoUrl, "_blank")}
          size="sm"
        >
          Ver Repo
        </Button>
      </div>
    </div>
  )
}