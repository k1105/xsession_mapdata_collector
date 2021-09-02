export default function SetDataOnLayer(map, id, track) {
  try {
    //addSourceが非同期のため、addSourceの実行より先にgetSourceが呼ばれてしまうことがある。
    map.getSource(id).setData({
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: track,
      },
    });
  } catch (e) {
    console.log(e);
  }
}
