
import React, { useEffect, useState } from "react";
import axiosInstance from "@/app/api";
import SERVER_API_URL from "@/app/config";
import { Car } from "@/app/types";

const CarCRUD = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [newCar, setNewCar] = useState<Car>({
        name: "",
        description: "",
        price: "",
        brand: "",
        model: "",
        motorType: "",
        power: "",
        place: "",
        status: "",
        type: "",
        color: ""
    });

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const response = await axiosInstance.get(`${SERVER_API_URL}/car`);
            setCars(response.data);
        } catch (error) {
            console.error("Error fetching cars:", error);
        }
    };

    const handleCreateCar = async () => {
        try {
            await axiosInstance.post(`${SERVER_API_URL}/car`, newCar);
            fetchCars();
        } catch (error) {
            console.error("Error creating car:", error);
        }
    };

    const handleUpdateCar = async (id: string, updatedCar: Car) => {
        try {
            await axiosInstance.put(`${SERVER_API_URL}/car/${id}`, updatedCar);
            fetchCars();
        } catch (error) {
            console.error("Error updating car:", error);
        }
    };

    const handleDeleteCar = async (id: string) => {
        try {
            await axiosInstance.delete(`${SERVER_API_URL}/car/${id}`);
            fetchCars();
        } catch (error) {
            console.error("Error deleting car:", error);
        }
    };

    const handleInputChange = (index: number, key: keyof Car, value: string | number) => {
        const updatedCars = [...cars];
        updatedCars[index][key] = value;
        setCars(updatedCars);
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Car Management</h2>
            <div className="mb-4 space-y-2">
                <input
                    type="text"
                    placeholder="Name"
                    value={newCar.name}
                    onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newCar.description}
                    onChange={(e) => setNewCar({ ...newCar, description: e.target.value })}
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    placeholder="Brand"
                    value={newCar.brand}
                    onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })}
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    placeholder="Model"
                    value={newCar.model}
                    onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
                    className="border p-2 rounded"
                />
                <input
                    type="number"
                    placeholder="Motor Type"
                    value={newCar.motorType}
                    onChange={(e) => setNewCar({ ...newCar, motorType: e.target.value })}
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    placeholder="Price"
                    value={newCar.price}
                    onChange={(e) => setNewCar({ ...newCar, price: e.target.value })}
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    placeholder="Color"
                    value={newCar.color}
                    onChange={(e) => setNewCar({ ...newCar, color: e.target.value })}
                    className="border p-2 rounded"
                />
                {/* Add more input fields for other properties */}
                <button onClick={handleCreateCar} className="bg-green-500 text-white px-4 py-2 rounded">Create Car</button>
            </div>
            <table className="w-full">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2">Name</th>
                        <th className="p-2">Description</th>
                        <th className="p-2">Brand</th>
                        <th className="p-2">Model</th>
                        <th className="p-2">Motor Type</th>
                        <th className="p-2">Price</th>
                        <th className="p-2">Color</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map((car, index) => (
                        <tr key={car.id}>
                            <td className="border p-2">
                                <input
                                    type="text"
                                    value={car.name}
                                    onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                                    className="w-full"
                                />
                            </td>
                            <td className="border p-2">
                                <input
                                    type="text"
                                    value={car.description}
                                    onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                                    className="w-full"
                                />
                            </td>
                            <td className="border p-2">
                                <input
                                    type="text"
                                    value={car.brand}
                                    onChange={(e) => handleInputChange(index, 'brand', e.target.value)}
                                    className="w-full"
                                />
                            </td>
                            <td className="border p-2">
                                <input
                                    type="text"
                                    value={car.model}
                                    onChange={(e) => handleInputChange(index, 'model', e.target.value)}
                                    className="w-full"
                                />
                            </td>
                            <td className="border p-2">
                                <input
                                    type="text"
                                    value={car.motorType}
                                    onChange={(e) => handleInputChange(index, 'motorType', e.target.value)}
                                    className="w-full"
                                />
                            </td>
                            <td className="border p-2">
                                <input
                                    type="text"
                                    value={car.price}
                                    onChange={(e) => handleInputChange(index, 'price', e.target.value)}
                                    className="w-full"
                                />
                            </td>
                            <td className="border p-2">
                                <input
                                    type="text"
                                    value={car.color}
                                    onChange={(e) => handleInputChange(index, 'color', e.target.value)}
                                    className="w-full"
                                />
                            </td>
                            <td className="border p-2">
                                <button onClick={() => handleUpdateCar(car.id, car)} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Update</button>
                            </td>

                            <td className="border p-2">
                            
                            <button onClick={() => handleDeleteCar(car.id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CarCRUD;
