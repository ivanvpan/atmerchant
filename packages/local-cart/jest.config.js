/** @type {import('jest').Config} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: {
        paths: {
          '#/*': ['./src/*']
        }
      }
    }]
  },
  moduleNameMapper: {
    '^#/(.*)$': '<rootDir>/src/$1'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['**/*.test.ts', '**/*.spec.ts'],
  setupFiles: ['<rootDir>/src/jestSetup.ts'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transformIgnorePatterns: [
    'node_modules/(?!(@atproto|@automerge)/)'
  ]
} 