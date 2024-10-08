import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./signUp.module.css";
import Login from "../Login/Login";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {axiosInstance} from "../../utility/axios";

function Signup({ onSwitch }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null); // for error message
  const [success, setSuccess] = useState(null); // for success message
  const [showPassword, setShowPassword] = useState(false); // State for showing/hiding password
  
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev); // Toggle the visibility state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send a POST request to the server to register the user
    try {
      const response = await axiosInstance.post(
        "/user/register",
        {
          // Sending user registration data
          username: formData.username,
          firstname: formData.firstName, //Make sure to match the backend field names
          lastname: formData.lastName,
          email: formData.email,
          password: formData.password, // Ensure this matches the backend property name
        }
      );
      setSuccess("success"); // Handle sccess response
      // navigate("/auth");
      window.location.href = "/auth"; // This will navigate to the /auth page and refresh the application

      if (response.status === 200) {

        setFormData({
          username: "",
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        })
        setError(null); // clear any previous errors
      } else {
        setError(response.data.Msg); // Handle error response
        setSuccess(null); // clear any previous success message
      }
    } catch (err) {
      setError(
        err.response?.data?.Msg ||
          "Error submitting the form. Please try again." + err
      ); // Enhanced error handling
      setSuccess(null); // clear any previous success message
    }
  };

  // Reset the form data after a successful registration
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setFormData({
          username: "",
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
        setSuccess(null); // Clear success message after a while
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success]);
  return (
    <div className={classes.formcontainer}>
      <h2>Join the network</h2>
      <p className="signin-text">
        Already have an account?{" "}
        <a
          onClick={onSwitch}
          style={{ cursor: "pointer", color: "var(--primary-color)" }}
        >
          Sign in
        </a>
      </p>
      {error && <p className={classes.error}>{error}</p>}{" "}

      {success && <p className={classes.success}>{success}</p>}{" "}

      <form method="POST" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <div className={classes.nameinputs}>
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <div className={classes.passwordinput}>
          <input
            type={showPassword ? "text" : "password"} // Toggle between text and password
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={handleTogglePassword}
            className={classes.togglebtn}
          >
            {showPassword ? "🙉" : "🙈"} 
          </button>
          <div style={{ padding: "5px",fontSize: "14px" }}>
            I agree to the <Link to="/privacyPolicy">privacy policy</Link> {" "} and {" "} 
            <Link to="/terms">terms of service</Link>.
          </div>
        </div>
        <button type="submit" className={classes.submitbtn}>
          Agree and Join
        </button>
        <p className={classes.signintext}>
          <a
            onClick={onSwitch}
            style={{ cursor: "pointer", color: "var(--primary-color)" }}
          >
            Already have an account?
          </a>
        </p>
      </form>
    </div>
  );
}

export default Signup;
