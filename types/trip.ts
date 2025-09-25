export type TravelMode = 'walk' | 'bicycle' | 'car' | 'bus' | 'train' | 'other';

export type TripPurpose = 
  | 'work' 
  | 'education' 
  | 'shopping' 
  | 'leisure' 
  | 'medical' 
  | 'other';

export type TripFrequency = 
  | 'daily' 
  | 'weekly' 
  | 'monthly' 
  | 'occasionally' 
  | 'one-time';

export interface Location {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp?: number;
  address?: string;
  name?: string;
}

export interface TripTimeStamp {
  time: Date;
  location: Location;
}

export interface TripData {
  id: string;
  tripNumber: number;
  origin: TripTimeStamp;
  destination: TripTimeStamp;
  mode: TravelMode;
  distance: number; // in kilometers
  purpose: TripPurpose;
  companions: number;
  frequency: TripFrequency;
  cost: number;
  userId: string;
  isCompleted: boolean;
  autoCapture: boolean; // whether the trip was auto-captured
  createdAt: Date;
  updatedAt: Date;
}

export interface TripMetadata {
  lastTripNumber: number;
  totalTrips: number;
  totalDistance: number;
  favoriteModes: Record<TravelMode, number>;
  commonDestinations: Location[];
}