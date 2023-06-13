import { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map from "./Map";

function App() {
  // const mapContainer = useRef(null);

  // function animateMarker(timestamp) {
  //   const radius = 20;

  //   markers.forEach((marker) => {
  //     const lngLat = marker.getLngLat();
  //     const speed = 0.1; // adjust as needed
  //     const offset = radius * Math.sin((timestamp / 1000) * speed);
  //     marker.setLngLat([
  //       lngLat.lng + offset / 100000,
  //       lngLat.lat + offset / 100000,
  //     ]);
  //   });

  //   requestAnimationFrame(animateMarker);
  // }

  // requestAnimationFrame(animateMarker);

  // function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  //   const earthRadius = 6371; // Radius of the earth in km
  //   const dLat = deg2rad(lat2 - lat1);
  //   const dLon = deg2rad(lon2 - lon1);
  //   const a =
  //     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //     Math.cos(deg2rad(lat1)) *
  //       Math.cos(deg2rad(lat2)) *
  //       Math.sin(dLon / 2) *
  //       Math.sin(dLon / 2);
  //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //   const distance = earthRadius * c; // Distance in km
  //   return distance;
  // }

  // function deg2rad(deg) {
  //   return deg * (Math.PI / 180);
  // }

  // useEffect(() => {
  //   mapboxgl.accessToken =
  //     "pk.eyJ1IjoibGFzdGpvbm9mZiIsImEiOiJjbGFnZDZzMmExZG04M25taGZwZW5ibmgwIn0.B2KK5ZTJ20m8LPiN2jf9KA";

  //   const map = new mapboxgl.Map({
  //     container: mapContainer.current,
  //     style: "mapbox://styles/mapbox/streets-v12",
  //     center: [37.632, 55.827],
  //     zoom: 14,
  //   });

  //   const markerOnClick = (e) => {
  //     const markerIndex = markers.findIndex((marker) => marker === e.target);

  //     if (markerIndex !== -1) {
  //       const newMarkers = [...markers];
  //       newMarkers.splice(markerIndex, 1);
  //       setMarkers(newMarkers);
  //       const newCoords = [...coords];
  //       newCoords.splice(markerIndex, 1);
  //       setCoords(newCoords);
  //     }
  //   };

  //   map.on("click", (e) => {
  //     const newCoords = [e.lngLat.lng, e.lngLat.lat];
  //     console.log(newCoords, "newCoords");
  //     const newMarker = new mapboxgl.Marker({
  //       color: "#F84C4C",
  //     })
  //       .setLngLat(e.lngLat)
  //       .addTo(map);
  //     newMarker.getElement().addEventListener("click", markerOnClick);
  //     setMarkers([...markers, newMarker]);
  //     coords.push(newCoords);

  //     // draw route
  //     map.getSource("route").setData({
  //       type: "Feature",
  //       properties: {},
  //       geometry: {
  //         type: "LineString",
  //         coordinates: coords,
  //       },
  //     });
  //   });

  //   const newMarkers = [];
  //   coords.forEach((coord) => {
  //     const marker = new mapboxgl.Marker({
  //       color: "#F84C4C",
  //     })
  //       .setLngLat(coord)
  //       .addTo(map);
  //     marker.getElement().addEventListener("click", () => {
  //       const index = markers.findIndex((m) => m === marker);
  //       if (index !== -1) {
  //         marker.remove();
  //         setMarkers((prevMarkers) => {
  //           const newMarkers = [...prevMarkers];
  //           newMarkers.splice(index, 1);
  //           return newMarkers;
  //         });
  //         setCoords((prevCoords) => {
  //           const newCoords = [...prevCoords];
  //           newCoords.splice(index, 1);
  //           return newCoords;
  //         });
  //       }
  //     });

  //     newMarkers.push(marker);
  //   });

  //   const carMarker = new mapboxgl.Marker({
  //     color: "#008000",
  //   })
  //     .setLngLat([37.63151581885856, 55.828105435083444])
  //     .addTo(map);

  //   const carMarker2 = new mapboxgl.Marker({
  //     color: "#008000",
  //   })
  //     .setLngLat([37.63172240659907, 55.82811519524634])
  //     .addTo(map);

  //   setMarkers(newMarkers);

  //   const route_1 = [
  //     { lng: 37.63151581885856, lat: 55.828105435083444 },
  //     { lng: 37.630813662001856, lat: 55.82808223591323 },
  //     { lng: 37.630048463196545, lat: 55.828061478748964 },
  //     { lng: 37.62998107352945, lat: 55.82808467793197 },
  //     { lng: 37.629670211515304, lat: 55.828266607885325 },
  //     { lng: 37.628430575909476, lat: 55.8289888710741 },
  //     { lng: 37.62926828395959, lat: 55.82944709352691 },
  //     { lng: 37.628831176199895, lat: 55.82948578098339 },
  //   ];

  //   const route_2 = [
  //     { lng: 37.63172240659907, lat: 55.82811519524634 },
  //     { lng: 37.63151581885856, lat: 55.828105435083444 },
  //     { lng: 37.630813662001856, lat: 55.82808223591323 },
  //     { lng: 37.630048463196545, lat: 55.828061478748964 },
  //     { lng: 37.62998107352945, lat: 55.82808467793197 },
  //     { lng: 37.629670211515304, lat: 55.828266607885325 },
  //     { lng: 37.628430575909476, lat: 55.8289888710741 },
  //     { lng: 37.62926828395959, lat: 55.82944709352691 },
  //     { lng: 37.628831176199895, lat: 55.82948578098339 },
  //   ];

  //   // let i = 0;

  //   function animateMarker(marker, route, timestamp, start, end, i = 0) {
  //     // const distance = getDistanceFromLatLonInKm(
  //     //   start.lat,
  //     //   start.lng,
  //     //   end.lat,
  //     //   end.lng
  //     // );
  //     // const speed = 30;
  //     // const duration = (distance / speed) * 60 * 60 * 1000; // 2 seconds
  //     const duration = 5000;
  //     const increment = 1; // 10 milliseconds

  //     const progress = timestamp / duration - i;
  //     const lng = start.lng + (end.lng - start.lng) * progress;
  //     const lat = start.lat + (end.lat - start.lat) * progress;

  //     marker.setLngLat([lng, lat]);

  //     if (progress < 1) {
  //       // request the next animation frame if the movement is not yet complete
  //       setTimeout(() => {
  //         requestAnimationFrame((timestamp) => {
  //           animateMarker(marker, route, timestamp, start, end, i);
  //         });
  //       }, increment);
  //     } else {
  //       i += 1;
  //       marker.setLngLat([route[i].lng, route[i].lat]);
  //       if (i + 2 > route.length) {
  //         return;
  //       }
  //       setTimeout(() => {
  //         requestAnimationFrame((timestamp) => {
  //           animateMarker(marker, route, timestamp, end, route[i + 1], i);
  //         });
  //       }, increment);
  //     }
  //   }

  //   map.on("load", () => {
  //     // map.addSource("route", {
  //     //   type: "geojson",
  //     //   data: {
  //     //     type: "Feature",
  //     //     properties: {},
  //     //     geometry: {
  //     //       type: "LineString",
  //     //       coordinates: coords,
  //     //     },
  //     //   },
  //     // });

  //     // map.addLayer({
  //     //   id: "route",
  //     //   type: "line",
  //     //   source: "route",
  //     //   layout: {
  //     //     "line-join": "round",
  //     //     "line-cap": "round",
  //     //   },
  //     //   paint: {
  //     //     "line-color": "#125c65",
  //     //     "line-width": 8,
  //     //   },
  //     // });

  //     map.addSource("route2", {
  //       type: "geojson",
  //       data: {
  //         type: "Feature",
  //         properties: {},
  //         geometry: {
  //           type: "LineString",
  //           coordinates: coords2,
  //         },
  //       },
  //     });

  //     map.addLayer({
  //       id: "route2",
  //       type: "line",
  //       source: "route2",
  //       layout: {
  //         "line-join": "round",
  //         "line-cap": "round",
  //       },
  //       paint: {
  //         "line-color": "green",
  //         "line-width": 8,
  //       },
  //     });

  //     map.addSource("route3", {
  //       type: "geojson",
  //       data: {
  //         type: "Feature",
  //         properties: {},
  //         geometry: {
  //           type: "LineString",
  //           coordinates: coords3,
  //         },
  //       },
  //     });

  //     map.addLayer({
  //       id: "route3",
  //       type: "line",
  //       source: "route3",
  //       layout: {
  //         "line-join": "round",
  //         "line-cap": "round",
  //       },
  //       paint: {
  //         "line-color": "green",
  //         "line-width": 8,
  //       },
  //     });

  //     map.addSource("route4", {
  //       type: "geojson",
  //       data: {
  //         type: "Feature",
  //         properties: {},
  //         geometry: {
  //           type: "LineString",
  //           coordinates: coords4,
  //         },
  //       },
  //     });

  //     map.addLayer({
  //       id: "route4",
  //       type: "line",
  //       source: "route4",
  //       layout: {
  //         "line-join": "round",
  //         "line-cap": "round",
  //       },
  //       paint: {
  //         "line-color": "green",
  //         "line-width": 8,
  //       },
  //     });

  //     // animate car movement
  //     animateMarker(carMarker, route_1, 0, route_1[0], route_1[1]);

  //     animateMarker(carMarker2, route_2, 0, route_2[0], route_2[1]);
  //   });

  //   return () => {
  //     map.remove();
  //   };
  // }, []);

  return (
    <div>
      <Map />
    </div>
  );
}

export default App;
