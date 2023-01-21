import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import MapGL, { NavigationControl } from "react-map-gl";
import { useRef } from "react";

export default function Home() {
    const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAP_API ?? "";
    const mapRef = useRef();

    return (
        <MapGL
            ref={mapRef}
            initialViewState={{
                longitude: 15.4542,
                latitude: 5,
                zoom: 4,
            }}
            projection="equirectangular"
            mapStyle="mapbox://styles/litharelle/clbze8br5001414nhxbazvw8p/draft"
            mapboxAccessToken={MAPBOX_TOKEN}
        >
            <NavigationControl />
        </MapGL>
    );
}
