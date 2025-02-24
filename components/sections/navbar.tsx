"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X, Code2 } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState("hero")
    const [isScrolled, setIsScrolled] = useState(false)

  const navItems = [
    { name: "Inicio", href: "#hero" },
    { name: "Experiencia", href: "#experiencia" },
    { name: "Educación", href: "#educacion" },
    { name: "Proyectos", href: "#projects" },
    { name: "Contacto", href: "#contacto" }
  ]
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => window.innerWidth >= 768 && setIsMenuOpen(false)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

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

    navItems.forEach(({ href }) => {
      const sectionId = href.split('#')[1]
      const section = document.getElementById(sectionId)
      section && observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const handleScroll = (href: string) => {
    const sectionId = href.split('#')[1]
    const section = document.getElementById(sectionId)
    section?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  return (
    <nav className={cn(
      "fixed w-full top-0 z-50 bg-background/80 backdrop-blur-md border-b transition-all duration-300",
      isScrolled ? "h-14 shadow-lg" : "h-16"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo temporal con indicador activo */}
          <Button
  variant="ghost"
  className="group relative gap-2 pl-2 hover:bg-transparent"
  onClick={() => handleScroll("#hero")}
>
  <motion.div
    className="flex items-center gap-2"
    whileHover={{ scale: 1.05 }}
  >
    <Code2 className="h-6 w-6 text-primary transition-transform group-hover:rotate-12" />
    <span className="text-sm font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
      @leftra123
    </span>
  </motion.div>
  {activeSection === "hero" && (
    <motion.div
      className="absolute -bottom-1 left-0 w-full h-[2px] bg-primary"
      layoutId="logoActive"
      transition={{ type: "spring", stiffness: 300 }}
    />
  )}
</Button>

          {/* Menú desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.split('#')[1]
              return (
                <Button
                  key={item.href}
                  variant="ghost"
                  className={cn(
                    "relative text-sm font-medium px-3",
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => handleScroll(item.href)}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-primary"
                      layoutId="activeSection"
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  )}
                </Button>
              )
            })}
          </div>

          {/* Controles derecho */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-lg hover:bg-muted/50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 transition-all" />
              ) : (
                <Menu className="h-6 w-6 transition-all" />
              )}
            </Button>
          </div>
        </div>

        {/* Menú móvil mejorado */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden absolute w-full bg-background left-0 top-16 shadow-lg border-t"
            >
              <div className="px-2 py-3">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.split('#')[1]
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start text-base h-12 px-4",
                          isActive 
                            ? "bg-primary/10 text-primary font-semibold"
                            : "text-muted-foreground hover:bg-muted/50"
                        )}
                        onClick={() => handleScroll(item.href)}
                      >
                        {item.name}
                        {isActive && (
                          <motion.div
                            className="ml-2 w-2 h-2 rounded-full bg-primary"
                            layoutId="mobileActive"
                          />
                        )}
                      </Button>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}