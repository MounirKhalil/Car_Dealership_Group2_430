import React, { useState, useEffect } from "react";
import "./Users.css";

function Users() {
  const [users, setUsers] = useState([
    {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      mobile: "555-1234",
      admin: true,
    },
    {
      id: 2,
      first_name: "Jane",
      last_name: "Doe",
      email: "jane.doe@example.com",
      mobile: "555-5678",
      admin: false,
    },
    {
      id: 3,
      first_name: "Bob",
      last_name: "Smith",
      email: "bob.smith@example.com",
      mobile: "555-9876",
      admin: true,
    },
    {
      id: 4,
      first_name: "Alice",
      last_name: "Johnson",
      email: "alice.johnson@example.com",
      mobile: "555-4321",
      admin: false,
    },
  ]);
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch("/link", {
        method: "GET",
      });
      const data = await response.json();
      setUsers(data);
    }
    fetchUsers();
  }, []);

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
