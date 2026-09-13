export default {
  ignoreFiles: [".typescript/**", ".vitest/**", "dist/**", "node_modules/**"],
  extends: ["stylelint-config-standard"],
  plugins: ["@stylistic/stylelint-plugin"],
  rules: {
    // Stylelint rules
    "color-hex-length": "long",
    "font-family-name-quotes": "always-where-required",
    "rule-empty-line-before": [
      "always",
      { ignore: ["first-nested", "after-comment"] },
    ],

    // Stylelint Stylistic rules
    "@stylistic/at-rule-name-case": "lower",
    "@stylistic/color-hex-case": "lower",
    "@stylistic/media-feature-name-case": "lower",
    "@stylistic/number-leading-zero": "always",
    "@stylistic/number-no-trailing-zeros": true,
    "@stylistic/property-case": "lower",
    "@stylistic/selector-pseudo-class-case": "lower",
    "@stylistic/selector-pseudo-element-case": "lower",
    "@stylistic/unit-case": "lower",
  },
};
