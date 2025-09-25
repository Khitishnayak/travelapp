import Geolocation from '@react-native-community/geolocation';
import { Location, TripData } from '../types/trip';
import { Platform, PermissionsAndroid } from 'react-native';

class TripTracker {
  private static instance: TripTracker;
  private isTracking: boolean = false;
  private watchId: number | null = null;
  private currentTrip: Partial<TripData> | null = null;
  private locationHistory: Location[] = [];
  private lastLocation: Location | null = null;

  private constructor() {}

  static getInstance(): TripTracker {
    if (!TripTracker.instance) {
      TripTracker.instance = new TripTracker();
    }
    return TripTracker.instance;
  }

  async requestLocationPermission(): Promise<boolean> {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
      return true;
    }

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "Travelwise needs access to your location to track your trips.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  async startTracking(): Promise<boolean> {
    if (this.isTracking) return false;

    try {
      const hasPermission = await this.requestLocationPermission();
      if (!hasPermission) {
        throw new Error('Location permission denied');
      }

      this.isTracking = true;
      this.locationHistory = [];
      
      this.watchId = Geolocation.watchPosition(
        (position) => {
          // Validate location accuracy
          if (position.coords.accuracy && position.coords.accuracy > 100) {
            console.warn('Low accuracy location data received');
            return;
          }

          const location: Location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp,
          };
          
          this.handleLocationUpdate(location);
        },
        (error) => {
          console.error('Location tracking error:', error);
          this.clearWatch();
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 10, // minimum distance (meters) between updates
          interval: 5000, // minimum time (ms) between updates
          timeout: 30000, // timeout after 30 seconds
          maximumAge: 10000, // Accept locations up to 10 seconds old
        }
      );

      return true;
    } catch (error) {
      console.error('Failed to start tracking:', error);
      this.isTracking = false;
      this.clearWatch();
      return false;
    }

    return true;
  }

  private clearWatch(): void {
    if (this.watchId !== null) {
      Geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
  }

  stopTracking(): void {
    this.clearWatch();
    this.isTracking = false;
  }

  private handleLocationUpdate(location: Location): void {
    if (!this.currentTrip) {
      this.currentTrip = {
        origin: {
          time: new Date(),
          location: location,
        },
        autoCapture: true,
        createdAt: new Date(),
      };
    }

    this.locationHistory.push(location);
    this.lastLocation = location;
    this.updateTripDistance();
  }

  private updateTripDistance(): void {
    if (!this.currentTrip || this.locationHistory.length < 2) return;

    let totalDistance = 0;
    for (let i = 1; i < this.locationHistory.length; i++) {
      totalDistance += this.calculateDistance(
        this.locationHistory[i-1],
        this.locationHistory[i]
      );
    }

    this.currentTrip.distance = Math.round(totalDistance * 100) / 100;
  }

  private calculateDistance(start: Location, end: Location): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.deg2rad(end.latitude - start.latitude);
    const dLon = this.deg2rad(end.longitude - start.longitude);
    const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(start.latitude)) * Math.cos(this.deg2rad(end.latitude)) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI/180);
  }

  getCurrentTrip(): Partial<TripData> | null {
    if (!this.currentTrip || !this.lastLocation) return null;

    return {
      ...this.currentTrip,
      destination: {
        time: new Date(),
        location: this.lastLocation,
      },
      updatedAt: new Date(),
    };
  }

  clearCurrentTrip(): void {
    this.currentTrip = null;
    this.locationHistory = [];
    this.lastLocation = null;
  }
}

export default TripTracker;