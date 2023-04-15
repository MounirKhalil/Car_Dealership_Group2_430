import React, { useState, useEffect } from "react";
import "./CarSection.css";

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
      </section>
      <ul className="grid-container">
        {filteredCars.map((car) => (
          <li className="grid-item" key={car.id}>
            <h2>
              {car.make} {car.model}
            </h2>
            <p>Year: {car.year}</p>
            <p>Price: {car.price}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default CarSection;
