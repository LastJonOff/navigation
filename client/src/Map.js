import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import ControlPanel from "./ControlPanel";

mapboxgl.accessToken =
  "pk.eyJ1IjoibGFzdGpvbm9mZiIsImEiOiJjbGFnZDZzMmExZG04M25taGZwZW5ibmgwIn0.B2KK5ZTJ20m8LPiN2jf9KA";

function Map() {
  const mapContainer = useRef(null);

  const [markers, setMarkers] = useState([]);
  const [lastCoords, setLastcoords] = useState([0, 0]);
  const [coords, setCoords] = useState([
    // [37.631724966486246, 55.82811343278843],
    // [37.63151532825839, 55.82810257243574],
    // [37.63081314187207, 55.82808028014935],
    // [37.630162089319356, 55.82805972067365],
    // [37.630099526544456, 55.82805910417969],
    // [37.63003751256758, 55.8280643443772],
    [37.62998318173808, 55.82808407217357],
    [37.62842750837689, 55.828989918915966],
    [37.62892747593793, 55.829258499274204],
    [37.62927196094205, 55.829445683720564],
    [37.62883013820351, 55.829483030457425],
    [37.628887018350355, 55.829743106552485],
  ]);

  const [coords2, setCoords2] = useState([
    [37.631724966486246, 55.82811343278843],
    [37.63151532825839, 55.82810257243574],
    [37.63081314187207, 55.82808028014935],
    [37.63081802970089, 55.82841642940167],
    [37.63080213241216, 55.829048541431774],
    [37.630262560061425, 55.82939385036315],
    [37.630079654365915, 55.829387770555826],
    [37.62927208008958, 55.82944507849558],
    [37.62883013820351, 55.829483030457425],
    [37.628887018350355, 55.829743106552485],
  ]);

  const [coords3, setCoords3] = useState([
    [37.63081314187207, 55.82808028014935],
    [37.630815405453404, 55.828418623529984],
    [37.63079953849865, 55.829051372263166],
    [37.63026282283545, 55.829394704337886],
    [37.63007309187398, 55.82938977060846],
    [37.62927062653441, 55.82944530853109],
  ]);

  const [coords4, setCoords4] = useState([
    [37.62927196094205, 55.829445683720564],
    [37.62883013820351, 55.829483030457425],
    [37.628887018350355, 55.829743106552485],
  ]);

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c; // Distance in km
    return distance;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  let total = 0;

  for (let i = 0; i < coords2.length - 1; i++) {
    const distnace = getDistanceFromLatLonInKm(
      coords2[i][0],
      coords2[i][1],
      coords2[i + 1][0],
      coords2[i + 1][1]
    );
    total += distnace;
  }
  console.log(total, "TOTAL");

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [37.632, 55.827],
      zoom: 14,
    });

    const markerOnClick = (e) => {
      const markerIndex = markers.findIndex((marker) => marker === e.target);

      if (markerIndex !== -1) {
        const newMarkers = [...markers];
        newMarkers.splice(markerIndex, 1);
        setMarkers(newMarkers);
        const newCoords = [...coords];
        newCoords.splice(markerIndex, 1);
        setCoords(newCoords);
      }
    };

    map.on("click", (e) => {
      const newCoords = [e.lngLat.lng, e.lngLat.lat];
      const newMarker = new mapboxgl.Marker({
        color: "#F84C4C",
      })
        .setLngLat(e.lngLat)
        .addTo(map);
      newMarker.getElement().addEventListener("click", markerOnClick);
      setMarkers([...markers, newMarker]);
      coords.push(newCoords);
      console.log(1111);
      setLastcoords(newCoords);
      // draw route

      //FIX SET COORDS

      map.getSource("route").setData({
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: coords,
        },
      });
    });

    const newMarkers = [];
    // coords.forEach((coord) => {
    //   const marker = new mapboxgl.Marker({
    //     color: "#F84C4C",
    //   })
    //     .setLngLat(coord)
    //     .addTo(map);
    //   marker.getElement().addEventListener("click", () => {
    //     const index = markers.findIndex((m) => m === marker);
    //     if (index !== -1) {
    //       marker.remove();
    //       setMarkers((prevMarkers) => {
    //         const newMarkers = [...prevMarkers];
    //         newMarkers.splice(index, 1);
    //         return newMarkers;
    //       });
    //       setCoords((prevCoords) => {
    //         const newCoords = [...prevCoords];
    //         newCoords.splice(index, 1);
    //         return newCoords;
    //       });
    //     }
    //   });

    //   newMarkers.push(marker);
    // });

    const startMarker = new mapboxgl.Marker({
      color: "blue",
    })
      .setLngLat([37.631727487680536, 55.828112356890784])
      .addTo(map);

    const goalMarker = new mapboxgl.Marker({
      color: "orange",
    })
      .setLngLat([37.628887008439364, 55.82974268722117])
      .addTo(map);

    const carMarker = new mapboxgl.Marker({
      color: "red",
    })
      .setLngLat([37.63081493871883, 55.828127674727426])
      .addTo(map);

    const carMarkera = new mapboxgl.Marker({
      color: "red",
    })
      .setLngLat([37.63081897837307, 55.82841541267959])
      .addTo(map);

    const carMarkerb = new mapboxgl.Marker({
      color: "red",
    })
      .setLngLat([37.630809733469846, 55.82873774720778])
      .addTo(map);

    const carMarkerc = new mapboxgl.Marker({
      color: "red",
    })
      .setLngLat([37.63076323040343, 55.829073614024054])
      .addTo(map);

    const carMarkerd = new mapboxgl.Marker({
      color: "red",
    })
      .setLngLat([37.63055709305496, 55.82920593860837])
      .addTo(map);

    const carMarker2 = new mapboxgl.Marker({
      color: "red",
    })
      .setLngLat([37.6290530909192, 55.829325416032276])
      .addTo(map);

    const carMarker3 = new mapboxgl.Marker({
      color: "red",
    })
      .setLngLat([37.6284835581894, 55.829020027575126])
      .addTo(map);

    const carMarker4 = new mapboxgl.Marker({
      color: "red",
    })
      .setLngLat([37.62895217203919, 55.82868481025733])
      .addTo(map);

    setMarkers(newMarkers);

    const route_1 = [
      { lng: 37.63151581885856, lat: 55.828105435083444 },
      { lng: 37.630813662001856, lat: 55.82808223591323 },
      { lng: 37.630048463196545, lat: 55.828061478748964 },
      { lng: 37.62998107352945, lat: 55.82808467793197 },
      { lng: 37.629670211515304, lat: 55.828266607885325 },
      { lng: 37.628430575909476, lat: 55.8289888710741 },
      { lng: 37.62926828395959, lat: 55.82944709352691 },
      { lng: 37.628831176199895, lat: 55.82948578098339 },
    ];

    const route_2 = [
      { lng: 37.63172240659907, lat: 55.82811519524634 },
      { lng: 37.63151581885856, lat: 55.828105435083444 },
      { lng: 37.630813662001856, lat: 55.82808223591323 },
      { lng: 37.630048463196545, lat: 55.828061478748964 },
      { lng: 37.62998107352945, lat: 55.82808467793197 },
      { lng: 37.629670211515304, lat: 55.828266607885325 },
      { lng: 37.628430575909476, lat: 55.8289888710741 },
      { lng: 37.62926828395959, lat: 55.82944709352691 },
      { lng: 37.628831176199895, lat: 55.82948578098339 },
    ];

    // let i = 0;

    function animateMarker(marker, route, timestamp, start, end, i = 0) {
      // const distance = getDistanceFromLatLonInKm(
      //   start.lat,
      //   start.lng,
      //   end.lat,
      //   end.lng
      // );
      // const speed = 30;
      // const duration = (distance / speed) * 60 * 60 * 1000; // 2 seconds
      const duration = 5000;
      const increment = 1; // 10 milliseconds

      const progress = timestamp / duration - i;
      const lng = start.lng + (end.lng - start.lng) * progress;
      const lat = start.lat + (end.lat - start.lat) * progress;

      marker.setLngLat([lng, lat]);

      if (progress < 1) {
        // request the next animation frame if the movement is not yet complete
        setTimeout(() => {
          requestAnimationFrame((timestamp) => {
            animateMarker(marker, route, timestamp, start, end, i);
          });
        }, increment);
      } else {
        i += 1;
        marker.setLngLat([route[i].lng, route[i].lat]);
        if (i + 2 > route.length) {
          return;
        }
        setTimeout(() => {
          requestAnimationFrame((timestamp) => {
            animateMarker(marker, route, timestamp, end, route[i + 1], i);
          });
        }, increment);
      }
    }

    map.on("load", () => {
      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: coords,
          },
        },
      });

      map.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "green",
          "line-width": 8,
        },
      });

      map.addSource("route2", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: coords2,
          },
        },
      });

      map.addLayer({
        id: "route2",
        type: "line",
        source: "route2",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "yellow",
          "line-width": 8,
        },
      });

      // map.addSource("route3", {
      //   type: "geojson",
      //   data: {
      //     type: "Feature",
      //     properties: {},
      //     geometry: {
      //       type: "LineString",
      //       coordinates: coords3,
      //     },
      //   },
      // });

      // map.addLayer({
      //   id: "route3",
      //   type: "line",
      //   source: "route3",
      //   layout: {
      //     "line-join": "round",
      //     "line-cap": "round",
      //   },
      //   paint: {
      //     "line-color": "green",
      //     "line-width": 8,
      //   },
      // });

      // map.addSource("route4", {
      //   type: "geojson",
      //   data: {
      //     type: "Feature",
      //     properties: {},
      //     geometry: {
      //       type: "LineString",
      //       coordinates: coords4,
      //     },
      //   },
      // });

      // map.addLayer({
      //   id: "route4",
      //   type: "line",
      //   source: "route4",
      //   layout: {
      //     "line-join": "round",
      //     "line-cap": "round",
      //   },
      //   paint: {
      //     "line-color": "green",
      //     "line-width": 8,
      //   },
      // });

      // animate car movement
      // animateMarker(carMarker, route_1, 0, route_1[0], route_1[1]);

      // animateMarker(carMarker2, route_2, 0, route_2[0], route_2[1]);
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <>
      <ControlPanel value={lastCoords} />
      <div ref={mapContainer} style={{ width: "100%", height: "100vh" }} />
    </>
  );
}

export default Map;
