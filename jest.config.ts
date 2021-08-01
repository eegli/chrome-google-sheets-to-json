import type { InitialOptionsTsJest } from 'ts-jest/dist/types';
import { defaults as tsjPreset } from 'ts-jest/presets';

const config: InitialOptionsTsJest = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  testMatch: ['test/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  collectCoverageFrom: ['src/**'],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  transform: {
    ...tsjPreset.transform
  }
};

export default config;
