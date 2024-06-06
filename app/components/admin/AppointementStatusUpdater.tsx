import React, { useState } from 'react';
import { updateAppointmentStatus } from '../../api/appointement';

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
    } catch (error) {
      setError('Failed to update status');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Update Appointment Status</h2>
      <p>Current Status: {status}</p>
      <button onClick={() => handleStatusChange('Confirmed')} disabled={loading}>
        Confirm
      </button>
      <button onClick={() => handleStatusChange('Rejected')} disabled={loading}>
        Reject
      </button>
      <button onClick={() => handleStatusChange('Archived')} disabled={loading}>
        Archive
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AppointmentStatusUpdater;
