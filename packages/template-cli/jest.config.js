module.exports = {
  roots: [`<rootDir>.`],
  transform: {
    '^.+.ts?$': 'ts-jest',
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/coverage/',
    '<rootDir>/templates/',
  ],
  testResultsProcessor: 'jest-sonar-reporter',
  reporters: ['default', ['jest-junit', {outputName: 'junit-test-report.xml'}]],
  coverageReporters: ['cobertura', 'lcov'],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*config.{js,json}',
    '!**/coverage/**',
    '!**/templates/**',
    '!**/coverage/**',
    '!**/node_modules/**',
  ],
  coverageDirectory: '<rootDir>./coverage/',
  coverageThreshold: {
    global: {
      statements: 0,
      branches: 0,
      functions: 0,
      lines: 0,
    },
  },
  testEnvironment: 'node',
  verbose: true,
}
