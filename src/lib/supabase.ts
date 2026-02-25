import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;

// Public client (for frontend reads)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Service client (for server-side writes — bypasses RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export type BookingSource = "chat" | "whatsapp" | "voice";
export type BookingStatus = "pending" | "confirmed" | "cancelled";

export interface Booking {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email?: string;
  service?: string;
  preferred_date?: string;
  time_slot?: string;
  notes?: string;
  source: BookingSource;
  status: BookingStatus;
}
