import React, { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import "./Map.css";

const Map = (props) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  console.log("coords on mappage:", props.coordinates);
  if (props.coordinates.length === 0) {
    return null;
  } else {
    return (
      <GoogleMap
        zoom={10}
        center={props.coordinates[0]}
        mapContainerClassName="map-container"
      >
        {props.coordinates.map((data, i) => {
          console.log("marker", i);
          return <Marker key={i} position={data} />;
        })}
      </GoogleMap>
    );
  }
};

export default Map;
