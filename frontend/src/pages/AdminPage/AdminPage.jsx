import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import ManageBadges from "../../components/ManageBadges/ManageBadges";
import ManageCleanups from "../../components/ManageCleanups/ManageCleanups";
import ManageUsers from "../../components/ManageUsers/ManageUsers";
import "../../App.css";
import "./AdminPage.css";

const AmdinPage = (props) => {
  const [user, token] = useAuth();
  //const [isStaff, setIsStaff] = useState(false);
  const [badges, setBadges] = useState([]);
  const [cleanups, setCleanups] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getBadges();
    getCleanups();
    getUsers();
  }, [token]);

  const getBadges = async () => {
    try {
      let response = await axios.get(`http://127.0.0.1:8000/api/badges/`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setBadges(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getCleanups = async () => {
    try {
      let response = await axios.get(`http://127.0.0.1:8000/api/cleanups/`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log("cleanups: ", response.data);
      setCleanups(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUsers = async () => {
    try {
      let response = await axios.get(`http://127.0.0.1:8000/api/auth/users/`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log("users: ", response.data);
      setUsers(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!user.is_staff) {
    return (
      <div>
        <h3>Oops, looks like you don't have access to this page.</h3>
      </div>
    );
  } else {
    return (
      <div className="admin-page">
        <div>
          <h1>Admin Page</h1>
        </div>
        <div className="content">
          <div className="component">
            <ManageBadges badges={badges} />
          </div>
          <div className="component">
            <ManageCleanups cleanups={cleanups} />
          </div>
          <div className="component">
            <ManageUsers users={users} />
          </div>
        </div>
      </div>
    );
  }
};

export default AmdinPage;
