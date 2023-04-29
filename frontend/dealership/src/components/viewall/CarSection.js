import React, { useState, useEffect } from "react";
import "./CarSection.css";
import CarCard from "./CarCard";
import CompareTwoCars from "./comparetwocars/CompareTwoCars";
import CarDetails from "./cardetails/CarDetails";

import Modal from "react-modal";

function CarSection() {
  const cars = [
    {
      id: "0",
      year: "2002",
      make: "Honda",
      model: "model1",
      image:
        "https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&width=1200",
      price: 6000,
    },
    {
      id: "1",
      year: "2005",
      make: "Toyota",
      model: "model2",
      image:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2022-bmw-x5-xdrive45e-101-1643896618.jpg",
      price: 9000,
    },
    {
      id: "2",
      year: "2010",
      make: "Nissan",
      model: "model3",
      image:
        "https://hips.hearstapps.com/hmg-prod/images/2022-porsche-911-gt3-rs-101-1663960213.jpg",
      price: 15000,
    },
    {
      id: "3",
      year: "2012",
      make: "Ford",
      model: "model4",
      image:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2023-audi-a3-sportback-101-1655233835.jpg",
      price: 12000,
    },
    {
      id: "4",
      year: "2015",
      make: "Chevrolet",
      model: "model5",
      image:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2023-ferrari-purosangue-101-1654904968.jpg",
      price: 18000,
    },
    {
      id: "5",
      year: "2018",
      make: "BMW",
      model: "model6",
      image:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2022-audi-q4-e-tron-101-1650238704.jpg",
      price: 25000,
    },
    {
      id: "6",
      year: "2019",
      make: "Lamborghini",
      model: "model7",
      image:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2023-lexus-lx600-101-1654960671.jpg",
      price: 35000,
    },
    {
      id: "7",
      year: "2020",
      make: "Mercedes-Benz",
      model: "model8",
      image:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2022-audi-s3-sportback-101-1654910427.jpg",
      price: 28000,
    },
    {
      id: "8",
      year: "2021",
      make: "Acura",
      model: "model9",
      image:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2023-mclaren-artura-101-1655218102.jpg",
      price: 45000,
    },
    {
      id: "9",
      year: "2022",
      make: "Tesla",
      model: "model10",
      image:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2023-mclaren-artura-101-1655218102.jpg",
      price: 55000,
    },
  ];

  const [filteredCars, setFilteredCars] = useState(cars);
  const [searchTerm, setSearchTerm] = useState("");
  const [makeFilter, setMakeFilter] = useState("");
  const [minPriceFilter, setMinPriceFilter] = useState(0);
  const [maxPriceFilter, setMaxPriceFilter] = useState(999999);

  const [selectedCars, setSelectedCars] = useState([]);
  const [comparisonMode, setComparisonMode] = useState(false);

  const [showCarDetails, setShowCarDetails] = useState(false);
  const [selectedCarDetails, setSelectedCarDetails] = useState(null);

  useEffect(() => {
    const filtered = cars.filter((car) => {
      return (
        car.make.includes(makeFilter) &&
        car.price >= minPriceFilter &&
        car.price <= maxPriceFilter &&
        car.model.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredCars(filtered);
  }, [cars, makeFilter, minPriceFilter, maxPriceFilter, searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMakeFilter = (event) => {
    setMakeFilter(event.target.value);
  };

  const handleMinPriceFilter = (event) => {
    setMinPriceFilter(event.target.value);
  };

  const handleMaxPriceFilter = (event) => {
    setMaxPriceFilter(event.target.value);
  };

  const [buttonPressed, setButtonPressed] = useState(false);
  const handleCompareButtonClick = () => {
    setSelectedCars([]);
    setComparisonMode(true);

    setButtonPressed(true);
  };

  const handleCarCardClick = (car) => {
    if (comparisonMode && selectedCars.length < 2) {
      setSelectedCars([...selectedCars, car]);
    } else if (!comparisonMode) {
      setShowCarDetails(true);
      setSelectedCarDetails(car);
    }

    if (selectedCars.length === 1) {
      setComparisonMode(false);
    }
  };

  const handleCloseCarDetails = () => {
    setShowCarDetails(false);
    setSelectedCarDetails(null);
  };

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    window.location.reload();
  };

  useEffect(() => {
    if (selectedCars.length === 2) {
      handleShowModal();
    }
  }, [selectedCars.length]);

  return (
    <>
      <section className="SearchBar">
        <input
          className="SearchInput"
          type="text"
          placeholder="Search cars"
          value={searchTerm}
          onChange={handleSearch}
        />

        <section className="Filters">
          <select
            className="Filter"
            value={makeFilter}
            onChange={handleMakeFilter}
          >
            <option value="">Car Make</option>
            <option value="">All Makes</option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            <option value="Ford">Ford</option>
          </select>
          <select
            className="Filter"
            value={minPriceFilter}
            onChange={handleMinPriceFilter}
          >
            <option value="0">Min Price</option>
            <option value="0">Any</option>
            <option value="5000">5000</option>
            <option value="10000">10000</option>
            <option value="25000">25000</option>
          </select>
          <select
            className="Filter"
            value={maxPriceFilter}
            onChange={handleMaxPriceFilter}
          >
            <option value="999999">Max Price</option>
            <option value="999999">Any</option>
            <option value="10000">10000</option>
            <option value="25000">25000</option>
            <option value="50000">50000</option>
          </select>
        </section>
        <button
          className="CompareButton"
          onClick={handleCompareButtonClick}
          style={{ backgroundColor: buttonPressed ? "green" : "blue" }}
        >
          Compare two cars
        </button>
      </section>

      {showCarDetails && <CarDetails />}

      {selectedCars.length === 2 && (
        <Modal
          isOpen={showModal}
          onRequestClose={handleCloseModal}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 999,
            },
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              maxWidth: "80%",
              maxHeight: "80%",
              overflow: "auto",
              backgroundColor: "#fff",
              borderRadius: "5px",
              outline: "none",
              padding: "20px",
            },
          }}
        >
          <CompareTwoCars car1={selectedCars[0]} car2={selectedCars[1]} />
          <br></br>
          <button onClick={handleCloseModal}>Close</button>
        </Modal>
      )}

      <ul className="grid-container">
        {filteredCars.map((car, index) => (
          <CarCard
            key={index}
            car={car}
            onClick={() => handleCarCardClick(car)}
          />
        ))}
      </ul>
    </>
  );
}

export default CarSection;
