import { getTranslations } from "next-intl/server";

const SITE_URL = "https://mgedna.kz";

// ─── ПЛЕЙСХОЛДЕРЫ: проверь и при необходимости замени ───────────────
const BUSINESS = {
  name: "MGE DNA",
  legalName: "ТОО «Молекулярно-генетическая экспертиза»",
  phone: "+77755151900",
  email: "info@mgedna.kz",
  streetAddress: "ул. Наурызбай батыра, 65, БЦ Edition 65, офис 102",
  addressLocality: "Алматы",
  postalCode: "050000", // ← проверь индекс
  countryCode: "KZ",
  // Координаты офиса (БЦ Edition 65). При необходимости уточни в 2GIS.
  latitude: 43.2567,
  longitude: 76.9286,
  priceFrom: "70000",
  currency: "KZT",
  ratingValue: "4.5",
  reviewCount: "50", // ← подставь реальное число отзывов из 2GIS
  foundingYear: "2016",
  instagram: "https://www.instagram.com/mge_dna.kz/",
  twoGis: "https://2gis.kz/almaty/firm/70000001111736257",
};
// ────────────────────────────────────────────────────────────────────

type FaqItem = { question: string; answer: string };
type ServiceItem = { title: string; description: string };

export async function JsonLd({ locale }: { locale: string }) {
  const tFaq = await getTranslations({ locale, namespace: "faq" });
  const tSrv = await getTranslations({ locale, namespace: "services" });

  const faqItems = tFaq.raw("items") as FaqItem[];
  const services = tSrv.raw("items") as ServiceItem[];

  // 1) MedicalBusiness — главный объект компании
  const medicalBusiness = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${SITE_URL}/#organization`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    image: `${SITE_URL}/og-image.jpg`,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    foundingDate: BUSINESS.foundingYear,
    priceRange: `от ${BUSINESS.priceFrom} ${BUSINESS.currency}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.streetAddress,
      addressLocality: BUSINESS.addressLocality,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.latitude,
      longitude: BUSINESS.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    sameAs: [BUSINESS.instagram, BUSINESS.twoGis],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: BUSINESS.ratingValue,
      reviewCount: BUSINESS.reviewCount,
      bestRating: "5",
      worstRating: "1",
    },
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.title,
        description: s.description,
      },
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: BUSINESS.priceFrom,
        priceCurrency: BUSINESS.currency,
      },
    })),
  };

  // 2) FAQPage — вопросы/ответы для Featured Snippets и AI
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}
