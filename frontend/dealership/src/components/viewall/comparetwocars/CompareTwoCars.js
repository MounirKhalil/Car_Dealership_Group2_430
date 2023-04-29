import React from "react";
import "./CompareTwoCars.css";

const CompareTwoCars = ({ car1, car2 }) => {
  const compareValue = (value1, value2) => {
    if (value1 > value2) return "higher";
    if (value1 < value2) return "lower";
    return "equal";
  };

  return (
    <div className="compare-container">
      <table className="compare-table">
        <thead>
          <tr>
            <th colSpan="2">Car Comparison</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="image-cell">
              <img src={car1.image} alt={`${car1.make} ${car1.model}`} />
            </td>
            <td className="image-cell">
              <img src={car2.image} alt={`${car2.make} ${car2.model}`} />
            </td>
          </tr>
          <tr>
            <td className={`data-cell ${compareValue(car1.year, car2.year)}`}>
              {car1.year}
            </td>
            <td className={`data-cell ${compareValue(car2.year, car1.year)}`}>
              {car2.year}
            </td>
          </tr>
          <tr>
            <td className="data-cell">{car1.make}</td>
            <td className="data-cell">{car2.make}</td>
          </tr>
          <tr>
            <td className="data-cell">{car1.model}</td>
            <td className="data-cell">{car2.model}</td>
          </tr>
          <tr>
            <td className={`data-cell ${compareValue(car1.price, car2.price)}`}>
              ${car1.price}
            </td>
            <td className={`data-cell ${compareValue(car2.price, car1.price)}`}>
              ${car2.price}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CompareTwoCars;
