import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import "../../App.css";
import "./RegisterPage.css";

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext);
  const defaultValues = {
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  };
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    defaultValues,
    registerUser
  );

  return (
    <div className="register-page">
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">
              Username:{" "}
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
              First Name:{" "}
              <div className="col-sm-10">
                <input
                  className="input"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
            </label>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">
              Last Name:{" "}
              <div className="col-sm-10">
                <input
                  className="input"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </label>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">
              Email:{" "}
              <div className="col-sm-10">
                <input
                  className="input"
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </label>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">
              Password:{" "}
              <div className="col-sm-10">
                <input
                  className="input"
                  type="text"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
            </label>
          </div>
          <div className="register-text">
            <p style={{ fontSize: "12px" }}>
              NOTE: Make this an uncommon password with characters, numbers, and
              special characters!
            </p>
          </div>
          <button className="login-button">Register!</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
