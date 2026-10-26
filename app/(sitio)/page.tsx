import type { Metadata } from "next";
import type { SectionProps } from "@/components/section-heading";
import { Contact } from "@/components/home/contact";
import { Education } from "@/components/home/education";
import { Experience } from "@/components/home/experience";
import { Hero } from "@/components/home/hero";
import { Process } from "@/components/home/process";
import { Services } from "@/components/home/services";
import { Story } from "@/components/home/story";
import { Talks } from "@/components/home/talks";
import { Work } from "@/components/home/work";
import { sections, type SectionId } from "@/lib/data";

export const metadata: Metadata = { alternates: { canonical: "/", types: { "text/markdown": "/index.md" } } };

const SECTIONS: Record<SectionId, (props: SectionProps) => React.ReactNode> = {
  servicios: Services,
  trabajo: Work,
  historia: Story,
  experiencia: Experience,
  charlas: Talks,
  proceso: Process,
  formacion: Education,
  contacto: Contact,
};

/** La portada respeta el orden y la visibilidad de secciones elegidos en Admin → Sitio. */
export default function HomePage() {
  return (
    <>
      <Hero />
      {sections.map((id, position) => {
        const Section = SECTIONS[id];
        return <Section key={id} index={String(position + 1).padStart(2, "0")} />;
      })}
    </>
  );
}
