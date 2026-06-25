"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { DnaHelix } from "@/components/DnaHelix";

const ICON_MAP: Record<string, React.ReactNode> = {
  shield: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 10.5a9 9 0 006 8.52 9 9 0 006-8.52 11.955 11.955 0 00-.598-3.5 11.959 11.959 0 01-3.96-.964z" />
    </svg>
  ),
  car: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  ),
  clock: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export function HeroSection() {
  const t = useTranslations("hero");

  const chips = t.raw("chips") as Array<{ icon: string; label: string }>;

  return (
    <section
      className="relative min-h-screen flex items-center pt-20 overflow-hidden dna-grid"
      aria-label="Hero"
    >
      {/* Слой-маска: диагональное затемнение — плотно слева (под текстом),
          прозрачнее справа, где видна текстура шейдера. */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-bg-deep via-bg-deep/85 to-bg-deep/40" />
      {/* Виньетка снизу — мягкий стык со следующей секцией. */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-bg-deep" />

      {/* Лёгкий синий accent-glow (золотой убран, чтобы не желтить фон под плашкой). */}
      <div className="absolute inset-0 bg-radial-blue pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Левая колонка — заголовок и CTA */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start text-left"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs font-medium tracking-widest uppercase mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                {t("badge")}
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tighter text-text-primary mb-4"
            >
              {t("title")}
            </motion.h1>

            <motion.div variants={itemVariants}>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-gradient-gold mb-8">
                {t("titleAccent")}
              </p>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-text-secondary text-lg leading-relaxed mb-10 max-w-lg"
            >
              {t("subtitle")}
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contacts"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gold text-bg-deep font-bold text-base hover:bg-gold-light active:scale-95 transition-all duration-200 glow-gold"
              >
                {t("ctaPrimary")}
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl border border-bg-border text-text-primary font-semibold text-base hover:border-gold/40 hover:bg-bg-card transition-all duration-200"
              >
                {t("ctaSecondary")}
              </a>
            </motion.div>
          </motion.div>

          {/* Правая колонка — стеклянная плашка преимуществ (уравновешивает заголовок) */}
          <motion.div
            initial={{ opacity: 0, x: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-md flex items-center gap-8 rounded-3xl border border-white/10 bg-[#070D1A]/55 backdrop-blur-[2px] p-8 shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
              <div className="scale-110 origin-center flex-shrink-0">
                <DnaHelix />
              </div>
              <ul className="flex flex-col gap-5 flex-1 text-left">
                {chips.map((chip) => (
                  <li key={chip.label} className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-gold flex-shrink-0">
                      {ICON_MAP[chip.icon]}
                    </span>
                    <span className="text-text-primary text-base font-medium leading-snug">
                      {chip.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
