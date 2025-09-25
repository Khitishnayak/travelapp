import { ImageSourcePropType } from 'react-native';

// Icons
export const ICONS = {
  distance: require('../assets/icons/distance1.png'),
  timer: require('../assets/icons/timer.png'),
  destination: require('../assets/icons/destination1.png'),
  home: require('../assets/icons/home.png'),
  profile: require('../assets/icons/profile.png'),
  calendar: require('../assets/icons/cal.png'),
  favorite: {
    filled: require('../assets/icons/fav.png'),
    outline: require('../assets/icons/favnotfill.png'),
  },
  steps: require('../assets/icons/steps1.png'),
  location: require('../assets/icons/location.png'),
};

// Achievement Icons
export const ACHIEVEMENT_ICONS = {
  explorer: require('../assets/achievement/expo.png'),
  firstStep: require('../assets/achievement/firststep.jpg'),
  adventurer: require('../assets/achievement/adven.png'),
  cyclist: require('../assets/achievement/cycling.png'),
  trophy: require('../assets/achievement/trophy.png'),
  // Add milestone images when available
  milestones: {
    km10: null, // To be added
    km50: null, // To be added
    km100: null, // To be added
  },
};

// Destination Images
export const DESTINATION_IMAGES: { [key: string]: ImageSourcePropType } = {
  alleppeyBackwaters: require('../assets/destinations/KBoat.jpg'),
  munnarHills: require('../assets/destinations/Munnar_hills.jpg'),
  jatayuPark: require('../assets/destinations/jatayu_park.jpg'),
  kochiFort: require('../assets/destinations/Kochi_Fort.jpg'),
  kovalamBeach: require('../assets/destinations/kovalam.jpg'),
  kumarakom: require('../assets/destinations/kumarakom.jpg'),
  padmanabhaSwamiTemple: require('../assets/destinations/Sree-Padmanabhaswamy-Temple.jpg'),
  thekkady: require('../assets/destinations/Thekkady.jpg'),
  vagamon: require('../assets/destinations/vagamon.jpg'),
  varkala: require('../assets/destinations/varkala.jpg'),
  wayanad: require('../assets/destinations/wayanad.jpg'),
};