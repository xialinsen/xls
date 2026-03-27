/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        dark: "#0A0A0F",
        cyan: "#00F0FF",
        purple: "#8A2BE2",
        "glass-bg": "rgba(255, 255, 255, 0.05)",
        "glass-border": "rgba(255, 255, 255, 0.1)",
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00F0FF' },
          '100%': { boxShadow: '0 0 20px #00F0FF, 0 0 30px #8A2BE2' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
