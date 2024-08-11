import { Earthquake } from "../types";

interface EarthquakeListProps {
  earthquakes: Earthquake[];
}

const EarthquakeList: React.FC<EarthquakeListProps> = ({ earthquakes }) => {
  return (
    <ul>
      {earthquakes.map((eq, index) => (
        <li key={index}>
          Magnitude {eq.magnitude} - {eq.place} -{" "}
          {new Date(eq.time).toLocaleString()}
        </li>
      ))}
    </ul>
  );
};

export default EarthquakeList;
