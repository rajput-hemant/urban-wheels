"use client";

import "leaflet/dist/leaflet.css";

import React from "react";
import { useSearchParams } from "next/navigation";
import type { LatLngExpression, Map as LeafletMap } from "leaflet";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

import type { Location } from "@/lib/db/definitions";
import { SearchParams } from "@/lib/enums";

import { Skeleton } from "./ui/skeleton";

const DEFAULT_ZOOM_LEVEL = 2;

export default function Map({ locations }: { locations: Location[] }) {
  const searchParams = useSearchParams();
  const mapRef = React.useRef<LeafletMap | null>(null);

  function Recenter() {
    const zoom = 12;
    const map = useMap();

    React.useEffect(() => {
      if (searchParams.has(SearchParams.LOCATION)) {
        const newLocation = locations.find(
          ({ value }) => value === searchParams.get(SearchParams.LOCATION)
        );

        if (!newLocation)
          throw new Error("Could not find the requested location");

        const center: LatLngExpression = {
          lat: +newLocation?.latitude,
          lng: +newLocation?.longitude,
        };

        map.setView(center, zoom);
      }
    }, [map]);

    return null;
  }

  return (
    <MapContainer
      ref={mapRef}
      center={[0, 0]}
      zoom={DEFAULT_ZOOM_LEVEL}
      className="flex h-full w-full"
      placeholder={<Skeleton className="h-full w-full" />}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Recenter />
    </MapContainer>
  );
}
