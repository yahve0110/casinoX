import eslintPluginTs from '@typescript-eslint/eslint-plugin';
import parserTs from '@typescript-eslint/parser';
import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
        sourceType: 'module',
      },
      globals: {
        NodeJS: true,
        process: true,
        console: true,
      },
    },
    plugins: {
      '@typescript-eslint': eslintPluginTs,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
  {
    files: ['**/*.test.ts'],
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        project: null,
      },
      globals: {
        describe: true,
        it: true,
        expect: true,
        test: true,
        beforeEach: true,
        afterEach: true,
        jest: true,
        process: true,
        console: true,
      },
    },
  },
];
