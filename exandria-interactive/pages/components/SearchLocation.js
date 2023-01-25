import Select from "react-select";
import searchData from "./../../public/data/exandria_search.json";
import { useMap } from "react-map-gl";
import { useState } from "react";

export default function SearchLocation() {
  const [value, setValue] = useState();
  const { map } = useMap();
  let options = [];
  for (var key in searchData) {
    const option = {
      value: [searchData[key]["coordinates"], searchData[key]["zoom"]],
      label: searchData[key]["Name"],
    };
    options.push(option);
  }

  function valueSelected(e) {
    setValue(null);
    map.flyTo({
      center: e.value[0],
      bearing: 0,
      pitch: 0,
      zoom: e.value[1],
      speed: 1.2,

      easing: function (t) {
        return t;
      },
      essential: true,
    });
  }

  return (
    <Select
      options={options}
      placeholder="Select location to jump to"
      className="absolute z-10 w-64 top-3 left-3"
      onChange={valueSelected}
      value={value}
    />
  );
}
