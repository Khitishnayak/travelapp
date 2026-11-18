module.exports = {
  preset: 'react-native',
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|@react-navigation)',
  ],
  setupFiles: ['./__tests__/setup.js'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__tests__/__mocks/fileMock.js',
  },
};
