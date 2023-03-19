import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Landing from "./components/Landing.js";
import AdminPanel from "./components/AdminPanel";
import UserContext from "./UserContext";

function App() {
  const [user, setUser] = useState(null);

  const handleSignIn = async (email, password) => {
    try {
      const response = await fetch("/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      const token = data.token;
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const user = decodedToken.user;
      if (data.admin) {
        setUser({ ...user, isAdmin: true });
      } else {
        setUser(user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = () => {
    setUser(null);
  };

  const handleSignUp = async (email, password) => {
    try {
      const response = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        setUser(email);
      } else {
        console.log(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <SignIn />
    <BrowserRouter>
      <UserContext.Provider value={{ user, handleSignIn, handleSignOut }}>
        <Home />
        <Routes>
          <Route
            path="/signin"
            element={<SignIn />}
            render={() => <SignUp handleSignUp={handleSignIn} />}
          />
          <Route
            path="/signup"
            element={<SignUp />}
            render={() => <SignUp handleSignUp={handleSignUp} />}
          />
          <Route path="/admin_panel" element={<AdminPanel />} />
          <Route path="/" element={<Landing />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
