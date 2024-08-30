import eslint from "@eslint/js";
import libramPlugin from "eslint-plugin-libram";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "simple-import-sort": simpleImportSortPlugin,
      "react-hooks": reactHooksPlugin,
      libram: libramPlugin,
    },
    ignores: ["/node_modules/**/*", "/build/**/*", "/src/generated/**/*"],
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
      "react-hooks/exhaustive-deps": [
        "error",
        {
          additionalHooks: "(useNag)",
        },
      ],
      "libram/verify-constants": "error",
    },
  },
];
