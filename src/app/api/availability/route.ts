import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// GET /api/availability?date=2024-12-25
// Returns list of time slots already confirmed for that date
export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date");
  if (!date) {
    return NextResponse.json({ bookedSlots: [] });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("bookings")
      .select("time_slot")
      .eq("preferred_date", date)
      .eq("status", "confirmed");

    if (error) {
      return NextResponse.json({ bookedSlots: [] });
    }

    const bookedSlots = (data ?? [])
      .map((b: { time_slot: string | null }) => b.time_slot)
      .filter(Boolean);

    return NextResponse.json({ bookedSlots });
  } catch {
    return NextResponse.json({ bookedSlots: [] });
  }
}
