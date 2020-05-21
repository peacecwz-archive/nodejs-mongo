module.exports = {
    coverageDirectory: 'coverage',
    coverageThreshold: {
        global: {
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
    collectCoverageFrom: [
        "**/src/**/*.(ts)"
    ],
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.json',
        },
    },
    moduleFileExtensions: [
        'js',
        'ts',
        'tsx',
    ],
    testEnvironment: 'jsdom',
    testMatch: [
        '**/tests/**/*.+(ts)',
    ],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    preset: 'ts-jest',
};
