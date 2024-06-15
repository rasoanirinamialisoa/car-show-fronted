// utils/fetchCars.ts
import axios from 'axios';

interface FetchCarsParams {
  name: string;
  description: string;
  brand: string;
  model: string;
  color: string;
  power: string;
  place: string;
  status: string;
  type: string;
  images: string;
  motorType: string;
  price: number;
  limit: number;
}

export const fetchCars = async ({ name, description, brand, model, price, color, motorType, power, place, status, type, images, limit }: FetchCarsParams) => {
  try {
    const response = await axios.get('http://localhost:3400/car/search', {
      params: {
        name,
        description,
        brand,
        model,
        price,
        color,
        motorType,
        power,
        place,
        status,
        type,
        images,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching cars");
  }
};
