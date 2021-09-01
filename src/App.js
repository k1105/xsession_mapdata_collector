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
  info: {
    display: "table",
    position: "relative",
    margin: "0px auto",
    wordWrap: "anywhere",
    whiteSpace: "pre-wrap",
    padding: "10px",
    border: "none",
    borderRadius: "3px",
    fontSize: "12px",
    textAlign: "center",
    color: "#222",
    background: "#fff",
  },
};

export const App = () => {
  const map = useRef();
  const mapContainer = useRef();
  const hoge = () => {
    console.log("hoge");
  };

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
        map.current.on("mousemove", (e) => {
          document.getElementById("info").innerHTML =
            // `e.point` is the x, y coordinates of the `mousemove` event
            // relative to the top-left corner of the map.
            JSON.stringify(e.point) +
            "<br />" +
            // `e.lngLat` is the longitude, latitude geographical position of the event.
            JSON.stringify(e.lngLat.wrap());
        });
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

  return (
    <div>
      <div style={styles.root} ref={mapContainer} onClick={hoge} />
      <pre id="info"></pre>
    </div>
  );
};
