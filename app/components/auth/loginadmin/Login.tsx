import React, { useState } from "react";
import axiosInstance from "@/app/api";
import SERVER_API_URL from "@/app/config";
import { User } from "@/app/types";
import { jwtDecode } from "jwt-decode";
import { useRouter } from 'next/navigation';

interface LoginProps {
    onClose: () => void;
    setUserLoggedIn: React.Dispatch<React.SetStateAction<User | undefined>>;
    setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}

const Login: React.FC<LoginProps> = ({ onClose, setUserLoggedIn, setCurrentPage }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter(); // Utiliser le routeur de Next.js

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        console.log("Données envoyées:", {
            Email: email,
            Password: password,
        });

        try {
            const response = await axiosInstance.post(`${SERVER_API_URL}/auth/signinAdmin`, {
                Email: email,
                Password: password
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
                router.push('/dashboard'); // Rediriger vers le tableau de bord
            }
        } catch (e: any) {
            console.error("Erreur reçue:", e);

            if (e.response && e.response.status === 401) {
                setError('Invalid email or password!');
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
                <button
                    disabled={loading}
                    type="submit"
                    className={`flex justify-center items-center w-full ${loading ? "bg-gray-300" : "bg-purple-500 hover:bg-text-purple-500"} text-white font-bold py-2 px-4 rounded`}
                >
                    {loading && <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-900"></div>}
                    Login admin
                </button>
            </form>
        </div>
    );
};

export default Login;
