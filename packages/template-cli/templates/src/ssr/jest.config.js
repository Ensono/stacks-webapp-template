module.exports = {
    transform: {
        '^.+.ts.?$': 'ts-jest',
    },
    testPathIgnorePatterns: [
        '<rootDir>/.next/',
        '<rootDir>/node_modules/',
        '<rootDir>/__tests__/coverage/',
    ],
    testMatch: ['**/*.test.(ts|tsx)'],
    testResultsProcessor: 'jest-sonar-reporter',
    reporters: ['default', ['jest-junit', {outputName: 'junit-test-report.xml'}]],
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
