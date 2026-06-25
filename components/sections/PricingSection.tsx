"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { SectionHeading } from "@/components/SectionHeading";

type PriceCell  = { price: string; time: string; highlight?: boolean };
type PriceRow   = { label: string; values: PriceCell[] };
type PricingData = {
  heading: string;
  subheading: string;
  columns: string[];
  rows: PriceRow[];
  note: string;
  ctaLabel: string;
};

export function PricingSection() {
  const t = useTranslations("pricing");
  const data = {
    heading:    t("heading"),
    subheading: t("subheading"),
    columns:    t.raw("columns") as string[],
    rows:       t.raw("rows") as PriceRow[],
    note:       t("note"),
    ctaLabel:   t("ctaLabel"),
  };

  return (
    <section id="pricing" className="py-20 lg:py-32 bg-bg-deep">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading heading={data.heading} subheading={data.subheading} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-2xl overflow-hidden border border-bg-border"
        >
          {/* Column headers */}
          <div className="grid grid-cols-4 bg-bg-card">
            <div className="p-5 border-b border-bg-border" />
            {data.columns.map((col, i) => (
              <div
                key={col}
                className={`p-5 border-b border-l border-bg-border text-center ${
                  i === 2 ? "bg-gold/5 border-gold/20" : ""
                }`}
              >
                <span className={`font-semibold text-sm ${i === 2 ? "text-gold" : "text-text-secondary"}`}>
                  {col}
                </span>
                {i === 2 && (
                  <div className="mt-1">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gold/10 text-gold border border-gold/20">
                      Уникально
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Rows */}
          {data.rows.map((row, ri) => (
            <div key={row.label} className={`grid grid-cols-4 ${ri < data.rows.length - 1 ? "border-b border-bg-border" : ""}`}>
              <div className="p-5 flex items-center">
                <span className="text-text-secondary text-sm leading-snug">{row.label}</span>
              </div>
              {row.values.map((cell, ci) => (
                <div
                  key={ci}
                  className={`p-5 border-l border-bg-border flex flex-col items-center justify-center text-center ${
                    cell.highlight ? "bg-gold/5" : ""
                  }`}
                >
                  <span className={`font-bold text-base ${cell.highlight ? "text-gold" : "text-text-primary"}`}>
                    {cell.price}
                  </span>
                  {cell.time && (
                    <span className="text-text-muted text-xs mt-1">{cell.time}</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-text-muted text-sm text-center mt-4 mb-8"
        >
          {data.note}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center"
        >
          <a
            href="#contacts"
            className="inline-flex items-center px-10 py-4 rounded-xl bg-gold text-bg-deep font-bold text-base hover:bg-gold-light active:scale-95 transition-all duration-200 glow-gold"
          >
            {data.ctaLabel}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
