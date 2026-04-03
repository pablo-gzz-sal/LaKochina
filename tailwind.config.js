/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts}"],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      pinkMain: '#f9659f',
      bone: '#efe8dc',
      pinkDarker: '#78344e',
      amber: '#FF8C42',
      dark: '#1a0a0e',
      white: '#ffffff',
      black: '#000000',
      gray: {
        100: '#f5f5f5',
        200: '#e5e5e5',
        400: '#9ca3af',
        600: '#4b5563',
        800: '#1f2937',
      }
    },
    extend: {
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
      }
    }
  },
  plugins: [],
}

