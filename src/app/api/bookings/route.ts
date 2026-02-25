import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { bookingSchema } from "@/lib/validations";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = bookingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Check if the requested slot is already confirmed
    if (data.preferred_date && data.timeSlot) {
      const { data: existing } = await supabaseAdmin
        .from("bookings")
        .select("id")
        .eq("preferred_date", data.preferred_date)
        .eq("time_slot", data.timeSlot)
        .eq("status", "confirmed")
        .limit(1);

      if (existing && existing.length > 0) {
        return NextResponse.json(
          { error: `Sorry, the ${data.timeSlot} slot on ${data.preferred_date} is already booked. Please choose a different time.` },
          { status: 409 }
        );
      }
    }

    // Save to Supabase
    const { error } = await supabaseAdmin.from("bookings").insert({
      name: data.name,
      phone: data.phone,
      email: data.email ?? null,
      service: data.service ?? null,
      preferred_date: data.preferred_date ?? null,
      time_slot: data.timeSlot ?? null,
      notes: data.notes ?? null,
      source: data.source ?? "form",
      status: "pending",
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Booking error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
