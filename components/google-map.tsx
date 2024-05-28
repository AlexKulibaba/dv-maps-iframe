"use client";
import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  MarkerClusterer,
  InfoWindowF,
} from "@react-google-maps/api";

import { LocationMarker } from "@/app/page";
import { MapPin, Navigation, User } from "lucide-react";
import { Button } from "./ui/button";
import { styleText } from "util";
import { pinImages } from "@/images/pin-manager";
import { get } from "http";
import { Badge } from "./ui/badge";
import { useSearchParams } from "next/navigation";
import SearchBar from "./search-bar";

interface GoogleMapProps {
  markers: LocationMarker[];
  // filter: string[];
}
// const possibleFilters = ["Neu", "In Arbeit", "Inspektion", "Fertig"];
const possibleFilters = [
  "Entwicklung",
  "Planung",
  "Bauphase",
  "Gewährleistung",
];

const GoogleMapComponent = ({ markers }: GoogleMapProps) => {
  const [selectedPlace, setSelectedPlace] =
    React.useState<LocationMarker | null>(null);

  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  let selectedFilter = possibleFilters.filter((item) => filter?.includes(item));
  if (selectedFilter.length === 0) selectedFilter = possibleFilters;
  console.log(selectedFilter);

  const maps_api_key = searchParams.get("key");

  const containerStyle = {
    width: "100vw",
    height: "100vh",
  };

  const options = {
    mapId: "YOUR_MAP_ID",
    mapTypeControl: false,
    streetViewControl: false,
  };

  const getImageForPhase = (phase: string) => {
    switch (phase) {
      case "0":
        return pinImages[0];
      case "Neu":
        return pinImages[1];
      case "In Arbeit":
        return pinImages[2];
      case "Inspektion":
        return pinImages[3];
      case "Abgeschlossen":
        return pinImages[4];
      default:
        return pinImages[0];
    }
  };

  const center = { lat: 50.7753, lng: 6.0839 };

  const { isLoaded } = useJsApiLoader({
    // id: "google-map-script",
    // googleMapsApiKey: maps_api_key as string,
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const focusOnMarker = (marker: LocationMarker) => {
    setSelectedPlace(marker);
    console.log("focusOnMarker", marker);
  };

  return (
    isLoaded && (
      <div>
        <div className="absolute top-4 left-4 z-10">
          <SearchBar
            markers={markers.filter((marker) =>
              selectedFilter.includes(marker.phase)
            )}
            onSelect={focusOnMarker}
          />
        </div>
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
                {markers
                  .filter((marker) => selectedFilter.includes(marker.phase))
                  .map((marker, index) => (
                    <MarkerF
                      key={index}
                      options={{ icon: getImageForPhase(marker.phase) }}
                      //   options={{ icon: pinImages[4] }}
                      position={marker.position}
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
                    position={selectedPlace.position}
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
                    <div className="space-y-2">
                      <div className="flex justify-between items-center space-x-2">
                        <MapPin className="h-10 w-10 text-red-600 bg-red-600/20 p-1 rounded-md" />
                        <div className="flex justify-start items-start flex-col">
                          <h1 className="font-bold text-xl space-y-0">
                            {selectedPlace.name}
                          </h1>
                          <p className="text-gray-500 text-[12px] font-normal hover:underline">
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${selectedPlace.position.lat},${selectedPlace.position.lng}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              // className="text-blue-500 underline"
                            >
                              {selectedPlace.position.address}
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
                      <Badge className="rounded-sm">
                        {selectedPlace.phase}
                      </Badge>
                      <p className="max-w-40 min-w-32 overflow-hidden">
                        {selectedPlace.description}
                      </p>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${selectedPlace.position.lat},${selectedPlace.position.lng}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-white flex space-x-1 bg-blue-500 p-1 rounded-md items-center w-16"
                      >
                        <Navigation className="h-4 w-4" />
                        <span>Route</span>
                      </a>
                    </div>
                  </InfoWindowF>
                )}
              </>
            )}
          </MarkerClusterer>
        </GoogleMap>
      </div>
    )
  );
};

export default GoogleMapComponent;
