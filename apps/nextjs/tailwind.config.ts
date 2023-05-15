const baseConfig = require("@blueskeet/tailwind-config");

module.exports = {
  content: ["./src/**/*.tsx"],
  presets: [baseConfig],
  plugins: [
    require("@tailwindcss/forms"),
    // Other plugins can be added here
  ],
};
