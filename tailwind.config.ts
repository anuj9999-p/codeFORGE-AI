import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        // Base surfaces
        graphite: {
          950: "#0B0C0F",
          900: "#101218",
          800: "#14161B",
          700: "#1C1F26",
          600: "#262A33",
          500: "#343943",
          400: "#4A505C",
        },
        // Heat scale — the core "temper" language: unstarted -> ember -> molten -> tempered
        ember: {
          DEFAULT: "#FF6B35",
          50: "#FFF1EA",
          100: "#FFE0CF",
          300: "#FF9466",
          500: "#FF6B35",
          600: "#E8551F",
          700: "#C43F12",
        },
        molten: {
          DEFAULT: "#FFB627",
          300: "#FFD37A",
          500: "#FFB627",
          600: "#E89A0C",
        },
        tempered: {
          DEFAULT: "#7DD3FC",
          300: "#B4E6FD",
          500: "#7DD3FC",
          600: "#38BDF8",
          700: "#0EA5E9",
        },
        bone: {
          DEFAULT: "#F5F3EF",
          muted: "#9A9CA5",
          faint: "#5C606B",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "heat-gradient": "linear-gradient(90deg, #343943 0%, #FF6B35 55%, #FFB627 85%, #7DD3FC 100%)",
        "ember-glow": "radial-gradient(circle at 50% 0%, rgba(255,107,53,0.25), transparent 60%)",
        "forge-grid": "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
        "spark-rise": {
          "0%": { transform: "translateY(0) scale(1)", opacity: "0.9" },
          "100%": { transform: "translateY(-120px) scale(0.3)", opacity: "0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        flicker: "flicker 3s ease-in-out infinite",
        "spark-rise": "spark-rise 2.4s ease-out infinite",
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
