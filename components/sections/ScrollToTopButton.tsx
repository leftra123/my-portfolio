"use client"

import { AnimatePresence, motion } from "framer-motion"
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
          transition={{ 
            duration: 0.2, 
            ease: [0, 0, 0.2, 1] // ease-out para entrada según el artículo
          }}
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 md:bottom-8 md:left-8 lg:bottom-10 lg:left-10 z-50 p-2.5 md:p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/80 hover:shadow-xl transition-all duration-300"
          aria-label="Volver arriba"
          whileHover={{ 
            y: -5, 
            transition: { 
              duration: 0.2, 
              ease: [0.2, 0, 0.38, 1] // curva estándar para hover
            } 
          }}
          whileTap={{ 
            scale: 0.9,
            transition: { 
              duration: 0.1, 
              ease: [0.4, 0, 1, 1] // ease-in para presionado
            }
          }}
        >
          <FiArrowUp className="h-4 w-4 md:h-5 md:w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}