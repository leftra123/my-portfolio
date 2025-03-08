"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X, Code2, ChevronRight } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [isScrolled, setIsScrolled] = useState(false)
  const [hasScrolledBeyondHero, setHasScrolledBeyondHero] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  const navItems = [
    { name: "Inicio", href: "#hero" },
    { name: "Experiencia", href: "#experiencia" },
    { name: "Educación", href: "#educacion" },
    { name: "Proyectos", href: "#projects" },
    // { name: "Habilidades", href: "#skills" },
    { name: "Logros", href: "#logros" },
    { name: "Contacto", href: "#contacto", highlight: true }
  ]

  // Efecto para detectar scroll y cambiar apariencia del navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY

      // Cambiar estado cuando se ha scrolleado más de 50px
      setIsScrolled(scrollPosition > 50)

      // Detectar si se ha scrolleado más allá de la sección hero
      const heroSection = document.getElementById('hero')
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight
        const heroBottom = heroSection.offsetTop + heroHeight
        setHasScrolledBeyondHero(scrollPosition > heroBottom - 200)

        // Calcular el progreso del scroll como porcentaje para transiciones suaves
        const scrollPercentage = Math.min(scrollPosition / heroHeight, 1)
        setScrollProgress(scrollPercentage)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Verificar estado inicial

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Efecto para cerrar menú en pantallas grandes
  useEffect(() => {
    const handleResize = () => window.innerWidth >= 768 && setIsMenuOpen(false)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Efecto para detectar la sección activa
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )

    // Observamos todas las secciones
    navItems.forEach(({ href }) => {
      const sectionId = href.split('#')[1]
      const section = document.getElementById(sectionId)
      if (section) {
        observer.observe(section)
      }
    })

    return () => observer.disconnect()
  }, [])

  // Función mejorada para el scroll con offset
  const handleScroll = useCallback((href: string) => {
    const sectionId = href.split('#')[1]
    const section = document.getElementById(sectionId)

    if (section) {
      // Obtener la posición actual del scroll
      const offsetTop = section.getBoundingClientRect().top + window.pageYOffset

      // Altura del navbar 
      const navbarHeight = isScrolled ? 64 : 80 // h-16 (64px) cuando scrolled, h-20 (80px) cuando no

      // Scroll a la posición calculada
      window.scrollTo({
        top: offsetTop - navbarHeight,
        behavior: 'smooth'
      })
    }

    setIsMenuOpen(false)
  }, [isScrolled])

  // Determinar la apariencia del navbar
  const navbarBackground = cn(
    "fixed w-full top-0 z-50 transition-all duration-500",
    isScrolled
      ? "border-b shadow-md"
      : hasScrolledBeyondHero
        ? "border-b border-border/10"
        : "",
    isScrolled || hasScrolledBeyondHero
      ? "bg-background/90 backdrop-blur-lg backdrop-saturate-150"
      : "bg-transparent"
  )

  // Altura y padding del navbar basada en el scroll
  const navbarHeight = cn(
    "transition-all duration-300",
    isScrolled
      ? "h-16 py-2"
      : "h-20 py-4 md:h-24 md:py-6"
  )

  // Efecto de padding horizontal dinámico
  const containerPadding = cn(
    "transition-all duration-300",
    isScrolled
      ? "px-4 sm:px-6 lg:px-8"
      : "px-5 sm:px-8 lg:px-10"
  )

  return (
    <nav className={cn(navbarBackground, navbarHeight)}>
      <div className={cn("max-w-4xl mx-auto h-full flex items-center justify-between", containerPadding)}>
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Button
            variant="ghost"
            className="group relative gap-2 pl-0 hover:bg-transparent"
            onClick={() => handleScroll("#hero")}
          >
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <span className={cn(
                "font-bold bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent transition-all duration-300",
                isScrolled ? "text-sm sm:text-base" : "text-base sm:text-lg md:text-xl"
              )}>
                @leftra123
              </span>
              <Code2 className={cn(
                "text-primary transition-all duration-300 group-hover:rotate-12",
                isScrolled ? "h-5 w-5" : "h-6 w-6 md:h-7 md:w-7"
              )} />
            </motion.div>
            {activeSection === "hero" && (
              <motion.div
                // className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-primary/80 via-blue-500/80 to-blue-600/80 rounded-full"
                layoutId="logoActive"
                transition={{ type: "spring", stiffness: 300 }}
              />
            )}
          </Button>
        </motion.div>

        {/* Menú desktop */}
        <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.href.split('#')[1]
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
              >
                <Button
                  variant={item.highlight ? (isActive ? "default" : "outline") : "ghost"}
                  className={cn(
                    "relative font-medium px-3 rounded-lg transition-all duration-300",
                    isScrolled ? "text-sm py-2" : "text-sm md:text-base py-2.5",
                    item.highlight && !isActive ? "border-primary/40 text-primary hover:bg-primary/10" : "",
                    !item.highlight && isActive
                      ? "text-primary"
                      : !item.highlight && cn(
                        "text-muted-foreground hover:text-foreground hover:bg-primary/5",
                        (!isScrolled && !hasScrolledBeyondHero) ? "hover:bg-white/10" : ""
                      )
                  )}
                  onClick={() => handleScroll(item.href)}
                >
                  {item.name}
                  {isActive && !item.highlight && (
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary/80 via-blue-500/80 to-blue-600/80 rounded-full"
                      layoutId="activeSection"
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  )}
                </Button>
              </motion.div>
            )
          })}
        </div>

        {/* Controles derecho */}
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            className={cn(
              "transition-all duration-300",
              isScrolled ? "scale-90" : "scale-100"
            )}
          >
            <ThemeToggle />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            className="md:hidden"
          >
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-lg transition-all",
                isScrolled || hasScrolledBeyondHero
                  ? "hover:bg-muted/50"
                  : "hover:bg-white/10"
              )}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMenuOpen ? 'close' : 'open'}
                  initial={{ opacity: 0, rotate: isMenuOpen ? -90 : 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: isMenuOpen ? 90 : -90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </motion.div>
              </AnimatePresence>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden absolute w-full left-0 top-16 shadow-lg border-t z-50 overflow-hidden backdrop-blur-xl backdrop-saturate-150 bg-background/95"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="px-4 py-4"
            >
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.split('#')[1]
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                    className="my-1"
                  >
                    <Button
                      variant={item.highlight ? (isActive ? "default" : "outline") : "ghost"}
                      className={cn(
                        "w-full justify-between text-base h-12 px-4 rounded-lg",
                        item.highlight && !isActive ? "border-primary/40 text-primary" : "",
                        !item.highlight && isActive
                          ? "bg-primary/10 text-primary font-medium"
                          : !item.highlight && "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                      )}
                      onClick={() => handleScroll(item.href)}
                    >
                      <span>{item.name}</span>
                      <ChevronRight className={cn(
                        "h-4 w-4 transition-transform",
                        isActive ? "text-primary rotate-90" : "text-muted-foreground"
                      )} />
                    </Button>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Línea de progreso sutil */}
      {isScrolled && (
        <motion.div
          className="absolute left-0 bottom-0 h-[2px] bg-gradient-to-r from-primary/30 via-primary/60 to-blue-600/30"
          style={{ width: `${scrollProgress * 100}%` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </nav>
  )
}