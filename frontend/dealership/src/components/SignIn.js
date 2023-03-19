import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";
import "./SignIn.css";

function SignIn() {
  const [isContainerActive, setIsContainerActive] = useState(false);

  const rightButton = () => {
    setIsContainerActive(true);
  };

  const leftButton = () => {
    setIsContainerActive(false);
  };

  const { handleSignIn, user } = useContext(UserContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    handleSignIn(email, password);
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
                  id="email"
                  name="email"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  name="password"
                  required
                />
              </form>
              <Link to="/admin">
                <button>Sign in as Admin</button>
              </Link>
            </div>
          </div>
          <div className="form-container sign-in-container">
            <div className="form">
              <h1>Sign in as user</h1>

              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <Link to="/user">
                <button>Sign In</button>
              </Link>
              <br></br>
              <button>Sign Up</button>
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
