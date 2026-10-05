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
        brand: {
          forest: "#0B3D2E",
          forestDark: "#07281E",
          forestLight: "#145642",
          teal: "#087E8B",
          tealDark: "#065F69",
          tealLight: "#139EB0",
          tealMuted: "#E6F3F5",
          gold: "#C99A3D",
          goldDark: "#A67A26",
          goldLight: "#DEB55E",
          goldMuted: "#FAF4E8",
          cream: "#F7F4EC",
          creamSurface: "#FFFFFF",
          creamDark: "#ECE7DA",
          creamMuted: "#F2EFE5",
          charcoal: "#17201D",
          charcoalLight: "#2E3B37",
          charcoalMuted: "#52635E",
          charcoalBorder: "#D8D4C8",
        },
      },
      fontFamily: {
        sans: [
          "'Plus Jakarta Sans'",
          "'Inter'",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 2px 10px rgba(23, 32, 29, 0.04)",
        card: "0 4px 20px rgba(23, 32, 29, 0.06)",
        dropdown: "0 10px 30px rgba(11, 61, 46, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
