module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        primaryLight: '#fde68a',
        primary: '#fc941b',
        primaryLight: '#fce7d3',
        primaryHover: '#ff8e04',
        secondary: '',
        dark: '#1F2937',
        darker: '#111827',
        success: '#10B981',
        successLight: '#bbf7d0',
        warning: '#fbbf24',
        error: '#EF4444',
        errorHover: '#dc2626',
        errorLight: '#fee2e2',
        sectionBackground: '#f9fafb',
        grey: '#e5e7eb',
        darkGrey: '#9ca3af',
        overlay: 'rgba(0,0,0,0.3)',
        lightGray: '#f3f4f6',
      },
    },
  },
  plugins: [],
};
