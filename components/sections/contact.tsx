"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import emailjs from '@emailjs/browser'
// Importamos React Icons
import { FaGithub, FaLinkedinIn, FaEnvelope, FaWhatsapp, FaPaperPlane, FaSpinner, FaInstagram } from "react-icons/fa"
import { Card, CardContent } from "@/components/ui/card"

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
      icon: <FaEnvelope className="h-6 w-6 text-primary" />, 
      title: "Email", 
      value: "eric04232013@gmail.com",
      href: "mailto:eric04232013@gmail.com"
    },
    { 
      icon: <FaWhatsapp className="h-6 w-6 text-primary" />, 
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
    <section id="contacto" className="min-h-screen snap-start flex flex-col items-center justify-center py-20 bg-gradient-to-b from-background via-background/95 to-background/90">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto px-4 w-full"
      >
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl font-bold mb-4 relative inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Contáctame
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-primary/80"></span>
          </motion.h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            ¿Tienes un proyecto en mente? Hablemos sobre cómo puedo ayudarte a hacerlo realidad.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Información de contacto */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Hablemos</h3>
              <p className="text-muted-foreground">
                Estoy disponible para proyectos freelance, oportunidades laborales o simplemente para conversar sobre tecnología e innovación.
              </p>
            </div>

            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <Card key={index} className="overflow-hidden border border-border/40 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-all duration-300">
                  <CardContent className="p-4 flex items-center">
                    <div className="mr-4 p-2 rounded-full bg-primary/10">
                      {method.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">{method.title}</h4>
                      <a 
                        href={method.href} 
                        className="text-foreground hover:text-primary transition-colors duration-200"
                      >
                        {method.value}
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="pt-4">
              <h4 className="text-sm font-medium text-muted-foreground mb-3">Sígueme en</h4>
              <div className="flex gap-2">
                {socialLinks.map((item, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full border-border/50 hover:bg-primary/10 hover:border-primary/40 transition-all duration-300"
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
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="backdrop-blur-sm border border-border/40 bg-card/30 p-6">
              <CardContent className="p-0">
                <form 
                  ref={form}
                  onSubmit={sendEmail}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <Label htmlFor="from_name" className="text-foreground/90">Nombre</Label>
                    <Input
                      id="from_name"
                      name="from_name"
                      placeholder="Ej: Iván González"
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
                      placeholder="tucorreo@gmail.com"
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
                      rows={5}
                      disabled={loading}
                      required
                      className="bg-background/50 border-border/40 focus:border-primary/50 min-h-[120px]"
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
      </motion.div>
    </section>
  )
}