import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        yellow: '#E8EA00',
        teal: '#17B59A',
        white: '#FFFFFF',
        espresso: '#160804',
        'roast-elevated': '#26110B',
        'oat-cream': '#FBEBDE',
        latte: '#E9CBB9',
        'card-white': '#FFFDF9',
        crema: '#A84B22',
        'crema-dark': '#8F3A15',
        caramel: '#CC9265',
        'kinetic-lime': '#E2FC07',
        'border-cafe': 'rgba(99, 38, 21, 0.16)',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'var(--font-bebas-neue)', 'serif'],
        sans: ['var(--font-plus-jakarta)', 'var(--font-poppins)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
        bebas: ['var(--font-bebas-neue)', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
        fraunces: ['var(--font-fraunces)', 'serif'],
        jakarta: ['var(--font-plus-jakarta)', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 3s ease-out infinite',
        'marquee': 'marquee 20s linear infinite',
        'count-up': 'count-up 2s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
