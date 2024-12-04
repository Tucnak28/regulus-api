/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // Strip ".js" from imports
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/']
};

export default config;
