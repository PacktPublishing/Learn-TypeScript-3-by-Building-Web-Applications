module.exports = {
    verbose: false,
    roots: [
        "<rootDir>/src"
    ],
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: false,
    globals: {
        'ts-jest': {
            // reference: https://kulshekhar.github.io/ts-jest/user/config/
        }
    },
    setupFiles: [
        './src/jest.setup.ts'
    ]
};
