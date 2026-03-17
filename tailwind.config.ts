import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', "serif"],
        playfair: ['"Playfair Display"', "serif"],
      },
      colors: {
        gold: {
          DEFAULT: "#D4AF37",
          50: "#F5EED0",
          100: "#F0E5BE",
          200: "#E6D299",
          300: "#DCBF74",
          400: "#D2AC4F",
          500: "#D4AF37",
          600: "#B8941F",
          700: "#8A6F17",
          800: "#5C4A0F",
          900: "#2E2507",
        },
      },
    },
  },
  plugins: [],
};

export default config;
