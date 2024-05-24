"use client";
import { Loader } from "@googlemaps/js-api-loader";
import React, { useEffect } from "react";

const Map = () => {
  const mapRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      console.log("initMap");

      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");

      const position = { lat: 51.5074, lng: 0.1278 };

      // map options
      const mapOptions: google.maps.MapOptions = {
        center: position as google.maps.LatLngLiteral,
        zoom: 8,
        mapId: "YOUR_MAP_ID",
      };

      // setup map
      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);
    };

    initMap();
  }, []);

  return <div ref={mapRef} style={{ height: "600px" }} />;
};

export default Map;
