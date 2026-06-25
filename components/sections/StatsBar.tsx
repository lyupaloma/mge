"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";

export function StatsBar() {
  const t = useTranslations();
  const stats = t.raw("stats") as Array<{ value: string; label: string }>;

  return (
    <section className="border-y border-bg-border bg-bg-base" aria-label="Статистика">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-bg-border">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col items-center justify-center py-8 px-4 text-center"
            >
              <span className="text-2xl sm:text-3xl font-bold text-gradient-gold leading-none">
                {stat.value}
              </span>
              <span className="text-text-muted text-xs sm:text-sm mt-2 leading-tight">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
