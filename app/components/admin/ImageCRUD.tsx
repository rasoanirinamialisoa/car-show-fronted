import React, { useEffect, useState } from "react";
import axiosInstance from "@/app/api";
import SERVER_API_URL from "@/app/config";
import { Car, Image } from "@/app/types";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ImageCRUD = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<string>("");

  useEffect(() => {
    fetchImages();
    fetchCars();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axiosInstance.get(`${SERVER_API_URL}/images`);
      setImages(response.data);
      toast.success("Images fetched successfully.");
    } catch (error) {
      console.error("Error fetching images:", error);
      toast.error("Failed to fetch images.");
    }
  };

  const fetchCars = async () => {
    try {
      const response = await axiosInstance.get(`${SERVER_API_URL}/car`);
      setCars(response.data);
      toast.success("Cars fetched successfully.");
    } catch (error) {
      console.error("Error fetching cars:", error);
      toast.error("Failed to fetch cars.");
    }
  };

  const handleUploadImage = async () => {
    if (!newImage || !selectedCar) return;
  
    const formData = new FormData();
    formData.append("image", newImage);
    formData.append("carId", selectedCar);
  
    try {
      await axiosInstance.post(`${SERVER_API_URL}/images/new`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchImages();
      toast.success("Image uploaded successfully.");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image.");
    }
  };
  

  const handleDeleteImage = async (id: string) => {
    try {
      await axiosInstance.delete(`${SERVER_API_URL}/images/delete/${id}`);
      fetchImages();
      toast.success("Image deleted successfully.");
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image.");
    }
  };

  const handleUpdateImage = async (id: string) => {
    console.log(`Update image with ID: ${id}`);
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-4">Image Management</h2>
      <div className="flex justify-center items-center space-x-4 mb-4">
        <input
          type="file"
          onChange={(e) => setNewImage(e.target.files ? e.target.files[0] : null)}
        />
        <select onChange={(e) => setSelectedCar(e.target.value)} className="p-2">
          <option value="">Select Car</option>
          {cars.map((car) => (
            <option key={car.id} value={car.id}>
              {car.make} {car.model}
            </option>
          ))}
        </select>

        <button onClick={handleUploadImage} className="bg-blue-500 text-white px-4 py-2 rounded">Upload Image</button>
      </div>
      <ul className="text-left">
        {images.map((image) => (
          <li key={image.id} className="flex flex-col items-center mb-4">
            <img src={image.url} alt={image.filename} className="h-100 w-100 object-cover mb-2" />
            <div className="flex space-x-4">
              <button onClick={() => handleDeleteImage(image.id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
              <button onClick={() => handleUpdateImage(image.id)} className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageCRUD;
