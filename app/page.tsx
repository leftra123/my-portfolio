import { AchievementsSection } from "@/components/sections/achievements"
import ContactSection from "@/components/sections/contact"
import { EducationSection } from "@/components/sections/education"
import { ExperienceSection } from "@/components/sections/experience"
import { Footer } from "@/components/sections/footer"
import { HeroSection } from "@/components/sections/hero"
import { Navbar } from "@/components/sections/navbar"
import { ProjectsSection } from "@/components/sections/projects"
import { ScrollToTopButton } from "@/components/sections/ScrollToTopButton"
// import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <main className="h-full overflow-y-auto">
      <Navbar />
      {/* <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>  */}
      <HeroSection />
      <ExperienceSection />
      <EducationSection />
      <ProjectsSection />
      <AchievementsSection />
      <ContactSection />
      <Footer />
      <ScrollToTopButton />
    </main>
  )
}