import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import GoalTracker from "../../components/GoalTracker/GoalTracker";

import axios from "axios";

const UserDashboard = (props) => {
  const [user, token] = useAuth();
  const [goalStats, setGoalStats] = useState([]);

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

  return (
    <div>
      <p>WELCOME BACK, {user.username}</p>
      <GoalTracker goalStats={goalStats} />
    </div>
  );
};

export default UserDashboard;
//
