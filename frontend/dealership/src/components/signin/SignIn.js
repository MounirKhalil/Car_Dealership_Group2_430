import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./SignIn.css";

function SignIn() {
  const [isContainerActive, setIsContainerActive] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const rightButton = () => {
    setIsContainerActive(true);
  };

  const leftButton = () => {
    setIsContainerActive(false);
  };

  const handleSubmit = async (event) => {
    const response = await fetch("http://127.0.0.1:5000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    console.log(data.id, data.token, data.admin);

    localStorage.setItem(data.id, data.token, data.admin);
  };

  return (
    <div>
      <div className="body">
        <div
          className={`container ${
            isContainerActive ? "right-panel-active" : ""
          }`}
          id="container"
        >
          <div className="form-container sign-up-container">
            <div className="form">
              <form onSubmit={handleSubmit}>
                <h1>Enter as admin</h1>
                <input
                  type="email"
                  placeholder="Email"
                  id="email1"
                  name="email"
                  required
                  onChange={(event) => setEmail(event.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  id="password1"
                  name="password"
                  required
                  onChange={(event) => setPassword(event.target.value)}
                />
                <Link to="/admin">
                  <button type="submit">Sign in as Admin</button>
                </Link>
              </form>
            </div>
          </div>
          <div className="form-container sign-in-container">
            <div className="form">
              <form onSubmit={handleSubmit}>
                <h1>Sign in as user</h1>

                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  name="email"
                  required
                  onChange={(event) => setEmail(event.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  name="password"
                  required
                  onChange={(event) => setPassword(event.target.value)}
                />

                <button type="submit">Sign In</button>
              </form>

              <br></br>
              <Link to="/signup">
                <button>Sign Up</button>
              </Link>
            </div>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To book a car please login with your personal info or sign up
                </p>
                <button className="ghost" id="signIn" onClick={leftButton}>
                  Sign In as user
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Boss!</h1>
                <p>Monitor and overview your dealership</p>

                <button className="ghost" id="signUp" onClick={rightButton}>
                  Admin
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
