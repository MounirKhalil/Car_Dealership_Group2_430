import React, { useState, useEffect } from "react";
import "./CarRequests.css";

function CarRequests() {
  const [carRequests, setCarRequests] = useState([]);
  const fetchSlots = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/get_reserved_slots", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      setCarRequests(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

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
    (async () => {
      // DELETE request using fetch with async/await
      await fetch(`http://127.0.0.1:5000/delete_timeslot/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setCarRequests(
        carRequests.filter((carRequest) => carRequest.userid !== id)
      );
      alert("Delete successful");
    })();
  };

  const rows = carRequests.map((carRequest, index) => (
    <tr
      className={index % 2 === colorIndex ? "odd" : "even"}
      key={carRequest.id}
    >
      <td>{carRequest._id}</td>
      <td>{carRequest.time}</td>
      <td>{carRequest.userid}</td>
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
          onClick={() => handleDelete(carRequest.userid)}
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
          <th>TimeSlot ID</th>
          <th>Time</th>
          <th>User ID</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default CarRequests;
