import React, { useState } from "react";
import "./AdminPanel.css";
import Users from "../users/Users";
import CarListings from "../carlistings/CarListings";
import CarRequests from "../carrequests/CarRequests";
import CarAddingForm from "../CarAddingForm/CarAddingForm";

const AdminPanel = () => {
  const [showUsers, setShowUsers] = useState(false);
  const [showCarListings, setShowCarListings] = useState(false);
  const [showCarRequests, setShowCarRequests] = useState(false);
  const [showAddCarListing, setShowAddCarListing] = useState(false);

  const handleShowUsers = () => {
    setShowUsers(true);
    setShowCarListings(false);
    setShowCarRequests(false);
    setShowAddCarListing(false);
  };

  const handleShowCarListings = () => {
    setShowUsers(false);
    setShowCarListings(true);
    setShowCarRequests(false);
    setShowAddCarListing(false);
  };

  const handleShowCarRequests = () => {
    setShowUsers(false);
    setShowCarListings(false);
    setShowCarRequests(true);
    setShowAddCarListing(false);
  };

  const handleShowAddCarListing = () => {
    setShowUsers(false);
    setShowCarListings(false);
    setShowCarRequests(false);
    setShowAddCarListing(true);
  };

  return (
    <div className="admin-panel-container">
      <div className="sidebar">
        <ul className="sidebar-ul">
          <li className="sidebar-li" onClick={handleShowUsers}>
            Users
          </li>
          <li className="sidebar-li" onClick={handleShowCarListings}>
            Car Listings
          </li>
          <li className="sidebar-li" onClick={handleShowCarRequests}>
            Car Requests
          </li>
          <li className="sidebar-li" onClick={handleShowAddCarListing}>
            Add Car Listing
          </li>
        </ul>
      </div>
      <div className="admin-form-container">
        {showUsers && <Users />}
        {showCarListings && <CarListings />}
        {showCarRequests && <CarRequests />}
        {showAddCarListing && <CarAddingForm />}
      </div>
    </div>
  );
};

export default AdminPanel;
