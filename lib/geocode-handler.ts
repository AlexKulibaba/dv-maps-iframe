import {
  setKey,
  setDefaults,
  setLanguage,
  setRegion,
  fromAddress,
  fromLatLng,
  fromPlaceId,
  setLocationType,
  geocode,
  RequestType,
} from "react-geocode";

export const getCoodinatesFromAddress = async (address: string) => {
  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    console.error(
      "No API key found. Please define NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your .env file"
    );
  } else {
    setKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
    setLanguage("de");
    setRegion("de");
  }

  const coordinates = await fromAddress(address)
    .then(({ results }) => {
      const { lat, lng } = results[0].geometry.location;
      return { lat, lng };
    })
    .catch(console.error);

  return coordinates;
};
