import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const AmdinPage = (props) => {
  const [user, token] = useAuth();
  const [isStaff, setIsStaff] = useState(false);

  useEffect(() => {
    getIsStaff();
  }, [token]);

  const getIsStaff = async () => {
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
      setIsStaff(result[2][1]);
    } catch (error) {
      console.log(error.message);
    }
  };
  if (!isStaff) {
    return (
      <div>
        <h3>Oops, looks like you don't have access to this page.</h3>
      </div>
    );
  } else {
    return (
      <div>
        <p>Admin Page</p>
      </div>
    );
  }
};

export default AmdinPage;
