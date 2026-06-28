import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const SITE_URL = "https://mgedna.kz";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Карта hreflang-альтернатив для каждой локали (BCP-47)
  const languages: Record<string, string> = {
    ru: `${SITE_URL}/ru`,
    kk: `${SITE_URL}/kz`, // kk = Kazakh
    zh: `${SITE_URL}/zh`,
    en: `${SITE_URL}/en`,
    "x-default": `${SITE_URL}/ru`,
  };

  return routing.locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified,
    changeFrequency: "weekly",
    priority: locale === routing.defaultLocale ? 1 : 0.8,
    alternates: { languages },
  }));
}
