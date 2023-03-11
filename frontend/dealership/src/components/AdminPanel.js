import React, { useContext } from "react";
import UserContext from "../UserContext";

const AdminPanel = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h2>Welcome to the Admin Panel</h2>
      {user && user.admin ? (
        <p>Hi, {user.email}! You have access to the admin panel.</p>
      ) : (
        <p>Sorry, you do not have permission to access the admin panel.</p>
      )}
    </div>
  );
};

export default AdminPanel;
