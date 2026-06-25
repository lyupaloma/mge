"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { SectionHeading } from "@/components/SectionHeading";

type Tier = {
  name: string;
  duration: string;
  description: string;
  popular?: boolean;
};

type WhyItem = { icon: string; title: string; text: string };

const WHY_ICONS: Record<string, React.ReactNode> = {
  building: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21a.75.75 0 01.75.75V21" />
    </svg>
  ),
  bolt: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  check: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export function PricingSection() {
  const t = useTranslations("pricing");
  const tiers   = t.raw("tiers") as Tier[];
  const whyItems = t.raw("whyUs.items") as WhyItem[];

  return (
    <section id="pricing" className="py-20 lg:py-32 bg-bg-deep">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading heading={t("heading")} subheading={t("subheading")} />
        </motion.div>

        {/* Акцент-сравнение со скоростью конкурентов */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl mx-auto mb-12 flex items-center gap-3 rounded-2xl border border-gold/20 bg-gold/5 px-6 py-4"
        >
          <svg className="w-6 h-6 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-text-primary text-sm sm:text-base leading-snug">
            {t("comparison")}
          </p>
        </motion.div>

        {/* Тарифные карточки */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`relative flex flex-col rounded-3xl border p-8 ${
                tier.popular
                  ? "border-gold/40 bg-gold/5 shadow-[0_8px_40px_rgba(200,169,110,0.12)]"
                  : "border-bg-border bg-bg-card"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gold text-bg-deep text-xs font-bold tracking-wide">
                  {t("popularBadge")}
                </span>
              )}

              <h3 className={`text-lg font-semibold mb-2 ${tier.popular ? "text-gold" : "text-text-primary"}`}>
                {tier.name}
              </h3>

              {/* Срок — крупно, главный фокус */}
              <div className="flex items-baseline gap-2 mb-4">
                <span className={`text-4xl font-bold ${tier.popular ? "text-gradient-gold" : "text-text-primary"}`}>
                  {tier.duration}
                </span>
              </div>

              <p className="text-text-secondary text-sm leading-relaxed mb-8 flex-1">
                {tier.description}
              </p>

              <a
                href="#contacts"
                className={`inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 active:scale-95 ${
                  tier.popular
                    ? "bg-gold text-bg-deep hover:bg-gold-light glow-gold"
                    : "border border-bg-border text-text-primary hover:border-gold/40 hover:bg-bg-deep"
                }`}
              >
                {t("ctaLabel")}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Блок «Почему мы?» */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-center text-2xl font-bold text-text-primary mb-10">
            {t("whyUs.heading")}
          </h3>
          <div className="grid sm:grid-cols-3 gap-6">
            {whyItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center text-center rounded-2xl border border-bg-border bg-bg-card p-6"
              >
                <span className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold mb-4">
                  {WHY_ICONS[item.icon]}
                </span>
                <h4 className="text-text-primary font-semibold text-base mb-2">{item.title}</h4>
                <p className="text-text-secondary text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-text-muted text-sm text-center mt-10"
        >
          {t("note")}
        </motion.p>
      </div>
    </section>
  );
}
