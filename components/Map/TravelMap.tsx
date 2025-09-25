import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, View, Platform, PermissionsAndroid, Alert, Linking } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Region } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { DEFAULT_SETTINGS } from '../../config';

interface Location {
  latitude: number;
  longitude: number;
  latitudeDelta?: number;
  longitudeDelta?: number;
}

interface TravelMapProps {
  onLocationChange?: (location: Location) => void;
  showRoutes?: boolean;
  showTraffic?: boolean;
  initialRegion?: Region;
}

export const TravelMap: React.FC<TravelMapProps> = ({
  onLocationChange,
  showRoutes = false,
  showTraffic = false,
  initialRegion,
}) => {
  const mapRef = useRef<MapView | null>(null);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'ios') {
        const granted = await Geolocation.requestAuthorization('whenInUse');
        return granted === 'granted';
      }

      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This app needs to access your location for trip tracking',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      return false;
    } catch (err) {
      console.warn('Error requesting location permission:', err);
      return false;
    }
  };

  const checkLocationServices = useCallback(async () => {
    try {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        Alert.alert(
          'Location Permission Required',
          'Please enable location permissions in settings to use the map features.',
          [
            { text: 'Open Settings', onPress: () => Linking.openSettings() },
            { text: 'Cancel', style: 'cancel' }
          ]
        );
        return false;
      }
      return true;
    } catch (err) {
      console.error('Error checking location services:', err);
      return false;
    }
  }, []);

  const startLocationTracking = useCallback(async () => {
    const hasPermission = await checkLocationServices();
    if (!hasPermission) {
      return;
    }

    try {
      // Get initial location
      Geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          };
          setCurrentLocation(location);
          onLocationChange?.(location);
          mapRef.current?.animateToRegion(location);
        },
        (error) => {
          console.error('Error getting current location:', error);
          Alert.alert('Error', 'Could not get your current location');
        },
        {
          enableHighAccuracy: true,
          timeout: DEFAULT_SETTINGS.location.timeout,
          maximumAge: DEFAULT_SETTINGS.location.maxAge,
        }
      );

      // Start watching location
      const id = Geolocation.watchPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setCurrentLocation(location);
          onLocationChange?.(location);
        },
        (error) => {
          console.error('Error watching location:', error);
        },
        {
          enableHighAccuracy: true,
          distanceFilter: DEFAULT_SETTINGS.location.distanceFilter,
          interval: DEFAULT_SETTINGS.location.updateInterval,
          fastestInterval: Math.min(DEFAULT_SETTINGS.location.updateInterval / 2, 2000),
        }
      );
      setWatchId(id);
    } catch (error) {
      console.error('Error in location tracking:', error);
      Alert.alert('Error', 'Failed to start location tracking');
    }
  }, [checkLocationServices, onLocationChange]);

  useEffect(() => {
    startLocationTracking();
    
    // Cleanup function
    const cleanup = () => {
      if (watchId !== null) {
        Geolocation.clearWatch(watchId);
      }
    };

    return cleanup;
  }, [startLocationTracking, watchId]);

  useEffect(() => {
    if (showRoutes) {
      // Placeholder for routes API integration
      // Will be implemented when backend provides the routing service
      console.log('Routes feature is prepared for integration');
    }
  }, [showRoutes]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion || {
          latitude: 8.5241,  // Default to Kerala's coordinates
          longitude: 76.9366,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        showsTraffic={showTraffic}
        showsBuildings={true}
        showsIndoors={true}
      >
        {currentLocation && (
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            title="Current Location"
            description="You are here"
          />
        )}
      </MapView>
    </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
});