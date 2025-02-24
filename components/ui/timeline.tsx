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
      className="relative pl-8 pb-12 border-l border-border last:pb-0"
    >
      <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-primary" />
      <div className="space-y-3">
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-muted-foreground">{company}</p>
          <p className="text-sm text-muted-foreground">{date}</p>
        </div>
        <p className="text-muted-foreground">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tech.map((item) => (
            <Badge key={item} variant="secondary">{item}</Badge>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function Timeline({ children }: { children: React.ReactNode }) {
  return <div className="relative">{children}</div>
}