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
}

export function CertificationBadge({ title, issuer, date, verificationUrl, description }: CertificationBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardContent className="flex items-center gap-4 p-4">
          <Award className="w-8 h-8 text-primary" />
          <div className="flex-1">
            <h4 className="font-semibold">{title}</h4>
            <p className="text-sm text-muted-foreground">
              {issuer} • {date}
            </p>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          <Button variant="ghost" size="icon" asChild>
            <a href={verificationUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
