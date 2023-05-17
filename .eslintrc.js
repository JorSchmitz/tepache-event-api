module.exports = {
  env: {
    node: true,
    jest: true,
  },
  root: true,
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  rules: {
    'no-console': 2,
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': 0,
    quotes: ['error', 'single'],
    // 'semi': [
    //   'error',
    //   'always'
    // ]
  },
}
