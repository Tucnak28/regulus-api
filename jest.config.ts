import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest', // Use ts-jest for TypeScript support
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js'],
  transformIgnorePatterns: ['node_modules/(?!(module-to-transform)/)'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};

export default config;
