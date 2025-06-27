import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const extendedConfig = compat.extends("next/core-web-vitals");

// Remove any invalid `parser: function` entries
const sanitizedConfig = extendedConfig.map((config) => {
  if (typeof config.parser === "function") {
    delete config.parser;
  }
  return config;
});

export default sanitizedConfig;
