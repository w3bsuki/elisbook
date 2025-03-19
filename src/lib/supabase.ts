import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
}

// Create a single supabase client for the entire app
export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

// Type definitions for our database tables
export type ContactFormEntry = {
  id?: string;
  created_at?: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status?: 'new' | 'read' | 'replied';
}

export type ServiceBooking = {
  id?: string;
  created_at?: string;
  name: string;
  email: string;
  phone?: string;
  date: string;
  time: string;
  service: string;
  service_id?: string;
  message?: string;
  booking_ref: string;
  status?: 'pending' | 'confirmed' | 'cancelled';
}

export type Order = {
  id?: string;
  created_at?: string;
  order_number: string;
  order_date: string;
  customer_first_name: string;
  customer_last_name: string;
  customer_email: string;
  customer_phone?: string;
  shipping_address: string;
  shipping_city: string;
  shipping_postal_code: string;
  shipping_country: string;
  payment_method: string;
  notes?: string;
  subtotal: number;
  shipping_cost: number;
  tax: number;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

export type OrderItem = {
  id?: string;
  created_at?: string;
  order_id: string;
  item_id: string;
  title: string;
  price: number;
  quantity: number;
  type: 'book' | 'service';
} 