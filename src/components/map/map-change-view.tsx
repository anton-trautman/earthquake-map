import { useMap } from "react-leaflet";
import type { LatLngLiteral } from "leaflet";

function ChangeView({ center }: { center: LatLngLiteral }) {
  const map = useMap();
  map.setView(center, map.getZoom(), {
    animate: true,
  });
  return null;
}

export default ChangeView;
