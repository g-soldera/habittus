// https://docs.expo.dev/guides/using-eslint/
import { defineConfig } from "eslint/config";
import expoConfig from "eslint-config-expo/flat.js";

export default defineConfig([
  expoConfig,
  {
    plugins: ['jsx-a11y'],
    extends: ['plugin:jsx-a11y/recommended'],
    rules: {
      'jsx-a11y/accessible-emoji': 'warn',
      'jsx-a11y/no-autofocus': 'off'
    }
  },
  {
    ignores: ["dist/*"],
  },
]);
