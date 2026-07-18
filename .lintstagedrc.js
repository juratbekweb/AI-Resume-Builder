import path from "node:path";

const buildEslintCommand = (filenames: string[]) =>
  `eslint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

module.exports = {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand, "prettier --write"],
  "*.{json,md,css}": ["prettier --write"],
};
