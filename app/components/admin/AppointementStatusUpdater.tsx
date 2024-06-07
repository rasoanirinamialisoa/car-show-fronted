import React, { useState } from 'react';
import { updateAppointmentStatus } from '../../api/appointement';
import { toast } from 'react-toastify';

interface AppointmentStatusUpdaterProps {
  appointmentId: number;
  currentStatus: string;
}

const AppointmentStatusUpdater: React.FC<AppointmentStatusUpdaterProps> = ({ appointmentId, currentStatus }) => {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleStatusChange = async (newStatus: string) => {
    setLoading(true);
    setError('');
    try {
      await updateAppointmentStatus(appointmentId, newStatus);
      setStatus(newStatus);
      toast.success(`Appointment ${newStatus}`);
    } catch (error) {
      setError('Failed to update status');
      toast.error('Failed to update appointment status');
    }
    setLoading(false);
  };

  return (
    <div className="flex">
      <button
        onClick={() => handleStatusChange('Confirmed')}
        disabled={loading}
        className="bg-green-500 text-white px-4 py-1 rounded mr-2"
      >
        Confirm
      </button>
      <button
        onClick={() => handleStatusChange('Rejected')}
        disabled={loading}
        className="bg-red-500 text-white px-4 py-2 rounded mr-2"
      >
        Reject
      </button>
      <button
        onClick={() => handleStatusChange('Archived')}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Archive
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AppointmentStatusUpdater;
