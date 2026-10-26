# Portafolio — Eric Aguayo Quintriqueo

Sitio personal en [leftra123.vercel.app](https://leftra123.vercel.app), con la identidad **Aura Tech** (Ideas · Tecnología · Impacto).

## Stack

- Next.js 16 (App Router, todo estático) + React 19 + TypeScript estricto
- Tailwind CSS v4 con tokens de marca en `app/globals.css`
- Sora (titulares), Geist y Geist Mono vía `next/font`
- `cmdk` para el buscador de comandos (⌘K / Ctrl K), `next-themes` para claro/oscuro
- Imágenes Open Graph generadas con `next/og` y la tipografía Sora del brand kit

## Estructura

```
app/
  page.tsx                 portada (hero, trabajo, enfoque, trayectoria, stack, formación, contacto)
  proyectos/[slug]/        casos de estudio + imagen OG por proyecto
  archivo/                 todos los proyectos desde 2022
  formacion/               formación formal y 28 certificaciones
components/
  brand/isotipo.tsx        isotipo Aura Tech como SVG (degradados definidos una vez)
  home/                    secciones de la portada
  command-menu.tsx         buscador ⌘K
content/*.json             TODO el contenido del sitio (textos, proyectos, cifras); se edita desde /admin
lib/data.ts                tipa el contenido y deriva lo que usan los componentes
app/admin/                 tu espacio: panel, auditoría, generador y editores
public/work/               capturas de los proyectos en producción
public/brand/              logos del brand kit
```

Para cambiar textos, cifras o proyectos usa `/admin` (o edita los JSON de `content/`).

## Tu espacio (`/admin`)

Panel privado para editar el sitio sin tocar código. Todo el contenido vive en `content/*.json`
y se valida con los esquemas de `lib/schemas.ts` antes de guardarse.

| Sección | Qué hace |
|---|---|
| Panel | Resumen de visitas, contactos, proyectos más vistos y últimos cambios |
| Auditoría | Visitas y clics de los últimos 7, 30 o 90 días, orígenes, dispositivos, historial de cambios y exportación CSV |
| Generador | Ficha de proyecto desde un repo de GitHub o una carpeta local, capturas automáticas de sitios y posts para LinkedIn |
| Contenido | Perfil, proyectos, trayectoria, archivo, stack, formación, certificaciones y redes |

- Acceso con `ADMIN_PASSWORD` y sesión firmada (`ADMIN_SECRET`). Sin esas variables el admin queda deshabilitado.
- Guardar actualiza el sitio al instante en local, junto con el CV, el sitemap y la fecha del pie.
- Cada cambio queda en `.data/cambios.jsonl` (no se sube a git).
- En Vercel el disco es de solo lectura: el admin muestra el contenido pero no guarda. Se edita en local y se publica con un deploy.

## Medición sin cookies

El sitio público no usa cookies. `components/analytics.tsx` envía página vista, clics en enlaces y botones
clave, dominio de origen y tipo de pantalla a `/api/a`, que los guarda en `.data/eventos/` sin IP ni
identificadores. Si el navegador envía Global Privacy Control o Do Not Track, no se envía nada, y las
visitas con sesión de admin no se cuentan. Detalle para visitantes en `/privacidad`.

## IA en el generador (opcional)

Con `ANTHROPIC_API_KEY` en `.env.local`, el generador redacta casos de estudio y posts con Claude Opus 5.5
(salidas estructuradas y respaldo automático ante rechazos). Las cifras solo pueden salir de los hechos del
repositorio. Sin clave, todo funciona igual con borradores armados a partir de esos hechos.

## Desarrollo

```bash
cp .env.example .env.local   # y completa ADMIN_PASSWORD y ADMIN_SECRET
pnpm install
pnpm dev
```

`pnpm-workspace.yaml` define `minimumReleaseAge: 10080`: pnpm no instala versiones publicadas hace menos de 7 días.

## Accesibilidad y rendimiento

- Contraste AA verificado para todos los pares de color de texto, en ambos temas.
- Todas las animaciones respetan `prefers-reduced-motion`.
- Revelado al hacer scroll con `animation-timeline: view()` (CSS puro, sin JavaScript); en navegadores sin soporte el contenido aparece directo.
- Sin librerías de animación: el JavaScript del cliente se limita a la cabecera, el buscador, el tema y la hora local.

## Licencia

Código bajo licencia MIT. Las fuentes Sora se distribuyen bajo OFL (`assets/fonts/OFL.txt`). Logos e imágenes de proyectos no están cubiertos por la licencia MIT.
