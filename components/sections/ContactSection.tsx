"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { SectionHeading } from "@/components/SectionHeading";

export function ContactSection() {
  const t = useTranslations("contacts");
  const f = useTranslations("contacts.form");

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name:    data.get("name"),
          phone:   data.get("phone"),
          message: data.get("message"),
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contacts" className="py-20 lg:py-32 bg-bg-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading heading={t("heading")} subheading={t("subheading")} />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <ContactItem
              icon={<PhoneIcon />}
              label={t("phone")}
              href={`tel:+77755151900`}
            />
            <ContactItem
              icon={<EnvelopeIcon />}
              label={t("email")}
              href={`mailto:${t("email")}`}
            />
            <ContactItem
              icon={<PinIcon />}
              label={t("address")}
            />
            <ContactItem
              icon={<ClockIcon />}
              label={t("schedule")}
            />

            <div className="flex gap-3 mt-2">
              <a
                href="https://wa.me/77755151900"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-bg-border bg-bg-card hover:border-green-500/40 hover:text-green-400 text-text-secondary text-sm font-medium transition-all duration-200"
              >
                <WhatsAppIcon />
                {t("whatsapp")}
              </a>
              <a
                href="https://www.instagram.com/mge_dna.kz/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-bg-border bg-bg-card hover:border-pink-500/40 hover:text-pink-400 text-text-secondary text-sm font-medium transition-all duration-200"
              >
                <InstagramIcon />
                {t("instagram")}
              </a>
            </div>

            {/* 2GIS map embed placeholder */}
            <div className="rounded-2xl overflow-hidden border border-bg-border bg-bg-card h-52 flex items-center justify-center">
              <a
                href="https://2gis.kz/almaty/firm/70000001111736257"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 text-text-secondary hover:text-gold transition-colors duration-200"
              >
                <PinIcon />
                <span className="text-sm">Открыть на 2GIS</span>
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 p-8 rounded-2xl bg-bg-card border border-bg-border"
            >
              <div>
                <label className="block text-text-secondary text-sm mb-2">{f("name")}</label>
                <input
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  className="w-full px-4 py-3 rounded-xl bg-bg-base border border-bg-border text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-gold/40 transition-colors duration-200"
                  placeholder={f("name")}
                />
              </div>
              <div>
                <label className="block text-text-secondary text-sm mb-2">{f("phone")}</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  autoComplete="tel"
                  className="w-full px-4 py-3 rounded-xl bg-bg-base border border-bg-border text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-gold/40 transition-colors duration-200"
                  placeholder="+7 ___  ___ __ __"
                />
              </div>
              <div>
                <label className="block text-text-secondary text-sm mb-2">{f("message")}</label>
                <textarea
                  name="message"
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-bg-base border border-bg-border text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-gold/40 transition-colors duration-200 resize-none"
                  placeholder={f("message")}
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending" || status === "success"}
                className="w-full py-4 rounded-xl bg-gold text-bg-deep font-bold text-sm hover:bg-gold-light active:scale-95 disabled:opacity-60 transition-all duration-200"
              >
                {status === "sending" ? "..." : f("submit")}
              </button>

              {status === "success" && (
                <p className="text-green-400 text-sm text-center">{f("success")}</p>
              )}
              {status === "error" && (
                <p className="text-red-400 text-sm text-center">{f("error")}</p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactItem({ icon, label, href }: { icon: React.ReactNode; label: string; href?: string }) {
  const inner = (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-bg-card border border-bg-border hover:border-gold/20 transition-colors duration-200">
      <span className="text-gold">{icon}</span>
      <span className="text-text-primary text-sm font-medium">{label}</span>
    </div>
  );
  return href ? <a href={href}>{inner}</a> : <div>{inner}</div>;
}

function PhoneIcon()     { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>; }
function EnvelopeIcon()  { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>; }
function PinIcon()       { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>; }
function ClockIcon()     { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>; }
function WhatsAppIcon()  { return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>; }
function InstagramIcon() { return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>; }
