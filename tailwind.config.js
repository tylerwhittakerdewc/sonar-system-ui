module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          light: '#AEEEEE',
          DEFAULT: '#00BFFF',
          dark: '#1E90FF',
        },
        sonar: {
          green: '#00FF7F',
          red: '#FF4500',
        },
      },
      animation: {
        sweep: 'sweep 2s linear infinite',
      },
      keyframes: {
        sweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}