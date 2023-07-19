export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: {
        ruby: "#e91e63",
        offblack: "#1a1a1a",
        myrtle: "#9c2780",
      },

      colors: {
        offwhite: "#f5f5f5",
        ruby: "#e91e63",
        navy: "#272a80",
        "icon-grey": "#444746",
        main: "#0C203C",
        myrtle: "#9c2780",
      },
      borderColor: {
        navy: "#272a80",
        ruby: "#e91e63",
        offblack: "#1a1a1a",
        myrtle: "#9c2780",
      },
      boxShadow: {
        "light-side": " rgba(99, 99, 99, 0.2) 1px 0px 1px 0px",
        "light-nav": " rgba(99, 99, 99, 0.2) 0px 1px 1px 0px",
      },
    },
  },
  plugins: [],
};
