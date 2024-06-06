import React, { useEffect, useState } from 'react';
import axiosInstance from 'axios';
import AppointmentStatusUpdater from './AppointementStatusUpdater';
import SERVER_API_URL from "@/app/config";

interface Appointment {
  id: number;
  Name: string;
  FirstName: string;
  Email: string;
  Message: string;
  Contact: string;
  AppointementDate: Date;
  Status: string;
}

const AppointmentCRUD: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`${SERVER_API_URL}/appointement`);
        setAppointments(response.data);
      } catch (error) {
        setError('Failed to fetch appointments');
      }
      setLoading(false);
    };

    fetchAppointments();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Manage Appointments</h2>
      {loading && <p>Loading appointments...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">First Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Message</th>
            <th className="p-2">Contact</th>
            <th className="p-2">Appointment Date</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id} className="border-b">
              <td className="p-2">{appointment.Name}</td>
              <td className="p-2">{appointment.FirstName}</td>
              <td className="p-2">{appointment.Email}</td>
              <td className="p-2">{appointment.Message}</td>
              <td className="p-2">{appointment.Contact}</td>
              <td className="p-2">{new Date(appointment.AppointementDate).toLocaleString()}</td>
              <td className="p-2">{appointment.Status}</td>
              <td className="p-2">
                <AppointmentStatusUpdater appointmentId={appointment.id} currentStatus={appointment.Status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentCRUD;
