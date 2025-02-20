/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  testMatch: [
    "**/api/**/*.test.ts",
  ],

};

export default config;
