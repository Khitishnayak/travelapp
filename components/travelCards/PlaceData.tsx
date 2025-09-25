import { ImageSourcePropType } from "react-native";
import { DESTINATION_IMAGES } from "../../constants/assets";

export interface Place {
  id: number;
  name: string;
  image: ImageSourcePropType;
}

export const PlaceData: Place[] = [
  {
    id: 1,
    name: "Alleppey Backwaters",
    image: DESTINATION_IMAGES.alleppeyBackwaters,
  },
  {
    id: 2,
    name: "Munnar Hills",
    image: DESTINATION_IMAGES.munnarHills,
  },
  {
    id: 3,
    name: "Jatayu Nature Park",
    image: DESTINATION_IMAGES.jatayuPark,
  },
  {
    id: 4,
    name: "Kochi Fort",
    image: DESTINATION_IMAGES.kochiFort,
  },
  {
    id: 5,
    name: "Kovalam Beach",
    image: DESTINATION_IMAGES.kovalamBeach,
  },
  {
    id: 6,
    name: "Kumarakom",
    image: DESTINATION_IMAGES.kumarakom,
  },
  {
    id: 7,
    name: "Sree Padmanabhaswamy Temple",
    image: DESTINATION_IMAGES.padmanabhaSwamiTemple,
  },
  {
    id: 8,
    name: "Thekkady",
    image: DESTINATION_IMAGES.thekkady,
  },
    {
        id:9,
        name:"vagamon",
        image:require("../../assets/vagamon.jpg")
    },
    {
        id:10,
        name:"varkala",
        image:require("../../assets/varkala.jpg")
    },
    {
        id:11,
        name:"Wayanad",
        image:require("../../assets/wayanad.jpg")
    },
    {
        id:12,
        name:"kozhikode",//Kadalundi Bird Sanctuary
        image:require("../../assets/kozhikode.jpg")
    },
    {
      id:13,
      name:"Kadathanadan Kalari & Navarasa Kathakali Centre",
      image:require("../../assets/katak.jpg")
    },
    {
      id:14,
      name:"Elephant Camp",
      image:require("../../assets/elephant.jpg")
    }
];
