import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import MapGL, {
  NavigationControl,
  Source,
  Layer,
  MapProvider,
  Popup,
} from "react-map-gl";
import {
  layerCities,
  layerPois,
  layerMeasurePoints,
  layerMeasureLines,
} from "../utils/layers";
import MapUtil from "../utils/mapUtil";
import { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import SearchLocation from "./SearchLocation";
import HomeButton from "./HomeButton";

export default function Map() {
  const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAP_API ?? "";
  const [popup, setPopup] = useState(null);
  const measureGeojson = {
    type: "FeatureCollection",
    features: [],
  };

  const createPopupCall = useCallback(createPopup, []);

  function createPopup(e) {
    let coordinates = e.features[0].geometry.coordinates.slice();
    const name = e.features[0].properties.Name;
    const population = e.features[0].properties.Population;
    const category = e.features[0].properties.Type;
    const info = e.features[0].properties.Info;

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    setPopup(
      <Popup
        closeOnClick={false}
        longitude={coordinates[0]}
        latitude={coordinates[1]}
        onClose={() => {
          setPopup(null);
        }}
        closeButton={false}
      >
        <div className="flex flex-row justify-between">
          <diV>
            {category && <p className="">{category} of</p>}
            <h2 className="font-bold text-xl">{name}</h2>
          </diV>

          <FontAwesomeIcon
            className="hover:cursor-pointer text-lg"
            onClick={() => setPopup(null)}
            icon={faXmark}
          />
        </div>

        {population && <h3 className="font-bold">Population: </h3>}
        {population && <p className="">{population}</p>}
        {info && <h3 className="font-bold">Description: </h3>}
        {info && <p className="">{info}</p>}
      </Popup>
    );
  }

  return (
    <MapProvider>
      <MapUtil createPopup={createPopupCall} measureGeojson={measureGeojson} />
      <MapGL
        id="map"
        initialViewState={{
          longitude: 15.4542,
          latitude: 5,
          zoom: 4,
        }}
        projection="equirectangular"
        mapStyle="mapbox://styles/litharelle/clbze8br5001414nhxbazvw8p/draft"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <Source
          id="cities"
          type="geojson"
          data="./data/exandria_cities.geojson"
        >
          <Layer {...layerCities} />
        </Source>
        <Source id="pois" type="geojson" data="./data/exandria_pois.geojson">
          <Layer {...layerPois} />
        </Source>
        <Source id="measure" type="geojson" data={measureGeojson}>
          <Layer {...layerMeasurePoints} />
          <Layer {...layerMeasureLines} />
        </Source>
        <NavigationControl />
        {popup}
        <SearchLocation />
        <HomeButton />
      </MapGL>
    </MapProvider>
  );
}
