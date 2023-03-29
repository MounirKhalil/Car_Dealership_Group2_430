import React, { useState } from "react";
import "./CarAddingForm.css";

function CarAddingForm(props) {
  // A state variable to store the car object
  const [car, setCar] = useState({
    model: "",
    brand: "",
    color: "",
    year: "",
    price: "",
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
  const handleSubmit = (event) => {
    event.preventDefault();
    props.addCar(car); // A function passed as a prop to add the car to the list
    setCar({
      model: "",
      brand: "",
      color: "",
      year: "",
      price: "",
    }); // Reset the car state
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="model">Model</label>
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
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={car.brand}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="color">Color</label>
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
          <label htmlFor="year">Year</label>
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
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={car.price}
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
