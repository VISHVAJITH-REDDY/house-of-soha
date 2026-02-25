import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Lazy singletons — created on first use, not at module load time.
// This prevents build-time crashes when env vars are absent.

let _supabase: SupabaseClient | null = null;
let _supabaseAdmin: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) throw new Error("Supabase public env vars missing");
    _supabase = createClient(url, key);
  }
  return _supabase;
}

export function getSupabaseAdmin(): SupabaseClient {
  if (!_supabaseAdmin) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_KEY;
    if (!url || !key) throw new Error("Supabase service env vars missing");
    _supabaseAdmin = createClient(url, key);
  }
  return _supabaseAdmin;
}

// Named exports for backwards compat — these are still lazy getters
export const supabase = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    return (getSupabase() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    return (getSupabaseAdmin() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

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
