/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      colors: {
        background: "#0A0A0A",
        surface: "#111111",
        surfaceHover: "#1A1A1A",
        border: "#222222",
        primary: "#00F0FF",
        secondary: "#8B5CF6",
        text: {
          main: "#E5E5E5",
          muted: "#A3A3A3",
        }
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #222 1px, transparent 1px), linear-gradient(to bottom, #222 1px, transparent 1px)",
      },
      animation: {
        'glow-pulse': 'glow 3s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 15px -5px rgba(0, 240, 255, 0.4)' },
          '50%': { boxShadow: '0 0 25px 0px rgba(0, 240, 255, 0.6)' },
        }
      }
    },
  },
  plugins: [],
};
