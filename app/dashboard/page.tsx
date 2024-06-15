"use client";

import React, { useState } from "react";
import UserCRUD from "../components/admin/UserCRUD";
import CarCRUD from "../components/admin/CarCRUD";
import ImageCRUD from "../components/admin/ImageCRUD";
import AppointmentCRUD from "../components/admin/AppointementCRUD";
import { useRouter } from 'next/navigation';



const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/admin");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className=" bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h1>
        <nav className="flex justify-around mb-6">
          <button
            className={`py-2 px-4 rounded ${activeTab === "users" ? "bg-purple-500 text-white" : "bg-gray-200 text-gray-700"}`}
            onClick={() => setActiveTab("users")}
          >
            User Management
          </button>
          <button
            className={`py-2 px-4 rounded ${activeTab === "cars" ? "bg-purple-500 text-white" : "bg-gray-200 text-gray-700"}`}
            onClick={() => setActiveTab("cars")}
          >
            Car Management
          </button>
          <button
            className={`py-2 px-4 rounded ${activeTab === "images" ? "bg-purple-500 text-white" : "bg-gray-200 text-gray-700"}`}
            onClick={() => setActiveTab("images")}
          >
            Image Management
          </button>
          <button
            className={`py-2 px-4 rounded ${activeTab === "appointments" ? "bg-purple-500 text-white" : "bg-gray-200 text-gray-700"}`}
            onClick={() => setActiveTab("appointments")}
          >
            Appointment Management
          </button>
          <button
            className="py-2 px-4 bg-red-500 text-white rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>
        <div className="p-4 border rounded-lg bg-gray-50">
          {activeTab === "users" && <UserCRUD />}
          {activeTab === "cars" && <CarCRUD />}
          {activeTab === "images" && <ImageCRUD />}
          {activeTab === "appointments" && <AppointmentCRUD />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

