import { Marker, Popup } from "react-leaflet";
import { useEffect, useMemo, useRef, useState } from "react";
import type { LatLngLiteral } from "leaflet";

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

          setPosition(markerLocation);
          onMarkerDrag(markerLocation);
        }
      },
    }),
    [onMarkerDrag],
  );

  useEffect(() => {
    if (location.lat !== position.lat || location.lng !== position.lng) {
      setPosition({
        ...location,
      });
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
