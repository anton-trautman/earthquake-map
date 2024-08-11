import React from "react";
import { MapContainer, TileLayer, Popup, CircleMarker } from "react-leaflet";
import { Earthquake } from "../../types";
import ChangeView from "./map-change-view";
import { getColorForMagnitude } from "../../utils/getEQColor";
import DraggableMarker from "./draggable-marker";
import "leaflet/dist/leaflet.css";
import type { LatLngLiteral } from "leaflet";

interface EarthquakeMapProps {
  earthquakes: Earthquake[];
  location: LatLngLiteral;
  onMarkerDrag: (location: LatLngLiteral) => void;
}

const EarthquakeMap: React.FC<EarthquakeMapProps> = ({
  location,
  earthquakes,
  onMarkerDrag,
}) => {
  return (
    <MapContainer
      center={location}
      zoom={2}
      scrollWheelZoom={false}
      style={{ minHeight: "600px", width: "100%" }}
      className="rounded"
    >
      <ChangeView center={location} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <DraggableMarker location={location} onMarkerDrag={onMarkerDrag} />

      {earthquakes.map((eq) => (
        <CircleMarker
          key={eq.time + eq.place + eq.magnitude}
          center={[eq.latitude, eq.longitude]}
          radius={Math.max(eq.magnitude * 2, 5)}
          fillColor={getColorForMagnitude(eq.magnitude)}
          color={getColorForMagnitude(eq.magnitude)}
          weight={1}
          opacity={0.8}
          fillOpacity={0.6}
        >
          <Popup>
            Magnitude {eq.magnitude} <br /> {eq.place} <br />
            {new Date(eq.time).toLocaleString()}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default EarthquakeMap;
