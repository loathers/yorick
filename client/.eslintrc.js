module.exports = {
  extends: ["react-app"],
  plugins: ["libram", "unused-imports"],
  rules: {
    "libram/verify-constants": "error",
    "no-var": "error",
    "prefer-const": "error",
    "prefer-template": "error",
    "@typescript-eslint/no-unused-vars": "off",
  },
};
