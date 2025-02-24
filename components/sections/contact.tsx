"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { GithubIcon, LinkedinIcon, Mail } from "lucide-react"
import emailjs from '@emailjs/browser'

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

  return (
    <section id="contacto" className="min-h-screen snap-start flex flex-col items-center justify-center py-20 bg-gradient-to-b from-background to-muted/10">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto px-4"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Contáctame</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            ¿Tienes un proyecto en mente? Hablemos sobre cómo puedo ayudarte a hacerlo realidad.
          </p>
        </div>

        <div className="grid md:grid-cols-1 gap-12 items-start">    

          {/* Formulario */}
          <motion.form 
            ref={form}
            onSubmit={sendEmail}
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div>
              <Label htmlFor="from_name">Nombre</Label>
              <Input
                id="from_name"
                name="from_name"
                placeholder="Ej: Juan Pérez"
                disabled={loading}
                required
              />
            </div>

            <div>
              <Label htmlFor="from_email">Email</Label>
              <Input
                id="from_email"
                type="email"
                name="from_email"
                placeholder="tucorreo@example.com"
                disabled={loading}
                required
              />
            </div>

            <div>
              <Label htmlFor="message">Mensaje</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Describe tu proyecto o consulta..."
                rows={5}
                disabled={loading}
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={loading}
            >
              {loading ? "Enviando..." : "Enviar Mensaje"}
            </Button>

            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}

            {success && (
              <p className="text-green-500 text-sm mt-2">
                ¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.
              </p>
            )}
          </motion.form>
        </div>
      </motion.div>
    </section>
  )
}