import { useMap } from "react-map-gl";
import { useEffect, useState, useCallback } from "react";
import * as turf from "@turf/turf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRuler } from "@fortawesome/free-solid-svg-icons";

export default function MapUtil(props) {
  const { map } = useMap();
  const [distanceText, setDistanceText] = useState(null);
  const [measuring, setMeasuring] = useState(true);
  const units = "mi";
  let unitDivisor;

  let linestring = {
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: [],
    },
  };

  useEffect(() => {
    if (map) {
      map.loadImage("/images/cr_icon_poi.png", (error, image) => {
        if (error) throw error;
        if (!map.hasImage("cr_icon_poi")) map.addImage("cr_icon_poi", image);
      });
      map.loadImage("/images/cr_icon_pop.png", (error, image) => {
        if (error) throw error;
        if (!map.hasImage("cr_icon_pop")) map.addImage("cr_icon_pop", image);
      });

      map.on("click", "city_points", props.createPopup);
      map.on("click", "poi_points", props.createPopup);

      map.on("mouseenter", "city_points", function () {
        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", "city_points", function () {
        map.getCanvas().style.cursor = "";
      });

      map.on("mouseenter", "poi_points", function () {
        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", "poi_points", function () {
        map.getCanvas().style.cursor = "";
      });
    }
  }, [map]);

  function measure() {
    if (measuring == true) {
      setMeasuring(false);
      map.off("click", "city_points", props.createPopup);
      map.off("click", "poi_points", props.createPopup);
      setDistanceText("0");

      props.measureGeojson.features = [];
      linestring = {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [],
        },
      };
      map.on("click", clickMeasureFunctionCall);

      map.on("mousemove", mouseMoveMeasureCall);
    } else {
      setMeasuring(true);
      removeMeasure();
    }
  }

  function removeMeasure() {
    props.measureGeojson.features = [];
    map.getSource("measure").setData(props.measureGeojson);
    map.on("click", "city_points", props.createPopup);
    map.on("click", "poi_points", props.createPopup);
    setDistanceText(null);

    map.off("mousemove", mouseMoveMeasureCall);
    map.off("click", clickMeasureFunctionCall);

    map.getCanvas().style.cursor = "grab";
  }

  const clickMeasureFunctionCall = useCallback(clickMeasureFunction, [map]);

  function clickMeasureFunction(e) {
    if (units == "mi") {
      unitDivisor = 1.609;
    } else {
      unitDivisor = 1;
    }

    const features = map.queryRenderedFeatures(e.point, {
      layers: ["measure-points"],
    });

    // Remove the linestring from the group
    // so we can redraw it based on the points collection.
    if (props.measureGeojson.features.length > 1)
      props.measureGeojson.features.pop();

    // Clear the distance container to populate it with a new value

    // If a feature was clicked, remove it from the map.
    if (features.length) {
      const id = features[0].properties.id;
      props.measureGeojson.features = props.measureGeojson.features.filter(
        (point) => point.properties.id !== id
      );
    } else {
      const point = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [e.lngLat.lng, e.lngLat.lat],
        },
        properties: {
          id: String(new Date().getTime()),
        },
      };

      props.measureGeojson.features.push(point);
    }

    if (props.measureGeojson.features.length > 1) {
      linestring.geometry.coordinates = props.measureGeojson.features.map(
        (point) => point.geometry.coordinates
      );

      props.measureGeojson.features.push(linestring);

      const distance =
        Math.round((turf.lineDistance(linestring) / unitDivisor) * 1.05 * 10) /
        10;

      setDistanceText(distance.toLocaleString());
    }

    map.getSource("measure").setData(props.measureGeojson);
  }

  const mouseMoveMeasureCall = useCallback(mouseMoveMeasure, [map]);

  function mouseMoveMeasure(e) {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ["measure-points"],
    });
    map.getCanvas().style.cursor = features.length ? "pointer" : "crosshair";
  }

  return (
    <>
      {distanceText && (
        <div className="bg-black text-white p-3 rounded-md absolute bottom-3 left-3 z-10 bg-opacity-50">
          <p>Total distance: {distanceText}mi</p>
        </div>
      )}

      <button
        className="absolute right-3 top-44 w-12 h-12 rounded-md bg-white hover:bg-gray-100 text-center z-10"
        onClick={measure}
      >
        <FontAwesomeIcon className="self-center" icon={faRuler} />
      </button>
    </>
  );
}
