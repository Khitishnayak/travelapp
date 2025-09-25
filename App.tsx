import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { enableScreens } from "react-native-screens";
import { View, Text, TouchableOpacity } from "react-native";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TrackTrip from "./components/TrackTrip";
import LogTrip from "./components/LogTrip";
import More from "./components/more/More";
import Cal from "./components/Cal";

enableScreens();

import { RootStackParamList } from './types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

import { StyleSheet } from "react-native";

const errorBoundaryStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  errorText: {
    fontSize: 18,
    marginBottom: 10,
  },
  retryButton: {
    padding: 10,
    backgroundColor: '#3e636bff',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={errorBoundaryStyles.container}>
          <Text style={errorBoundaryStyles.errorText}>Something went wrong</Text>
          <TouchableOpacity
            style={errorBoundaryStyles.retryButton}
            onPress={() => this.setState({ hasError: false })}
          >
            <Text style={errorBoundaryStyles.buttonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <NavigationContainer>
        <Stack.Navigator 
        initialRouteName="Welcome"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#3e636bff",
          },
          headerTintColor: "#fff",      
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
        }}
      >
        <Stack.Screen 
          name="Welcome" 
          component={Welcome} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Signup" 
          component={Signup} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="TrackTrip" 
          component={TrackTrip} 
          options={{ title: "Track Trip" }} 
        />
        <Stack.Screen 
          name="LogTrip" 
          component={LogTrip} 
          options={{ title: "Log Trip" }} 
        />
        <Stack.Screen 
          name="More" 
          component={More} 
        />
        <Stack.Screen 
          name="Calendar" 
          component={Cal} 
        />
      </Stack.Navigator>
    </NavigationContainer>
    </ErrorBoundary>
  );
}
