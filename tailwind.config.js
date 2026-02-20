/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        vazir: ["Vazirmatn", "sans-serif"],
      },
      colors: {
        coffee: {
          light: "#E5C89E",
          DEFAULT: "#AB7F52",
          dark: "#270400",
        },
      },
    },
  },
  plugins: [],
};
