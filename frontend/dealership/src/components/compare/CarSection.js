import React, { useState, useEffect } from "react";
import "./CarSection.css";
import CarCard from "./CarCard";
import CompareTwoCars from "./comparetwocars/CompareTwoCars";
import CarDetails from "./cardetails/CarDetails";

import Modal from "react-modal";

function CarSection() {
  const [cars, setCars] = useState([]);

  const [filteredCars, setFilteredCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [makeFilter, setMakeFilter] = useState("");
  const [minPriceFilter, setMinPriceFilter] = useState(0);
  const [maxPriceFilter, setMaxPriceFilter] = useState(999999);

  const [selectedCars, setSelectedCars] = useState([]);
  const [comparisonMode, setComparisonMode] = useState(false);

  const [showCarDetails, setShowCarDetails] = useState(false);
  const [CarId, setCarId] = useState("");
  const [selectedCarDetails, setSelectedCarDetails] = useState(null);

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

  useEffect(() => {
    function filterCars() {
      let filtered = cars.filter((car) => {
        // Apply make filter
        if (makeFilter && makeFilter !== "" && car.make !== makeFilter) {
          return false;
        }
        // Apply price filters
        if (
          car.price < parseInt(minPriceFilter) ||
          car.price > parseInt(maxPriceFilter)
        ) {
          return false;
        }
        // Apply search term filter
        if (
          searchTerm &&
          searchTerm !== "" &&
          !car.model.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return false;
        }
        return true;
      });
      setFilteredCars(filtered);
    }
    filterCars();
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
      setCarId(car.id);
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

  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (showCarDetails) {
      setShowResults(true);
    }
  }, [showCarDetails]);

  const [my_car, setMyCar] = useState({});
  useEffect(() => {
    const fetchCar = async (CarId) => {
      try {
        const response = await fetch(
          `http://www.epharmac.store:8081/car/${CarId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        setMyCar(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (CarId != "") {
      fetchCar(CarId);
    }
  }, [CarId]);

  return (
    <>
      <section
        className="SearchBar"
        style={{ display: showResults ? "none" : "flex" }}
      >
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
            <option value="Tesla">Tesla</option>
            <option value="Nissan">Nissan</option>
            <option value="BMW">BMW</option>
            <option value="Audi">Audi</option>
            <option value="Jeep">Jeep</option>
            <option value="Dodge">Dodge</option>
            <option value="Lexus">Lexus</option>
            <option value="Infiniti">Infiniti</option>
            <option value="Subaru">Subaru</option>
            <option value="Mazda">Mazda</option>
            <option value="Volvo">Volvo</option>
            <option value="Kia">Kia</option>
            <option value="Hyundai">Hyundai</option>
            <option value="Jaguar">Jaguar</option>
            <option value="Mercedes-Benz">Mercedes-Benz</option>
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

      {showCarDetails && <CarDetails my_car={my_car} />}

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

      <ul
        className="grid-container"
        style={{ display: showResults ? "none" : "grid" }}
      >
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
