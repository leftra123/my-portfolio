"use client"
import * as Tooltip from '@radix-ui/react-tooltip';
import { motion } from "framer-motion";
import { IconType } from "react-icons";
import { 
  SiReact, 
  SiTypescript, 
  SiTailwindcss, 
  SiNodedotjs,
  SiDjango, 
  SiFirebase, 
  SiNextdotjs, 
  SiPython, 
  SiMongodb,
  SiExpress,
  SiGraphql,
  SiDocker,
  SiArduino,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiAstro,
  SiC,
  SiMysql,
  SiOpenjdk,
  SiGooglecolab,
} from "react-icons/si";
import { 
  MdOutlineInventory, 
  MdOutlineAnalytics,
  MdApi,
  MdOutlineStorage,
  MdOutlineComputer,
  MdOutlineShoppingCart,
  MdPeopleOutline,
  MdOutlinePointOfSale,
  MdOutlineSupervisorAccount,
  MdOutlineLocalShipping,
  MdHandyman, 
  MdOutlineWork,
  MdReportProblem,
  MdSettings,
  MdPhoneAndroid
} from "react-icons/md";

// Mapeo de skills a íconos
const skillIcons: Record<string, IconType> = {
  "React": SiReact,
  "TypeScript": SiTypescript,
  "Tailwind": SiTailwindcss,
  "TailwindCSS": SiTailwindcss,
  "Next.js": SiNextdotjs,
  "Node.js": SiNodedotjs,
  "Express": SiExpress,
  "Django": SiDjango,
  "Python": SiPython,
  "MongoDB": SiMongodb,
  "Firebase": SiFirebase,
  "GraphQL": SiGraphql,
  "Docker": SiDocker,
  "Arduino": SiArduino,
  "HTML": SiHtml5,
  "CSS": SiCss3,
  "JavaScript": SiJavascript,
  "Astro": SiAstro,
  "C": SiC,
  "MySQL": SiMysql,
  "Java": SiOpenjdk,
  "Google Colab": SiGooglecolab,
  "PyQt5": SiPython,
  
  // Íconos para habilidades no técnicas
  "Backend": MdOutlineStorage,
  "Mobile": MdPhoneAndroid,
  "Gestión de Inventarios": MdOutlineInventory,
  "Control de Inventario": MdOutlineInventory,
  "Metodologías Ágiles": MdHandyman,
  "Reportes": MdReportProblem,
  "Optimización de Procesos": MdSettings,
  "SAE": MdOutlineStorage,
  "BRP": MdOutlineStorage,
  "Análisis de Datos": MdOutlineAnalytics,
  "Reportes Financieros": MdOutlineAnalytics,
  "Django Rest Framework": SiDjango,
  "API": MdApi,
  "Base de Datos": MdOutlineStorage,
  "Soporte de Hardware": MdOutlineComputer,
  "Organización": MdOutlineInventory,
  "Gestión de Productos": MdOutlineShoppingCart,
  "Coordinación": MdPeopleOutline,
  "Atención al Cliente": MdPeopleOutline,
  "Manejo de Caja": MdOutlinePointOfSale,
  "Supervisión": MdOutlineSupervisorAccount,
  "Picking": MdOutlineShoppingCart,
  "Distribución": MdOutlineLocalShipping,
  "Trabajo en Equipo": MdPeopleOutline,
};

// Mapeo de skills a categorías (para tooltip)
const skillCategorias: Record<string, string> = {
  "Python": "Lenguajes de Programación",
  "JavaScript": "Lenguajes de Programación",
  "Java": "Lenguajes de Programación",
  "C": "Lenguajes de Programación",
  "TypeScript": "Lenguajes de Programación",
  "Kotlin": "Lenguajes de Programación",
  "C#": "Lenguajes de Programación",
  
  "HTML": "Frontend",
  "CSS": "Frontend",
  "React": "Frontend",
  "TailwindCSS": "Frontend",
  "Astro": "Frontend",
  "Next.js": "Frontend",
  
  "Django": "Backend",
  "Django Rest Framework": "Backend",
  "API": "Backend",
  "Backend": "Backend",
  
  "MySQL": "Bases de Datos",
  "MongoDB": "Bases de Datos",
  "Firebase": "Bases de Datos",
  "Base de Datos": "Bases de Datos",
  
  "Docker": "DevOps",
  
  "Arduino": "Tecnologías",
  "PyQt5": "Tecnologías",
  "Google Colab": "Tecnologías",
  "Mobile": "Tecnologías",

  // "Metodologías Ágiles": "Gestión",

  // "Análisis de Datos": "Análisis",
  // "Reportes": "Análisis",
  // "Reportes Financieros": "Análisis",

  // "Atención al Cliente": "Servicio",
  // "Soporte de Hardware": "Servicio",
  // "Manejo de Caja": "Servicio",

  // "Coordinación": "Habilidades Blandas",
  // "Supervisión": "Habilidades Blandas",
  // "Trabajo en Equipo": "Habilidades Blandas",
  // "Organización": "Habilidades Blandas",
  // "Picking": "Habilidades Blandas",
  // "Distribución": "Habilidades Blandas",
  
};

interface SkillTagProps {
  skill: string;
}

export function SkillTag({ skill }: SkillTagProps) {
  // Si existe un ícono para la skill, lo usaremos
  const IconComponent = skillIcons[skill] || MdOutlineWork;
  const categoria = skillCategorias[skill] || "Otros";
  
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          whileHover={{ scale: 1.05 }}
          className="bg-primary/10 text-primary rounded-md p-3 text-sm font-medium flex items-center justify-center gap-2 cursor-pointer hover:bg-primary/20 transition-all"
        >
          <IconComponent className="w-6 h-6" />
          <span>{skill}</span>
        </motion.div>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          className="bg-gray-800 text-white p-2 rounded-md text-xs"
          side="top"
          sideOffset={5}
        >
          <div className="flex flex-col">
            <span className="font-bold">{skill}</span>
            <span className="text-gray-300 text-xs">{categoria}</span>
          </div>
          <Tooltip.Arrow className="fill-gray-800" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

export default SkillTag;