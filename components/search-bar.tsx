import { LocationMarker } from "@/app/page";
import React from "react";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Navigation } from "lucide-react";
import { Separator } from "./ui/separator";

interface SearchBarProps {
  markers: LocationMarker[];
  onSelect: (marker: LocationMarker) => void;
}

const SearchBar = ({ markers, onSelect }: SearchBarProps) => {
  const [search, setSearch] = React.useState<string>("");
  return (
    <div className="w-64">
      <Input
        value={search}
        onChange={(value) => setSearch(value.target.value)}
        placeholder="Suche ein Projekt"
      ></Input>

      {markers.filter(
        (e) =>
          e.name.toLowerCase().includes(search.toLowerCase()) ||
          e.phase.toLowerCase().includes(search.toLowerCase())
      ).length > 0 &&
        search.length > 0 && (
          <ScrollArea className="bg-white rounded-sm mt-2 h-80">
            <div className="p-4">
              {markers
                .filter(
                  (e) =>
                    e.name.toLowerCase().includes(search.toLowerCase()) ||
                    e.phase.toLowerCase().includes(search.toLowerCase())
                )
                .map((marker) => (
                  <div key={marker.name}>
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-start flex-col text-sm">
                        <span>{marker.name}</span>
                        <p className="text-slate-500 text-[12px] font-medium">
                          {marker.phase}
                        </p>
                      </div>
                      <Button
                        size={"sm"}
                        onClick={() => onSelect(marker)}
                        className="bg-primary text-white"
                      >
                        <Navigation size={16} />
                      </Button>
                    </div>
                    <Separator />
                  </div>
                ))}
            </div>
          </ScrollArea>
        )}
      {markers.filter(
        (e) =>
          e.name.toLowerCase().includes(search.toLowerCase()) ||
          e.phase.toLowerCase().includes(search.toLowerCase())
      ).length == 0 &&
        search.length > 0 && (
          <div className="bg-white rounded-sm mt-2 h-80 flex justify-center items-center">
            <p className="text-gray-500 text-[12px] font-normal">
              Keine Projekte gefunden
            </p>
          </div>
        )}
    </div>
  );
};

export default SearchBar;
