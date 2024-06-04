"use client";

import GoogleMap from "@/components/google-map";
import Map from "@/components/map";
import NewMap from "@/components/new-map";
import { dvDemo, keys, phaseColors, possibleFilters } from "@/data/data";
import { extractCoordinates, getCoordinatesFromAddress } from "@/lib/utils";
import axios from "axios";
import { get } from "http";

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
  // Hier Kunde anpassen
  const customer = dvDemo;

  const [markers, setMarkers] = useState<LocationMarker[]>([]);

  const getMarkers = async () => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: customer.dbLink,

        headers: {
          Authorization: "Bearer " + customer.db_key,
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
    getMarkers().then(async (data) => {
      console.log(data);
      const newMarkers = await Promise.all(
        data.map(async (item: any) => {
          const coordinates = extractCoordinates(item.fields.Standort);
          if (coordinates) {
            return {
              id: item.id,
              link: "dummy",
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
            const strasse = item.fields["Straße und Hausnummer"];
            const plz = item.fields.PLZ;
            const ort = item.fields.Ort;

            const address = `${strasse}, ${plz} ${ort}`;
            const newEntry = await getCoordinatesFromAddress(address).then(
              (newCoords: { lat: any; lng: any } | null) => {
                if (newCoords) {
                  return {
                    id: item.id,
                    link: "dummy",
                    name:
                      "[" +
                        item.fields.Projektnummer +
                        "] " +
                        item.fields.Projektname || "test",
                    phase: item.fields.Projektphase || "0",
                    description: item.fields.Beschreibung || "",
                    position: newCoords,
                  };
                }
                return null; // Return null if no coordinates are found
              }
            );
            return newEntry;
          }
        })
      );

      const filteredMarkers = newMarkers.filter((item: any) => item !== null);

      console.log(filteredMarkers);
      setMarkers(filteredMarkers);
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Suspense fallback={<div>Loading...</div>}>
        <NewMap
          markers={markers}
          filters={customer.filters}
          colors={customer.colors}
          api_key={customer.customer_key}
        />
      </Suspense>
    </main>
  );
}
