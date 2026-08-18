import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#0B0E1A", // Midnight Indigo
          foreground: "#F4EFE6",
        },
        secondary: {
          DEFAULT: "#151726", // Deep Charcoal-Plum
          foreground: "#F4EFE6",
        },
        accent: {
          DEFAULT: "#8C2F39", // Muted Redroot Red
          foreground: "#F4EFE6",
        },
        highlight: {
          DEFAULT: "#C9A15A", // Warm Gold
          foreground: "#0B0E1A",
        },
        muted: {
          DEFAULT: "#1F2233",
          foreground: "#A8A3B3", // Warm Gray
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-playfair)', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;
