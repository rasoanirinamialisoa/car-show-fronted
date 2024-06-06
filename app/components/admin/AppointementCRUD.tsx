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
    <div>
      <h2>Manage Appointments</h2>
      {loading && <p>Loading appointments...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {appointments.map((appointment) => (
        <div key={appointment.id} className="appointment">
          <p>{appointment.Name} {appointment.FirstName}</p>
          <p>{appointment.Email}</p>
          <p>{appointment.Message}</p>
          <p>{appointment.Contact}</p>
          <p>{new Date(appointment.AppointementDate).toLocaleString()}</p>
          <p>{appointment.Status}</p>
          <AppointmentStatusUpdater appointmentId={appointment.id} currentStatus={appointment.Status} />
        </div>
      ))}
    </div>
  );
};

export default AppointmentCRUD;
