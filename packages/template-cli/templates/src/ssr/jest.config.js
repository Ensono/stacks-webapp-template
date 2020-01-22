module.exports = {
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/__tests__/coverage/',
  ],
  testResultsProcessor: 'jest-sonar-reporter',
  coverageReporters: ['lcov'],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx,tsx}',
    '!**/*config.{js,json}',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/next-env.d.ts',
    '!**/dist/**',
  ],
  coverageDirectory: '<rootDir>/coverage/',
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  verbose: true,
}
