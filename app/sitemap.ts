import type { MetadataRoute } from "next";
import { projects, site } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(`${site.updated}T12:00:00Z`);
  return [
    { url: site.url, lastModified, changeFrequency: "monthly", priority: 1 },
    ...projects.map((project) => ({
      url: `${site.url}/proyectos/${project.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${site.url}/archivo`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/formacion`, lastModified, changeFrequency: "yearly", priority: 0.5 },
    { url: `${site.url}/cv`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/como-esta-hecho`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${site.url}/privacidad`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
