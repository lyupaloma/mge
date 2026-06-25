"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/SectionHeading";

// bbox реальных границ Казахстана: lon 45..88, lat 40..56
const LON_MIN = 45, LON_MAX = 88, LAT_MIN = 40, LAT_MAX = 56;
const SVG_W = 168, SVG_H = 103, SVG_OX = 6, SVG_OY = 6;

function project(lon: number, lat: number) {
  return {
    x: ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * SVG_W + SVG_OX,
    y: ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * SVG_H + SVG_OY,
  };
}

const CITIES = [
  { name: "Алматы",            lon: 76.95, lat: 43.24, primary: true },
  { name: "Астана",            lon: 71.43, lat: 51.18 },
  { name: "Шымкент",          lon: 69.60, lat: 42.30 },
  { name: "Актобе",           lon: 57.21, lat: 50.28 },
  { name: "Атырау",           lon: 51.91, lat: 47.11 },
  { name: "Усть-Каменогорск", lon: 82.62, lat: 49.97 },
  { name: "Павлодар",         lon: 76.94, lat: 52.29 },
  { name: "Семей",            lon: 80.23, lat: 50.41 },
  { name: "Тараз",            lon: 71.37, lat: 42.90 },
  { name: "Кызылорда",        lon: 65.51, lat: 44.85 },
  { name: "Актау",            lon: 51.18, lat: 43.65 },
  { name: "Костанай",         lon: 63.59, lat: 53.21 },
  { name: "Петропавловск",    lon: 69.16, lat: 54.87 },
  { name: "Уральск",          lon: 51.37, lat: 51.23 },
].map(c => ({ ...c, ...project(c.lon, c.lat) }));

// Контур Казахстана — точные данные Natural Earth (ne_110m_admin_0_countries).
const KZ_PATH = [
  [87.36,49.21],[86.60,48.55],[85.77,48.46],[85.72,47.45],[85.16,47.00],
  [83.18,47.33],[82.46,45.54],[81.95,45.32],[79.97,44.92],[80.87,43.18],
  [80.18,42.92],[80.26,42.35],[79.64,42.50],[79.14,42.86],[77.66,42.96],
  [76.00,42.99],[75.64,42.88],[74.21,43.30],[73.65,43.09],[73.49,42.50],
  [71.84,42.85],[71.19,42.70],[70.96,42.27],[70.39,42.08],[69.07,41.38],
  [68.63,40.67],[68.26,40.66],[67.99,41.14],[66.71,41.17],[66.51,41.99],
  [66.02,41.99],[66.10,42.10],[64.90,43.73],[63.19,43.65],[62.01,43.50],
  [61.06,44.41],[60.24,44.78],[58.69,45.50],[58.50,45.59],[55.93,45.00],
  [55.97,41.31],[55.46,41.26],[54.76,42.04],[54.08,42.32],[52.94,42.12],
  [52.50,41.78],[52.45,42.03],[52.69,42.44],[52.50,42.79],[51.34,43.13],
  [50.89,44.03],[50.34,44.28],[50.31,44.61],[51.28,44.51],[51.32,45.25],
  [52.17,45.41],[53.04,45.26],[53.22,46.23],[53.04,46.85],[52.04,46.80],
  [51.19,47.05],[50.03,46.61],[49.10,46.40],[48.59,46.56],[48.69,47.08],
  [48.06,47.74],[47.32,47.72],[46.47,48.39],[47.04,49.15],[46.75,49.36],
  [47.55,50.45],[48.58,49.87],[48.70,50.61],[50.77,51.69],[52.33,51.72],
  [54.53,51.03],[55.72,50.62],[56.78,51.04],[58.36,51.06],[59.64,50.55],
  [59.93,50.84],[61.34,50.80],[61.59,51.27],[59.97,51.96],[60.93,52.45],
  [60.74,52.72],[61.70,52.98],[60.98,53.66],[61.44,54.01],[65.18,54.35],
  [65.67,54.60],[68.17,54.97],[69.07,55.39],[70.87,55.17],[71.18,54.13],
  [72.22,54.38],[73.51,54.04],[73.43,53.49],[74.38,53.55],[76.89,54.49],
  [76.53,54.18],[77.80,53.40],[80.04,50.86],[80.57,51.39],[81.95,50.81],
  [83.38,51.07],[83.94,50.89],[84.42,50.31],[85.12,50.12],[85.54,49.69],
  [86.83,49.83],[87.36,49.21],
].map(([lon, lat]) => {
  const x = ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * SVG_W + SVG_OX;
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * SVG_H + SVG_OY;
  return `${x.toFixed(2)},${y.toFixed(2)}`;
}).reduce((acc, pt, i) => acc + (i === 0 ? `M ${pt}` : ` L ${pt}`), "") + " Z";

