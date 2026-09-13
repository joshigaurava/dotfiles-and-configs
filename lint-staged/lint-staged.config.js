import { defineConfig } from "lint-staged/config";

export default defineConfig({
  // Lint and format staged CSS files
  "*.css": [
    "stylelint --fix --config stylelint.config.js",
    "prettier --write --config prettier.config.js",
  ],
  // Lint, format, and test staged JS/TS files
  "*.{js,jsx,ts,tsx}": [
    "eslint --fix --config eslint.config.js",
    "prettier --write --config prettier.config.js",
    "vitest related --run --config vitest.config.js",
  ],
  // Format everything else
  "!(*.{css,js,jsx,ts,tsx})": "prettier --write --config prettier.config.js",
});
