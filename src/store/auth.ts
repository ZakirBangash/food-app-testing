import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

// // Initialize Supabase client
// const supabaseUrl = 'YOUR_SUPABASE_URL';
// const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';
// const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface AuthState {
  user: any | null;
  session: any | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isLoading: true,

  login: async (email: string, password: string) => {
    try {
      // const { data, error } = await supabase.auth.signInWithPassword({
      //   email,
      //   password,
      // });

      // if (error) throw error;

      // set({ user: data.user, session: data.session });
      // await AsyncStorage.setItem('user', JSON.stringify(data.user));
      // await AsyncStorage.setItem('session', JSON.stringify(data.session));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  register: async (email: string, password: string) => {
    try {
      // const { data, error } = await supabase.auth.signUp({
      //   email,
      //   password,
      // });

      // if (error) throw error;

      // set({ user: data.user, session: data.session });
      // await AsyncStorage.setItem('user', JSON.stringify(data.user));
      // await AsyncStorage.setItem('session', JSON.stringify(data.session));
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      // const { error } = await supabase.auth.signOut();
      // if (error) throw error;

      set({ user: null, session: null });
      // await AsyncStorage.removeItem('user');
      // await AsyncStorage.removeItem('session');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  initialize: async () => {
    try {
      const userStr = await AsyncStorage.getItem('user');
      const sessionStr = await AsyncStorage.getItem('session');

      if (userStr && sessionStr) {
        const user = JSON.parse(userStr);
        const session = JSON.parse(sessionStr);
        set({ user, session });
      }
    } catch (error) {
      console.error('Initialization error:', error);
    } finally {
      set({ isLoading: false });
    }
  },
})); 