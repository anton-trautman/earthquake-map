import { useEffect, useMemo, useRef, useState } from "react";
import { normalizeLatLng } from "../../utils/normalize-data";
import { Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import { type LatLngLiteral, icon } from "leaflet";

function DraggableMarker({
  location,
  onMarkerDrag,
}: {
  location: LatLngLiteral;
  onMarkerDrag: (location: LatLngLiteral) => void;
}) {
  const [position, setPosition] = useState(() => location);
  const markerRef = useRef<any>(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const markerLocation = marker.getLatLng();
          const normalizedLocation = {
            lat: normalizeLatLng(markerLocation.lat),
            lng: normalizeLatLng(markerLocation.lng),
          };
          setPosition(normalizedLocation);
          onMarkerDrag(normalizedLocation);
        }
      },
    }),
    [onMarkerDrag],
  );

  useEffect(() => {
    if (location.lat !== position.lat || location.lng !== position.lng) {
      setPosition(location);
    }
  }, [location, position]);

  return (
    <Marker
      icon={IconMarker}
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90}>Marker is draggable</Popup>
    </Marker>
  );
}

export default DraggableMarker;

const sizeMarkerIcon = 42;

const IconMarker = icon({
  iconUrl: `data:image/svg+xml;utf8,${encodeURIComponent(`<?xml version="1.0" encoding="iso-8859-1"?>
    <svg xmlns="http://www.w3.org/2000/svg" width="0.5em" height="0.8em" viewBox="0 0 1024 1536">
      <path fill="#0369a1" d="M768 512q0-106-75-181t-181-75t-181 75t-75 181t75 181t181 75t181-75t75-181m256 0q0 109-33 179l-364 774q-16 33-47.5 52t-67.5 19t-67.5-19t-46.5-52L33 691Q0 621 0 512q0-212 150-362T512 0t362 150t150 362" />
    </svg>
  `)}`,
  iconSize: [sizeMarkerIcon, sizeMarkerIcon],
  iconAnchor: [sizeMarkerIcon / 2, sizeMarkerIcon],
  popupAnchor: [0, -sizeMarkerIcon],
});
