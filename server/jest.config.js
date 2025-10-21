/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: 'src',
  moduleFileExtensions: ['ts', 'js', 'json'],
  testRegex: '.*\\.test\\.ts$',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  verbose: true,
  clearMocks: true,
};
