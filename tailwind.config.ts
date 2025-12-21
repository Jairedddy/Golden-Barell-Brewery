import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
      colors: {
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Brand Colors - Liquid Gold Design System
        gold: {
          50: "hsl(45, 100%, 95%)",
          100: "hsl(45, 95%, 90%)",
          200: "hsl(45, 90%, 80%)",
          300: "hsl(45, 85%, 70%)",
          400: "hsl(45, 85%, 60%)",
          500: "hsl(45, 85%, 60%)",
          600: "hsl(40, 80%, 55%)",
          700: "hsl(40, 75%, 50%)",
          800: "hsl(35, 70%, 45%)",
          900: "hsl(30, 65%, 40%)",
        },
        amber: {
          50: "hsl(30, 100%, 95%)",
          100: "hsl(30, 95%, 90%)",
          200: "hsl(30, 90%, 80%)",
          300: "hsl(30, 85%, 70%)",
          400: "hsl(30, 80%, 60%)",
          500: "hsl(30, 80%, 55%)",
          600: "hsl(30, 75%, 50%)",
          700: "hsl(25, 70%, 45%)",
          800: "hsl(25, 65%, 40%)",
          900: "hsl(20, 60%, 35%)",
        },
        charcoal: {
          50: "hsl(25, 15%, 20%)",
          100: "hsl(25, 15%, 18%)",
          200: "hsl(25, 15%, 15%)",
          300: "hsl(25, 15%, 12%)",
          400: "hsl(25, 15%, 10%)",
          500: "hsl(25, 15%, 8%)",
          600: "hsl(25, 15%, 6%)",
          700: "hsl(25, 15%, 5%)",
          800: "hsl(25, 15%, 4%)",
          900: "hsl(25, 15%, 3%)",
        },
      },
      spacing: {
        // Custom spacing tokens
        "section": "4rem",
        "section-lg": "6rem",
        "section-xl": "8rem",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
