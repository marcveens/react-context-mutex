module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  testEnvironment: 'jsdom',
  setupFiles: ['./src/setupTests.ts']
};