"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/SectionHeading";

const STEP_ICONS = [
  // 1 — позвонить/записаться
  <svg key="call" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>,
  // 2 — конверт/набор
  <svg key="kit" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
  </svg>,
  // 3 — мазок
  <svg key="swab" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 01-.659 1.591L9.5 14.5m5-11.396c.248.023.498.05.748.082M5 14.5l-.31 1.207a2.25 2.25 0 00.42 1.969l.69.86m0 0A9.01 9.01 0 0012 21a9.01 9.01 0 006.2-2.434l.69-.86a2.25 2.25 0 00.42-1.969L19 14.5m-14 0h14" />
  </svg>,
  // 4 — отправить
  <svg key="send" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
  </svg>,
  // 5 — результат
  <svg key="result" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
];

export function InstructionSection() {
  const t = useTranslations("instruction");
  const steps = t.raw("steps") as Array<{ title: string; description: string }>;

  return (
    <section id="instruction" className="py-20 lg:py-32 bg-bg-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading heading={t("heading")} subheading={t("subheading")} />
        </motion.div>

        {/* Шаги */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#070D1A]/55 backdrop-blur-[2px] p-6 shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
            >
              {/* Connector line (desktop only, not on last) */}
              {i < steps.length - 1 && (
                <span className="hidden lg:block absolute top-10 left-full w-4 h-px bg-gold/20 z-10" />
              )}
              {/* Step number + icon */}
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 text-gold flex items-center justify-center flex-shrink-0">
                  {STEP_ICONS[i]}
                </span>
                <span className="text-gold/50 text-xs font-bold tracking-widest">
                  0{i + 1}
                </span>
              </div>
              <h3 className="text-text-primary font-semibold text-base leading-snug">
                {step.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA скачать инструкцию */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center"
        >
          <a
            href="/instructions/dna-guide.pdf"
            download
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gold text-bg-deep font-bold text-base hover:bg-gold-light active:scale-95 transition-all duration-200 glow-gold"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            {t("downloadCta")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
