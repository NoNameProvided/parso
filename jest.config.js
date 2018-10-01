module.exports = {
  coveragePathIgnorePatterns: [
    'node_modules',
    'testing',
  ],
  roots: [
    './src/',
  ],
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.spec.json',
    },
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  preset: 'ts-jest',
  testMatch: null,
}