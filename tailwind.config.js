/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: { fizz: { DEFAULT: "#c6ff3d", dark: "#0a0b0f", ink: "#12141b" } },
      fontFamily: {
        display: ['"Space Grotesk"', "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
