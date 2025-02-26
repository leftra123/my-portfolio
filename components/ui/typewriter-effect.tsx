"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useTypewriter } from "@/hooks/useTypewriter"

interface TypewriterEffectProps {
  words: string[]
  className?: string
}

export function TypewriterEffect({ words, className }: TypewriterEffectProps) {
  const currentText = useTypewriter(words)

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentText}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {currentText}
          <span className="animate-blink">|</span>
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
