"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { SectionHeading } from "@/components/SectionHeading";

type Cert = {
  /** Превью и полноразмерное изображение (один файл, лайтбокс масштабирует). */
  image: string;
  label: string;
};

const DIR = "/images/licenses";

// Сначала лицензии (главное доверие), затем сертификаты, затем письма/грамоты.
const CERTS: Cert[] = [
  { image: `${DIR}/license-kiriyatova-1.jpg`,   label: "Лицензия Кириятовой Т.Г." },
  { image: `${DIR}/license-kiriyatova-2.jpg`,   label: "Приложение к лицензии (Кириятова Т.Г.)" },
  { image: `${DIR}/license-syzdykbekova-1.jpg`, label: "Лицензия Сыздыкбековой А.С." },
  { image: `${DIR}/license-syzdykbekova-2.jpg`, label: "Приложение к лицензии (Сыздыкбекова А.С.)" },
  { image: `${DIR}/cert-eswg.jpg`,              label: "Сертификат ESWG" },
  { image: `${DIR}/cert-genetic-expertise.jpg`, label: "Сертификат Genetic Expertise" },
  { image: `${DIR}/cert-lt.jpg`,                label: "Сертификат LT" },
  { image: `${DIR}/cert-rcsme-moscow.jpg`,      label: "ФГБУ РЦСМЭ, Москва" },
  { image: `${DIR}/cert-mvd-conference.jpg`,    label: "Науч.-практ. конференция МВД" },
  { image: `${DIR}/cert-mtdna.jpg`,             label: "Сертификат мтДНК" },
  { image: `${DIR}/qualification.jpg`,          label: "Повышение квалификации" },
  { image: `${DIR}/diploma.jpg`,                label: "Грамота" },
  { image: `${DIR}/gratitude-letter.jpg`,       label: "Благодарственное письмо" },
  { image: `${DIR}/knb-letter.jpg`,             label: "Благодарственное письмо КНБ" },
];

export function CertificatesSection() {
  const t = useTranslations("certificates");
  const [index, setIndex] = useState(-1); // -1 = закрыт

  const slides = CERTS.map((c) => ({ src: c.image, title: c.label }));

  return (
    <section id="certificates" className="py-20 lg:py-32 bg-bg-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading heading={t("heading")} subheading={t("subheading")} />
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {CERTS.map((cert, i) => (
            <motion.button
              key={cert.image}
              type="button"
              onClick={() => setIndex(i)}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              aria-label={`Открыть: ${cert.label}`}
              className="group relative aspect-[3/4] rounded-xl bg-bg-card border border-bg-border hover:border-gold/30 overflow-hidden flex flex-col text-left transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
            >
              {/* Превью документа */}
              <div className="relative flex-1 overflow-hidden">
                <Image
                  src={cert.image}
                  alt={cert.label}
                  fill
                  className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />

                {/* Затемнение + иконка лупы при наведении */}
                <div className="absolute inset-0 bg-bg-deep/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <span className="w-11 h-11 rounded-full bg-gold/90 text-bg-deep flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                    </svg>
                  </span>
                </div>

                {/* Постоянная маленькая лупа-индикатор (виден, что кликабельно) */}
                <span className="absolute top-2 right-2 w-7 h-7 rounded-md bg-bg-deep/60 backdrop-blur-sm border border-white/10 text-text-secondary group-hover:text-gold flex items-center justify-center transition-colors duration-200">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                  </svg>
                </span>
              </div>

              {/* Подпись */}
              <div className="px-3 py-2.5 border-t border-bg-border">
                <p className="text-text-secondary text-xs leading-tight line-clamp-2">{cert.label}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Лайтбокс на весь экран */}
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
        plugins={[Captions, Zoom]}
        captions={{ descriptionTextAlign: "center" }}
        zoom={{ maxZoomPixelRatio: 3 }}
        styles={{ container: { backgroundColor: "rgba(7, 13, 26, 0.95)" } }}
      />
    </section>
  );
}
