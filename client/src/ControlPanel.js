import { useEffect, useState } from "react";

function ControlPanel({ value }) {
  const [lat, setLat] = useState(value[0]);
  const [lon, setLon] = useState(value[1]);

  useEffect(() => {
    setLat(value[0]);
    setLon(value[1]);
  });

  const onChangeLat = (event) => {
    setLat(event.target.value);
  };

  const onChangeLon = (event) => {
    setLon(event.target.value);
  };
  return (
    <div
      style={{
        zIndex: 1000,
        height: 200,
        width: 400,
        backgroundColor: "white",
        position: "absolute",
        margin: "0px",
        display: "flex",
        flexDirection: "column",
        padding: "16px",
      }}
    >
      <label for="lat">Latitude</label>
      <input name="lat" onChange={onChangeLat} value={lat} />
      <label for="lon">Longitude</label>
      <input name="lon" onChange={onChangeLon} value={lon} />
      <button style={{ marginTop: "10px" }}>Add to database</button>
    </div>
  );
}

export default ControlPanel;
