import React, { useEffect, useState } from "react";
import axiosInstance from "@/app/api";
import SERVER_API_URL from "@/app/config";
import { Car } from "@/app/types";

const CarCRUD = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [newCar, setNewCar] = useState({ name:"", description: "", price:"", brand: "", model: "", motorType: "", power: "", place: "", status: "", type: "" });

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        const response = await axiosInstance.get(`${SERVER_API_URL}/car`);
        setCars(response.data);
    };

    const handleCreateCar = async () => {
        await axiosInstance.post(`${SERVER_API_URL}/car`, newCar);
        fetchCars();
    };

    const handleUpdateCar = async (id: string, updatedCar: Car) => {
        await axiosInstance.put(`${SERVER_API_URL}/car/${id}`, updatedCar);
        fetchCars();
    };

    const handleDeleteCar = async (id: string) => {
        await axiosInstance.delete(`${SERVER_API_URL}/car/${id}`);
        fetchCars();
    };

    const handleInputChange = (index: number, key: keyof Car, value: string | number) => {
        const updatedCars = [...cars];
        updatedCars[index][key] = value;
        setCars(updatedCars);
    };

    return (
        <div>
            <h2>Car Management</h2>
            <div>
                <input
                    type="text"
                    placeholder="Name"
                    value={newCar.name}
                    onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Name"
                    value={newCar.name}
                    onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Brand"
                    value={newCar.brand}
                    onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Model"
                    value={newCar.model}
                    onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Motor Type"
                    value={newCar.motorType}
                    onChange={(e) => setNewCar({ ...newCar, motorType: e.target.value })}
                />
                <button onClick={handleCreateCar}>Create Car</button>
            </div>
            <ul>
                {cars.map((car, index) => (
                    <li key={car.id}>
                         <input
                            type="text"
                            value={car.name}
                            onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                        />
                         <input
                            type="text"
                            value={car.description}
                            onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                        />
                        <input
                            type="text"
                            value={car.brand}
                            onChange={(e) => handleInputChange(index, 'brand', e.target.value)}
                        />
                        <input
                            type="text"
                            value={car.model}
                            onChange={(e) => handleInputChange(index, 'model', e.target.value)}
                        />
                            <input
                            type="text"
                            value={car.price}
                            onChange={(e) => handleInputChange(index, 'price', e.target.value)}
                        />
                         <input
                            type="text"
                            value={car.color}
                            onChange={(e) => handleInputChange(index, 'color', e.target.value)}
                        />
                        <input
                            type="text"
                            value={car.motorType}
                            onChange={(e) => handleInputChange(index, 'motorType', e.target.value)}
                        />
                         <input
                            type="text"
                            value={car.power}
                            onChange={(e) => handleInputChange(index, 'power', e.target.value)}
                        />
                            <input
                            type="text"
                            value={car.place}
                            onChange={(e) => handleInputChange(index, 'place', e.target.value)}
                        />
                         <input
                            type="text"
                            value={car.status}
                            onChange={(e) => handleInputChange(index, 'status', e.target.value)}
                        />
                         <input
                            type="text"
                            value={car.status}
                            onChange={(e) => handleInputChange(index, 'type', e.target.value)}
                        />
                        <button onClick={() => handleUpdateCar(car.id, car)}>Update</button>
                        <button onClick={() => handleDeleteCar(car.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CarCRUD;