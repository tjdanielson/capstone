import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import GoalTracker from "../../components/GoalTracker/GoalTracker";
import UserStats from "../../components/UserStats/UserStats";
import Badges from "../../components/Badges/Badges";

import axios from "axios";

const UserDashboard = (props) => {
  const [user, token] = useAuth();
  const [goalStats, setGoalStats] = useState([]);
  const [badges, setBadges] = useState([]);
  const [cleanups, setCleanups] = useState([]);

  useEffect(() => {
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
    getGoalTrackerStats();
  }, [token]);

  useEffect(() => {
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
        console.log("results2:", result[2][1]);
        console.log(`badges:`, badges);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUserBadges();
  }, [token]);

  useEffect(() => {
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
        let result = Object.entries(response.data);
        console.log(response.data);
        setCleanups(result);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUserCleanups();
  }, [token]);

  return (
    <div>
      <p>WELCOME BACK, {user.username}</p>
      <GoalTracker goalStats={goalStats} />
      <UserStats badgeCount={badges.length} cleanupCount={cleanups.length} />
      <Badges badges={badges[2]} />
    </div>
  );
};

export default UserDashboard;
//
