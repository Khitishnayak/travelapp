import React, { useState, useEffect,  } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import TripTracker from "../services/TripTracker";
import TripStorage from "../services/TripStorage";
import NotificationService from "../services/NotificationService";
import { TripData, TravelMode, TripPurpose, TripFrequency } from "../types/trip";
import { styles } from "../styles/logTrip.styles";

type LogTripScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'LogTrip'>;

export default function LogTrip() {
  const navigation = useNavigation<LogTripScreenNavigationProp>();
  const [isTracking, setIsTracking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tripData, setTripData] = useState<Partial<TripData>>({});
  const [companions, setCompanions] = useState('0');
  const [cost, setCost] = useState('0');
  const [selectedMode, setSelectedMode] = useState<TravelMode>('walk');
  const [selectedPurpose, setSelectedPurpose] = useState<TripPurpose>('other');
  const [selectedFrequency, setSelectedFrequency] = useState<TripFrequency>('one-time');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [inputErrors, setInputErrors] = useState<{
    companions?: string;
    cost?: string;
  }>({});

  const tripTracker = TripTracker.getInstance();
  const tripStorage = TripStorage.getInstance();
  const notificationService = NotificationService.getInstance();

  useEffect(() => {
    const handleBackPress = () => {
      if (hasUnsavedChanges) {
        Alert.alert(
          'Unsaved Changes',
          'You have unsaved changes. Are you sure you want to leave?',
          [
            { text: 'Stay', style: 'cancel', onPress: () => {} },
            {
              text: 'Leave',
              style: 'destructive',
              onPress: () => {
                setHasUnsavedChanges(false);
                navigation.goBack();
              },
            },
          ],
        );
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => backHandler.remove();
  }, [navigation, hasUnsavedChanges]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isTracking) {
        const currentTrip = tripTracker.getCurrentTrip();
        if (currentTrip) {
          setTripData(currentTrip);
          setHasUnsavedChanges(true);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      if (isTracking) {
        tripTracker.stopTracking();
        notificationService.cancelAllNotifications();
      }
    };
  }, [isTracking, tripTracker, notificationService]);

  const handleStartTracking = async () => {
    try {
      setIsLoading(true);
      const started = await tripTracker.startTracking();
      if (started) {
        setIsTracking(true);
        const nextTripNumber = await tripStorage.getNextTripNumber();
        setTripData(prev => ({ ...prev, tripNumber: nextTripNumber }));
        await notificationService.showTripStartedNotification();
      } else {
        Alert.alert('Error', 'Failed to start trip tracking. Please check location permissions.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while starting trip tracking.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStopTracking = async () => {
    try {
      tripTracker.stopTracking();
      setIsTracking(false);
      
      const currentTrip = tripTracker.getCurrentTrip();
      if (currentTrip) {
        setTripData(currentTrip);
        setHasUnsavedChanges(true);
        await notificationService.showTripEndedNotification(currentTrip);
        await notificationService.scheduleIncompleteTripReminder();
      }
    } catch (error) {
      console.error('Failed to stop tracking:', error);
      Alert.alert('Error', 'Failed to stop tracking. Please try again.');
    }
  };

  const validateInputs = () => {
    const errors: { companions?: string; cost?: string } = {};
    
    if (isNaN(parseInt(companions, 10)) || parseInt(companions, 10) < 0) {
      errors.companions = 'Please enter a valid number of companions';
    }
    if (isNaN(parseFloat(cost)) || parseFloat(cost) < 0) {
      errors.cost = 'Please enter a valid cost';
    }
    
    setInputErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const checkMissingFields = () => {
    const missingFields: string[] = [];

    if (!tripData.origin) missingFields.push('Origin');
    if (!tripData.destination) missingFields.push('Destination');
    if (!tripData.distance) missingFields.push('Distance');
    if (!selectedMode) missingFields.push('Travel Mode');
    if (!selectedPurpose) missingFields.push('Trip Purpose');
    if (!selectedFrequency) missingFields.push('Trip Frequency');
    if (!companions || companions === '0') missingFields.push('Number of Companions');
    if (!cost || cost === '0') missingFields.push('Trip Cost');

    return missingFields;
  };

  const handleSaveTrip = async () => {
    const missingFields = checkMissingFields();
    
    if (!validateInputs()) {
      Alert.alert('Invalid Input', 'Please correct the errors in the form.');
      return;
    }

    if (missingFields.length > 0) {
      await notificationService.showMissingDetailsPrompt(missingFields);
      Alert.alert('Missing Information', `Please provide: ${missingFields.join(', ')}`);
      return;
    }

    try {
      setIsLoading(true);
      const completeTrip: TripData = {
        ...tripData as TripData,
        mode: selectedMode,
        purpose: selectedPurpose,
        frequency: selectedFrequency,
        companions: parseInt(companions, 10),
        cost: parseFloat(cost),
        isCompleted: true,
        userId: 'user123', // Replace with actual user ID
      };

      const saved = await tripStorage.saveTrip(completeTrip);
      if (saved) {
        await notificationService.cancelAllNotifications();
        setHasUnsavedChanges(false);
        Alert.alert('Success', 'Trip saved successfully');
        navigation.goBack();
      } else {
        throw new Error('Failed to save trip');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save trip');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={[styles.container, styles.loadingContainer]}>
          <ActivityIndicator size="large" color="#3e636bff" />
          <Text style={styles.loadingText}>
            {isTracking ? 'Tracking your trip...' : 'Saving trip data...'}
          </Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Log Your Trip</Text>
            {isTracking && tripData.distance && (
              <Text style={styles.distance}>{tripData.distance.toFixed(2)} km</Text>
            )}
          </View>

          <View style={styles.trackingContainer}>
            <TouchableOpacity
              style={[styles.button, isTracking ? styles.stopButton : styles.startButton]}
              onPress={isTracking ? handleStopTracking : handleStartTracking}
            >
              <Text style={styles.buttonText}>
                {isTracking ? 'Stop Tracking' : 'Start Tracking'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>Travel Mode</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.modesContainer}>
              {(['walk', 'bicycle', 'car', 'bus', 'train', 'other'] as TravelMode[]).map((mode) => (
                <TouchableOpacity
                  key={mode}
                  style={[styles.modeButton, selectedMode === mode && styles.selectedMode]}
                  onPress={() => setSelectedMode(mode)}
                >
                  <Text style={[styles.modeText, selectedMode === mode && styles.selectedModeText]}>
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.sectionTitle}>Trip Purpose</Text>
            <View style={styles.purposeContainer}>
              {(['work', 'education', 'shopping', 'leisure', 'medical', 'other'] as TripPurpose[]).map((purpose) => (
                <TouchableOpacity
                  key={purpose}
                  style={[styles.purposeButton, selectedPurpose === purpose && styles.selectedPurpose]}
                  onPress={() => setSelectedPurpose(purpose)}
                >
                  <Text style={[styles.purposeText, selectedPurpose === purpose && styles.selectedPurposeText]}>
                    {purpose.charAt(0).toUpperCase() + purpose.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Number of Companions</Text>
              <TextInput
                style={[styles.input, inputErrors.companions && styles.inputError]}
                value={companions}
                onChangeText={(text) => {
                  setCompanions(text);
                  setInputErrors(prev => ({ ...prev, companions: undefined }));
                }}
                keyboardType="numeric"
                placeholder="0"
              />
              {inputErrors.companions && (
                <Text style={styles.errorText}>{inputErrors.companions}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Trip Cost (₹)</Text>
              <TextInput
                style={[styles.input, inputErrors.cost && styles.inputError]}
                value={cost}
                onChangeText={(text) => {
                  setCost(text);
                  setInputErrors(prev => ({ ...prev, cost: undefined }));
                }}
                keyboardType="numeric"
                placeholder="0"
              />
              {inputErrors.cost && (
                <Text style={styles.errorText}>{inputErrors.cost}</Text>
              )}
            </View>

            <Text style={styles.sectionTitle}>Trip Frequency</Text>
            <View style={styles.frequencyContainer}>
              {(['daily', 'weekly', 'monthly', 'occasionally', 'one-time'] as TripFrequency[]).map((freq) => (
                <TouchableOpacity
                  key={freq}
                  style={[styles.frequencyButton, selectedFrequency === freq && styles.selectedFrequency]}
                  onPress={() => setSelectedFrequency(freq)}
                >
                  <Text style={[styles.frequencyText, selectedFrequency === freq && styles.selectedFrequencyText]}>
                    {freq.charAt(0).toUpperCase() + freq.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={handleSaveTrip}
          >
            <Text style={styles.buttonText}>Save Trip</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}