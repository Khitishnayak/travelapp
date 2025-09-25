// Navigation types for the app
export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  TrackTrip: undefined;
  LogTrip: undefined;
  More: undefined;
  Calendar: undefined;
};

// Common interfaces for the app
export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

// Component prop types
export interface NavigationProps {
  navigation: any; // Will be properly typed when used with NavigationProp
}