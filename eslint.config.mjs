import prettier from "eslint-config-prettier";
import eslintPluginAstro from "eslint-plugin-astro";
import importPlugin from "eslint-plugin-import";
import { default as jsxA11y, default as jsxa11y } from "eslint-plugin-jsx-a11y";
import playwright from "eslint-plugin-playwright";
import reactHooks from "eslint-plugin-react-hooks";
import reactJsxRuntime from "eslint-plugin-react/configs/jsx-runtime.js";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import tailwind from "eslint-plugin-tailwindcss";
import vitest from "eslint-plugin-vitest";
import neostandard, { resolveIgnoresFromGitignore } from "neostandard";

export default [
  {
    name: "ignores",
    ignores: [
      ...resolveIgnoresFromGitignore(),
      "supabase/functions/**/*",
      "src/components/ui",
      "types/supabase.ts",
      "eslint.config.mjs",
    ],
  },
  ...neostandard({
    noStyle: true,
    ts: true,
  }),
  {
    name: "import",
    files: ["**/*.{ts,tsx,astro}"],
    plugins: {
      import: importPlugin,
    },
    rules: {
      ...importPlugin.configs.recommended.rules,
      ...importPlugin.configs.typescript.rules,
      "import/order": ["error"],
    },
  },
  // ts, tsx
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "jsx-a11y": jsxA11y,
      "react-hooks": reactHooks,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...reactHooks.recommended,
      ...jsxa11y.configs.recommended.rules,
    },
    languageOptions: {
      ...reactRecommended.languageOptions,
      ...reactJsxRuntime.languageOptions,
    },
  },
  // astro
  ...eslintPluginAstro.configs["flat/recommended"],
  ...eslintPluginAstro.configs["flat/jsx-a11y-recommended"],
  {
    files: ["**/*.astro"],
    rules: {
      "react/jsx-key": "off",
    },
  },
  {
    name: "typescript project setting",
    files: ["**/*.{ts,tsx,astro}"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },
  },
  ...tailwind.configs["flat/recommended"],
  {
    name: "playwright",
    files: ["e2e/**/*.test.{ts,tsx}"],
    ...playwright.configs["flat/recommended"],
  },
  {
    name: "vitest",
    files: ["src/**/*.test.{ts,tsx}"],
    ...vitest.configs.recommended,
  },
  {
    name: "prettier",
    ...prettier,
  },
  {
    rules: {
      "react/self-closing-comp": ["off"],
    },
  },
];
