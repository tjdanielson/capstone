import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import GoalTracker from "../../components/GoalTracker/GoalTracker";
import UserStats from "../../components/UserStats/UserStats";
import Badges from "../../components/Badges/Badges";
import Map from "../../components/Map/Map";
import axios from "axios";
import CleanupList from "../../components/CleanupList/CleanupList";

const UserDashboard = (props) => {
  const [user, token] = useAuth();
  const [coords, setCoords] = useState([]);
  const [goalStats, setGoalStats] = useState([]);
  const [badges, setBadges] = useState([]);
  const [cleanups, setCleanups] = useState([]);

  useEffect(() => {
    getCleanupCoords();
    getGoalTrackerStats();
    getUserBadges();
    getUserCleanups();
  }, [token]);

  const getCleanupCoords = async () => {
    try {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/cleanups/addresses/${user.id}/`
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

  const getGoalTrackerStats = async () => {
    try {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/cleanups/userStats/${user.id}/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      let result = Object.entries(response.data);
      console.log(response.data);
      setGoalStats(result);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUserBadges = async () => {
    try {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/auth/getbadges/${user.id}/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      let result = Object.entries(response.data[0]);
      setBadges(result);
      console.log("badges:", badges);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUserCleanups = async () => {
    try {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/cleanups/user/${user.id}/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response.data);
      setCleanups(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <p>WELCOME BACK, {user.username}</p>
      <GoalTracker goalStats={goalStats} />
      <UserStats badgeCount={badges[2]} cleanupCount={cleanups.length} />
      <h3>YOUR CLEANUP MAP</h3>
      <Map coordinates={coords} />
      <CleanupList cleanups={cleanups} />
      <Badges badges={badges[2]} />
    </div>
  );
};

export default UserDashboard;
