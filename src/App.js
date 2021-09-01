import { useEffect, useRef } from "react";
import "./App.css";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// eslint-disable-next-line import/no-webpack-loader-syntax
// mapboxgl.workerClass =
//  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;
// アクセストークン
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

const geolocate = new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true, // 高精度な位置情報取得
  },
  trackUserLocation: true, // ユーザの位置情報追跡
});

const styles = {
  root: {
    width: "100%",
    height: "87vh",
  },
};

export const App = () => {
  const map = useRef();
  const mapContainer = useRef();

  useEffect(() => {
    /* ComponentDidmount */
    navigator.geolocation.getCurrentPosition((position) => {
      const c_lng = position.coords.longitude;
      const c_lat = position.coords.latitude;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        center: [c_lng, c_lat],
        style: "mapbox://styles/mapbox/dark-v9", // mapのスタイル指定
        zoom: 12,
      });

      map.current.on("load", function () {
        map.current.addControl(geolocate);
      });
    });
    return () => {
      try {
        map.current.remove();
      } catch (e) {
        console.log(e);
      }
    };
  }, []);
  return <div style={styles.root} ref={mapContainer} />;
};
