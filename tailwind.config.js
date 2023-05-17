/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      sm: "280px",
      lm: "450px",
      mobile: { min: "128px", max: "540px" },
      middle: { min: "541px", max: "767px" },
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1536px",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
      outfit: ["Outfit"],
    },
    fontWeight: {
      thin: "100",
      extralight: "200",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      black: "900",
    },
    colors: {
      primaryBlue: "#104D96",
      lighterBlue: "#E4ECF5",
      neutral800: "#192029",
      neutral700: "#263240",
      neutral600: "#303E4F",
      neutral500: "#6C7E93",
      neutral400: "#363636",
      successGreen: "#10A731",
      successGreenLight: "#DFF7E4",
      errorRed: "#DA1212",
      errorRedLight: "#F9EEEE",
      bottomColor: "#D1D8E0",
      lightBlack: "#16181D",
      inputLabelColor: "#475569",
      rememberColor: "#18181B",
      dropdownHover: "#d7d1d1",
      corePlugins: {
        gap: true,
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      objectRendering: {
        smooth: "smooth",
        pixelated: "pixelated",
      },
    },
  },
  plugins: [],
});
