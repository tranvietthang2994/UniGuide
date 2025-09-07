"use client";

import React from "react";
import dynamic from "next/dynamic";
import { MapPinIcon } from "@heroicons/react/24/outline";

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

interface MapProps {
  latitude: number;
  longitude: number;
  universityName: string;
  address: string;
}

const Map: React.FC<MapProps> = ({
  latitude,
  longitude,
  universityName,
  address,
}) => {
  // Fallback component when Leaflet is not available
  const MapFallback = () => (
    <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-lg flex items-center justify-center">
      <div className="text-center text-gray-600">
        <MapPinIcon className="h-12 w-12 mx-auto mb-2 text-blue-600" />
        <p className="text-sm font-medium">{universityName}</p>
        <p className="text-xs text-gray-500 mt-1">{address}</p>
        <p className="text-xs text-gray-400 mt-2">
          {latitude.toFixed(4)}, {longitude.toFixed(4)}
        </p>
      </div>
    </div>
  );

  // Check if we're in the browser
  if (typeof window === "undefined") {
    return <MapFallback />;
  }

  try {
    return (
      <div className="w-full h-48 rounded-lg overflow-hidden shadow-md">
        <MapContainer
          center={[latitude, longitude]}
          zoom={15}
          style={{ height: "100%", width: "100%" }}
          className="rounded-lg"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[latitude, longitude]}>
            <Popup>
              <div className="text-center">
                <h4 className="font-semibold text-gray-900">
                  {universityName}
                </h4>
                <p className="text-sm text-gray-600 mt-1">{address}</p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    );
  } catch (error) {
    console.error("Map rendering error:", error);
    return <MapFallback />;
  }
};

export default Map;
