/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "infinite-scroll": "infinite-scroll 40s linear infinite",
      },
      keyframes: {
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(to bottom, transparent 1px, rgba(255, 255, 255, 0.05) 1px), linear-gradient(to right, transparent 1px, rgba(255, 255, 255, 0.05) 1px)",
      },
      backgroundSize: {
        "grid-pattern": "2rem 2rem",
      },
    },
  },
  plugins: []
};
