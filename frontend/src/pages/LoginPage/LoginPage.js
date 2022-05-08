import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import { Link } from "react-router-dom";
import "../../App.css";
import "./LoginPage.css";
import bootstrap from "bootstrap";

const LoginPage = () => {
  const { loginUser, isServerError } = useContext(AuthContext);
  const defaultValues = { username: "", password: "" };
  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    defaultValues,
    loginUser
  );

  useEffect(() => {
    if (isServerError) {
      reset();
    }
  }, [isServerError]);

  return (
    <div className="login-page">
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">
              Username{" "}
              <div className="col-sm-10">
                <input
                  className="input"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
            </label>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">
              Password{" "}
              <div className="col-sm-10">
                <input
                  className="input"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
            </label>
          </div>
          {isServerError ? (
            <p className="error">Login failed, incorrect credentials!</p>
          ) : null}
          <div className="form-group row">
            <Link to="/register">Click to register!</Link>
            <div className="col-sm-10">
              <button className="login-button">Login!</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
