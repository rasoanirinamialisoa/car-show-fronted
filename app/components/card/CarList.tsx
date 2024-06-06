"use client";

import { useState, useEffect } from "react";
import { CarProps } from "@/app/types";
import SERVER_API_URL from "@/app/config";
import CartCarCard from "./CartCarCard";

const CarList = () => {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(`${SERVER_API_URL}/car`);
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
  }, []);

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

export default CarList;
