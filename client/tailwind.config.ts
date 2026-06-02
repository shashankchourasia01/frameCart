import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          maroon: '#7B1D2E',
          'maroon-dark': '#5C1522',
          'maroon-light': '#F5E8EA',
          gold: '#C9972B',
          'gold-light': '#F7EDD5',
          ivory: '#FAF7F2',
          'ivory-dark': '#F0EBE3',
          charcoal: '#2D2D2D',
          'charcoal-light': '#6B6B6B',
          whatsapp: '#25D366',
          'whatsapp-dark': '#1EA952',
          error: '#C0392B',
          success: '#27AE60',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        heading: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
        btn: '12px',
        input: '10px',
      },
      boxShadow: {
        card: '0 2px 12px rgba(123,29,46,0.08)',
        'card-hover': '0 8px 32px rgba(123,29,46,0.16)',
        'sticky-header': '0 1px 0 rgba(0,0,0,0.06)',
        up: '0 -4px 20px rgba(123,29,46,0.12)',
      },
      backgroundImage: {
        shimmer:
          'linear-gradient(90deg, #F0EBE3 0%, #FAF7F2 50%, #F0EBE3 100%)',
        'gold-gradient':
          'linear-gradient(135deg, #F7EDD5 0%, #C9972B 50%, #F7EDD5 100%)',
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite linear',
        marquee: 'marquee 20s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
