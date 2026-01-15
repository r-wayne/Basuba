import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Destination = {
  id: string;
  name: string;
  description: string;
  image_url: string;
  highlights: string[];
  created_at: string;
};

export type Tour = {
  id: string;
  destination_id: string;
  name: string;
  description: string;
  duration_days: number;
  price_per_person: number;
  max_group_size: number;
  image_url: string;
  images: string[];
  included: string[];
  itinerary: Array<{
    day: number;
    title: string;
    description: string;
  }>;
  created_at: string;
};

export type Hotel = {
   id: string;
   destination_id: string;
   name: string;
   description: string;
   price_per_night: number;
   rating: number;
   image_url: string;
   images: string[];
   amenities: string[];
   created_at: string;
 };

export type Airbnb = {
   id: string;
   destination_id: string;
   name: string;
   description: string;
   price_per_night: number;
   rating: number;
   image_url: string;
   images: string[];
   amenities: string[];
   max_guests: number;
   bedrooms: number;
   bathrooms: number;
   created_at: string;
 };

export type Booking = {
   id?: string;
   booking_type: 'tour' | 'hotel' | 'airbnb';
   item_id: string;
   guest_name: string;
   guest_email: string;
   guest_phone: string;
   guest_country: string;
   number_of_guests: number;
   start_date: string;
   end_date: string;
   total_price: number;
   deposit_amount: number;
   special_requests?: string;
   status?: string;
   created_at?: string;
 };
