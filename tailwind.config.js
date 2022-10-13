/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        112: "28rem",
        128: "32rem",
        244: "60rem",
        256: "64rem",
        268: "68rem",
      },
      height: {
        144: "32rem",
        156: "36rem",
      },
    },
  },
  plugins: [],
};
