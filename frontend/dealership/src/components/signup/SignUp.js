import React, { useState } from "react";
import "./SignUp.css";

const SignUp = ({ handleSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
    } else {
      handleSignUp(email, password, mobileNumber);
    }
  };

  return (
    <div className="signup-container">
      <div className="wrapper">
        <h2 className="header2">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              placeholder="password"
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              placeholder="Confirm Password"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Mobile Number"
              id="mobileNumber"
              value={mobileNumber}
              onChange={(event) => setMobileNumber(event.target.value)}
            />
          </div>
          <div className="form-group"></div>
          <button className="btn-submit" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
