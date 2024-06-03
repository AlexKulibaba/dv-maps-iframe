"use client";

import NewMap from "@/components/new-map";
import { keys, phaseColors, possibleFilters } from "@/data/data";
import { extractCoordinates } from "@/lib/utils";
import axios from "axios";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, use, useEffect, useState } from "react";

export interface LocationMarker {
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
  const [markers, setMarkers] = useState<LocationMarker[]>([]);

  const getMarkers = async () => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://digital-vereinfacht.ninoxdb.de/v1/teams/vivh3t4uidqlg69jk/databases/brfog9v7nl2z/tables/WB/records",

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
          const coordinates = extractCoordinates(item.fields.Standort);
          if (coordinates) {
            return {
              id: item.id,
              link: "https://digital-vereinfacht.ninoxdb.de/#/teams/vivh3t4uidqlg69jk/database/brfog9v7nl2z/module/home/view/tables",
              name:
                "[" +
                  item.fields.Projektnummer +
                  "] " +
                  item.fields.Projektname || "test",
              phase: item.fields.Projektphase || "0",
              description: item.fields.Beschreibung || "",
              position: coordinates,
            };
          } else {
            return null;
          }
        })
        .filter((item: any) => item !== null);

      console.log(newMarkers);
      setMarkers(newMarkers);
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Suspense fallback={<div>Loading...</div>}>
        <NewMap
          markers={markers}
          filters={possibleFilters.hoelzl}
          colors={phaseColors.hoelzl}
          api_key={keys.hoelzl}
        />
      </Suspense>
    </main>
  );
}
