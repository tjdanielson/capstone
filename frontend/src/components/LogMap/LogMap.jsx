import React, { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import "./LogMap.css";

let startingPosition = { lat: 43.0389, lng: -87.9065 };

const Map = (props) => {
  const [markerPosition, setMarkerPosition] = useState([]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;

  const getCoords = (ev) => {
    let lat = ev.latLng.lat();
    let lng = ev.latLng.lng();
    let coordinates = {
      lat: lat,
      lng: lng,
    };
    console.log(lat, lng);
    setMarkerPosition(coordinates);
    props.setMapCoords(lat, lng);
  };

  return (
    <GoogleMap
      onClick={(ev) => {
        getCoords(ev);
      }}
      zoom={5}
      center={startingPosition}
      mapContainerClassName="map-container"
    >
      {markerPosition && <Marker position={markerPosition} />}
    </GoogleMap>
  );
};

export default Map;
