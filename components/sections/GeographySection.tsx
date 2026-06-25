"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/SectionHeading";

// Казахстанские города с их относительным расположением на карте (% от viewBox)
const CITIES = [
  { name: "Алматы",     x: 72, y: 78, primary: true },
  { name: "Астана",     x: 52, y: 32 },
  { name: "Шымкент",   x: 55, y: 80 },
  { name: "Актобе",    x: 22, y: 35 },
  { name: "Атырау",    x: 10, y: 48 },
  { name: "Усть-Каменогорск", x: 83, y: 42 },
  { name: "Павлодар",  x: 68, y: 28 },
  { name: "Семей",     x: 76, y: 38 },
  { name: "Тараз",     x: 57, y: 76 },
  { name: "Кызылорда", x: 42, y: 68 },
  { name: "Актау",     x: 4,  y: 60 },
  { name: "Костанай",  x: 38, y: 18 },
  { name: "Петропавловск", x: 48, y: 12 },
  { name: "Уральск",   x: 14, y: 30 },
];

// Упрощённый контур Казахстана — SVG path (приближённый)
const KZ_PATH =
  "M 50,5 L 80,8 L 100,15 L 115,10 L 135,18 L 155,12 L 170,20 L 175,35 L 165,45 L 170,58 L 160,70 L 150,80 L 140,85 L 120,88 L 100,95 L 85,100 L 70,98 L 55,105 L 42,100 L 28,96 L 18,88 L 8,78 L 3,65 L 5,50 L 15,40 L 8,28 L 18,20 L 32,15 L 42,8 Z";

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
                { value: "8+",     label: t("statYears") },
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
                {CITIES.map((city, i) => (
                  <g key={city.name}>
                    {/* Пульсирующий круг для основного города */}
                    {city.primary && (
                      <circle
                        cx={`${city.x * 1.8}`}
                        cy={`${city.y * 1.15}`}
                        r="5"
                        fill="rgba(200,169,110,0.15)"
                        className="animate-ping"
                        style={{ animationDuration: "2s" }}
                      />
                    )}
                    {/* Маркер */}
                    <circle
                      cx={`${city.x * 1.8}`}
                      cy={`${city.y * 1.15}`}
                      r={city.primary ? "3.5" : "2"}
                      fill={city.primary ? "#C8A96E" : "rgba(200,169,110,0.5)"}
                      stroke={city.primary ? "rgba(200,169,110,0.4)" : "none"}
                      strokeWidth="2"
                    />
                    {/* Подпись города */}
                    <text
                      x={`${city.x * 1.8 + (city.x > 90 ? -3 : 4)}`}
                      y={`${city.y * 1.15 + 1}`}
                      fill={city.primary ? "#C8A96E" : "rgba(255,255,255,0.45)"}
                      fontSize={city.primary ? "4" : "3"}
                      fontWeight={city.primary ? "600" : "400"}
                      textAnchor={city.x > 90 ? "end" : "start"}
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
