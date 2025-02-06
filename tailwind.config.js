/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pacifico: ["Pacifico", "cursive"], // Font Pacifico
        poppins: ["Poppins", "sans-serif"], // Font Poppins
      },
    },
  },
  plugins: [],
};
