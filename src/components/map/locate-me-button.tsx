import { useCallback, useState } from "react";
import { useMap, useMapEvents } from "react-leaflet";
import { useUserPreferences } from "../../providers/user-preferences/hooks";
import { normalizeLatLng } from "../../utils/normalize-data";
import toast from "react-hot-toast";
import Loader from "../loader";
import type { LatLngLiteral } from "leaflet";

const LocationButton = () => {
  const map = useMap();

  useMapEvents({
    locationfound: (e) => {
      onSuccess(e.latlng);
    },
    locationerror: (e) => {
      onError("locationerror " + e.message);
    },
  });

  const { setPreferences } = useUserPreferences();
  const [loading, setLoading] = useState(false);

  const onSuccess = useCallback(
    ({ lat, lng }: LatLngLiteral) => {
      map.flyTo(
        {
          lat,
          lng,
        },
        map.getZoom(),
      );
      setPreferences({
        latitude: normalizeLatLng(lat),
        longitude: normalizeLatLng(lng),
      });
      setLoading(false);
    },
    [map, setPreferences],
  );

  const onError = useCallback((message: string) => {
    toast.error(message);
    setLoading(false);
  }, []);

  const onClick = useCallback(async () => {
    setLoading(true);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onSuccess({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoading(false);
        },
        (e) => onError(e.message),
      );
    } else {
      onError("Geolocation is not supported by your browser");
    }
  }, [onSuccess, onError]);

  return (
    <div className={"leaflet-top leaflet-right"}>
      <div
        className="leaflet-control leaflet-bar bg-white p-1"
        onClick={onClick}
      >
        {loading ? (
          <Loader />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#000"
            width="24"
            height="24"
          >
            <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0 0 13 3.06V1h-2v2.06A8.994 8.994 0 0 0 3.06 11H1v2h2.06A8.994 8.994 0 0 0 11 20.94V23h2v-2.06A8.994 8.994 0 0 0 20.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
          </svg>
        )}
      </div>
    </div>
  );
};

export default LocationButton;
