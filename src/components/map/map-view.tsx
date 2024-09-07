import React, { useCallback } from "react";
import ChangeView from "./map-change-view";
import DraggableMarker from "./draggable-marker";
import { getColorForMagnitude } from "../../utils/get-EQ-color";

import {
  Circle,
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { LatLngLiteral } from "leaflet";
import LocationButton from "./locate-me-button";
import { useUserPreferences } from "../../providers/user-preferences/hooks";

interface EarthquakeMapProps {
  theme: "light" | "dark";
}

const EarthquakeMap: React.FC<EarthquakeMapProps> = ({ theme = "dark" }) => {
  const url = `https://cartodb-basemaps-{s}.global.ssl.fastly.net/${theme}_all/{z}/{x}/{y}.png`;

  const { setPreferences, preferences, earthquakes } = useUserPreferences();

  const onMarkerDrag = useCallback(
    (location: LatLngLiteral) => {
      setPreferences({
        longitude: location.lng,
        latitude: location.lat,
      });
    },
    [setPreferences],
  );

  const location: LatLngLiteral = {
    lat: preferences.latitude,
    lng: preferences.longitude,
  };
  return (
    <MapContainer
      keyboard={false}
      center={location}
      zoom={2}
      scrollWheelZoom={false}
      style={{ minHeight: "460px", width: "100%" }}
      className="rounded"
    >
      <ChangeView center={location} />
      <TileLayer url={url} />

      <DraggableMarker location={location} onMarkerDrag={onMarkerDrag} />

      <Circle
        key={"radiuskm"}
        center={location}
        radius={preferences.radius * 1000}
        color={"green"}
        className="fill-cyan-200"
        weight={1}
        opacity={0.2}
        fillOpacity={0.2}
      />
      <LocationButton />
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
          className="animate-fadein"
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
