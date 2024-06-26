import React, { useEffect, useState } from "react";
import axiosInstance from "@/app/api";
import SERVER_API_URL from "@/app/config";
import { User } from "@/app/types";

const UserCRUD = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [newUser, setNewUser] = useState<User>({
        id: 0,
        name: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axiosInstance.get(`${SERVER_API_URL}/user`);
            console.log("Users fetched:", response.data);  // Log fetched users
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching Users", error);
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

    const handleUpdateUser = async (id: number, updatedUser: User) => {
        try {
            await axiosInstance.put(`${SERVER_API_URL}/user/${id}`, updatedUser);
            fetchUsers();
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const handleDeleteUser = async (id: number) => {
        try {
            await axiosInstance.delete(`${SERVER_API_URL}/user/${id}`);
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleInputChange = (index: number, key: keyof User, value: string | number) => {
        const updatedUsers = [...users];
        updatedUsers[index][key] = value;
        setUsers(updatedUsers);
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">User Management</h2>
            <div className="mb-4 space-y-2">
                <input
                    type="text"
                    placeholder="Name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    placeholder="Password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className="border p-2 rounded"
                />
                <button onClick={handleCreateUser} className="bg-green-500 text-white px-4 py-2 rounded">
                    Create User
                </button>
            </div>
            <table className="w-full">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2">Name</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Password</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td className="border p-2">
                                <input
                                    type="text"
                                    value={user.name}
                                    onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                                    className="w-full"
                                />
                            </td>
                            <td className="border p-2">
                                <input
                                    type="email"
                                    value={user.email}
                                    onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                                    className="w-full"
                                />
                            </td>
                            <td className="border p-2">
                                <input
                                    type="password"
                                    value={user.password}
                                    onChange={(e) => handleInputChange(index, 'password', e.target.value)}
                                    className="w-full"
                                />
                            </td>
                            <td className="border p-2">
                                <button onClick={() => handleUpdateUser(user.id, user)} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                                    Update
                                </button>
                                <button onClick={() => handleDeleteUser(user.id)} className="bg-red-500 text-white px-4 py-2 rounded">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserCRUD;
