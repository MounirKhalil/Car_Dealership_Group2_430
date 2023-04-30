import React, { useState } from "react";

function CarAddingForm(props) {
  // A state variable to store the car object
  const [car, setCar] = useState({
    model: "",
    make: "",
    color: "",
    year: "",
    price: "",
    image: "",
  });

  // A function to handle the input change events
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCar((prevCar) => ({
      ...prevCar,
      [name]: value,
    }));
  };

  // A function to handle the form submit event
  const handleSubmit = () => {
    fetch("http://www.epharmac.store:8081/addcars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    });

    alert("car added!");
  };

  return (
    <div style={{ margin_top: "200px" }}>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="model">Model:</label>
          <input
            type="text"
            id="model"
            name="model"
            value={car.model}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="make">Make:</label>
          <input
            type="text"
            id="make"
            name="make"
            value={car.make}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="color">Color:</label>
          <input
            type="text"
            id="color"
            name="color"
            value={car.color}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="year">Year:</label>
          <input
            type="number"
            id="year"
            name="year"
            value={car.year}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={car.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={car.image}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Add Car
        </button>
      </form>
    </div>
  );
}

export default CarAddingForm;
