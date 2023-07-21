/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: { primary: "#ff385c" },
      boxShadow: {
        boxShadow: "-1px 1px 20px 10px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
