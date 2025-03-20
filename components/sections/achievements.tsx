"use client"

import { motion } from "framer-motion"
import { Award, BookOpen, Code, Coffee, Star, Users } from "lucide-react"

export function AchievementsSection() {
  const achievements = [
    {
      icon: <Code className="w-10 h-10" />,
      count: "3+",
      text: "Años",
      subtext: "de Experiencia",
      color: "from-blue-500/20 to-blue-600/20"
    },
    {
      icon: <Users className="w-10 h-10" />,
      count: "10+",
      text: "Proyectos",
      subtext: "Desarrollados",
      color: "from-purple-500/20 to-purple-600/20"
    },
    {
      icon: <Award className="w-10 h-10" />,
      count: "20+",
      text: "Certificaciones",
      subtext: "Obtenidas",
      color: "from-amber-500/20 to-amber-600/20"
    },
    {
      icon: <Coffee className="w-10 h-10" />,
      count: "1000+",
      text: "Horas",
      subtext: "de Programación",
      color: "from-rose-500/20 to-rose-600/20"
    },
    {
      icon: <Star className="w-10 h-10" />,
      count: "10+",
      text: "Tecnologías",
      subtext: "Implementadas",
      color: "from-emerald-500/20 to-emerald-600/20"
    },
    {
      icon: <BookOpen className="w-10 h-10" />,
      count: "5+",
      text: "Metodologías",
      subtext: "Aplicadas",
      color: "from-cyan-500/20 to-cyan-600/20"
    }
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const countAnimation = {
    hidden: { scale: 0.8, opacity: 0 },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.2,
        duration: 0.8
      }
    }
  }

  return (
    <section
      id="logros"
      className="py-20 md:py-24 bg-gradient-to-b from-background to-background/80"
    >
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Logros <span className="text-primary">Destacados</span>
        </motion.h2>

        <motion.p
          className="text-muted-foreground max-w-2xl mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Un vistazo a mi trayectoria profesional y los hitos alcanzados durante mi formación y carrera.
        </motion.p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              variants={item}
              className={`relative overflow-hidden rounded-xl p-6 border border-primary/10 bg-gradient-to-br ${achievement.color} backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="absolute -bottom-6 -right-6 opacity-10 text-primary">
                {achievement.icon}
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  {achievement.icon}
                </div>

                <div className="flex flex-col">
                  <motion.p
                    variants={countAnimation}
                    className="text-3xl font-bold text-primary"
                  >
                    {achievement.count}
                  </motion.p>
                  <p className="text-xl font-semibold">
                    {achievement.text}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {achievement.subtext}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}