import eslint from "@eslint/js";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ["node_modules/**/*", "KoLmafia/**/*"],
  },
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: { ...globals.browser },
    },
    plugins: {
      "simple-import-sort": simpleImportSortPlugin,
    },
    rules: {
      "block-scoped-var": "error",
      curly: ["error", "multi-line"],
      "eol-last": "error",
      eqeqeq: "error",
      "no-trailing-spaces": "error",
      "no-var": "error",
      "prefer-arrow-callback": "error",
      "prefer-const": "error",
      "prefer-template": "error",
      "simple-import-sort/exports": "error",
      "simple-import-sort/imports": "error",
      "spaced-comment": "error",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/ban-ts-comment": "off",
    },
  },
];
