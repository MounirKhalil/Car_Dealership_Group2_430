import React, { useContext } from "react";
import UserContext from "../UserContext";

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h2>Home Page</h2>
      {user ? (
        <p>Hi, {user.email}! You are logged in.</p>
      ) : (
        <p>Please sign in to access the admin panel.</p>
      )}
    </div>
  );
};

export default Home;
