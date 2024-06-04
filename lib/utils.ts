import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  setKey,
  setDefaults,
  setLanguage,
  setRegion,
  fromAddress,
  fromLatLng,
  fromPlaceId,
  setLocationType,
  geocode,
  RequestType,
} from "react-geocode";
import { error } from "console";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const extractCoordinates = (location: string) => {
  if (!location) return null;

  const regex = /<([0-9.-]+),([0-9.-]+)>/;
  const match = location.match(regex);
  if (match) {
    // Extract the address by removing the coordinates part from the string
    const address = location.replace(regex, "").trim();

    return {
      address: address,
      lat: parseFloat(match[1]),
      lng: parseFloat(match[2]),
    };
  }
  return null;
};

export const getCoordinatesFromAddress = async (address: string) => {
  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    console.error(
      "No API key found. Please define NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your .env file"
    );
  } else {
    setKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
    setLanguage("de");
    setRegion("de");
  }

  const coordinates = await fromAddress(address)
    .then(({ results }) => {
      const { lat, lng } = results[0].geometry.location;
      console.log("coordinates found for:", address, ":", { lat, lng });
      return { lat, lng };
    })
    .catch((error) => {
      // console.error(error);
      console.log("no coordinates found for:", address);
      return null;
    });

  return coordinates;
};

export const fetchPersonById = async (id: string) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://digital-vereinfacht.ninoxdb.de/v1/teams/xk9zrexbm17q6bfqc/databases/lryyv6de5s5z/tables/H/records/${id}`,
      headers: {
        Authorization: "Bearer 40d25de0-19b8-11ef-b4f9-09d220c0ba76",
        "Content-Type": "application/json",
      },
    };

    const data = await axios.request(config).then((response) => {
      const data = response.data;
      return data;
    });
    return data;
  } catch (e) {
    console.log("[CODE_ERROR]", e);
  }
};
