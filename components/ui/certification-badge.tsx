"use client"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Award, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CertificationBadgeProps {
  title: string
  issuer: string
  date: string
  verificationUrl: string
  description?: string
  badges?: string[]
}

export function CertificationBadge({ title, issuer, date, verificationUrl, description, badges = [] }: CertificationBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardContent className="flex flex-col p-4">
          <div className="flex items-center gap-4">
            <Award className="w-8 h-8 text-primary flex-shrink-0" />
            <div className="flex-1">
              <h4 className="font-semibold">{title}</h4>
              <p className="text-sm text-muted-foreground">
                {issuer} • {date}
              </p>
              {description && (
                <p className="text-xs text-muted-foreground mt-1">{description}</p>
              )}
            </div>
            <Button variant="ghost" size="icon" asChild className="flex-shrink-0">
              <a href={verificationUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
          
          {/* Badges Section */}
          {badges && badges.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3 pl-12">
              {badges.map((badge, index) => (
                <span 
                  key={index} 
                  className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}