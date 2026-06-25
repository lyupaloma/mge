import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // MGE DNA Design System 2026
        bg: {
          deep:    "#070D1A",
          base:    "#0A1628",
          card:    "#0F1E35",
          border:  "#1A2E4A",
        },
        gold: {
          DEFAULT: "#C8A96E",
          light:   "#DFC28A",
          dim:     "#8A6F3E",
        },
        blue: {
          accent:  "#3B82F6",
          glow:    "#1D4ED8",
        },
        text: {
          primary:   "#F0F4FF",
          secondary: "#8B9FC2",
          muted:     "#4A5E7A",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        wide:    "0.08em",
        widest:  "0.2em",
      },
      backgroundImage: {
        "radial-gold": "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(200,169,110,0.12) 0%, transparent 70%)",
        "radial-blue": "radial-gradient(ellipse 50% 30% at 80% 50%, rgba(59,130,246,0.08) 0%, transparent 70%)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease forwards",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
