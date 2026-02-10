import { supabase } from './supabase';
import { User } from '../types';
import { mockUsers } from '../mocks/data';

export const authService = {
  async signIn(email: string, password: string) {
    // Simulation d'un délai réseau
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = mockUsers.find(u => u.email === email);
    if (email === 'test@test.com' && password === 'test123' && user) {
      return {
        user,
        token: 'fake-token-123'
      };
    }

    throw new Error('Email ou mot de passe incorrect');
  },

  async signUp(email: string, password: string, fullName: string, type: 'client' | 'dogsitter') {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Math.random().toString(36).substring(7),
      email,
      fullName,
      type,
    };
    
    return {
      user: newUser,
      token: 'fake-token-' + Math.random().toString(36).substring(7)
    };
  },

  async signOut() {
    await new Promise(resolve => setTimeout(resolve, 500));
  },

  async resetPassword(email: string) {
    await new Promise(resolve => setTimeout(resolve, 1000));
  },

  async updateProfile(userId: string, data: Partial<User>) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const currentUser = mockUsers.find(u => u.id === userId);
    if (!currentUser) throw new Error('Utilisateur non trouvé');
    
    return {
      ...currentUser,
      ...data,
    };
  }
};