import React, { useState, useEffect } from "react";
import "./Profile.css";

function Profile() {
  const [userInfo, setUserInfo] = useState({
    name: "Name",
    email: "Email",
    Mobile: "Mobile",
  });
  const [reservedTimeSlot, setReservedTimeSlot] = useState("no test drive");
  const [tokenData, setTokenData] = useState(null);

  useEffect(() => {
    const tokenDataString = localStorage.getItem("tokenData");
    if (tokenDataString) {
      const parsedTokenData = JSON.parse(tokenDataString);
      setTokenData(parsedTokenData);
    }
  }, []);

  useEffect(() => {
    if (tokenData != null) {
      const userId = tokenData.id;
      console.log(userId);

      const getUserData = async () => {
        const response = await fetch(`http://127.0.0.1:5000/user/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const userdata = await response.json();

        setUserInfo({
          name: `${userdata.first_name} ${userdata.last_name}`,
          email: userdata.email,
          Mobile: userdata.mobile,
          reservedTimeSlot: userdata.reservedTimeSlot || "",
        });
        //   setReservedTimeSlot(userdata.reservedTimeSlot || "");
      };

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

      getUserData();
      getTimeSlot();
    }
  }, [tokenData]);

  const deleteTimeSlot = async () => {
    const userId = tokenData.id;
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/delete_timeslot/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error(error);
    }
    window.location.reload();
  };

  return (
    <div>
      <h1 className="profile-page-name">Welcome, {userInfo.name}!</h1>
      <div className="profile-page-container">
        <div className="profile-page-info">
          <h2>Message:</h2>
          <p>Thank you for using our platform please enjoy your time here!</p>
        </div>
        <div className="profile-page-otherinfo">
          <h2 className="profile-page-email">Your email: {userInfo.email}</h2>
          <h3>Mobile: {userInfo.Mobile}</h3>
          {reservedTimeSlot !== "no test drive" && (
            <div className="profile-page-reserved-timeslot">
              <h3>Your reserved time slot: {reservedTimeSlot}</h3>
              <button
                className="profile-page-button"
                type="button"
                onClick={() => deleteTimeSlot()}
              >
                Unbook test drive
              </button>
            </div>
          )}
          {reservedTimeSlot == "no test drive" && (
            <h3>You don't have a test drive booked.</h3>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
