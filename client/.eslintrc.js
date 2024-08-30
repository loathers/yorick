/* eslint-env node */

export default {
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "simple-import-sort",
    "react-hooks",
    "libram",
  ],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  ignorePatterns: ["/node_modules/**/*", "/build/**/*", "/src/generated/**/*"],
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

    // This one needs a fix because TS's rules are different?
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

    // eslint-plugin-libram
    "libram/verify-constants": "error",
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
};
