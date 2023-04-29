import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const [click, setClick] = useState(false);

  const [tokenData, setTokenData] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const tokenDataString = localStorage.getItem("tokenData");
    if (tokenDataString) {
      const parsedTokenData = JSON.parse(tokenDataString);
      setTokenData(parsedTokenData);
      setLoggedIn(true);
    }
  }, []);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            Car&Go
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/ViewCars"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                View Cars
              </NavLink>
            </li>
            {loggedIn ? (
              <>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/profile"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/"
                    activeClassName="active"
                    className="nav-links"
                    onClick={() => {
                      setTokenData(null);
                      setLoggedIn(false);
                      localStorage.removeItem("tokenData");
                    }}
                  >
                    Sign out
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/signup"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Sign up
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/signin"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Sign in
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <div
              className={
                click ? "navbar_toggle navbar_toggle_x" : "navbar_toggle"
              }
              onClick={handleClick}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
