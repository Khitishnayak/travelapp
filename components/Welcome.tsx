import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type WelcomeScreenNavigationProp = NativeStackNavigationProp<{
  Login: undefined;
  Signup: undefined;
}>;

interface WelcomeScreenProps {
  navigation: WelcomeScreenNavigationProp;
}

export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>Feel your journey</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#a3e4fbff", // Match app theme
    padding: 20
  },
  title: { 
    fontSize: 32, 
    fontWeight: "bold", 
    marginBottom: 10,
    color: "#3e636bff" // Match app theme
  },
  subtitle: { 
    fontSize: 18, 
    marginBottom: 40,
    color: "#555"
  },
  button: { 
    backgroundColor: "#3e636bff", // Match app theme
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  buttonText: { 
    color: "#fff", 
    fontWeight: "bold",
    fontSize: 16
  },
});