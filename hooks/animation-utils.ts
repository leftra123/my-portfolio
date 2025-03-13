// https://uxdesign.cc/the-ultimate-guide-to-proper-use-of-animation-in-ux-10bd98614fa9
// animation-utils.ts

// Primero, definimos una interfaz para las opciones
interface AnimationVariantOptions {
  hidden?: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
    [key: string]: any;
  };
  duration?: number;
  ease?: number[] | string;
  stagger?: number;
  delay?: number;
}

// Duración óptima según el artículo (200-500ms)
export const DURATION = {
  // Para dispositivos móviles
  MOBILE: {
    DEFAULT: 0.25, // 250ms
    ENTER: 0.3,    // 300ms
    EXIT: 0.2      // 200ms
  },
  // Para tablets (+30%)
  TABLET: {
    DEFAULT: 0.35, // 350ms
    ENTER: 0.4,    // 400ms
    EXIT: 0.25     // 250ms
  },
  // Para web (-50% que mobile)
  WEB: {
    DEFAULT: 0.15, // 150ms
    ENTER: 0.2,    // 200ms
    EXIT: 0.1      // 100ms
  },
  // Para transiciones de listas (20-25ms por elemento)
  LIST_STAGGER: 0.025 // 25ms
};

// Curvas de aceleración basadas en el artículo
export const EASE = {
  // Curva linear (solo para cambios de color/opacidad)
  LINEAR: [0, 0, 1, 1],
  
  // Aceleración (para elementos que salen de pantalla)
  EASE_IN: [0.4, 0, 1, 1],
  
  // Desaceleración (para elementos que entran en pantalla)
  EASE_OUT: [0, 0, 0.2, 1],
  
  // Estándar (para movimientos entre partes de la pantalla)
  EASE_IN_OUT: [0.4, 0, 0.2, 1],
  
  // Asimétrica (aceleración más corta que desaceleración - más natural)
  STANDARD: [0.2, 0, 0.38, 1]
};

// Configuraciones de animación predefinidas para Framer Motion
export const MOTION = {
  // Transición base con curva estándar
  transition: {
    duration: DURATION.MOBILE.DEFAULT,
    ease: EASE.STANDARD
  },
  
  // Para elementos que entran en pantalla
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: DURATION.MOBILE.ENTER,
      ease: EASE.EASE_OUT
    }
  },
  
  // Para elementos que salen de pantalla
  fadeOut: {
    exit: { opacity: 0, y: -10 },
    transition: {
      duration: DURATION.MOBILE.EXIT,
      ease: EASE.EASE_IN
    }
  },
  
  // Para elementos que se desplazan horizontalmente
  slideHorizontal: (direction = 1) => ({
    initial: { opacity: 0, x: 20 * direction },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 * direction },
    transition: {
      duration: DURATION.MOBILE.DEFAULT,
      ease: EASE.STANDARD
    }
  }),
  
  // Efectos de escala para botones/iconos
  scaleButton: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: {
      duration: 0.2,
      ease: EASE.STANDARD
    }
  },
  
  // Para listas de elementos con efecto escalonado
  staggerChildren: {
    container: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: {
        staggerChildren: DURATION.LIST_STAGGER,
        delayChildren: 0.1
      }
    },
    item: {
      initial: { opacity: 0, y: 15 },
      animate: { opacity: 1, y: 0 },
      transition: {
        duration: DURATION.MOBILE.DEFAULT,
        ease: EASE.STANDARD
      }
    }
  }
};

// Función para crear variantes de animación personalizadas
export const createVariants = (options: AnimationVariantOptions) => {
  return {
    hidden: options.hidden || { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: options.duration || DURATION.MOBILE.DEFAULT,
        ease: options.ease || EASE.STANDARD,
        staggerChildren: options.stagger || 0,
        delayChildren: options.delay || 0
      }
    }
  };
};

// Para crear un retraso escalonado basado en el índice
export const staggerDelay = (index: number, baseDelay = 0.1, staggerAmount = 0.05) => {
  return baseDelay + (index * staggerAmount);
};