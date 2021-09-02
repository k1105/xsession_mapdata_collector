export default function AddTrackLayer(map, id, track = []) {
  map.addSource(id, {
    type: "geojson",
    data: {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: track,
      },
    },
  });
  map.addLayer({
    id: id,
    type: "line",
    source: id,
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#C1D6C8",
      "line-opacity": 0.5,
      "line-width": 3,
    },
  });
}

