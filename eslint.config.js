import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import unicorn from 'eslint-plugin-unicorn'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'unicorn': unicorn,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // General filename rules - allow both cases by default
      'unicorn/filename-case': 'off',
      // Additional filename and naming rules
      'unicorn/prefer-module': 'error', // Prefer ES modules
      'unicorn/no-nested-ternary': 'warn' // Avoid nested ternary operators
    },
  },
  // Specific rules for component directories
  {
    files: ['src/pages/**/*.tsx', 'src/components/**/*.tsx'],
    rules: {
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            pascalCase: true
          }
        }
      ]
    }
  },
  // Allow camelCase for utility files and hooks
  {
    files: ['src/lib/**/*.ts', 'src/hooks/**/*.ts', 'src/utils/**/*.ts'],
    rules: {
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            camelCase: true
          }
        }
      ]
    }
  }
)