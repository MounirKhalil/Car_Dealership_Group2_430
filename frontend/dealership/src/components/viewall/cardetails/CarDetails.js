import React, { useState, useEffect } from "react";
import SwitchingFlashcards from "./switchingFlashcards/SwitchingFlashcards";
import "./CarDetails.css";

const CarDetails = ({ carID }) => {
  // takes carID as prop  ... and takes user id, if available, using use context done when signed in

  const my_car = {
    _id: "0",
    make: "Honda",
    model: "CRV",
    year: "2002",
    price: "6000",
    color: "Dark Blue",
    image: "https://i.ibb.co/VSVtyPn/honda.png",
    description: "Nice, Very nice",
    quantity: 56,
  };

  const States = { AUTH: "AUTH", NOTAUTH: "NOTAUTH" };

  function getUserToken() {
    return localStorage.getItem("TOKEN");
  }

  let [car, setCar] = useState(my_car);
  let [authState, setAuthState] = useState(
    getUserToken() ? States.AUTH : States.NOTAUTH
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/car/${carID}`); // Replace with your API endpoint
        if (response.ok) {
          const carData = await response.json();
          setCar(carData);
        } else {
          console.error(`Failed to fetch car details with ID ${carID}.`);
        }
      } catch (error) {
        console.error(`Failed to fetch car details with ID ${carID}.`, error);
      }
    };

    fetchData();
  }, [carID]);

  return (
    <div>
      {car ? (
        <div className="CarDetailsContainer0">
          <div className="CarDetailsContainer">
            <div className="CarHero">
              <img src={car.image} className="CarHeroImage" />
            </div>
            <section className="CarInfoSection1">
              <div>
                <SwitchingFlashcards car={car} />
              </div>
            </section>
          </div>
          <div className="CarInfoSection2">
            <h3>Honda CRV 2002 Black</h3>
          </div>
        </div>
      ) : (
        <p>Loading car details...</p>
      )}
    </div>
  );
};

export default CarDetails;
