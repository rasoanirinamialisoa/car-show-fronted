import React, { useEffect, useState } from "react";
import axiosInstance from "@/app/api";
import SERVER_API_URL from "@/app/config";
import { User } from "@/app/types";

const UserCRUD = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userInputs, setUserInputs] = useState<{ [key: string]: { name: string; email: string } }>({});
  const [newUser, setNewUser] = useState({ name: "", email: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get(`${SERVER_API_URL}/user`);
      console.log("Users fetched:", response.data);
      setUsers(response.data);
      const inputs = response.data.reduce((acc: any, user: User) => {
        acc[String(user.id)] = { name: user.name, email: user.email };
        return acc;
      }, {});
      setUserInputs(inputs);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleCreateUser = async () => {
    try {
      await axiosInstance.post(`${SERVER_API_URL}/user`, newUser);
      fetchUsers();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleUpdateUser = async (id: string, updates: Partial<User>) => {
    try {
      await axiosInstance.put(`${SERVER_API_URL}/user/${id}`, updates);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await axiosInstance.delete(`${SERVER_API_URL}/user/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleInputChange = (id: string, field: string, value: string) => {
    setUserInputs((prevInputs) => ({
      ...prevInputs,
      [id]: {
        ...prevInputs[id],
        [field]: value,
      },
    }));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>
      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="border p-2 rounded"
        />
        <button onClick={handleCreateUser} className="bg-green-500 text-white px-4 py-2 rounded">Create User</button>
      </div>
      <ul>
        {users.map((user, index) => (
          <li key={user.id} className="mb-4 flex items-center space-x-2">
            <input
              type="text"
              value={user.name}
              onChange={(e) => handleInputChange(index, 'name', e.target.value)}
              className="border p-2 rounded flex-grow"
            />
            <input
              type="email"
              key={userInputs[String(user.id)]?.email || ""}
              onChange={(e) => handleInputChange(String(user.id), "email", e.target.value)}
              className="border p-2 rounded flex-grow"
            />
            <button onClick={() => handleUpdateUser(String(user.id), userInputs[String(user.id)])} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Update</button>
            <button onClick={() => handleDeleteUser(String(user.id))} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserCRUD;
