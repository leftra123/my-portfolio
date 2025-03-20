"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react" // Asegúrate de tener un icono para el modo "sistema"
import { useTheme } from "next-themes"

export function ThemeToggleTouch() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const currentTheme = resolvedTheme || theme
  const themes = ["light", "dark", "system"]
  const currentIndex = themes.indexOf(currentTheme)
  const nextTheme = themes[(currentIndex + 1) % themes.length]

  // Selecciona el icono en función del tema actual.
  const icon =
    currentTheme === "dark" ? (
      <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
    ) : currentTheme === "light" ? (
      <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
    ) : (
      <Monitor className="h-[1.2rem] w-[1.2rem] transition-all" />
    )

  return (
    <button
      onClick={() => setTheme(nextTheme)}
      className="p-2 border rounded hover:bg-primary/10 transition-all duration-200"
      aria-label="Toggle theme"
    >
      {icon}
    </button>
  )
}