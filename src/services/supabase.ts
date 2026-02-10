import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configuration mock pour le développement
const supabaseUrl = 'https://mock.supabase.co';
const supabaseAnonKey = 'mock-key';

// Créer un mock du client Supabase
const mockSupabase = {
  auth: {
    signInWithPassword: async () => ({
      data: { user: null, session: null },
      error: null
    }),
    signOut: async () => ({ error: null }),
    onAuthStateChange: () => ({
      data: { subscription: { unsubscribe: () => {} } }
    })
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        single: async () => ({ data: null, error: null })
      }),
      single: async () => ({ data: null, error: null })
    }),
    insert: () => ({
      select: () => ({
        single: async () => ({ data: null, error: null })
      })
    }),
    update: () => ({
      eq: () => ({
        select: () => ({
          single: async () => ({ data: null, error: null })
        })
      })
    })
  }),
  functions: {
    invoke: async () => ({ data: null, error: null })
  }
};

export const supabase = mockSupabase;