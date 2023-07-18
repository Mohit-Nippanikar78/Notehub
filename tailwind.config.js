export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: {
        purple: "#6327e3",
        offblack: "#1a1a1a",
      },

      colors: {
        offwhite: "#f5f5f5",
        purple: "#6327e3",
        "icon-grey": "#444746",
      },
      borderColor: {
        purple: "#6327e3",
        offblack: "#1a1a1a",
      },
      boxShadow: {
        "light-side": " rgba(99, 99, 99, 0.2) 1px 0px 1px 0px",
        "light-nav": " rgba(99, 99, 99, 0.2) 0px 1px 1px 0px",
        
      },

    },
  },
  plugins: [],
};
