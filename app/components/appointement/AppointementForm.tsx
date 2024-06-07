
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import SERVER_API_URL from "../../config";

interface AppointmentFormProps {
    closeModal: () => void;
}

interface Car {
    id: number;
    model: string;
}

const AppointmentForm = ({ closeModal }: AppointmentFormProps) => {
    const [loading, setLoading] = useState(false);
    const [cars, setCars] = useState<Car[]>([]);
    const [appointment, setAppointment] = useState({
        Name: "",
        FirstName: "",
        Email: "",
        Message: "",
        Contact: "",
        AppointmentDate: "",
        Status: "",
        carId: undefined as number | undefined,
    });

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get(`${SERVER_API_URL}/car`);
                setCars(response.data);
            } catch (error) {
                toast.error("Failed to fetch cars.");
                console.error("Error fetching cars:", error);
            }
        };

        fetchCars();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setAppointment({
            ...appointment,
            [name]: name === 'carId' ? String(value) : value,
        });
    };
    
   
    const handleSubmitAppointment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const car = { id: appointment.carId };
            const appointmentData = {
                Name: appointment.Name,
                FirstName: appointment.FirstName,
                Email: appointment.Email,
                Message: appointment.Message,
                Contact: appointment.Contact,
                AppointmentDate: appointment.AppointmentDate,
                Status: appointment.Status,
                car: car,
            };
    
            const response = await axios.post(`${SERVER_API_URL}/appointement`, appointmentData);
    
            if (response.status === 201) {
                toast.success("Appointment booked successfully!");
                closeModal();
            }
        } catch (error) {
            toast.error("Failed to book appointment.");
            console.error("Error booking appointment:", error);
        } finally {
            setLoading(false);
        }
    };
    
        
    return (
        <div className="p-10 pt-5" style={{ minWidth: 500, minHeight: 450 }}>
            <form onSubmit={handleSubmitAppointment}>
               
                <input
                    required
                    type="text"
                    name="Name"
                    value={appointment.Name}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    className="block w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-purple-500 focus:ring"
                />
                <input
                    required
                    type="text"
                    name="FirstName"
                    value={appointment.FirstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    className="block w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-purple-500 focus:ring"
                />
                <input
                    required
                    type="email"
                    name="Email"
                    value={appointment.Email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="block w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-purple-500 focus:ring"
                />
                <textarea
                    required
                    name="Message"
                    value={appointment.Message}
                    onChange={handleInputChange}
                    placeholder="Message"
                    className="block w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-purple-500 focus:ring"
                />
                <input
                    required
                    type="text"
                    name="Contact"
                    value={appointment.Contact}
                    onChange={handleInputChange}
                    placeholder="Contact Number"
                    className="block w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-purple-500 focus:ring"
                />
                <input
                    required
                    type="datetime-local"
                    name="AppointmentDate"
                    value={appointment.AppointmentDate}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-purple-500 focus:ring"
                />
                <input
                    required
                    type="text"
                    name="Status"
                    value={appointment.Status}
                    onChange={handleInputChange}
                    placeholder="Status"
                    className="block w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-purple-500 focus:ring"
                />
                <select
                    required
                    name="carId"
                    value={appointment.carId}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-purple-500 focus:ring"
                >
                    <option value="">Select Car</option>
                    {cars.map((car) => (
                        <option key={car.id} value={car.id}>
                            {car.model}
                        </option>
                    ))}
                </select>
                <button
                    disabled={loading}
                    type="submit"
                    className={`flex justify-center items-center w-full ${loading ? "bg-gray-300" : "bg-purple-500 hover:bg-text-purple-500"} text-white font-bold py-2 px-4 rounded`}
                >
                    {loading && <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-900"></div>}
                    {loading ? "Loading..." : "Submit Appointment"}
                </button>
            </form>
        </div>
    );
};

export default AppointmentForm;
