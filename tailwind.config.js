// tailwind.config.js
module.exports = { 
  prefix: 'tw-', // Prefix Tailwind's class names
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

