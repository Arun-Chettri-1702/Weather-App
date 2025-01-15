/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        "*": {
          boxSizing: "border-box",
        },
      });
    },
  ],
};
