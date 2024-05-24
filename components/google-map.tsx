"use client";
import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  MarkerClusterer,
  InfoWindowF,
} from "@react-google-maps/api";

interface GoogleMapProps {
  markers: { lat: number; lng: number; name: string }[];
}
const GoogleMapComponent = ({ markers }: GoogleMapProps) => {
  const [selectedPlace, setSelectedPlace] = React.useState<{
    lat: number;
    lng: number;
    name: string;
  } | null>(null);
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
                <MarkerF
                  key={index}
                  position={marker}
                  clusterer={clusterer}
                  onClick={() => {
                    marker === selectedPlace
                      ? setSelectedPlace(null)
                      : setSelectedPlace(marker);
                  }}
                />
              ))}
              {selectedPlace && (
                <InfoWindowF
                  position={selectedPlace}
                  onCloseClick={() => setSelectedPlace(null)}
                  zIndex={100}
                  options={{
                    pixelOffset: {
                      width: 0,
                      height: -40,
                      equals: () => false,
                    },
                  }}
                >
                  <div>
                    <h1>{selectedPlace.name}</h1>
                  </div>
                </InfoWindowF>
              )}
            </>
          )}
        </MarkerClusterer>
      </GoogleMap>
    )
  );
};

export default GoogleMapComponent;
