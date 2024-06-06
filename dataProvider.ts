// dataProvider.ts
import { DataProvider } from 'react-admin';
import fakeDataProvider from 'ra-data-fakerest';

const dataProvider: DataProvider = fakeDataProvider({
  users: [
    { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com', password: 'password' },
  ],
  cars: [
    { id: 1, name: 'Toyota Corolla', description: 'A reliable car', brand: 'Toyota', model: 'Corolla', price: 20000, color: 'Blue', motorType: 'Petrol', power: '120 HP', placeNumber: 5, status: 'Pinned', type: 'Sedan' },
    { id: 2, name: 'Honda Civic', description: 'A stylish car', brand: 'Honda', model: 'Civic', price: 22000, color: 'Red', motorType: 'Petrol', power: '130 HP', placeNumber: 5, status: 'Pinned', type: 'Sedan' },
  ],
  images: [
    { id: 1, productId: 1, url: '/images/corolla1.jpg' },
    { id: 2, productId: 1, url: '/images/corolla2.jpg' },
    { id: 3, productId: 2, url: '/images/civic1.jpg' },
  ],
  appointments: [
    { id: 1, carId: 1, name: 'John', firstName: 'Doe', email: 'john@example.com', message: 'Interested in this car', contact: '1234567890', appointmentDate: new Date(), status: 'pending' },
  ],
});

export default dataProvider;
