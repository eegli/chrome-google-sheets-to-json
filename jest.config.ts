// jest.config.ts
import type { InitialOptionsTsJest } from 'ts-jest/dist/types';
import { defaults as tsjPreset } from 'ts-jest/presets';
// import { defaultsESM as tsjPreset } from 'ts-jest/presets'
// import { jsWithTs as tsjPreset } from 'ts-jest/presets'
// import { jsWithTsESM as tsjPreset } from 'ts-jest/presets'
// import { jsWithBabel as tsjPreset } from 'ts-jest/presets'
// import { jsWithBabelESM as tsjPreset } from 'ts-jest/presets'

const config: InitialOptionsTsJest = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  roots: ['<rootDir>/test/'],
  transform: {
    ...tsjPreset.transform
    // [...]
  }
};

export default config;
