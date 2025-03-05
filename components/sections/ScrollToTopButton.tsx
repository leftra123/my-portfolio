"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
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

  // Función para manejar el scroll hacia arriba
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <AnimatePresence>
      {showButton && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 md:bottom-10 md:right-10 lg:bottom-12 lg:right-12 z-50 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/80 hover:shadow-xl hover:scale-110 transition-all duration-300"
          aria-label="Volver arriba"
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}