import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        sage: "#4A5D4F",
        cream: "#F5F0EB",
        "deep-brown": "#3D2B1F",
        "muted-gold": "#C8A96E",
        "soft-brown": "#6B5B4E",
        charcoal: "#2C2C2C",
        // Dark mode surface colors
        "dark-bg": "#121212",
        "dark-surface": "#1A1A1A",
        "dark-card": "#1E1E1E",
        "dark-border": "#2A2A2A",
        "dark-text": "#F5F0EB",
        "dark-muted": "#7A746E",
        "dark-sage": "#3D5B3D",
      },
      fontFamily: {
        heading: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        'soft': '0 2px 20px rgba(74,83,64,0.06)',
        'soft-hover': '0 4px 30px rgba(74,83,64,0.1)',
        'dark-soft': '0 2px 20px rgba(0,0,0,0.3)',
        'dark-soft-hover': '0 4px 30px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
};
export default config;
