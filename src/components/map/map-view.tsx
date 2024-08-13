import React from "react";
import ChangeView from "./map-change-view";
import DraggableMarker from "./draggable-marker";
import { getColorForMagnitude } from "../../utils/get-EQ-color";
import { Earthquake } from "../../types";

import {
  Circle,
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { LatLngLiteral } from "leaflet";

interface EarthquakeMapProps {
  earthquakes: Earthquake[];
  location: LatLngLiteral;
  onMarkerDrag: (location: LatLngLiteral) => void;
  radius: number;
}

const EarthquakeMap: React.FC<EarthquakeMapProps> = ({
  location,
  earthquakes,
  onMarkerDrag,
  radius,
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
      <TileLayer
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <DraggableMarker location={location} onMarkerDrag={onMarkerDrag} />

      <Circle
        key={"radiuskm"}
        center={location}
        radius={radius * 1000}
        fillColor={"green"}
        color={"green"}
        weight={1}
        opacity={0.5}
        fillOpacity={0.3}
      ></Circle>
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
