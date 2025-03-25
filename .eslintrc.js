import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    env: {
      browser: true,
      node: true, // ✅ Allow Node.js globals like `module`
      es2021: true,
    },
    rules: {
      "no-undef": "off", // ✅ Disable `no-undef` rule to prevent `module is not defined` error
    },
  },
];

export default eslintConfig;
