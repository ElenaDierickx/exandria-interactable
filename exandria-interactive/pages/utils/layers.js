export const layerCities = {
  id: "city_points",
  type: "symbol",
  source: "cities",
  layout: {
    "icon-image": "cr_icon_pop",
    "icon-size": ["interpolate", ["linear"], ["zoom"], 4, 0.05, 12, 0.2],
    "icon-allow-overlap": false,
    "text-allow-overlap": false,
    "text-field": ["get", "Name"],
    "text-size": ["interpolate", ["linear"], ["zoom"], 0, 10, 10, 16],
    "text-variable-anchor": ["top", "bottom", "left", "right"],
    "text-radial-offset": [
      "interpolate",
      ["linear"],
      ["zoom"],
      0,
      [0.04, 0.7][0],
      5,
      [0.04, 0.7][1],
    ],
    "text-justify": "left",
    "symbol-sort-key": 0,
  },
  paint: {
    "text-halo-color": "#fff7e4",
    "text-halo-width": 2,
  },
};

export const layerPois = {
  id: "poi_points",
  type: "symbol",
  source: "pois",
  layout: {
    "icon-image": "cr_icon_poi",
    "icon-size": ["step", ["zoom"], 0, 4.5, 0.04, 5, 0.06, 6, 0.07],
    "icon-allow-overlap": false,
    "text-allow-overlap": false,
    "text-field": ["get", "Name"],
    "text-size": ["step", ["zoom"], 0, 4.5, 10, 5, 11, 6, 14],
    "text-variable-anchor": ["top", "bottom", "left", "right"],
    "text-radial-offset": [
      "interpolate",
      ["linear"],
      ["zoom"],
      0,
      [0.01, 0.6][0],
      5,
      [0.01, 0.6][1],
    ],
    "text-justify": "left",
    "symbol-sort-key": 1,
  },
  paint: {
    "text-halo-color": "#fff7e4",
    "text-halo-width": 2,
  },
};
