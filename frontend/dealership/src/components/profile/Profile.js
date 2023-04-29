import React, { useState, useEffect } from "react";
import "./Profile.css";

function Profile() {
  const [userInfo, setUserInfo] = useState({
    name: "Name",
    email: "Email",
    Mobile: "Mobile",
    reservedTimeSlot: "",
  });
  const [reservedTimeSlot, setReservedTimeSlot] = useState("");
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

      getUserData();
    }
  }, [tokenData]);
  console.log(userInfo);
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
          {userInfo.reservedTimeSlot !== "" && (
            <div className="profile-page-reserved-timeslot">
              <h3>Your reserved time slot: {userInfo.reservedTimeSlot}</h3>
              <button className="profile-page-button" type="button">
                Unbook test drive
              </button>
              <button className="profile-page-button" type="button">
                Edit booking
              </button>
            </div>
          )}
          {userInfo.reservedTimeSlot == "" && (
            <h3>You don't have a test drive booked.</h3>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
