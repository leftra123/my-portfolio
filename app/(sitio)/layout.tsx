import { Analytics } from "@/components/analytics";
import { CommandMenu } from "@/components/command-menu";
import { ConsoleHello } from "@/components/console-hello";
import { PrivacyNotice } from "@/components/privacy-notice";
import { SiteFooter } from "@/components/site-footer";
import { Shortcuts } from "@/components/shortcuts";
import { SiteHeader } from "@/components/site-header";
import { sections, services, site, socials } from "@/lib/data";

/** Datos estructurados: la empresa, su fundador, el sitio y los servicios, enlazados por @id. */
const ORG = `${site.url}/#empresa`;
const FOUNDER = `${site.url}/#fundador`;
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG,
      name: site.company,
      slogan: site.motto,
      description: site.description,
      url: site.url,
      logo: `${site.url}/icons/icon-512.png`,
      email: `mailto:${site.email}`,
      areaServed: { "@type": "Country", name: "Chile" },
      address: { "@type": "PostalAddress", addressRegion: "La Araucanía", addressCountry: "CL" },
      founder: { "@id": FOUNDER },
      knowsAbout: services.map((service) => service.title),
      makesOffer: services.map((service) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: service.title, description: service.body, provider: { "@id": ORG }, areaServed: "Chile" },
      })),
    },
    {
      "@type": "Person",
      "@id": FOUNDER,
      name: site.name,
      image: `${site.url}/images/eric-aguayo.jpg`,
      jobTitle: site.role,
      worksFor: { "@id": ORG },
      alumniOf: { "@type": "CollegeOrUniversity", name: "INACAP" },
      sameAs: socials.filter((s) => s.label !== "WhatsApp").map((s) => s.href),
    },
    { "@type": "WebSite", "@id": `${site.url}/#sitio`, url: site.url, name: site.company, inLanguage: "es-CL", publisher: { "@id": ORG } },
  ],
};

/** Sitio público: cabecera, pie, buscador ⌘K, medición anónima y aviso de privacidad. */
export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SiteHeader />
      <main id="contenido">{children}</main>
      <SiteFooter />
      <CommandMenu />
      <Shortcuts sections={sections} />
      <ConsoleHello email={site.email} />
      <PrivacyNotice />
      <Analytics />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
