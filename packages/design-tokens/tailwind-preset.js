/** @type {import('tailwindcss').Config} */
const preset = {
  theme: {
    extend: {
      colors: {
        yellow: { DEFAULT: '#F7C945', deep: '#E8B62E' },
        ink: { DEFAULT: '#1B1B1B', soft: '#3a3a3a' },
        paper: '#FFFDF6',
        card: '#ffffff',
        pink: '#FF8FA3',
        coral: '#FF7A59',
        blue: '#6FA8FF',
        teal: '#2BC4A8',
        violet: '#8B7CF6',
        cream: '#FFE9A8',
        soft: '#E8E4D9',
        field: '#F3F2ED',
        line: '#9A958B',
        'line-faint': '#C9C4BA',
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        accent: ['Caveat', 'cursive'],
      },
      fontWeight: {
        body: '500',
        heading: '900',
      },
      maxWidth: {
        content: '1180px',
      },
      borderRadius: {
        pill: '999px',
        card: '22px',
        'card-lg': '28px',
        tag: '14px',
      },
      boxShadow: {
        'hard-sm': '8px 8px 0 rgba(0,0,0,0.12)',
        hard: '10px 10px 0 rgba(0,0,0,0.15)',
        'hard-lg': '12px 12px 0 rgba(0,0,0,0.18)',
      },
      transitionDuration: {
        fast: '150ms',
      },
    },
  },
  plugins: [],
};

module.exports = preset;
