import "./CarCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import React, { useState } from "react";

const CarCard = ({ car, onClick }) => {
  const [isClicked, setIsClicked] = useState(false);
  const boxWrapperStyle = {
    backgroundColor: isClicked ? "lightgrey" : "white",
  };
  return (
    <div
      class="box-wrapper"
      onClick={() => {
        setIsClicked(true);
        onClick();
      }}
      style={boxWrapperStyle}
    >
      <img src={car.image} alt="rhcp" />
      <div class="box-content">
        <a class="buy" href="javascript:void(0)">
          <span>
            <FontAwesomeIcon
              className="img-arrow"
              icon={faArrowRight}
              color="white"
            />
          </span>
        </a>
        <div class="title">{`${car.make} ${car.model}`}</div>
        <div class="desc">{`Year: ${car.year}`}</div>
        <span class="price">{`Price: $${car.price}`}</span>
        <div class="footer"></div>
      </div>
    </div>
  );
};

export default CarCard;
