"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import emailjs from "emailjs-com"
import { useRef, useState } from "react"
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedinIn, FaPaperPlane, FaSpinner, FaWhatsapp } from "react-icons/fa"

export default function ContactSection() {
  const form = useRef<HTMLFormElement>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (!form.current ||
      !process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||
      !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ||
      !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
      setError('Error de configuración del formulario')
      setLoading(false)
      return
    }

    // Simulamos el envío exitoso para pruebas (reemplazar con la implementación real)
    setTimeout(() => {
      setSuccess(true)
      form.current?.reset()
      setLoading(false)
      setTimeout(() => setSuccess(false), 5000)
    }, 1500)

    // Implementación real con EmailJS (descomentar en producción)
    
    emailjs.sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      form.current,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    )
      .then(() => {
        setSuccess(true)
        form.current?.reset()
        setTimeout(() => setSuccess(false), 5000)
      })
      .catch((err) => {
        setError('Error al enviar el mensaje. Por favor inténtalo nuevamente.')
        console.error('EmailJS Error:', err)
      })
      .finally(() => setLoading(false))
    
  }

  // Contactos directos
  const contactMethods = [
    {
      icon: <FaEnvelope className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
      title: "Email",
      value: "eric04232013@gmail.com",
      href: "mailto:eric04232013@gmail.com"
    },
    {
      icon: <FaWhatsapp className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
      title: "WhatsApp",
      value: "+56 9 3051 8083",
      href: "https://wa.me/+56930518083"
    }
  ]

  // Social links
  const socialLinks = [
    { icon: <FaGithub className="w-5 h-5" />, link: 'https://github.com/leftra123', label: 'Github' },
    { icon: <FaLinkedinIn className="w-5 h-5" />, link: 'https://linkedin.com/in/eric-aguayo-quintriqueo-b36783220', label: 'LinkedIn' },
    { icon: <FaInstagram className="w-5 h-5" />, link: 'https://www.instagram.com/analema.x/', label: 'Instagram' },
  ]

  return (
    <section id="contacto" className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-background to-background/80">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-12 text-center md:text-left"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 inline-block relative">
            Contáctame
            <span className="absolute -bottom-2 left-0 w-24 h-1 bg-primary/80 rounded-full"></span>
          </h2>
          <p className="text-muted-foreground max-w-2xl md:mx-0 mx-auto mt-4 sm:mt-6">
            ¿Tienes un proyecto en mente o una oportunidad para colaborar? Me encantaría escuchar tu propuesta.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-start">
          {/* Información de contacto */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Hablemos</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Estoy disponible para proyectos freelance, oportunidades laborales o simplemente para conversar sobre tecnología e innovación.
              </p>
            </div>

            <div className="space-y-3">
              {contactMethods.map((method, index) => (
                <Card key={index} className="overflow-hidden border border-border/40 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-all duration-300">
                  <CardContent className="p-3 sm:p-4 flex items-center">
                    <div className="mr-3 sm:mr-4 p-2 rounded-full bg-primary/10">
                      {method.icon}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-medium text-muted-foreground">{method.title}</h4>
                      <a
                        href={method.href}
                        className="text-sm sm:text-base text-foreground hover:text-primary transition-colors duration-200"
                      >
                        {method.value}
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="pt-2 sm:pt-4">
              <h4 className="text-xs sm:text-sm font-medium text-muted-foreground mb-3">Sígueme en</h4>
              <div className="flex gap-2">
                {socialLinks.map((item, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 sm:h-10 sm:w-10 rounded-full border-border/50 hover:bg-primary/10 hover:border-primary/40 transition-all duration-300"
                    onClick={() => window.open(item.link, '_blank')}
                    aria-label={item.label}
                  >
                    {item.icon}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="backdrop-blur-sm border border-border/40 bg-card/30 p-4 sm:p-6">
              <CardContent className="p-0">
                <form
                  ref={form}
                  onSubmit={sendEmail}
                  className="space-y-4 sm:space-y-6"
                >
                  <div className="space-y-2">
                    <Label htmlFor="from_name" className="text-foreground/90">Nombre</Label>
                    <Input
                      id="from_name"
                      name="from_name"
                      placeholder="Ej: Patricio Developer"
                      disabled={loading}
                      required
                      className="bg-background/50 border-border/40 focus:border-primary/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="from_email" className="text-foreground/90">Email</Label>
                    <Input
                      id="from_email"
                      type="email"
                      name="from_email"
                      placeholder="tucorreo@ejemplo.com"
                      disabled={loading}
                      required
                      className="bg-background/50 border-border/40 focus:border-primary/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-foreground/90">Mensaje</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Describe tu proyecto o consulta..."
                      rows={4}
                      disabled={loading}
                      required
                      className="bg-background/50 border-border/40 focus:border-primary/50 min-h-[100px] sm:min-h-[120px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary/90 hover:bg-primary transition-all duration-300 flex items-center justify-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="mr-2 h-4 w-4" />
                        <span>Enviar Mensaje</span>
                      </>
                    )}
                  </Button>

                  {error && (
                    <div className="p-3 rounded bg-red-500/10 border border-red-500/30 text-red-500 text-sm">
                      {error}
                    </div>
                  )}

                  {success && (
                    <div className="p-3 rounded bg-green-500/10 border border-green-500/30 text-green-500 text-sm">
                      ¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}