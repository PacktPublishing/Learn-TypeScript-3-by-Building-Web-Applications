module.exports = {
  verbose: false,
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: false,
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue',
    'ts',
    'tsx'
  ],
  roots: [
    "<rootDir>/src"
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',

  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  snapshotSerializers: [
    'jest-serializer-vue'
  ],
  testMatch: [
    '<rootDir>/(src/**/*.spec.(ts|tsx)|**/__tests__/*.(ts|tsx))',
    '<rootDir>/(tests/**/*.spec.(ts|tsx)|**/__tests__/*.(ts|tsx))',
  ],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  testURL: 'http://localhost/',
  setupFiles: [
    './src/polyfills.ts'
  ],
  globals: {
    'ts-jest': {
      // reference: https://kulshekhar.github.io/ts-jest/user/config/
      //babelConfig: true,
    },
    NODE_ENV: 'test',
  },
};
