"use client"

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import SkillTag from "@/components/ui/SkillTag";
import * as Tooltip from '@radix-ui/react-tooltip';
import * as Tabs from '@radix-ui/react-tabs';

// Array de proyectos basado en la información proporcionada
const proyectos = [
  { id: 1, title: "Transporte_2", tech: ["Python", "PyQt5"] },
  { id: 2, title: "Transporte_2 (Backend)", tech: ["Python", "Backend"] },
  { id: 3, title: "Landing Tesla", tech: ["HTML", "CSS", "JavaScript", "Astro", "TailwindCSS"] },
  { id: 4, title: "Juan del Sur", tech: ["HTML", "CSS", "JavaScript"] },
  { id: 5, title: "Gestión Educativa API", tech: ["Django", "React", "TailwindCSS"] },
  { id: 6, title: "Arduino Project", tech: ["C", "Arduino"] },
  { id: 7, title: "Devolución Project", tech: ["Python", "Django", "MySQL"] },
  { id: 8, title: "Innovación Emprendimiento II", tech: ["HTML", "CSS", "JavaScript"] },
  { id: 9, title: "Incidentes Inacap", tech: ["Java", "Firebase", "Mobile"] },
  { id: 10, title: "NextJS Context CRUD", tech: ["Next.js", "JavaScript"] },
  { id: 11, title: "Tasks", tech: ["React", "JavaScript", "Docker"] },
  { id: 12, title: "ERP Project", tech: ["Django", "HTML", "CSS", "JavaScript", "Docker"] },
  // Habilidades de experiencia laboral
  { id: 13, title: "Encargado de bienes e inventario", tech: ["Metodologías Ágiles", "Gestión de Inventarios", "Reportes", "Optimización de Procesos", "SAE", "BRP"] },
  { id: 14, title: "Analista de Datos Financieros", tech: ["Python", "Google Colab", "Análisis de Datos", "Reportes Financieros"] },
  { id: 15, title: "Práctica profesional", tech: ["Django Rest Framework", "React", "API", "Base de Datos", "Soporte de Hardware"] },
  { id: 16, title: "Reponedor", tech: ["Control de Inventario", "Organización", "Gestión de Productos", "Coordinación"] },
  { id: 17, title: "Apoyo de Verano, Cajero", tech: ["Atención al Cliente", "Manejo de Caja", "Supervisión", "Gestión de Inventario"] },
  { id: 18, title: "Operador de bodega", tech: ["Gestión de Inventario", "Picking", "Distribución", "Trabajo en Equipo"] },
];

// Definición de categorías
const categorias = {
  "Lenguajes de Programación": ["Python", "JavaScript", "Java", "C"],
  "Frontend": ["HTML", "CSS", "React", "TailwindCSS", "Astro", "Next.js"],
  "Backend": ["Django", "Django Rest Framework", "API", "Backend"],
  "Bases de Datos": ["MySQL", "Base de Datos", "MongoDB", "Firebase"],
  "DevOps": ["Docker"],
  "Tecnologías": ["Arduino", "PyQt5", "Google Colab", "Mobile"],
  "Gestión": ["Metodologías Ágiles", "Gestión de Inventarios", "Control de Inventario", "Optimización de Procesos", "Gestión de Productos", "SAE", "BRP"],
  "Análisis": ["Análisis de Datos", "Reportes", "Reportes Financieros"],
  "Servicio": ["Atención al Cliente", "Soporte de Hardware", "Manejo de Caja"],
  "Habilidades Blandas": ["Coordinación", "Supervisión", "Trabajo en Equipo", "Organización", "Picking", "Distribución"]
};

// Función auxiliar para categorizar una habilidad
const getCategoriaDeSkill = (skill) => {
  for (const [categoria, skills] of Object.entries(categorias)) {
    if (skills.includes(skill)) {
      return categoria;
    }
  }
  return "Otros";
};

export function SkillsSection() {
  // Extraemos todas las tecnologías únicas de los proyectos
  const allTech = useMemo(() => {
    const techSet = new Set();
    proyectos.forEach((p) => {
      p.tech.forEach((t) => techSet.add(t));
    });
    return Array.from(techSet).sort();
  }, []);

  // Agrupamos las habilidades por categoría
  const techPorCategoria = useMemo(() => {
    const result = {};
    
    // Inicializar todas las categorías incluso si están vacías
    Object.keys(categorias).forEach(cat => {
      result[cat] = [];
    });
    result["Otros"] = []; // Para skills que no entran en ninguna categoría definida
    
    allTech.forEach(skill => {
      const categoria = getCategoriaDeSkill(skill);
      if (!result[categoria]) {
        result[categoria] = [];
      }
      result[categoria].push(skill);
    });
    
    // Eliminar categorías vacías
    Object.keys(result).forEach(cat => {
      if (result[cat].length === 0) {
        delete result[cat];
      }
    });
    
    return result;
  }, [allTech]);

  // Estado para la categoría activa
  const [categoriaActiva, setCategoriaActiva] = useState("Todas");
  
  // Lista de todas las categorías disponibles incluyendo "Todas"
  const todasLasCategorias = useMemo(() => {
    return ["Todas", ...Object.keys(techPorCategoria)];
  }, [techPorCategoria]);
  
  // Filtramos las habilidades basadas en la categoría seleccionada
  const skillsVisibles = useMemo(() => {
    if (categoriaActiva === "Todas") {
      return allTech;
    }
    return techPorCategoria[categoriaActiva] || [];
  }, [categoriaActiva, allTech, techPorCategoria]);

  return (
    <section
      className="min-h-screen snap-start flex flex-col items-center justify-center py-20"
      id="skills"
    >
      <div className="max-w-7xl mx-auto px-4 w-full">
        <motion.h2
          className="text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Habilidades
        </motion.h2>

        <motion.p
          className="text-muted-foreground max-w-2xl mx-auto text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Estas son las tecnologías y herramientas que he utilizado en mis proyectos y experiencia laboral.
        </motion.p>

        <Tabs.Root
          value={categoriaActiva}
          onValueChange={setCategoriaActiva}
          className="flex flex-col items-center w-full mb-12"
        >
          <motion.div
            className="mb-8 w-full overflow-x-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Tabs.List className="flex space-x-2 pb-2 px-2 min-w-max mx-auto justify-center">
              {todasLasCategorias.map((categoria) => (
                <Tabs.Trigger
                  key={categoria}
                  value={categoria}
                  className={`px-4 py-2 rounded-md transition-all text-sm font-medium whitespace-nowrap ${
                    categoriaActiva === categoria
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-primary/10 hover:bg-primary/20"
                  }`}
                >
                  {categoria}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
          </motion.div>

          <Tooltip.Provider>
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.05 },
                },
              }}
              key={categoriaActiva} // Forzar re-renderizado de animaciones cuando cambia la categoría
            >
              {skillsVisibles.map((skill) => (
                <SkillTag key={skill} skill={skill} />
              ))}
            </motion.div>
          </Tooltip.Provider>
        </Tabs.Root>
      </div>
    </section>
  );
}

export default SkillsSection;