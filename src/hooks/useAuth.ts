import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice';
import { User } from '../types';
import { mockUsers } from '../mocks/data';

export const useAuth = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // En mode développement, on utilise les données mockées
    const mockUser = mockUsers[0]; // Utiliser le premier utilisateur mock
    
    dispatch(
      setCredentials({
        user: mockUser,
        token: 'mock-token',
      })
    );
    
    // Désactiver le loading immédiatement
    setIsLoading(false);
  }, [dispatch]);

  return { isLoading };
};