module.exports = {
  testEnvironment: 'jest-environment-node',
  roots: ['./src'],
  preset: 'ts-jest',
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test|int-test).[jt]s?(x)'
  ]
};