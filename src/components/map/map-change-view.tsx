import { useMap } from "react-leaflet";
import type { LatLngExpression } from "leaflet";

function ChangeView({ center }: { center: LatLngExpression }) {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
}

export default ChangeView;
