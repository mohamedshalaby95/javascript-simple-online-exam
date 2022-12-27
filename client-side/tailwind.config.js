const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      black: "#030303",
      blue: colors.blue,
      white: "#F3F3F3",
      gray: colors.gray,
      red: colors.red,
      orange: colors.orange,
      rvverBlack: "#000",
      totalWhite: "#fff",
      totalBlack: "#000",
      totalGray: "#808080",
      teal: colors.teal,
      yellow: "#FFFF00",
      green: "#4BB543",
      warningRed: "#913831",
      transparent: "transparent",
      desertSand: '#f3cfb3',
      cashmere: '#e1bbb4',
      mintGreen: '#a3b2a4',
      peach :'#e1bbb4',
      beige: '#F5D283',
      pink: '#E68AA8',
      summerGreen: '#A7BF89',
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
