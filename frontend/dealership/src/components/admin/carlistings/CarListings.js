import React, { useState, useEffect } from "react";
import "./CarListings.css";

function CarListing() {
  const [cars, setCars] = useState([]);
  const fetchCars = async () => {
    try {
      const response = await fetch("http://www.epharmac.store:8081/cars", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      setCars(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);
  const [colorIndex, setColorIndex] = useState(0);

  const handleDelete = (id) => {
    (async () => {
      // DELETE request using fetch with async/await
      await fetch(`http://www.epharmac.store:8081/delete_car/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const updatedCars = cars.filter((car) => car.id !== id);
      setCars(updatedCars);
      alert("Delete successful");
    })();
  };

  const rows = cars.map((car, index) => (
    <tr className={index % 2 === colorIndex ? "odd" : "even"} key={car.id}>
      <td>{car.make}</td>
      <td>{car.model}</td>
      <td>{car.year}</td>
      <td>{car.price}</td>
      <td>{car.color}</td>
      <td>
        <img src={car.image} alt={`${car.make} ${car.model}`} />
      </td>
      <td>
        <button onClick={() => handleDelete(car.id)}>Delete</button>
      </td>
    </tr>
  ));

  return (
    <table className="cars-table">
      <thead>
        <tr>
          <th>Make</th>
          <th>Model</th>
          <th>Year</th>
          <th>Price</th>
          <th>Color</th>
          <th>Image</th>

          <th>Action</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default CarListing;
