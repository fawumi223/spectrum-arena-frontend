import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

export default function ArtisanMap({ artisans }) {
  const defaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png"
  });

  return (
    <div className="my-10">
      <h2 className="text-2xl font-semibold mb-4">Artisans on the Map</h2>

      <MapContainer
        center={[6.5244, 3.3792]}
        zoom={12}
        style={{ height: "450px", width: "100%", borderRadius: "12px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {artisans.map((artisan, idx) => (
          <Marker
            key={idx}
            position={[
              artisan.location.coordinates[1],
              artisan.location.coordinates[0]
            ]}
            icon={defaultIcon}
          >
            <Popup>
              <strong>{artisan.full_name}</strong><br />
              {artisan.skill}<br />
              {artisan.distance && (
                <span>{(artisan.distance / 1000).toFixed(2)} km away</span>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

