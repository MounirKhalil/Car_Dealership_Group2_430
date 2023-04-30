import React, { useState, useEffect } from "react";
import SwitchingFlashcards from "./switchingFlashcards/SwitchingFlashcards";
import "./CarDetails.css";
import TestDriveBooking from "./testdrivebooking/TestDriveBooking";

const CarDetails = ({ my_car }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [reservedTimeSlot, setReservedTimeSlot] = useState("no test drive");
  const [tokenData, setTokenData] = useState(null);

  useEffect(() => {
    const tokenDataString = localStorage.getItem("tokenData");
    if (tokenDataString) {
      const parsedTokenData = JSON.parse(tokenDataString);
      setTokenData(parsedTokenData);
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (tokenData != null) {
      const userId = tokenData.id;
      const getTimeSlot = async () => {
        const response = await fetch(
          `http://127.0.0.1:5000/slot_by_id/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const timeslotData = await response.json();

        setReservedTimeSlot(timeslotData.time);
      };

      getTimeSlot();
    }
  }, [tokenData]);

  return (
    <div>
      <div className="CarDetailsContainer0">
        <div className="CarDetailsContainer">
          <div className="CarHero">
            <img src={my_car.image} className="CarHeroImage" />
          </div>
          <section className="CarInfoSection1">
            <div>
              <SwitchingFlashcards car={my_car} />
            </div>
          </section>
        </div>
        <div className="CarInfoSection2">
          <h3>
            {my_car.make} {my_car.model} {my_car.year} {my_car.color}
          </h3>
        </div>
      </div>

      {loggedIn ? (
        <>
          {reservedTimeSlot !== "no test drive" && (
            <p
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#333",
                textAlign: "center",
              }}
            >
              You already reserved your test drive at {reservedTimeSlot} please
              enter profile tab to remove it if you wish to change
            </p>
          )}
          {reservedTimeSlot === "no test drive" && <TestDriveBooking />}
        </>
      ) : (
        <p
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "#333",
            textAlign: "center",
          }}
        >
          {" "}
          Please Sing in to book the car!
        </p>
      )}
    </div>
  );
};

export default CarDetails;
