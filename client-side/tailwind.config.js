const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      black: colors.black,
      blue: colors.blue,
      white: "#F3F3F3",
      gray: colors.gray,
      red: colors.red,
      orange: colors.orange,
    },
    extend: {
      animation: {
        grow: "grow 0.5s ease-in-out",
        shrink: "shrink 0.5s ease-in-out",
      },
      keyframes: {
        grow: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.05)" },
        },
        shrink: {
          "0%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
    screens: {
      mobile: "100px",
      tablet: "640px",
      laptop: "1024px",
      desktop: "1280px",
    },
  },


};