export function GeographySection() {
  const t = useTranslations("geography");

  return (
    <section id="geography" className="py-20 lg:py-32 bg-bg-base overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading heading={t("heading")} subheading={t("subheading")} />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Левая колонка — текст + CTA */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            <p className="text-text-secondary text-lg leading-relaxed">
              {t("description")}
            </p>

            {/* Статистика */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "14+",    label: t("statCities") },
                { value: "10+",    label: t("statYears") },
                { value: "24/7",   label: t("statSupport") },
                { value: "1 день", label: t("statResult") },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/10 bg-[#070D1A]/55 backdrop-blur-[2px] p-5 shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
                >
                  <p className="text-2xl font-bold text-gold mb-1">{s.value}</p>
                  <p className="text-text-secondary text-sm">{s.label}</p>
                </div>
              ))}
            </div>

            <a
              href="#contacts"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gold text-bg-deep font-bold text-base hover:bg-gold-light active:scale-95 transition-all duration-200 glow-gold self-start"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              {t("cta")}
            </a>
          </motion.div>

          {/* Правая колонка — карта Казахстана */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="rounded-3xl border border-white/10 bg-[#070D1A]/55 backdrop-blur-[2px] p-6 shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
              <svg
                viewBox="0 0 180 115"
                className="w-full"
                overflow="hidden"
                aria-label="Карта Казахстана с городами MGE DNA"
              >
                {/* Контур страны */}
                <path
                  d={KZ_PATH}
                  fill="rgba(200,169,110,0.06)"
                  stroke="rgba(200,169,110,0.25)"
                  strokeWidth="0.8"
                />

                {/* Города */}
                {CITIES.map((city) => (
                  <g key={city.name}>
                    {city.primary && (
                      <circle
                        cx={city.x.toFixed(2)}
                        cy={city.y.toFixed(2)}
                        r="3.5"
                        fill="rgba(200,169,110,0.25)"
                      >
                        <animate attributeName="r" values="3.5;9;3.5" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
                      </circle>
                    )}
                    <circle
                      cx={city.x.toFixed(2)}
                      cy={city.y.toFixed(2)}
                      r={city.primary ? "3.5" : "2"}
                      fill={city.primary ? "#C8A96E" : "rgba(200,169,110,0.5)"}
                      stroke={city.primary ? "rgba(200,169,110,0.4)" : "none"}
                      strokeWidth="2"
                    />
                    <text
                      x={(city.x + (city.x > 120 ? -4 : 4)).toFixed(2)}
                      y={(city.y + 1.2).toFixed(2)}
                      fill={city.primary ? "#C8A96E" : "rgba(255,255,255,0.45)"}
                      fontSize={city.primary ? "4.5" : "3.2"}
                      fontWeight={city.primary ? "600" : "400"}
                      textAnchor={city.x > 120 ? "end" : "start"}
                    >
                      {city.name}
                    </text>
                  </g>
                ))}
              </svg>

              {/* Легенда */}
              <div className="mt-4 flex items-center gap-4 justify-center">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-gold" />
                  <span className="text-text-secondary text-xs">{t("legendMain")}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-gold/50" />
                  <span className="text-text-secondary text-xs">{t("legendCity")}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
