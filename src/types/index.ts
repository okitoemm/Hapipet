export interface User {
  id: string;
  email: string;
  fullName: string;
  type: 'client' | 'dogsitter';
  avatar?: string;
  address?: string;
  phone?: string;
}

export interface Dog {
  id: string;
  name: string;
  breed: string;
  age: number;
  ownerId: string;
  specialNeeds?: string;
  photo?: string;
}

export interface DogsitterProfile extends User {
  description: string;
  hourlyRate: number;
  dailyRate: number;
  availability: {
    [key: string]: string[]; // Day of week -> available time slots
  };
  rating: number;
  reviews: Review[];
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  authorId: string;
  targetId: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  clientId: string;
  dogsitterId: string;
  dogId: string;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalPrice: number;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  client?: User;
  dogsitter?: User;
  dog?: Dog;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  readAt?: string;
}