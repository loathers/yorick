module.exports = {
  extends: ["react-app", "plugin:import/recommended"],
  plugins: ["libram", "unused-imports"],
  rules: {
    "import/export": "off",
    "import/no-named-as-default-member": "off",
    "import/order": "error",
    "libram/verify-constants": "error",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": "error",
    "@typescript-eslint/no-unused-vars": "off",
  },
  settings: {
    "import/core-modules": ["react", "react-dom"],
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
