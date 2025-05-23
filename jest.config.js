/** @type {import('jest').Config} */
module.exports = {
  projects: [
    '<rootDir>/apps/frontend',
    '<rootDir>/apps/mock-backend',
    '<rootDir>/packages/shared',
    '<rootDir>/packages/ui-components',
  ],
  collectCoverageFrom: [
    'apps/*/src/**/*.{ts,tsx}',
    'packages/*/src/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/.next/**',
  ],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  testMatch: [
    '<rootDir>/apps/*/src/**/__tests__/**/*.{ts,tsx}',
    '<rootDir>/apps/*/src/**/*.{test,spec}.{ts,tsx}',
    '<rootDir>/packages/*/src/**/__tests__/**/*.{ts,tsx}',
    '<rootDir>/packages/*/src/**/*.{test,spec}.{ts,tsx}',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/coverage/',
  ],
};
