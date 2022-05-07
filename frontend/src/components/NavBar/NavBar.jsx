import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import LogCleanup from "../LogCleanup/LogCleanup";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <ul className="listone">
        <li className="navlinks">
          <Link to="/">
            <b>Home</b>
          </Link>
        </li>
        <li className="navlinks">
          {user ? (
            <Link className="navlinks" to="profile/">
              User Dashboard
            </Link>
          ) : (
            <a></a>
          )}
        </li>
        <li className="navlinks">
          {user ? <Link to="commdash/">Community Dashboard</Link> : <a></a>}
        </li>
        <li className="navlinks">{user ? <LogCleanup /> : <a></a>}</li>
      </ul>
      <ul className="listtwo">
        <li className="navlinks">
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
