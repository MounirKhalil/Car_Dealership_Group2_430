import '../styles/CarCard.css';

const CarCard = ({ car }) => {
    return (
      <div className="car-card">
        <img src={car.image} alt={`${car.make} ${car.model}`} />
        <h2>{`${car.make} ${car.model}`}</h2>
        <p>{`Year: ${car.year}`}</p>
        <p>{`Price: $${car.price}`}</p>
        <button className="test-drive-btn">Request Test Drive</button>
      </div>
    );
  };

  export default CarCard;