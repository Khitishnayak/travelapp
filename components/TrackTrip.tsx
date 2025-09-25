import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, ScrollView, Image, ImageSourcePropType, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { colors, spacing, typography } from '../styles/common';
import Achiev from "./Achiev";

type TrackTripScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TrackTrip'>;

interface TrackTripProps {
  navigation: TrackTripScreenNavigationProp;
}

interface StatBoxProps {
  icon: ImageSourcePropType;
  title: string;
  value: string;
}

const StatBox: React.FC<StatBoxProps> = ({ icon, title, value }) => (
  <View style={styles.boxHeader}>
    <Image source={icon} style={styles.img} resizeMode="contain" />
    <View style={styles.text1}>
      <Text style={styles.statText}>{title}</Text>
      <Text style={styles.valueText}>{value}</Text>
    </View>
  </View>
);

export default function TrackTrip({ navigation }: TrackTripProps) {
  const handleLogTrip = () => {
    navigation.navigate('LogTrip');
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.container1}>
            <StatBox
              icon={require('../assets/distance1.png')}
              title="Total Distance"
              value="0.0 KM"
            />
            <StatBox
              icon={require('../assets/timer.png')}
              title="Total Time"
              value="0.0 HRS"
            />
            <StatBox
              icon={require('../assets/destination1.png')}
              title="Current Destination"
              value="xyz"
            />
          </View>
        </ScrollView>
        <ScrollView>
          <View style={styles.container2}>
            <Text style={styles.sectionTitle}>Recent Trips</Text>
            <Text style={styles.sectionSubtitle}>Log your journey</Text>
            <TouchableOpacity style={styles.noTripsContainer} onPress={handleLogTrip}>
              <Image
                source={require('../assets/steps.jpg')}
                style={styles.tripImage}
              />
              <Text style={styles.noTripsText}>No recent trips logged</Text>
              <Text style={styles.tapToLogText}>Tap to log a new trip</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.container3}>
          <View style={styles.achievementsHeader}>
            <Image 
              source={require('../assets/achievement/trophy.png')}
              style={styles.trophyIcon}
            />
            <Text style={styles.achievementTitle}>Your Achievements</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.boxLower}>
              <Text style={styles.achievementTitle}>Streak</Text>
            </View>
            <Achiev />
          </ScrollView>
        </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background
    },
    container1: {
        marginTop: spacing.xl,
        marginHorizontal: spacing.lg,
        marginVertical: spacing.lg,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: spacing.md,
        height: 120,
    },
    boxHeader: {
        backgroundColor: "white",
        height: 100,
        width: 250,
        borderRadius: 10,
        flexDirection: "row",
        padding: 10,
        alignItems: "center"
    },
    img: {
        width: 80,
        height: 80,
        borderRadius: 50
    },
    text1: {
        marginLeft: 15,
        gap: 5
    },
    statText: {
        fontSize: 16,
        color: "gray"
    },
    valueText: {
        fontSize: 24,
        fontWeight: "500"
    },
    container2: {
        marginHorizontal: 20,
        backgroundColor: "#e6e8eaff",
        borderRadius: 7,
        padding: 10,
        height: 500,
    },
    container3: {
        marginTop: 20,
        marginHorizontal: 20,
        marginVertical: 20,
        gap: 10,
        backgroundColor: "#e6e8eaff",
        height: 190,
        width: 370,
        borderRadius: 7,
    },
    boxLower: {
        backgroundColor: "white",
        height: 100,
        width: 100,
        marginLeft: 20,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 27
    },
    sectionSubtitle: {
        marginLeft: 27
    },
    noTripsContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50
    },
    tripImage: {
        width: 90,
        height: 80,
        marginTop: 20,
        borderRadius: 50
    },
    noTripsText: {
        ...typography.body,
        textAlign: "center",
        marginTop: spacing.lg,
        color: colors.textLight
    },
    tapToLogText: {
        ...typography.body,
        color: colors.primary,
        marginTop: spacing.sm
    },
    achievementsHeader: {
        margin: 15,
        gap: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    trophyIcon: {
        width: 30,
        height: 40
    },
    achievementTitle: {
        fontSize: 20,
        fontWeight: "bold"
    }
})