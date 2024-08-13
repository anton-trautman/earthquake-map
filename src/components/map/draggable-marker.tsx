import { useEffect, useMemo, useRef, useState } from "react";
import { normalizeLatLng } from "../../utils/normalize-data";
import L from "leaflet";
import { Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import type { LatLngLiteral } from "leaflet";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

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
