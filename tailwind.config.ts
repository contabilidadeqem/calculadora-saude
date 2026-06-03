import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          900: "#0B2027",
          800: "#102A33",
          700: "#1A4D5C",
        },
        gold: {
          500: "#D4A574",
          400: "#E0B788",
          600: "#B88A5A",
        },
        cream: {
          50: "#F5EFE0",
          100: "#E8DCC4",
          200: "#D6C7A8",
        },
        muted: {
          DEFAULT: "#7A8B92",
          soft: "#A8B5BA",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        hero: "linear-gradient(180deg, #0B2027 49.52%, #1A4D5C 100%)",
      },
      borderRadius: {
        card: "16px",
        cta: "15px",
      },
    },
  },
  plugins: [],
};

export default config;
