import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const config = [
  ...compat.config({
    extends: ['react-app'],
    env: {
      browser: true,
      node: true,
      es2022: true,
    },
  }),
  {
    ignores: ['node_modules/**', 'public/**', 'plugins/**', 'dist/**'],
  },
];

export default config;
