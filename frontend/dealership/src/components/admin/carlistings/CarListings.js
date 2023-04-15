import React, { useState, useEffect } from "react";
import "./CarListings.css";

function CarListing() {
  const [cars, setCars] = useState([
    {
      id: 1,
      make: "Toyota",
      model: "Corolla",
      year: 2021,
      price: "$20,000",
      image: "https://example.com/toyota-corolla.jpg",
    },
    {
      id: 2,
      make: "Honda",
      model: "Civic",
      year: 2022,
      price: "$22,000",
      image: "https://example.com/honda-civic.jpg",
    },
    {
      id: 3,
      make: "Ford",
      model: "Mustang",
      year: 2021,
      price: "$35,000",
      image: "https://example.com/ford-mustang.jpg",
    },
  ]);
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    async function fetchCars() {
      const response = await fetch("/link", {
        method: "GET",
      });
      const data = await response.json();
      setCars(data);
    }
    fetchCars();
  }, []);

  const handleDelete = (id) => {
    (async () => {
      // DELETE request using fetch with async/await
      await fetch("/link" + id, {
        method: "DELETE",
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
          <th>Image</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default CarListing;
