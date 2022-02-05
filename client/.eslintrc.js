module.exports = {
  extends: [
    "react-app",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  plugins: ["libram", "unused-imports"],
  rules: {
    "import/export": "off",
    "import/no-named-as-default-member": "off",
    "import/order": [
      "error",
      {
        alphabetize: { order: "asc" },
      },
    ],
    "libram/verify-constants": "error",
    "no-var": "error",
    "prefer-const": "error",
    "prefer-template": "error",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": "error",
    "@typescript-eslint/no-unused-vars": "off",
  },
  settings: {
    "import/core-modules": ["react", "react-dom", "kolmafia", "libram"],
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
      },
    },
  },
};
