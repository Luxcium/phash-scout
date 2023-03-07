/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: false,
  maxConcurrency: 10,
  maxWorkers: '75%',
  detectLeaks: true,
  transform: {
    '^.+\\.(ts|tsx)?$': [
      'ts-jest',
      {
        diagnostics: true,
      },
    ],
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  testEnvironment: 'node',
  testMatch: [
    '**/tests/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
    '!**/out/**/*.*',
    '!*.d.ts',
  ],
  // testRegex: 'src/utils.*/tests/.*\\.(test)?\\.(ts|tsx|js)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: false,
  collectCoverageFrom: [
    './src/services/**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/out/**',
  ],
  coverageDirectory: './coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
};

/*
{
  "coverageDirectory": "./dist/coverage",
  "verbose": true,
  "transform": {
    "^.+\\.(ts|tsx)?$": [
      "ts-jest",
      {
        "diagnostics": true
      }
    ],
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  "testEnvironment": "node",
  "moduleFileExtensions": [
    "js",
    "json",
    "jsx",
    "ts",
    "tsx",
    "node"
  ],
  "rootDir": "./src",
  "testMatch": [
    "** /?(*.)+(spec|test).[jt]s?(x)"
  ],
  "testPathIgnorePatterns": [
    "./out"
  ],
  "collectCoverage": false,
  "coverageThreshold": {
    "global": {
      "statements": 90,
      "branches": 90,
      "functions": 90,
      "lines": 90
    }
  }
}

*/
