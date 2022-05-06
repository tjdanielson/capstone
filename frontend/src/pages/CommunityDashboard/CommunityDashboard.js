import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Map from "../../components/Map/Map";

const CommunityDashboard = (props) => {
  const [user, token] = useAuth();
  const [coords, setCoords] = useState([]);

  useEffect(() => {
    getCleanupCoords();
  }, [token]);

  // get all coordinates
  const getCleanupCoords = async () => {
    try {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/cleanups/addresses/`
      );
      let new_coords = [];
      response.data.map((address) => {
        let obj = {};
        if (address.latitude) {
          obj["lat"] = parseFloat(address.latitude);
          obj["lng"] = parseFloat(address.longitude);
          new_coords.push(obj);
        }
      });
      setCoords(new_coords);
      console.log(coords);
    } catch (error) {
      console.log(error.message);
    }
  };
  // get top 10 users
  // get community stats
  return (
    <div>
      <h3>Community Dash</h3>
      <Map coordinates={coords} />
    </div>
  );
};

export default CommunityDashboard;
