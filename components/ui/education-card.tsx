"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface EducationCardProps {
  institution: string
  degree: string
  period: string
  // description: string
}

export function EducationCard({ institution, degree, period }: EducationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>{institution}</CardTitle>
          <p className="text-muted-foreground">{period}</p>
        </CardHeader>
        <CardContent>
          <h4 className="text-muted-foreground mb-2">{degree}</h4>
          {/* <p className="text-muted-foreground">{description}</p> */}
        </CardContent>
      </Card>
    </motion.div>
  )
}