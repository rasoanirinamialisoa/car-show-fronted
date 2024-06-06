"use client";

import React, { useState } from "react";
import axiosInstance from "@/app/api";
import SERVER_API_URL from "@/app/config";
import { User } from "@/app/types";
import { jwtDecode } from "jwt-decode";  // Notez la correction : supprimez les accolades

interface SignUpProps {
    onClose: () => void;
    setUserLoggedIn: React.Dispatch<React.SetStateAction<User | undefined>>
    setCurrentPage: React.Dispatch<React.SetStateAction<string>>
}

const SignUp: React.FC<SignUpProps> = ({ onClose, setUserLoggedIn, setCurrentPage }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        console.log("Données envoyées:", {
            Email: email,
            Password: password,
            confirmPassword: confirmPassword,
            Name: name
        });

        try {
            const response = await axiosInstance.post(`${SERVER_API_URL}/auth/signup`, {
                Email: email,
                Password: password,
                confirmPassword: confirmPassword,
                Name: name
            });

            console.log("Réponse de l'API:", response);

            if (response.status === 201 || response.status === 200) {
                const user = response.data;
                console.log("Token reçu:", user.access_token);

                localStorage.setItem("token", user.access_token);
                const decodedData = jwtDecode<User>(user.access_token);
                console.log("Données décodées:", decodedData);

                if (decodedData) {
                    setUserLoggedIn(decodedData);
                }
                onClose();
            }
        } catch (e: any) {
            console.error("Erreur reçue:", e);

            if (e.response && e.response.status === 406) {
                setError('This email is already taken!');
            } else {
                setError('Unknown error, please refresh and try again!');
            }
        }
        setLoading(false);
    };

    return (
        <div className="p-10 pt-5" style={{ minWidth: 500, minHeight: 450 }}>
            <form onSubmit={handleSubmit}>
                {error && (
                    <div className="w-full px-2 py-2 mb-5 bg-red-200 text-center">{error}</div>
                )}
                <input
                    required
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-purple-500 focus:ring "
                />
                <input
                    required
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-purple-500 focus:ring"
                />
                <input
                    required
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-purple-500 focus:ring "
                />
                <input
                    required
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-purple-500 focus:ring "
                />
                <button
                    disabled={loading}
                    type="submit"
                    className={`flex justify-center items-center w-full ${loading ? "bg-gray-300" : "bg-purple-500 hover:bg-text-purple-500"} text-white font-bold py-2 px-4 rounded`}
                >
                    {loading && <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-900"></div>}
                    Signup
                </button>
            </form>
        </div>
    );
};

export default SignUp;
