import { useState, useEffect } from "react";
import { CarProps } from "@/app/types";
import SERVER_API_URL from "@/app/config";
import CartCarCard from "./CartCarCard";

interface CarSearchProps {
  cars: CarProps[];
  model: string;
}

const CarSearch = ({ cars, model }: CarSearchProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [car, setCars] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${SERVER_API_URL}/car/search/model/${model}`);
        if (!response.ok) {
          throw new Error("Failed to fetch cars");
        }
        const data = await response.json();
        setCars(data);
      } catch (error) {
        setError("Error fetching cars");
      }
      setLoading(false);
    };

    fetchCars();
  }, [model]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="home__cars-wrapper">
      {cars.map((car) => (
        <CartCarCard key={car.id} car={car} />
      ))}
    </div>
  );
};

export default CarSearch;
