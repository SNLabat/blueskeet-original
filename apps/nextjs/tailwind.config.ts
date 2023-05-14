const baseConfig = require("@blueskeet/tailwind-config");

module.exports = {
  purge: ["./components//*.{js,ts,jsx,tsx}", "./pages//*.{js,ts,jsx,tsx}"],
  content: ["./src/**/*.tsx"],
  presets: [baseConfig],
  plugins: [
    require("@tailwindcss/forms"),
    // Other plugins can be added here
  ],
};
