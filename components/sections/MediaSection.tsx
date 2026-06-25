"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/SectionHeading";

const YOUTUBE_VIDEOS = [
  { id: "8qk49sT0th0", title: "MGE DNA в СМИ" },
  { id: "lM6m4PmEHZc", title: "Интервью эксперта" },
  { id: "WY6NVzwOiz4", title: "О ДНК-тестировании" },
  { id: "2NLuDpj02no", title: "Генетическая экспертиза" },
  { id: "X5d43yKEqp8", title: "Наша лаборатория" },
];

const LOCAL_VIDEO = {
  src: "/video/1.mp4",
  title: "MGE DNA — лаборатория",
};

function YtCard({ videoId, title }: { videoId: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className="group relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-[#070D1A]/55 shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
      {playing ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumb}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070D1A]/80 via-transparent to-transparent" />
          {/* play button */}
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Смотреть: ${title}`}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 cursor-pointer"
          >
            <span className="w-16 h-16 rounded-full bg-gold/90 text-bg-deep flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-110">
              <svg className="w-7 h-7 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="text-text-primary text-sm font-medium px-3 text-center line-clamp-2 drop-shadow">
              {title}
            </span>
          </button>
        </>
      )}
    </div>
  );
}

function LocalVideoCard({ src, title }: { src: string; title: string }) {
  return (
    <div className="group relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-[#070D1A]/55 shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        controls
        preload="metadata"
        title={title}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

export function MediaSection() {
  const t = useTranslations("media");

  return (
    <section id="media" className="py-20 lg:py-32 bg-bg-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading heading={t("heading")} subheading={t("subheading")} />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {YOUTUBE_VIDEOS.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <YtCard videoId={v.id} title={v.title} />
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 5 * 0.08 }}
          >
            <LocalVideoCard src={LOCAL_VIDEO.src} title={LOCAL_VIDEO.title} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
