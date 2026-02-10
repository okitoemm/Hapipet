import { Booking } from '../types';

export const mockBookings: Booking[] = [
  {
    id: '1',
    clientId: 'client1',
    dogsitterId: 'dogsitter1',
    dogId: 'dog1',
    startTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
    endTime: new Date(Date.now() + 26 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
    totalPrice: 45,
    paymentStatus: 'pending',
    client: {
      id: 'client1',
      fullName: 'Jean Martin',
      email: 'jean.martin@example.com',
      type: 'client',
    },
    dogsitter: {
      id: 'dogsitter1',
      fullName: 'Marie Dubois',
      email: 'marie.dubois@example.com',
      type: 'dogsitter',
    },
    dog: {
      id: 'dog1',
      name: 'Rex',
      breed: 'Labrador',
      age: 3,
      weight: 25,
      ownerId: 'client1',
    },
  },
  {
    id: '2',
    clientId: 'client1',
    dogsitterId: 'dogsitter2',
    dogId: 'dog1',
    startTime: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), // 2 days ago
    endTime: new Date(Date.now() - 46 * 60 * 60 * 1000).toISOString(),
    status: 'completed',
    totalPrice: 35,
    paymentStatus: 'paid',
    client: {
      id: 'client1',
      fullName: 'Jean Martin',
      email: 'jean.martin@example.com',
      type: 'client',
    },
    dogsitter: {
      id: 'dogsitter2',
      fullName: 'Sophie Bernard',
      email: 'sophie.bernard@example.com',
      type: 'dogsitter',
    },
    dog: {
      id: 'dog1',
      name: 'Rex',
      breed: 'Labrador',
      age: 3,
      weight: 25,
      ownerId: 'client1',
    },
  },
  {
    id: '3',
    clientId: 'client1',
    dogsitterId: 'dogsitter1',
    dogId: 'dog1',
    startTime: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(), // In 3 days
    endTime: new Date(Date.now() + 74 * 60 * 60 * 1000).toISOString(),
    status: 'confirmed',
    totalPrice: 40,
    paymentStatus: 'pending',
    client: {
      id: 'client1',
      fullName: 'Jean Martin',
      email: 'jean.martin@example.com',
      type: 'client',
    },
    dogsitter: {
      id: 'dogsitter1',
      fullName: 'Marie Dubois',
      email: 'marie.dubois@example.com',
      type: 'dogsitter',
    },
    dog: {
      id: 'dog1',
      name: 'Rex',
      breed: 'Labrador',
      age: 3,
      weight: 25,
      ownerId: 'client1',
    },
  },
];