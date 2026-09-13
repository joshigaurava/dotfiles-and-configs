import eslintJs from "@eslint/js";
import eslintStylistic from "@stylistic/eslint-plugin";
import eslintVitest from "@vitest/eslint-plugin";
import { defineConfig } from "eslint/config";
import globals from "globals";
import eslintTs from "typescript-eslint";

// ESLint/JS rules shared by JS and TS configs
const eslintJsSharedRules = {
  "array-callback-return": ["error", { checkForEach: true }],
  "no-constant-binary-expression": [
    "error",
    { checkRelationalComparisons: true },
  ],
  "no-constructor-return": "error",
  "no-duplicate-imports": ["error", { includeExports: true }],
  "no-fallthrough": "off",
  "no-promise-executor-return": "error",
  "no-self-compare": "error",
  "no-unmodified-loop-condition": "error",
  "no-unreachable-loop": "error",
  "no-unsafe-negation": ["error", { enforceForOrderingRelations: true }],
  "no-unsafe-optional-chaining": [
    "error",
    { disallowArithmeticOperators: true },
  ],
  "require-atomic-updates": "error",
  "use-isnan": ["error", { enforceForIndexOf: true }],
  "valid-typeof": ["error", { requireStringLiterals: true }],
  "arrow-body-style": ["error", "always"],
  "block-scoped-var": "error",
  curly: "error",
  "default-case-last": "error",
  eqeqeq: ["error", "smart"],
  "new-cap": ["error", { capIsNew: false }],
  "no-console": ["error", { allow: ["warn", "info", "error"] }],
  "no-else-return": ["error", { allowElseIf: false }],
  "no-extra-bind": "error",
  "no-extra-boolean-cast": ["error", { enforceForInnerExpressions: true }],
  "no-lonely-if": "error",
  "no-multi-str": "error",
  "no-nested-ternary": "error",
  "no-param-reassign": "error",
  "no-return-assign": "error",
  "no-undef-init": "error",
  "no-unneeded-ternary": ["error", { defaultAssignment: false }],
  "no-useless-concat": "error",
  "no-useless-return": "error",
  "no-var": "error",
  "prefer-const": "error",
  "prefer-object-has-own": "error",
  yoda: "error",
};

export default defineConfig([
  {
    name: "global-ignores-config",
    ignores: [".typescript/", ".vitest/", "dist/", "node_modules/"],
  },
  {
    name: "global-config",
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.builtin,
        ...globals.vitest,
      },
    },
  },
  {
    name: "eslint-stylistic-config",
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@stylistic": eslintStylistic,
    },
    rules: {
      "@stylistic/jsx-curly-brace-presence": "error",
      "@stylistic/max-len": [
        "error",
        {
          comments: 200,
          ignoreTrailingComments: true,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
        },
      ],
      "@stylistic/spaced-comment": ["error"],
      "@stylistic/padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "block" },
        { blankLine: "always", prev: "block", next: "*" },
        { blankLine: "always", prev: "*", next: "function" },
        { blankLine: "always", prev: "function", next: "*" },
        { blankLine: "always", prev: "*", next: "class" },
        { blankLine: "always", prev: "class", next: "*" },
        { blankLine: "always", prev: "*", next: "import" },
        { blankLine: "always", prev: "import", next: "*" },
        { blankLine: "never", prev: "import", next: "import" },
        { blankLine: "always", prev: "*", next: "cjs-import" },
        { blankLine: "always", prev: "cjs-import", next: "*" },
        { blankLine: "never", prev: "cjs-import", next: "cjs-import" },
        { blankLine: "always", prev: "*", next: "export" },
        { blankLine: "always", prev: "export", next: "*" },
        { blankLine: "any", prev: "export", next: "export" },
        { blankLine: "always", prev: "*", next: "cjs-export" },
        { blankLine: "always", prev: "cjs-export", next: "*" },
        { blankLine: "any", prev: "cjs-export", next: "cjs-export" },
        { blankLine: "always", prev: "*", next: "return" },
        { blankLine: "always", prev: "*", next: "break" },
        { blankLine: "always", prev: "*", next: "continue" },
        { blankLine: "always", prev: "*", next: "throw" },
      ],
    },
  },
  {
    name: "eslint-js-config",
    files: ["**/*.{js,jsx}"],
    plugins: {
      js: eslintJs,
    },
    extends: ["js/recommended"],
    rules: {
      ...eslintJsSharedRules,
      "class-methods-use-this": "error",
      "default-param-last": "error",
      "dot-notation": "error",
      "no-throw-literal": "error",
      "no-use-before-define": ["error", { functions: false }],
      "no-useless-constructor": "error",
      "prefer-promise-reject-errors": ["error", { allowEmptyReject: true }],
      "require-await": "error",
    },
  },
  {
    name: "eslint-ts-config",
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    extends: [
      eslintTs.configs.recommendedTypeChecked,
      eslintTs.configs.stylisticTypeChecked,
    ],
    rules: {
      ...eslintJsSharedRules,
      "@typescript-eslint/class-methods-use-this": "error",
      "@typescript-eslint/default-param-last": "error",
      "@typescript-eslint/dot-notation": "error",
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        { allowExpressions: true },
      ],
      "@typescript-eslint/explicit-module-boundary-types": "error",
      "@typescript-eslint/no-mixed-enums": "error",
      "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
      "@typescript-eslint/no-unnecessary-qualifier": "error",
      "@typescript-eslint/no-use-before-define": [
        "error",
        { functions: false },
      ],
      "@typescript-eslint/no-useless-constructor": "error",
      "@typescript-eslint/only-throw-error": "error",
      "@typescript-eslint/prefer-promise-reject-errors": [
        "error",
        { allowEmptyReject: true },
      ],
      "@typescript-eslint/promise-function-async": "error",
      "@typescript-eslint/require-array-sort-compare": "error",
      "@typescript-eslint/require-await": "error",
    },
  },
  {
    name: "eslint-vitest-config",
    files: ["**/*.{test,spec}.{js,jsx,ts,tsx}"],
    extends: [eslintVitest.configs.recommended],
    rules: {
      "vitest/consistent-test-filename": "error",
      "vitest/consistent-vitest-vi": ["error", { fn: "vi" }],
      "vitest/consistent-test-it": ["error", { fn: "it" }],
      "vitest/padding-around-all": "error",
    },
  },
]);
