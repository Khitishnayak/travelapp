import { TripData, TripMetadata } from '../types/trip';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  TRIPS: '@travelwise:trips',
  METADATA: '@travelwise:metadata',
  USER: '@travelwise:user',
};

import { API_CONFIG, DEFAULT_SETTINGS } from '../config';

const API_ENDPOINT = API_CONFIG.baseUrl;

export class TripStorage {
  private static instance: TripStorage;
  private metadata: TripMetadata | null = null;

  private constructor() {}

  static getInstance(): TripStorage {
    if (!TripStorage.instance) {
      TripStorage.instance = new TripStorage();
    }
    return TripStorage.instance;
  }

  async initializeMetadata(): Promise<void> {
    try {
      const storedMetadata = await AsyncStorage.getItem(STORAGE_KEYS.METADATA);
      if (storedMetadata) {
        this.metadata = JSON.parse(storedMetadata);
      } else {
        this.metadata = {
          lastTripNumber: 0,
          totalTrips: 0,
          totalDistance: 0,
          favoriteModes: {
            walk: 0,
            bicycle: 0,
            car: 0,
            bus: 0,
            train: 0,
            other: 0,
          },
          commonDestinations: [],
        };
        await this.saveMetadata();
      }
    } catch (error) {
      console.error('Error initializing metadata:', error);
    }
  }

  private async saveMetadata(): Promise<void> {
    if (this.metadata) {
      await AsyncStorage.setItem(
        STORAGE_KEYS.METADATA,
        JSON.stringify(this.metadata)
      );
    }
  }

  async saveTrip(trip: TripData): Promise<boolean> {
    try {
      // Save locally first
      const trips = await this.getTrips();
      trips.push(trip);
      await AsyncStorage.setItem(STORAGE_KEYS.TRIPS, JSON.stringify(trips));

      // Update metadata
      if (this.metadata) {
        this.metadata.lastTripNumber = trip.tripNumber;
        this.metadata.totalTrips += 1;
        this.metadata.totalDistance += trip.distance;
        this.metadata.favoriteModes[trip.mode] += 1;
        await this.saveMetadata();
      }

      // Sync with server
      await this.syncWithServer(trip);

      return true;
    } catch (error) {
      console.error('Error saving trip:', error);
      return false;
    }
  }

  async getTrips(): Promise<TripData[]> {
    try {
      const tripsJson = await AsyncStorage.getItem(STORAGE_KEYS.TRIPS);
      return tripsJson ? JSON.parse(tripsJson) : [];
    } catch (error) {
      console.error('Error getting trips:', error);
      return [];
    }
  }

  async getNextTripNumber(): Promise<number> {
    if (!this.metadata) {
      await this.initializeMetadata();
    }
    return (this.metadata?.lastTripNumber || 0) + 1;
  }

  private async syncWithServer(trip: TripData): Promise<void> {
    try {
      const response = await fetch(`${API_ENDPOINT}/trips`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authentication headers here
        },
        body: JSON.stringify(trip),
      });

      if (!response.ok) {
        throw new Error('Failed to sync trip with server');
      }
    } catch (error) {
      // Store failed syncs for retry
      console.error('Error syncing with server:', error);
    }
  }

  async getMetadata(): Promise<TripMetadata | null> {
    if (!this.metadata) {
      await this.initializeMetadata();
    }
    return this.metadata;
  }
}

export default TripStorage;