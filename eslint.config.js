import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat();

export default [
  ...compat.config({
    extends: ['react-app'],
    env: {
      browser: true,
      node: true,
      es2022: true
    }
  }),
  {
    ignores: ['node_modules', 'public', 'plugins', '/dist']
  }
];