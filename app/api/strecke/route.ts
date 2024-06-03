import { NextResponse } from "next/server";

type LatLng = {
  lat: number;
  lng: number;
};

type RequestBody = {
  adresse: LatLng;
  ziele: LatLng[];
};

export async function GET(req: Request) {
  const json = await req.json();
  const { adresse, ziele }: RequestBody = json;

  // Validate input
  if (!adresse || !Array.isArray(ziele) || ziele.length === 0) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  // Construct URL for the external API
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const origins = `${adresse.lat},${adresse.lng}`;
  const destinations = ziele.map((z) => `${z.lat},${z.lng}`).join("|");
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&key=${apiKey}`;

  try {
    // Fetch data from the external API
    const response = await fetch(url);
    const data = await response.json();

    // Extract trip lengths
    if (data.status !== "OK") {
      return NextResponse.json(
        { error: "Error fetching trip lengths" },
        { status: 500 }
      );
    }

    const tripLengths = data.rows[0].elements.map((element: any) => {
      if (element.status === "OK") {
        return element.distance.value; // distance in meters
      } else {
        return null; // handle cases where no route is found
      }
    });

    return NextResponse.json({ tripLengths });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch trip lengths" },
      { status: 500 }
    );
  }
}
