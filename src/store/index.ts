import { configureStore } from '@reduxjs/toolkit';
import { RootState } from '../types/redux';
import authReducer from './slices/authSlice';
import dogsitterReducer from './slices/dogsitterSlice';

export const store = configureStore<RootState>({
  reducer: {
    auth: authReducer,
    dogsitter: dogsitterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export { RootState };