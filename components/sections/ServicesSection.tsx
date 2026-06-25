"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { SectionHeading } from "@/components/SectionHeading";

type ServiceItem = {
  icon: string;
  title: string;
  description: string;
  price: string;
  badge: string | null;
};

export function ServicesSection() {
  const t = useTranslations("services");
  const items = t.raw("items") as ServiceItem[];

  return (
    <section id="services" className="py-20 lg:py-32 bg-bg-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading heading={t("heading")} subheading={t("subheading")} />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="relative flex flex-col p-6 rounded-2xl bg-bg-card border border-bg-border hover:border-gold/30 transition-colors duration-300 cursor-default"
            >
              {item.badge && (
                <span className="absolute top-5 right-5 text-xs font-semibold px-2.5 py-1 rounded-full bg-gold/10 text-gold border border-gold/20">
                  {item.badge}
                </span>
              )}

              <div className="w-12 h-12 rounded-xl bg-bg-base border border-bg-border flex items-center justify-center text-gold mb-5">
                <DnaIcon name={item.icon} />
              </div>

              <h3 className="text-text-primary font-semibold text-lg mb-2 pr-16">{item.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed flex-1 mb-5">{item.description}</p>

              <div className="pt-4 border-t border-bg-border flex items-center justify-between">
                <span className="text-gold font-bold text-base">{item.price}</span>
                <a
                  href="#contacts"
                  className="text-text-muted hover:text-text-primary text-xs font-medium transition-colors duration-150"
                >
                  Записаться →
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DnaIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    dna: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
      </svg>
    ),
    gavel: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
    car: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    mars: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 9l5-5m0 0h-4m4 0v4M9.75 15a5.25 5.25 0 110-10.5A5.25 5.25 0 019.75 15z" />
      </svg>
    ),
    venus: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-6m0 0l-3 3m3-3l3 3M12 15a5.25 5.25 0 100-10.5A5.25 5.25 0 0012 15z" />
      </svg>
    ),
    people: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  };
  return <>{icons[name] ?? icons.dna}</>;
}
