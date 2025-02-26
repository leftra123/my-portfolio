"use client"

import { useEffect, useState } from "react"
import { FiArrowUp } from "react-icons/fi"

export function ScrollToTopButton() {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const hero = document.getElementById("hero")
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Si el Hero no está en vista, mostramos el botón.
        setShowButton(!entry.isIntersecting)
      },
      { threshold: 0.5 }
    )

    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  if (!showButton) return null

  return (
    <button
      onClick={() => {
        const mainContainer = document.querySelector("main")
        mainContainer?.scrollTo({ top: 0, behavior: "smooth" })
      }}
      className="fixed bottom-8 right-8 z-50 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/80 transition-all duration-300"
      aria-label="Volver arriba"
    >
      <FiArrowUp className="h-5 w-5" />
    </button>
  )
}