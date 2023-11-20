module.exports = {
  testEnvironment: 'jest-environment-node',
  roots: ['./app'],
  preset: 'ts-jest',
  testMatch: [
    '**/__tests__/**/*.[jt]s',
    '**/?(*.)+(spec|test).[jt]s'
  ],
};