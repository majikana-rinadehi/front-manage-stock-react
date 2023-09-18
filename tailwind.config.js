/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function({addUtilities}) {
      const newUtilities = {
        ".text-shadow": {
            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25);"
        },
        ".box-shadow": {
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25);"
        }
      }
      addUtilities(newUtilities)
    }
  ],
}

