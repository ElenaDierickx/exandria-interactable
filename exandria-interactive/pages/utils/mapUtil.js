import { useMap } from "react-map-gl";
import { useEffect } from "react";

export default function MapUtil(props) {
  const { map } = useMap();

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
}
