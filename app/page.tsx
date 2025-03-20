import { AchievementsSection } from "@/components/sections/achievements"
import ContactSection from "@/components/sections/contact"
import { EducationSection } from "@/components/sections/education"
import { ExperienceSection } from "@/components/sections/experience"
import { Footer } from "@/components/sections/footer"
import { HeroSection } from "@/components/sections/hero"
import { Navbar } from "@/components/sections/navbar"
import { ProjectsSection } from "@/components/sections/projects"
import { ScrollToTopButton } from "@/components/sections/ScrollToTopButton"
import { Suspense } from "react"
// import { SkillsSection } from "@/components/sections/skills"

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Cargando...</div>}>
        <ExperienceSection />
        <EducationSection />
        <ProjectsSection />
        <AchievementsSection />
        {/* <SkillsSection /> */}
        <ContactSection />
      </Suspense>
      
      <Footer />
      <ScrollToTopButton />
    </main>
  )
}