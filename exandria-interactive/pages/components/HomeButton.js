import { useMap } from "react-map-gl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

export default function HomeButton() {
  const { map } = useMap();

  function toStartLocation() {
    map.flyTo({
      center: [15.4542, 5],
      bearing: 0,
      pitch: 0,
      zoom: 4,
      speed: 1.2,

      easing: function (t) {
        return t;
      },
      essential: true,
    });
  }

  return (
    <button
      className="absolute right-3 top-28 w-12 h-12 rounded-md bg-white hover:bg-gray-100 text-center"
      onClick={toStartLocation}
    >
      <FontAwesomeIcon className="text-lg self-center" icon={faHouse} />
    </button>
  );
}
