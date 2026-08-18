/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#FAFAFA',
          subtle: '#F6F6F8',
          paper: '#FDFDFC',
        },
        ink: {
          DEFAULT: '#0F172A',
          secondary: '#475569',
          muted: '#94A3B8',
        },
        brand: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        teal: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'tactile': 'inset 0 1px 0 0 rgba(255,255,255,0.4), 0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.04)',
        'tactile-hover': 'inset 0 1px 0 0 rgba(255,255,255,0.6), 0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -2px rgba(0,0,0,0.04)',
        'tactile-pressed': 'inset 0 2px 4px 0 rgba(0,0,0,0.12)',
        'recessed': 'inset 0 1px 2px 0 rgba(0,0,0,0.06), inset 0 2px 4px 0 rgba(0,0,0,0.02)',
        'bento': '0 2px 8px -2px rgba(0,0,0,0.04), 0 1px 2px 0 rgba(0,0,0,0.02)',
        'bento-hover': '0 8px 24px -4px rgba(0,0,0,0.08), 0 2px 6px 0 rgba(0,0,0,0.03)',
      },
    },
  },
  plugins: [],
}
