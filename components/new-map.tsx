"use client";

import {
  APIProvider,
  Map,
  useMap,
  AdvancedMarker,
} from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import type { Marker } from "@googlemaps/markerclusterer";
import { useEffect, useState, useRef } from "react";
import { LocationMarker } from "@/app/page";
import { MarkerWithInfoWindow } from "./marker-with-info-window";
// import trees from "../../data/trees";
const trees = [{ name: "Oak, English", lat: 43.64, lng: -79.41, key: "ABCD" }];

interface NewMapProps {
  markers: LocationMarker[];
}

export default function NewMap({ markers }: NewMapProps) {
  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    throw new Error("Missing NEXT_PUBLIC_GOOGLE_MAPS_API_KEY");
  }
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <Map
          //   center={{ lat: 43.64, lng: -79.41 }}
          defaultCenter={{ lat: 50.7753455, lng: 6.0838868 }}
          defaultZoom={10}
          mapId={"process.env.NEXT_PUBLIC_MAP_ID"}
        >
          <Markers points={markers} />
        </Map>
      </APIProvider>
    </div>
  );
}

type Point = google.maps.LatLngLiteral & { key: string };
type Props = { points: LocationMarker[] };

const Markers = ({ points }: Props) => {
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
        <MarkerWithInfoWindow
          point={point}
          // key={point.name}
          // ref={(marker) => setMarkerRef(marker, point.name)}
        >
          <span style={{ fontSize: "2rem" }}>🌳</span>
        </MarkerWithInfoWindow>
      ))}
    </>
  );
};
