// Configuration for the app's API and services

export const API_CONFIG = {
  // Development endpoint (replace with actual endpoint in production)
  baseUrl: __DEV__ ? 'http://localhost:3000' : 'https://api.natpac.kerala.gov.in',
  
  // API version
  version: 'v1',
  
  // API endpoints
  endpoints: {
    trips: '/trips',
    users: '/users',
    stats: '/stats',
    achievements: '/achievements',
  },
  
  // API request timeouts (in milliseconds)
  timeouts: {
    default: 5000,
    upload: 30000,
    download: 30000,
  },
};

// Authentication configuration
export const AUTH_CONFIG = {
  // Storage keys
  storageKeys: {
    token: '@travelwise:auth_token',
    user: '@travelwise:user',
    settings: '@travelwise:settings',
  },
  
  // Token refresh settings
  tokenRefresh: {
    // Refresh token 5 minutes before expiry
    refreshBeforeExpiry: 5 * 60 * 1000,
  },
};

// App feature flags
export const FEATURES = {
  enableOfflineMode: true,
  enableBackgroundTracking: true,
  enableAchievements: true,
  enableSocialFeatures: false, // Coming soon
};

// Default app settings
export const DEFAULT_SETTINGS = {
  // Location tracking settings
  location: {
    enabled: true,
    updateInterval: 5000, // 5 seconds
    distanceFilter: 10, // 10 meters
    minAccuracy: 100, // meters
    maxAge: 10000, // 10 seconds
    timeout: 15000, // 15 seconds
  },
  
  // Notification settings
  notifications: {
    enabled: true,
    channelId: 'trip_tracking',
    channelName: 'Trip Tracking',
    lights: true,
    sound: true,
    vibrate: true,
    reminderInterval: 30 * 60 * 1000, // 30 minutes
  },
  
  // Data sync settings
  sync: {
    autoSync: true,
    syncInterval: 15 * 60 * 1000, // 15 minutes
    syncOnWifiOnly: false,
  },
};