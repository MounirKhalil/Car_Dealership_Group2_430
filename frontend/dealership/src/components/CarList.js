import CarCard from "./CarCard";
import '../styles/CarList.css';

const cars = [
  {
    id: 1,
    make: "Toyota",
    model: "Camry",
    year: 2022,
    price: 25000,
    image: "",
  },
  {
    id: 2,
    make: "Honda",
    model: "Civic",
    year: 2021,
    price: 22000,
    image: "",
  },
  {
    id: 3,
    make: "Ford",
    model: "Mustang",
    year: 2022,
    price: 35000,
    image: "",
  },
  {
    id: 4,
    make: "Chevrolet",
    model: "Corvette",
    year: 2022 ,
    price: 80000,
    image: "",
  },
];

  const CarList = () => {
    return (
      <div className="car-list">
        {cars.map((car, index) => (
          <CarCard key={index} car={car} />
        ))}
      </div>
    );
  };
  
  export default CarList;