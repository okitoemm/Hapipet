// Types
import { User, DogsitterProfile, Dog, Booking } from '../types';

// Mock des utilisateurs
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'test@test.com',
    fullName: 'John Doe',
    type: 'client',
    avatar: 'https://picsum.photos/200',
    address: '123 rue de Paris',
    phone: '+33612345678',
  },
  {
    id: '2',
    email: 'sarah@test.com',
    fullName: 'Sarah Martin',
    type: 'dogsitter',
    avatar: 'https://picsum.photos/201',
    address: '456 avenue des Champs-Élysées',
    phone: '+33623456789',
  },
];

// Mock des dog-sitters
export const mockDogsitters: DogsitterProfile[] = [
  {
    id: '2',
    email: 'sarah@test.com',
    fullName: 'Sarah Martin',
    type: 'dogsitter',
    description: 'Passionnée par les animaux depuis toujours. Je propose des balades et du dog-sitting avec attention.',
    hourlyRate: 15,
    dailyRate: 50,
    rating: 4.8,
    avatar: 'https://picsum.photos/201',
    availability: {
      'Lundi': ['9:00-12:00', '14:00-18:00'],
      'Mardi': ['9:00-12:00', '14:00-18:00'],
      'Mercredi': ['9:00-12:00', '14:00-18:00'],
      'Jeudi': ['9:00-12:00', '14:00-18:00'],
      'Vendredi': ['9:00-12:00', '14:00-18:00'],
    },
    reviews: [
      {
        id: '1',
        rating: 5,
        comment: 'Excellente dog-sitter, très attentionnée !',
        authorId: '1',
        targetId: '2',
        createdAt: '2025-09-01',
      }
    ],
    location: {
      latitude: 48.8566,
      longitude: 2.3522,
    }
  }
];

// Mock des chiens
export const mockDogs: Dog[] = [
  {
    id: '1',
    name: 'Max',
    breed: 'Labrador',
    age: 3,
    ownerId: '1',
    photo: 'https://images.dog.ceo/breeds/labrador/n02099712_1759.jpg',
  },
  {
    id: '2',
    name: 'Luna',
    breed: 'Berger Allemand',
    age: 2,
    ownerId: '1',
    photo: 'https://images.dog.ceo/breeds/germanshepherd/n02106662_19234.jpg',
  }
];

// Mock des réservations
export const mockBookings: Booking[] = [
  {
    id: '1',
    clientId: '1',
    dogsitterId: '2',
    dogId: '1',
    startTime: '2025-09-15T09:00:00',
    endTime: '2025-09-15T12:00:00',
    status: 'confirmed',
    totalPrice: 45,
    paymentStatus: 'completed',
  }
];