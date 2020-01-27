module.exports = {
    roots: [`<rootDir>.`],
    transform: {
        '^.+.ts.?$': 'ts-jest'
    },
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/coverage/',
        '<rootDir>/templates/'
    ],
    testResultsProcessor: 'jest-sonar-reporter',
    coverageReporters: ['lcov'],
    collectCoverage: true,
    collectCoverageFrom: [
        '**/*.{ts,tsx}',
        '!**/*config.{js,json}',
        '!**/coverage/**',
        '!**/templates/**',
        '!**/coverage/**',
        '!**/node_modules/**'
    ],
    coverageDirectory: '<rootDir>./coverage/',
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
