import baseConfig from '../.lintstagedrc.mjs';

export default {
  ...baseConfig,
  '*.ts': ['eslint src --fix'],
};
