import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import prettierConfig from 'eslint-config-prettier/flat';
import importPlugin from 'eslint-plugin-import';

export default defineConfig([
  globalIgnores(['dist', 'node_modules', 'build']),

  {
    files: ['**/*.{ts,tsx}'],

    plugins: {
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
      import: importPlugin,
    },

    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      ecmaVersion: 2022,
      globals: globals.browser,
      sourceType: 'module',
    },

    rules: {
      '@typescript-eslint/no-explicit-any': 'off',

      // remove unused imports automatically
      'unused-imports/no-unused-imports': 'warn',

      // optional: warn on unused vars but allow _
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // import sort
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            // Side effect imports (например, polyfills)
            ['^\\u0000'],

            // React и стандартные библиотеки
            ['^react', '^@?\\w'],

            // Алиасы (например, @/components)
            ['^@/'],

            // Родительские директории (../)
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],

            // Текущая директория (./)
            ['^\\./(?=.*/)', '^\\.(?!/?$)', '^\\./?$'],

            // CSS/SCSS/SASS
            ['^.+\\.(css|scss|sass)$'],
          ],
        },
      ],

      'simple-import-sort/exports': 'warn',

      // add newline after import
      'import/newline-after-import': ['warn', { count: 1 }],
    },
  },

  prettierConfig,
]);
