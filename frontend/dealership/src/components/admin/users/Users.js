import React, { useState, useEffect } from "react";
import "./Users.css";

function Users() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://www.epharmac.store:8081/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const [colorIndex, setColorIndex] = useState(0);

  const rows = users.map((user, index) => (
    <tr className={index % 2 === colorIndex ? "odd" : "even"} key={user.id}>
      <td>{user.first_name}</td>
      <td>{user.last_name}</td>
      <td>{user.email}</td>
      <td>{user.mobile}</td>
      <td>{user.admin ? "Yes" : "No"}</td>
    </tr>
  ));

  return (
    <table className="users-table">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Admin</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default Users;
