import "./SignUp.css";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const [captcha, setCaptcha] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");
  const [captchaValid, setCaptchaValid] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!captchaValid) {
      alert("Incorrect code. Please try again.");
      return;
    } else {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
      } else {
        const response = await fetch("http://www.epharmac.store:8081/signup", {
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
      }
    }
  };
  const handleCaptchaChange = (event) => {
    const value = event.target.value;
    if (value === captcha) {
      setCaptchaValid(true);
    } else {
      setCaptchaValid(false);
    }
    setCaptchaValue(value);
  };

  const generateCaptcha = () => {
    const captcha = uuidv4().slice(0, 6); // Generate a random string of 6 characters
    setCaptcha(captcha);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    if (responseMessage) {
      alert(responseMessage);
    }
  }, [responseMessage]);

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
          <div className="form-group">
            <label htmlFor="captcha">Please enter the code:</label>
            <br />
            <div class="captcha-container">
              <span class="captcha-text">{captcha}</span>
            </div>
            <br />
            <input
              className="signup-input"
              type="text"
              id="captcha"
              placeholder="Enter the code"
              value={captchaValue}
              onChange={handleCaptchaChange}
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
