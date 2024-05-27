// TODO fuer custom marker: https://www.youtube.com/watch?v=ZvoMak9yApU

// import { Marker } from "@/app/page";
// import {
//   APIProvider,
//   AdvancedMarker,
//   Map,
//   useMap,
// } from "@vis.gl/react-google-maps";
// import { MapPin } from "lucide-react";
// import React, { use, useEffect, useRef } from "react";
// import { Marker as ClusterMarker } from "@googlemaps/markerclusterer";
// import { MarkerClusterer } from "@react-google-maps/api";

// interface GoogleMapProps {
//   markers: Marker[];
// }

// const NewMap = ({ markers }: GoogleMapProps) => {
//   return (
//     <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
//       <Map
//         mapId={"YOUR_MAP_ID"}
//         style={{ width: "100vw", height: "100vh" }}
//         defaultCenter={{ lat: 22.54992, lng: 0 }}
//         defaultZoom={5}
//         gestureHandling={"greedy"}
//         disableDefaultUI={true}
//       />
//       <Markers points={markers} />
//     </APIProvider>
//   );
// };

// type Props = { points: Marker[] };
// const Markers = ({ points }: Props) => {
//   const map = useMap();
//   const [marker, setMarker] = React.useState<{ [key: string]: ClusterMarker }>(
//     {}
//   );
//   const clusterer = useRef<MarkerClusterer | null>(null);

//   useEffect(() => {
//     if (!map) return;
//     if (!clusterer.current) {
//       clusterer.current = new MarkerClusterer({ map });
//     }
//   }, [map]);

//   const setMarkerRef = (marker: ClusterMarker, key: string) => {
//     setMarker((prev) => ({ ...prev, [key]: marker }));
//   };
//   return (
//     <>
//       {points.map((point, index) => (
//         <AdvancedMarker
//           clickable={true}
//           position={point.position}
//           key={index}
//           className="hover:bg-white"
//           ref={(marker) => setMarkerRef(marker, point.key)}
//         >
//           <MapPin className="w-8 h-8 hover:bg-red-600/50 " />
//         </AdvancedMarker>
//       ))}
//     </>
//   );
// };

// export default NewMap;
