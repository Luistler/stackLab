/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        zen: {
          ivory: '#FBFBFA', // Primary background
          cream: '#F5F3EF', // Secondary surface / cards
          sand: '#EBE7DF', // Borders & subtle dividers
          stone: '#C7C2B6', // Inactive badges / outlines
          sage: '#8A9A86', // Botanical highlight / primary accent
          'sage-light': '#DCE3DA',
          'sage-dark': '#6E7F6A',
          matcha: '#4A5B48', // Secondary deep green
          forest: '#243026', // Hero headers & primary buttons
          charcoal: '#1C1F1D', // Deep body text
          clay: '#B87D65', // Warm terracotta accent
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"Plus Jakarta Sans"', 'monospace'],
      },
      borderRadius: {
        zen: '24px',
        'zen-sm': '14px',
        squircle: '24px',
      },
      boxShadow: {
        'zen-card':
          '0 20px 45px -15px rgba(28, 31, 29, 0.07), 0 0 1px 1px rgba(235, 231, 223, 0.6)',
        'zen-float': '0 25px 60px -20px rgba(36, 48, 38, 0.18)',
        'zen-subtle': '0 4px 20px -2px rgba(28, 31, 29, 0.05)',
      },
    },
  },
  plugins: [],
};
