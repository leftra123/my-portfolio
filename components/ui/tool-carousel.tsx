"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge" 

interface ToolCarouselProps {
  tools: string[]
  interval?: number
}

export function ToolCarousel({ tools, interval = 2000 }: ToolCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tools.length)
    }, interval)
    return () => clearInterval(timer)
  }, [tools, interval])

  return (
    <div className="w-full flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={tools[currentIndex]}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="secondary" className="px-3 py-1 text-sm">
            {tools[currentIndex]}
          </Badge>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
