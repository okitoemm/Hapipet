import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DogsitterProfile } from '../../types';

import { DogsitterState } from '../../types/redux';

// Données mockées pour les dog-sitters
const mockDogsitters: DogsitterProfile[] = [
  {
    id: '1',
    email: 'sarah@example.com',
    fullName: 'Sarah Martin',
    type: 'dogsitter',
    description: 'Passionnée par les animaux depuis toujours, je propose des balades et du dog-sitting avec attention et bienveillance.',
    hourlyRate: 15,
    dailyRate: 50,
    rating: 4.8,
    avatar: 'https://picsum.photos/200',
    reviews: [
      {
        id: '1',
        rating: 5,
        comment: 'Excellent service, très attentionnée avec mon chien !',
        authorId: '2',
        targetId: '1',
        createdAt: '2025-09-01',
      }
    ],
    availability: {
      'Lundi': ['9:00-12:00', '14:00-18:00'],
      'Mardi': ['9:00-12:00', '14:00-18:00'],
      'Mercredi': ['9:00-12:00', '14:00-18:00'],
      'Jeudi': ['9:00-12:00', '14:00-18:00'],
      'Vendredi': ['9:00-12:00', '14:00-18:00'],
    },
    location: {
      latitude: 48.8566,
      longitude: 2.3522,
    }
  },
  {
    id: '2',
    email: 'marc@example.com',
    fullName: 'Marc Dubois',
    type: 'dogsitter',
    description: 'Éducateur canin professionnel, je propose des services de garde et d\'éducation personnalisés.',
    hourlyRate: 20,
    dailyRate: 70,
    rating: 4.9,
    avatar: 'https://picsum.photos/201',
    reviews: [
      {
        id: '2',
        rating: 5,
        comment: 'Marc est un excellent dog-sitter, très professionnel !',
        authorId: '3',
        targetId: '2',
        createdAt: '2025-09-05',
      }
    ],
    availability: {
      'Lundi': ['8:00-18:00'],
      'Mardi': ['8:00-18:00'],
      'Mercredi': ['8:00-18:00'],
      'Jeudi': ['8:00-18:00'],
      'Vendredi': ['8:00-18:00'],
    },
    location: {
      latitude: 48.8566,
      longitude: 2.3522,
    }
  }
];

const initialState: DogsitterState = {
  dogsitters: mockDogsitters,
  loading: false,
  error: null,
};

const dogsitterSlice = createSlice({
  name: 'dogsitter',
  initialState,
  reducers: {
    setDogsitters: (state, action: PayloadAction<DogsitterProfile[]>) => {
      state.dogsitters = action.payload;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setDogsitters, setLoading, setError } = dogsitterSlice.actions;
export default dogsitterSlice.reducer;