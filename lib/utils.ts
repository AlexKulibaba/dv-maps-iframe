import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
