"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

interface TimelineItemProps {
  title: string
  company: string
  date: string
  description: string
  tech: string[]
}

export function TimelineItem({ title, company, date, description, tech }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative pl-6 pb-8 border-l border-border last:pb-0"
    >
      {/* Bullet */}
      <div className="absolute left-0 top-0 -translate-x-1/2 w-3 h-3 rounded-full bg-primary" />
      
      {/* Contenido */}
      <div className="space-y-2">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{company}</p>
          <p className="text-xs text-muted-foreground">{date}</p>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tech.map((item) => (
            <Badge key={item} variant="secondary" className="text-xs">
              {item}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function Timeline({ children }: { children: React.ReactNode }) {
  return <div className="relative">{children}</div>
}
