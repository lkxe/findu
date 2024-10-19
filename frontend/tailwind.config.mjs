/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#00A693",
        secondary: "#2F4F4F",
        accent: "#008080",
        slate: "#2F4F4F",
        background: "#1A1A1A",
        secbackground: "#222222",
        primarytext: "#F0F0F0",

        /*
        base: "#1e1e2e",
        surface0: "#313244",
        sapphire: "#74c7ec",
        blue: "#89b4fa"*/
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

