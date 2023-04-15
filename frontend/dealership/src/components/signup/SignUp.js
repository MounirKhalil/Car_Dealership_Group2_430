import "./SignUp.css";
import React, { useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
    } else {
      const response = await fetch("http://127.0.0.1:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          password,
          mobile: mobileNumber,
          admin: false,
        }),
      });
      const data = await response.json();
      setResponseMessage(data.success ? "success" : data.error);
      alert(responseMessage);
    }
  };

  return (
    <div className="signup-container">
      <div className="wrapper">
        <h2 className="header2">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              className="signup-input"
              type="text"
              id="firstname"
              placeholder="first name"
              value={first_name}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              className="signup-input"
              type="text"
              id="lastname"
              placeholder="last name"
              value={last_name}
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              className="signup-input"
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              className="signup-input"
              placeholder="password"
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              className="signup-input"
              placeholder="Confirm Password"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              className="signup-input"
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
