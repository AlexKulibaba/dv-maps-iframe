import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const extractCoordinates = (location: string) => {
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
