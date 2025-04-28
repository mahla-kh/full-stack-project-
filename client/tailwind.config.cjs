/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-dark": "#001047",
        "blue-light": "#2242B3",
        "gold-dark": "#C79D2A",
        "gold-light": "#FFF5D9",
      },
    },
  },
  plugins: [],
};
