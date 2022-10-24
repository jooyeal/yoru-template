/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        "500px": "500px",
        "300px": "300px",
        "100px": "100px",
        112: "28rem",
        128: "32rem",
        244: "60rem",
        256: "64rem",
        268: "68rem",
      },
      height: {
        "500px": "500px",
        "300px": "300px",
        "100px": "100px",
        144: "32rem",
        156: "36rem",
      },
    },
    screens: {
      mobile: { max: "820px" },
      laptop: { min: "821px" },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
