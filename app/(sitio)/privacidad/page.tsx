import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacidad",
  description: "Este sitio no usa cookies. Qué se mide, qué no y cómo desactivarlo.",
  alternates: { canonical: "/privacidad" },
};

const measured = [
  { label: "Página visitada", detail: "Por ejemplo, /proyectos/edugalvarino." },
  { label: "Clic en enlaces y botones clave", detail: "Por ejemplo, «contacto por correo» o «salida a GitHub». No se guarda el texto de la página." },
  { label: "Sitio de origen", detail: "Solo el dominio desde el que llegaste (como google.com), y solo en la primera página." },
  { label: "Tipo de pantalla", detail: "Móvil o escritorio, según el ancho de la ventana." },
];

const notMeasured = [
  "Cookies de cualquier tipo en el sitio público.",
  "Dirección IP, ubicación, agente de usuario o huella del navegador.",
  "Identificadores que permitan seguirte entre visitas o entre sitios.",
  "Google Analytics, píxeles de redes sociales o publicidad.",
  "Llamadas a terceros: las fuentes y las imágenes se sirven desde este mismo sitio.",
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-32 sm:px-8 sm:pt-40">
      <PageIntro
        eyebrow="Privacidad"
        title={
          <>
            Este sitio no usa cookies. <span className="text-fg-muted">Y mide lo justo para mejorar.</span>
          </>
        }
        lead="Contamos visitas y clics para saber qué proyectos interesan y si el contacto funciona. Nada de eso permite saber quién eres."
      />

      <Block label="Qué se mide">
        <dl className="divide-y divide-line border-y border-line">
          {measured.map((item) => (
            <div key={item.label} className="grid gap-1 py-4 sm:grid-cols-[16rem_1fr] sm:gap-6">
              <dt className="text-fg">{item.label}</dt>
              <dd className="text-fg-muted">{item.detail}</dd>
            </div>
          ))}
        </dl>
      </Block>

      <Block label="Qué no se usa">
        <ul className="grid gap-3">
          {notMeasured.map((item) => (
            <li key={item} className="flex gap-3 text-fg-muted">
              <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      </Block>

      <Block label="Si prefieres que no te midan">
        <p className="max-w-3xl leading-relaxed text-fg-muted">
          Si tu navegador envía <span className="text-fg">Global Privacy Control</span> o{" "}
          <span className="text-fg">Do Not Track</span>, el sitio no envía ningún evento. No tienes que hacer nada más.
        </p>
      </Block>

      <Block label="Lo que se guarda en tu navegador">
        <p className="max-w-3xl leading-relaxed text-fg-muted">
          Dos preferencias en el almacenamiento local de tu navegador, que nunca salen de tu equipo: el tema claro u
          oscuro, y que ya cerraste el aviso de privacidad. Puedes borrarlas cuando quieras desde la configuración del
          navegador.
        </p>
      </Block>

      <Block label="La única cookie">
        <p className="max-w-3xl leading-relaxed text-fg-muted">
          Existe una cookie de sesión estrictamente necesaria para el panel de administración, y solo se crea cuando el
          dueño del sitio inicia sesión. Las visitas que llegan desde el sitio público nunca la reciben.
        </p>
      </Block>

      <Block label="Alojamiento y contacto">
        <p className="max-w-3xl leading-relaxed text-fg-muted">
          El sitio está alojado en Vercel, que mantiene registros técnicos del servidor según su propia política. Si
          tienes preguntas sobre esto, escríbenos a{" "}
          <a href={`mailto:${site.email}`} className="link-underline text-accent">
            {site.email}
          </a>
          .
        </p>
      </Block>
    </div>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mt-16 grid gap-6 md:grid-cols-12 md:gap-8">
      <h2 className="self-start font-mono text-xs tracking-wider text-fg-subtle uppercase md:col-span-3 md:pt-1">{label}</h2>
      <div className="md:col-span-9">{children}</div>
    </section>
  );
}
