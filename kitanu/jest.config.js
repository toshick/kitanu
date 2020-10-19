process.env.NODE_ENV = 'test';

module.exports = {
  // automock: true,
  setupFilesAfterEnv: ['<rootDir>/test/setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js',
  },
  moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
    'node_modules/camaleao-design/.+\\.(j|t)sx?$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!camaleao-design/.*)'],
};
