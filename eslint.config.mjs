import globals from "globals";
import { defineConfig } from "eslint/config";
import sscce from "./eslint-plugin-sscce.mjs";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: { globals: globals.browser },
    plugins: { sscce },
    rules: {
      "no-undef": "error",
      "sscce/useAvailableUtils": "error",
      "sscce/removeUnusedFunctions": "error",
    },
  },
]);
