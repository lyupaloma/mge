import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ScrollToTop } from "@/components/ScrollToTop";
import { JsonLd } from "@/components/JsonLd";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

type Locale = "ru" | "kz" | "zh" | "en";

const SITE_URL = "https://mgedna.kz";

// OpenGraph-локали в формате BCP-47 с регионом
const OG_LOCALE: Record<Locale, string> = {
  ru: "ru_RU",
  kz: "kk_KZ",
  zh: "zh_CN",
  en: "en_US",
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  const localeUrls: Record<Locale, string> = {
    ru: `${SITE_URL}/ru`,
    kz: `${SITE_URL}/kz`,
    zh: `${SITE_URL}/zh`,
    en: `${SITE_URL}/en`,
  };

  const current = localeUrls[locale as Locale] ?? localeUrls.ru;

  return {
    metadataBase: new URL(SITE_URL),
    title:       t("title"),
    description: t("description"),
    keywords:    t("keywords"),
    icons: {
      icon: [
        { url: "/favicon/favicon.ico", sizes: "any" },
        { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      ],
    },
    alternates: {
      canonical: current,
      languages: {
        ru:          localeUrls.ru,
        kk:          localeUrls.kz, // BCP-47: kk = Kazakh
        zh:          localeUrls.zh,
        en:          localeUrls.en,
        "x-default": localeUrls.ru,
      },
    },
    openGraph: {
      type:        "website",
      title:       t("title"),
      description: t("description"),
      url:         current,
      siteName:    "MGE DNA",
      locale:      OG_LOCALE[locale as Locale] ?? OG_LOCALE.ru,
      images: [
        {
          url: "/og-image.jpg", // плейсхолдер: положи картинку 1200×630 в /public/og-image.jpg
          width: 1200,
          height: 630,
          alt: "MGE DNA — генетическая лаборатория в Алматы",
        },
      ],
    },
    twitter: {
      card:        "summary_large_image",
      title:       t("title"),
      description: t("description"),
      images:      ["/og-image.jpg"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale === "kz" ? "kk" : locale} className={`${inter.variable} bg-bg-deep`}>
      <head>
        {/* Yandex.Metrika */}
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=108555656', 'ym');
              ym(108555656, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
            `,
          }}
        />
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/108555656"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
      </head>
      <body className="text-text-primary antialiased">
        <JsonLd locale={locale} />
        <NextIntlClientProvider messages={messages}>
          {children}
          <ScrollToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
