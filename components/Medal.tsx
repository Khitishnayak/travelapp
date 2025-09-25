import { ImageSourcePropType } from "react-native";
import { ACHIEVEMENT_ICONS } from "../constants/assets";

export interface Medal {
  id: number;
  name: string;
  image: ImageSourcePropType;
  achieved: boolean;
}

export const MedalData: Medal[] = [
  {
    id: 1,
    name: "Explorer",
    image: ACHIEVEMENT_ICONS.explorer,
    achieved: true,
  },
  {
    id: 2,
    name: "First Step",
    image: ACHIEVEMENT_ICONS.firstStep,
    achieved: true,
  },
  {
    id: 3,
    name: "Adventurer",
    image: ACHIEVEMENT_ICONS.adventurer,
    achieved: true,
  },
  {
    id: 4,
    name: "Cyclist",
    image: ACHIEVEMENT_ICONS.cyclist,
    achieved: true,
  },
    // {
    //     id:5,
    //     name:"100 KM Milestone",
    //     image:require(""),
    //     achieved: false,
    // },   
    // {
    //     id:6,
    //     name:"10 KM Milestone",
    //     image:require(""),
    //     achieved: false,
    // },   
    // {
    //     id:7,
    //     name:"50 KM Milestone",
    //     image:require(""),
    //     achieved: false,
    // },   
]