import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Map from "../../components/Map/Map";
import Leaderboard from "../../components/Leaderboard/Leaderboard";
import CommunityStats from "../../components/CommunityStats/CommunityStats";
import "../../App.css";
import "./CommunityDashboard.css";

const CommunityDashboard = (props) => {
  const [user, token] = useAuth();
  const [coords, setCoords] = useState([]);
  const [topUsers, setTopUsers] = useState([]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    getCleanupCoords();
    getTopUsers();
    getCommunityStats();
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
  const getTopUsers = async () => {
    try {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/cleanups/topUsers/`
      );
      let result = Object.entries(response.data);
      setTopUsers(result);
      console.log("converted:", result);
    } catch (error) {
      console.log(error.message);
    }
  };

  // get community stats
  const getCommunityStats = async () => {
    try {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/cleanups/communityStats/`
      );
      console.log(response.data);
      setStats(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="community-dash">
      <h3>Community Cleanup Map</h3>
      <Map coordinates={coords} zoom={3} />
      <div className="leader-stats-flex-wrapper">
        <div className="leaderboard-container">
          <h3>Weekly Leaderboard</h3>
          <Leaderboard users={topUsers} />
        </div>
        <div className="stats-container">
          <h3>Community Stats</h3>
          <CommunityStats stats={stats} />
        </div>
      </div>
    </div>
  );
};

export default CommunityDashboard;
