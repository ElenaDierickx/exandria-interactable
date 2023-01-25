import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import MapGL, {
  NavigationControl,
  Source,
  Layer,
  useMap,
  MapProvider,
} from "react-map-gl";
import { layerCities, layerPois } from "../utils/layers";
import MapUtil from "../utils/mapUtil";

export default function Map() {
  const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAP_API ?? "";

  return (
    <MapProvider>
      <MapUtil />
      <MapGL
        id="map"
        initialViewState={{
          longitude: 15.4542,
          latitude: 5,
          zoom: 5,
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
        <NavigationControl />
      </MapGL>
    </MapProvider>
  );
}
