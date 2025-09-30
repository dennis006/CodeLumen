import type { Config } from "tailwindcss"
import animate from "tailwindcss-animate"

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Outfit", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#f1f7ff",
          100: "#e3efff",
          200: "#bfd9ff",
          300: "#9dc3ff",
          400: "#6ea2ff",
          500: "#3f82ff",
          600: "#2d65db",
          700: "#234db0",
          800: "#1d3e8d",
          900: "#183572",
        },
      },
      backgroundImage: {
        aurora:
          "radial-gradient(40% 60% at 10% 10%, rgba(99,102,241,.35) 0%, transparent 60%)," +
          "radial-gradient(40% 60% at 90% 20%, rgba(56,189,248,.35) 0%, transparent 60%)," +
          "radial-gradient(40% 60% at 50% 80%, rgba(236,72,153,.30) 0%, transparent 60%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        glow: {
          "0%, 100%": { opacity: 0.6 },
          "50%": { opacity: 1 },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        glow: "glow 8s ease-in-out infinite",
      },
    },
  },
  plugins: [animate],
}

export default config
