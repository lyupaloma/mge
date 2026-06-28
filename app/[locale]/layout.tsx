import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ScrollToTop } from "@/components/ScrollToTop";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

type Locale = "ru" | "kz" | "zh";

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

  const siteUrl = "https://mgedna.kz";
  const localeUrls: Record<Locale, string> = {
    ru: `${siteUrl}/ru`,
    kz: `${siteUrl}/kz`,
    zh: `${siteUrl}/zh`,
  };

  return {
    title:       t("title"),
    description: t("description"),
    keywords:    t("keywords"),
    alternates: {
      canonical: localeUrls[locale as Locale] ?? `${siteUrl}/ru`,
      languages: {
        ru:          localeUrls.ru,
        kk:          localeUrls.kz, // BCP-47: kk = Kazakh
        zh:          localeUrls.zh,
        "x-default": localeUrls.ru,
      },
    },
    openGraph: {
      title:       t("title"),
      description: t("description"),
      url:         localeUrls[locale as Locale],
      siteName:    "MGE DNA",
      locale:
        locale === "zh" ? "zh_CN" : locale === "kz" ? "kk_KZ" : "ru_RU",
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
      {/* bg-bg-deep на <html> = запасной фон корня (рисуется ПОЗАДИ канваса с -z-10
          и виден, если WebGL не поддерживается). <body> прозрачный, чтобы шейдер был виден. */}
      <body className="text-text-primary antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
          <ScrollToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
