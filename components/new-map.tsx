"use client";

import {
  APIProvider,
  Map,
  useMap,
  AdvancedMarker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import type { Marker } from "@googlemaps/markerclusterer";
import { useEffect, useState, useRef } from "react";
import { LocationMarker } from "@/app/page";

import React from "react";
import { MapPin, Navigation } from "lucide-react";
import { Badge } from "./ui/badge";
import SearchBar from "./search-bar";
// import trees from "../../data/trees";
const trees = [{ name: "Oak, English", lat: 43.64, lng: -79.41, key: "ABCD" }];

interface NewMapProps {
  markers: LocationMarker[];
}

export default function NewMap({ markers }: NewMapProps) {
  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    throw new Error("Missing NEXT_PUBLIC_GOOGLE_MAPS_API_KEY");
  }
  const [selectedPlace, setSelectedPlace] =
    React.useState<LocationMarker | null>(null);

  const focusOnMarker = (marker: LocationMarker) => {
    setSelectedPlace(marker);
    console.log("focusOnMarker", marker);
  };
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <div className="absolute top-4 left-4 z-10">
        <SearchBar markers={markers} onSelect={focusOnMarker} />
      </div>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <Map
          mapTypeControl={false}
          streetViewControl={false}
          defaultCenter={{ lat: 50.7753455, lng: 6.0838868 }}
          defaultZoom={10}
          mapId={"process.env.NEXT_PUBLIC_MAP_ID"}
        >
          <Markers
            selectedPlace={selectedPlace}
            setSelectedPlace={setSelectedPlace}
            points={markers}
          />
        </Map>
      </APIProvider>
    </div>
  );
}

type Point = google.maps.LatLngLiteral & { key: string };
type Props = {
  points: LocationMarker[];
  selectedPlace: LocationMarker | null;
  setSelectedPlace: (point: LocationMarker | null) => void;
};

const Markers = ({ points, selectedPlace, setSelectedPlace }: Props) => {
  const map = useMap();
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const clusterer = useRef<MarkerClusterer | null>(null);

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = (marker: Marker | null, key: string) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  return (
    <>
      {points.map((point) => (
        <>
          <AdvancedMarker
            position={point.position}
            key={point.name}
            ref={(marker: any) => setMarkerRef(marker, point.name)}
            onClick={() => {
              point === selectedPlace
                ? setSelectedPlace(null)
                : setSelectedPlace(point);
            }}
          >
            <div className="relative inline-block">
              <div className="text-sm bg-white text-black rounded-sm font-medium flex flex-row items-center border border-black relative">
                <MapPin className="h-6 w-6 text-white bg-red-600 p-[1px] rounded-sm" />
                <span className="px-1">{point.name}</span>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-black"></div>
            </div>
          </AdvancedMarker>
          {selectedPlace === point && (
            <InfoWindow
              position={selectedPlace.position}
              onClose={() => setSelectedPlace(null)}
              pixelOffset={[0, -40]}
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center space-x-2">
                  <MapPin className="h-10 w-10 text-red-600 bg-red-600/20 p-1 rounded-md" />
                  <div className="flex justify-start items-start flex-col">
                    <h1 className="font-bold text-xl space-y-0">
                      {point.name}
                    </h1>
                    <p className="text-gray-500 text-[12px] font-normal hover:underline">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${point.position.lat},${point.position.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        // className="text-blue-500 underline"
                      >
                        {point.position.address}
                      </a>
                    </p>
                  </div>
                </div>
                {/* <a
                      href={`https://digital-vereinfacht.ninoxdb.de/#/teams/xk9zrexbm17q6bfqc/database/lryyv6de5s5z/module/H/view/soXcWZRUOpQXj6PT/node/H1/tab/0`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-black font-normal flex space-x-1 "
                    >
                      <User className="h-4 w-4" />
                      <span>Alexander Kulibaba</span>
                    </a> */}
                <Badge className="rounded-sm">{point.phase}</Badge>
                <p className="max-w-40 min-w-32 overflow-hidden">
                  {point.description}
                </p>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${point.position.lat},${point.position.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white flex space-x-1 bg-blue-500 p-1 rounded-md items-center w-16"
                >
                  <Navigation className="h-4 w-4" />
                  <span>Route</span>
                </a>
              </div>
            </InfoWindow>
          )}
        </>
      ))}
    </>
  );
};
