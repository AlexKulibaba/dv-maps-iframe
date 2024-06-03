"use client";

import GoogleMap from "@/components/google-map";
import Map from "@/components/map";
import { extractCoordinates } from "@/lib/utils";
import axios from "axios";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, use, useEffect, useState } from "react";

export interface Marker {
  id: string;
  link: string;
  name: string;
  phase: string;
  description: string;
  position: {
    lat: number;
    lng: number;
    address: string;
  };
}

export default function Home() {
  const [markers, setMarkers] = useState<Marker[]>([]);
  function getCoordinatesArray(
    inputArray: string[]
  ): Array<{ lat: number; lng: number }> {
    const regex = /<(\d+\.\d+),(\d+\.\d+)>/;
    return inputArray.map((input) => {
      const match = input.match(regex);
      if (match) {
        return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
      }
      return { lat: 0, lng: 0 };
    });
  }

  const getMarkers = async () => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://digital-vereinfacht.ninoxdb.de/v1/teams/xk9zrexbm17q6bfqc/databases/lryyv6de5s5z/tables/L/records/",

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

  useEffect(() => {
    getMarkers().then((data) => {
      console.log(data);
      const newMarkers = data
        .map((item: any) => {
          const coordinates = extractCoordinates(item.fields.Ort);
          if (coordinates) {
            return {
              id: item.id,
              link: item.fields.Link || "",
              name: item.fields.Name || "test",
              phase: item.fields.Phase || "0",
              description: item.fields.Beschreibung || "",
              position: coordinates,
            };
          } else {
            return null;
          }
        })
        .filter((item: any) => item !== null);

      console.log("markers:", newMarkers);
      setMarkers(newMarkers);
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Suspense fallback={<div>Loading...</div>}>
        <GoogleMap markers={markers} />
      </Suspense>
    </main>
  );
}
