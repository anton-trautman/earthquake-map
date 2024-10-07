/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["selector", '[data-mode="dark"]'],
  theme: {
    // You'll probably use a font family for titles, and another for body text
    fontFamily: {
      display: [
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Oxygen",
        "Ubuntu",
        "Cantarell",
        "Fira Sans",
        "Droid Sans",
        "Helvetica Neue",
        "sans-serif",
      ],
    },
    extend: {
      colors: {
        bgPrimary: "var(--color-bg-primary)",
        bgSecondary: "var(--color-bg-secondary)",
        bgInverted: "var(--color-bg-inverted)",
        textPrimary: "var(--color-text-primary)",
        textSecondary: "var(--color-text-secondary)",
        textInverted: "var(--color-text-inverted)",
      },
      container: {
        center: true,
      },

      keyframes: {
        fadein: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadein: "fadein .5s ease-in-out",
      },
      borderRadius: {
        sm: "0.3125rem",
        xl: "1rem",
      },
    },
  },
  plugins: [],
};
