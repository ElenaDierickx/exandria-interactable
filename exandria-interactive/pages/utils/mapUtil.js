import { useMap, MapProvider } from "react-map-gl";
import { useEffect, useRef } from "react";
import { layerCities, layerPois } from "../utils/layers";

export default function MapUtil() {
  const { map } = useMap();

  useEffect(() => {
    if (map) {
      map.loadImage("/images/cr_icon_poi.png", (error, image) => {
        if (error) throw error;
        if (!map.hasImage("cr_icon_poi"))
          map.addImage("cr_icon_poi", image, { sdf: true });
      });
      map.loadImage("/images/cr_icon_pop.png", (error, image) => {
        if (error) throw error;
        if (!map.hasImage("cr_icon_pop"))
          map.addImage("cr_icon_pop", image, { sdf: true });
      });

      map.on("click", "city_points", createPopup);

      map.on("mouseenter", "city_points", function () {
        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", "city_points", function () {
        map.getCanvas().style.cursor = "";
      });

      map.on("mouseenter", "poi_points", function () {
        map.getCanvas().style.cursor = "pointer";
      });

      // Change it back to a pointer when it leaves.
      map.on("mouseleave", "poi_points", function () {
        map.getCanvas().style.cursor = "";
      });
    }
  }, [map]);

  function createPopup(e) {
    var coordinates = e.features[0].geometry.coordinates.slice();
    var name = e.features[0].properties.Name;
    var population = e.features[0].properties.Population;
    var category = e.features[0].properties.Type;
    var info = e.features[0].properties.Info;
    var popupContent;
    if (category != "null" && category != undefined) {
      popupContent =
        "<p>" +
        category +
        " of</p><h2 style='padding-bottom: 5px;'>" +
        name +
        "</h2><hr>";
    } else {
      popupContent = "<h2 style='padding-bottom: 5px;'>" + name + "</h2><hr>";
    }

    if (population != "null" && population != undefined) {
      popupContent += "<h3>Population: </h3>" + String(population);
    }

    if (info != "null") {
      popupContent += "<h3>Description: </h3>" + info;
    }

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(popupContent)
      .addTo(map);
  }
}
