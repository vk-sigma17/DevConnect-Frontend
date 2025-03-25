/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',  // This enables dark mode when the 'dark' class is applied
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: true, // Enable DaisyUI themes
    darkTheme: "dark", // Automatically sets the dark theme if 'dark' class is added to HTML
  },
}
