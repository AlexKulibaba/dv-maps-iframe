import GoogleMap from "@/components/google-map";
import Map from "@/components/map";

import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <GoogleMap />
    </main>
  );
}
