const path = require('path');

module.exports = {
  testMatch: ['**/(*.)unit.js'],
  moduleNameMapper: {
    '^@constants/(.*)': '<rootDir>/constants/$1',
    '^@errors/(.*)': '<rootDir>/src/errors.js',
    '^@methods/(.*)': '<rootDir>/methods/$1',
  },
};
