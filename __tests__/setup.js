jest.mock('@react-native-community/geolocation', () => ({
  setRNConfiguration: jest.fn(),
  requestAuthorization: jest.fn(),
  getCurrentPosition: jest.fn((success) => success({ coords: { latitude: 0, longitude: 0 } })),
  watchPosition: jest.fn(() => 1),
  clearWatch: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('@notifee/react-native', () => ({
  displayNotification: jest.fn(),
  requestPermission: jest.fn(() => Promise.resolve({ authorizationStatus: 1 })),
  createChannel: jest.fn(() => Promise.resolve('default')),
}));
