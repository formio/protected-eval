
module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'arrow-parens': [2, 'always'],
    'curly': 2,
    'no-unused-vars': [2, {args: 'all', argsIgnorePattern: '^__', varsIgnorePattern: '^__'}],
    'no-use-before-define': 0,
    'object-curly-spacing': [2, 'never'],
    'quotes': ['error', 'single'],
    '@typescript-eslint/no-explicit-any': 0,
  },
};
