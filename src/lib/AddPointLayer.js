export default function AddPointLayer(map, id, track = []) {
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
    type: "circle",
    source: id,
    paint: {
      "circle-radius": 5,
      "circle-color": "#00a563",
    },
  });
}
