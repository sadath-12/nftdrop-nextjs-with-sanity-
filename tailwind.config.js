module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width:{
        containerWidthLg:"75%",
              },
      colors:{
        colorbg: "#1f1f38",
  colorbgvariant: "#2c2c6c",
 
  colorwhite:"#fff",
  colorlight:"rgba(255,255,255,0.6)"
      }
    },
  },
  plugins: [],
}
