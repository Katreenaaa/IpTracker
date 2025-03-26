import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet marker icon issue (default icons may not show properly)
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const customIcon = L.icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const MapSection = ({ ipData }) => {
  if (!ipData) return <p className="text-center">Loading map...</p>;

  const { lat, lng } = ipData.location;
  return (
    <MapContainer center={[lat, lng]} zoom={13} className="h-full w-full">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[lat, lng]} icon={customIcon}>
        <Popup>
          {ipData.ip} <br /> {ipData.location.city}, {ipData.location.region}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapSection;
