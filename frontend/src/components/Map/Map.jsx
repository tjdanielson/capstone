import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  withScriptjs,
  withGoogleMap,
} from "@react-google-maps/api";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

const Map = ({ props }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;

  let positions = [
    { lat: 42.97648210424851, lng: -87.89953605065793 },
    { lat: 42.97877413788161, lng: -87.88957969147206 },
    { lat: 42.977015873136786, lng: -87.89447204038237 },
  ];

  //   function Map() {
  //     return (
  //       <GoogleMap
  //         zoom={10}
  //         center={{ lat: 44, lng: -80 }}
  //         mapContainerClassName="map-container"
  //       >
  //         {positions.map((data, i) => {
  //           return <Marker position={data} />;
  //         })}
  //       </GoogleMap>
  //     );
  //   }

  return (
    <GoogleMap
      zoom={10}
      center={{ lat: 44, lng: -80 }}
      mapContainerClassName="map-container"
    >
      {/* {positions.map((data, i) => {
        return <Marker position={data} />;
      })} */}
    </GoogleMap>
  );
};

export default Map;
