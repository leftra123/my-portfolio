"use client"

import * as React from "react"
import { Moon, Sun, Laptop } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

const themes = ["light", "dark", "system"]

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const cycleTheme = () => {
    const currentIndex = themes.indexOf(theme || "system")
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  const renderIcon = () => {
    if (theme === "dark")
      return <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
    if (theme === "light")
      return <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
    return <Laptop className="h-[1.2rem] w-[1.2rem] transition-all" />
  }

  return (
    <Button variant="outline" size="icon" onClick={cycleTheme}>
      {renderIcon()}
      <span className="sr-only">Cambiar tema</span>
    </Button>
  )
}
