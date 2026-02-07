/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        msh: '#1e40af',   // MSH Blue
        msw: '#059669',   // MSW Green  
        msm: '#ea580c',   // MSM Orange
      }
    },
  },
  plugins: [],
}