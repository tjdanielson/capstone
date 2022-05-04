import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import GoalTracker from "../../components/GoalTracker/GoalTracker";

import axios from "axios";

const UserDashboard = (props) => {
  const [user, token] = useAuth();
  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    makeGetRequest();
  }, []);

  async function makeGetRequest() {
    try {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/cleanups/userStats/${user.id}/`
      );
      console.log(response.data);
      setUserStats(response.data);
    } catch (ex) {
      console.log("Oh no something didn't work right :(");
    }
  }

  return (
    <div>
      <p>WELCOME BACK, {user.username}</p>
      <GoalTracker />
    </div>
  );
};

export default UserDashboard;
