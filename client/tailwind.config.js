/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Mevcut renklerin
        primary: "#2dcd88",
        "background-light": "#f6f8f7",
        "background-dark": "#12201a",

        // --- EKSİK OLAN VE EKLEMEN GEREKENLER ---

        // Component içinde 'bg-surface-light' kullanmışsın:
        "surface-light": "#ffffff",
        "surface-dark": "#1a2c24",

        // Component içinde 'text-text-light' kullanmışsın (Tailwind text-{isim} yapar):
        "text-light": "#0f1a15",
        "text-dark": "#e9f2ee",

        // Component içinde 'text-subtle-light' kullanmışsın:
        "subtle-light": "#559177",
        "subtle-dark": "#88bba6",

        // Component içinde 'border-border-light' kullanmışsın:
        "border-light": "#d2e5dd",
        "border-dark": "#2a3d34",

        // Hover durumları için (opsiyonel ama kodda varsa gerekir)
        "primary-hover": "#25b074",
      },
      fontFamily: {
        display: ["Lexend", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/container-queries")],
};
