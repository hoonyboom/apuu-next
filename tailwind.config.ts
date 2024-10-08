import type { Config, PluginAPI } from "tailwindcss/types/config"
const plugin = require("tailwindcss/plugin")
const defaultTheme = require("tailwindcss/defaultTheme")

const config = {
  darkMode: ["class"],
  content: ["./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  safelist: ["ProseMirror"],
  theme: {
    container: {
      center: true,
      screens: {
        "2xl": "1200px",
      },
    },
    fontSize: {
      "2xs": "clamp(0.7595rem, 0.7563rem + 0.0165vi, 0.768rem)",
      xs: "clamp(0.9115rem, 0.8925rem + 0.0947vi, 0.96rem)",
      sm: "clamp(1.0027rem, 0.9724rem + 0.151vi, 1.08rem)",
      base: "clamp(1.0938rem, 1.0523rem + 0.2073vi, 1.2rem)",
      lg: "clamp(1.3125rem, 1.2393rem + 0.3659vi, 1.5rem)",
      xl: "clamp(1.575rem, 1.4579rem + 0.5854vi, 1.875rem)",
      "2xl": "clamp(1.89rem, 1.7129rem + 0.8854vi, 2.3438rem)",
      "3xl": "clamp(2.268rem, 2.0098rem + 1.2911vi, 2.9297rem)",
      "4xl": "clamp(2.7216rem, 2.3546rem + 1.8351vi, 3.6621rem)",
      "5xl": "clamp(3.2659rem, 2.754rem + 2.5594vi, 4.5776rem)",
      "6xl": "clamp(3.9191rem, 3.2155rem + 3.5179vi, 5.722rem)",
    },
    extend: {
      height: {
        nav: "var(--navbar-height)",
        fullscreen: "var(--fullscreen)",
      },
      maxHeight: {
        fullscreen: "var(--fullscreen)",
        form: "var(--register-form)",
      },
      fontFamily: {
        sans: [...defaultTheme.fontFamily.sans],
        pretendard: ["Pretendard", ...defaultTheme.fontFamily.sans],
        dovemayo: ["Dovemayo", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        landing: "url(/assets/svgs/landing.svg)",
      },
      colors: {
        silk: "hsl(var(--silk) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        marquee: {
          "100%": { transform: "translateY(-50%)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-10deg)" },
          "50%": { transform: "rotate(10deg)" },
        },
        up: {
          from: { transform: "translateY(0)" },
          "80%": { transform: "translateY(0)" },
          to: { transform: "translateY(-40%)" },
        },
        "page-outside-layer": {
          from: { transform: "translateY(100%)" },
          "20%": { transform: "translateY(-10%)" },
          "85%": { transform: "translateY(0)" },
          to: { transform: "translateY(-100%)" },
        },
        "page-inside-layer": {
          "0%": { transform: "translateY(100%)" },
          "23%": { transform: "translateY(0)" },
          "75%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-100%)" },
        },
      },
      animation: {
        wiggle: "wiggle 2.5s ease-in-out forwards",
        up: "up 2.5s ease-in-out forwards",
        marquee: "marquee var(--marquee-duration) linear infinite",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "page-outside-layer": "page-outside-layer 3s ease-in-out forwards",
        "page-inside-layer": "page-inside-layer 2.9s ease-in-out 100ms forwards",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
    plugin(function ({ addComponents, addUtilities }: PluginAPI) {
      addComponents({
        ".stacked": {
          display: "grid",
          "place-items": "center",
          isolation: "isolate",
        },

        ".stacked > *": {
          "grid-column": "1 / 2",
          "grid-row": "1 / 2",
        },

        ".scrollbar-hide": {
          scrollbarWidth: "none",
          "-ms-overflow-style": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },

        ".scrollbar-thin": {
          "scrollbar-width": "thin",
          "-ms-overflow-style": "auto",
          "&::-webkit-scrollbar": {
            display: "block",
          },
        },

        ".blurred": {
          "-webkit-backdrop-filter": "blur(4px)",
          "backdrop-filter": "blur(4px)",
        },

        // ".character-count": {
        //   alignItems: "center",
        //   color: "var(--gray-5)",
        //   display: "flex",
        //   fontSize: "0.75rem",
        //   gap: ".5rem",
        //   margin: "1.5rem",
        //   svg: {
        //     color: "var(--purple)",
        //   },
        //   "&--warning, &--warning svg": {
        //     color: "var(--red)",
        //   },
        // },
      })
      addUtilities({
        ".remove-autofill-bg": {
          // "-webkit-text-fill-color": "#000",
          // "-webkit-box-shadow": "none",
          // "box-shadow": "none",
          transition: "background-color 9999s ease-in-out 0s",
        },
      })
    }),
  ],
} satisfies Config

export default config
