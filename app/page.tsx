import { Navbar } from "@/components/sections/navbar"
import { HeroSection } from "@/components/sections/hero"
import { ExperienceSection } from "@/components/sections/experience"
import { EducationSection } from "@/components/sections/education"
import { ProjectsSection } from "@/components/sections/projects"
import ContactSection from "@/components/sections/contact"
import { Footer } from "@/components/sections/footer"
import { AchievementsSection } from "@/components/sections/achievements"
// import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <main className="snap-y snap-mandatory h-screen overflow-y-scroll">
      <Navbar />
      {/* <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>  */}
      <HeroSection />
      {/* <ExperienceSection /> */}
      {/* <EducationSection /> */}
      {/* <ProjectsSection /> */}
      {/* <AchievementsSection /> */}
      {/* <ContactSection /> */}
      {/* <Footer /> */}
    </main>
  )
}