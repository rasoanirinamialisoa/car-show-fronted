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
    
    const handleSubmitAppointment = async () => {
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
        }
        setLoading(false);
    };
    return (
        <div className="container mt-4">
            <input
                type="text"
                name="Name"
                value={appointment.Name}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="input"
            />
            <input
                type="text"
                name="FirstName"
                value={appointment.FirstName}
                onChange={handleInputChange}
                placeholder="First Name"
                className="input"
            />
            <input
                type="email"
                name="Email"
                value={appointment.Email}
                onChange={handleInputChange}
                placeholder="Email"
                className="input"
            />
            <textarea
                name="Message"
                value={appointment.Message}
                onChange={handleInputChange}
                placeholder="Message"
                className="textarea"
            />
            <input
                type="text"
                name="Contact"
                value={appointment.Contact}
                onChange={handleInputChange}
                placeholder="Contact Number"
                className="input"
            />
            <input
                type="datetime-local"
                name="AppointmentDate"
                value={appointment.AppointmentDate}
                onChange={handleInputChange}
                className="input"
            />
            <input
                type="text"
                name="Status"
                value={appointment.Status}
                onChange={handleInputChange}
                placeholder="Status"
                className="input"
            />
            <select
                name="carId"
                value={appointment.carId}
                onChange={handleInputChange}
                className="input"
            >
                <option value="">Select Car</option>
                {cars.map((car) => (
                    <option key={car.id} value={car.id}>
                        {car.model}
                    </option>
                ))}
            </select>
            <button disabled={loading} onClick={handleSubmitAppointment} className="button mt-3">
                {loading ? "Loading..." : "Submit Appointment"}
            </button>
        </div>
    );
};

export default AppointmentForm;
