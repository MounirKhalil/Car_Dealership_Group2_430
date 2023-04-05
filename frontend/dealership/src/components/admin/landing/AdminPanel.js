import React, { useState } from "react";
import "./AdminPanel.css";

const AdminPanel = () => {
  return (
    <div className="admin-panel-container">
      <div className="sidebar">
        <ul className="sidebar-ul">
          <li className="sidebar-li">Users</li>
          <li className="sidebar-li">Car Listings</li>
          <li className="sidebar-li">Car Requests</li>
          <li className="sidebar-li">Add Car Listing</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
