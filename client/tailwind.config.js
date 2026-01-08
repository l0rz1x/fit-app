/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#2dcd88",
        "primary-hover": "#25b074",

        // Arka planlar
        "background-light": "#f6f8f7",
        "background-dark": "#12201a",
        "surface-light": "#ffffff",
        "surface-dark": "#1a2c24",

        // Metin renkleri
        "text-light": "#0f1a15",
        "text-dark": "#e9f2ee",
        "subtle-light": "#559177",
        "subtle-dark": "#88bba6",

        // Kenarlıklar
        "border-light": "#d2e5dd",
        "border-dark": "#2a3d34",
      },
      fontFamily: {
        display: ["Lexend", "sans-serif"],
        sans: ["Lexend", "sans-serif"], // Varsayılan fontu da Lexend yaptım
      },
    },
  },
  plugins: [require("@tailwindcss/container-queries")], // Eğer bu plugin yüklü değilse npm install @tailwindcss/container-queries yapmalısın, yoksa silebilirsin.
};
