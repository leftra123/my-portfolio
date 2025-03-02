"use client"

import { useEffect, useState } from "react"
import { FiArrowUp } from "react-icons/fi"

export function ScrollToTopButton() {
  const [showButton, setShowButton] = useState(false)

  // Función para detectar scroll y mostrar/ocultar el botón
  useEffect(() => {
    const handleScroll = () => {
      // Mostrar el botón cuando se ha desplazado más de 300px
      setShowButton(window.scrollY > 300)
    }

    // Añadir event listener para el scroll
    window.addEventListener("scroll", handleScroll)
    
    // Verificar posición inicial
    handleScroll()
    
    // Limpiar event listener
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!showButton) return null

  // Función para manejar el scroll hacia arriba
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/80 transition-all duration-300 animate-fadeIn"
      aria-label="Volver arriba"
    >
      <FiArrowUp className="h-5 w-5" />
    </button>
  )
}