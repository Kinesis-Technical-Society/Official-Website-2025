module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      animation: {
        blob: "blob 5s infinite ease-in-out",
      },
      keyframes: {
        blob: {
          "0%, 100%": { transform: "scale(1) rotate(0deg)" },
          "33%": { transform: "scale(1.05) rotate(3deg)" },
          "66%": { transform: "scale(0.98) rotate(-3deg)" },
        },
      },
    },
  },
  plugins: [],
};
