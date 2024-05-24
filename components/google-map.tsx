"use client";
import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  MarkerClusterer,
} from "@react-google-maps/api";

const GoogleMapComponent = () => {
  const markers = [
    { lat: 50.7753, lng: 6.0839 },
    { lat: 50.7744, lng: 6.0855 },
    { lat: 50.7797, lng: 6.0765 },
    { lat: 50.7923, lng: 6.1195 },
    { lat: 50.7734, lng: 6.0722 },
    { lat: 50.7757, lng: 6.0215 },
    { lat: 50.7706, lng: 6.0912 },
    { lat: 50.7771, lng: 6.1674 },
    { lat: 50.776, lng: 6.0827 },
    { lat: 50.7718, lng: 6.0814 },
  ];

  const containerStyle = {
    width: "100vw",
    height: "100vh",
  };

  const options = {
    mapId: "YOUR_MAP_ID",
    mapTypeControl: false,
    streetViewControl: false,
  };

  const center = { lat: 50.7753, lng: 6.0839 };

  const { isLoaded } = useJsApiLoader({
    // id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    isLoaded && (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        options={options}
      >
        <MarkerClusterer
          options={{
            imagePath:
              "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
          }}
        >
          {(clusterer) => (
            <>
              {markers.map((marker, index) => (
                <MarkerF key={index} position={marker} clusterer={clusterer} />
              ))}
            </>
          )}
        </MarkerClusterer>
      </GoogleMap>
    )
  );
};

export default GoogleMapComponent;
