import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import LogCleanup from "../LogCleanup/LogCleanup";
import "./NavBar.css";
import Dropdown from "react-bootstrap/Dropdown";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  let mediaQueryCondition = window.matchMedia("( max-width: 650px )");

  if (mediaQueryCondition.matches) {
    return (
      <div className="navBar">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Menu
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="/">Home</Dropdown.Item>
            <Dropdown.Item href="/profile/">User Dashboard</Dropdown.Item>
            <Dropdown.Item href="/commdash/">Community Dashboard</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <div className="navlinks">{user ? <LogCleanup /> : null}</div>
        <div className="navlinks">
          {user && user.is_staff ? <Link to="admin/">Admin</Link> : null}
        </div>
        <div className="navlinks">
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <button className="login" onClick={() => navigate("/login")}>
              Login
            </button>
          )}
        </div>
      </div>
    );
  } else {
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
            {user && user.is_staff ? <Link to="admin/">Admin</Link> : null}
          </li>
          <li className="navlinks">
            {user ? (
              <button onClick={logoutUser}>Logout</button>
            ) : (
              <button className="login" onClick={() => navigate("/login")}>
                Login
              </button>
            )}
          </li>
        </ul>
      </div>
    );
  }
};

export default Navbar;
