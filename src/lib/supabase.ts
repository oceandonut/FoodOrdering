import 'react-native-url-polyfill/auto';
import * as SecureStore from 'expo-secure-store';
import { createClient } from '@supabase/supabase-js';
import Constants from "expo-constants";

import { Database } from '@/src/database.types';

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

const origin = Constants?.expoConfig?.hostUri?.split(":").shift();

if (!origin) throw new Error("Could not determine origin");
console.log('origin: ', origin);

const supabaseUrl = `http://${origin}:54321`; // for production url see .env
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON || "";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});