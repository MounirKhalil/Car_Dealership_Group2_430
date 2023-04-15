import React, { useState, useEffect } from "react";
import "./CarRequests.css";

function CarRequests() {
  const [carRequests, setCarRequests] = useState([
    {
      id: 1,
      car_id: "ABC123",
      user: "John Doe",
      date: "2022-01-01",
    },
    {
      id: 2,
      car_id: "XYZ456",
      user: "Jane Doe",
      date: "2022-02-01",
    },
    {
      id: 3,
      car_id: "DEF789",
      user: "Bob Smith",
      date: "2022-03-01",
    },
    {
      id: 4,
      car_id: "GHI101",
      user: "Alice Johnson",
      date: "2022-04-01",
    },
  ]);
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    async function fetchCarRequests() {
      const response = await fetch("/link", {
        method: "GET",
      });
      const data = await response.json();
      setCarRequests(data);
    }
    fetchCarRequests();
  }, []);

  //   need to fix later
  const handleAccept = (id) => {
    const updatedCarRequests = carRequests.map((carRequest) =>
      carRequest.id === id ? { ...carRequest, accepted: true } : carRequest
    );
    setCarRequests(updatedCarRequests);
  };

  const handleDelete = (id) => {
    const updatedCarRequests = carRequests.filter(
      (carRequest) => carRequest.id !== id
    );
    setCarRequests(updatedCarRequests);
  };

  const rows = carRequests.map((carRequest, index) => (
    <tr
      className={index % 2 === colorIndex ? "odd" : "even"}
      key={carRequest.id}
    >
      <td>{carRequest.car_id}</td>
      <td>{carRequest.user}</td>
      <td>{carRequest.date}</td>
      <td>
        {!carRequest.accepted && (
          <button
            className="accept-btn"
            onClick={() => handleAccept(carRequest.id)}
          >
            Accept
          </button>
        )}
        <button
          className="delete-btn"
          onClick={() => handleDelete(carRequest.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <table className="car-requests-table">
      <thead>
        <tr>
          <th>Car ID</th>
          <th>User</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default CarRequests;
