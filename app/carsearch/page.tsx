// pages/carsearch.tsx (ou votre composant Next.js)
"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CarProps } from '../types';
import { CartCarCard } from '../components';

const CarSearch = () => {
  const router = useRouter();
  const { model } = router.push;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cars, setCars] = useState<CarProps[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3400/car/search/model/${model}`);
        if (!response.ok) {
          throw new Error('Failed to fetch cars');
        }
        const data = await response.json();
        setCars(data);
      } catch (error) {
        setError('Error fetching cars');
      }
      setLoading(false);
    };

    if (model) {
      fetchCars();
    }
  }, [model]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="home__cars-wrapper">
      {cars && cars.length > 0 ? (
        cars.map((car) => (
          <CartCarCard key={car.id} car={car} />
        ))
      ) : (
        <div>No cars found.</div>
      )}
    </div>
  );
};

export default CarSearch;
