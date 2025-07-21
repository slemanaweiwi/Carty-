/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: '#a259ec', // main purple
          light: '#c3a6f7',
          dark: '#6d28d9',
        },
        'purple-50': '#f5f3ff',
        'purple-100': '#ede9fe',
        'purple-200': '#ddd6fe',
        'purple-300': '#c4b5fd',
        'purple-400': '#a78bfa',
        'purple-500': '#8b5cf6',
        'purple-600': '#7c3aed',
        'purple-700': '#6d28d9',
        'purple-800': '#5b21b6',
        'purple-900': '#4c1d95',
      },
      gridTemplateColumns:{
        'auto': 'repeat(auto-fit, minmax(200px, 1fr))'
      },
    },
  },
  plugins: [],
};
