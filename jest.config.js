module.exports = {
  testEnvironment: 'jest-environment-node',
  roots: ['./src'],
  preset: 'ts-jest',
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)'
  ]
};