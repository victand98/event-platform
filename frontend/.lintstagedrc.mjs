import path from 'path';
import baseConfig from '../.lintstagedrc.mjs';

const buildEslintCommand = (filenames) =>
  `next lint --file ${filenames
    .map((f) => path.relative(`${process.cwd()}/frontend`, f))
    .join(' --file ')}`;

export default {
  ...baseConfig,
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
};
