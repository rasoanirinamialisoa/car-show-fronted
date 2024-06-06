import axios from 'axios';

const API_URL = 'http://localhost:3400';

export const updateAppointmentStatus = async (id: number, status: string) => {
  try {
    const response = await axios.put(`${API_URL}/appointement/${id}`, { Status: status });
    return response.data;
  } catch (error) {
    console.error('Error updating appointment status:', error);
    throw error;
  }
};
