import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
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

    const booking = await prisma.booking.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email ?? null,
        service: data.service,
        date: data.date,
        timeSlot: data.timeSlot,
        notes: data.notes ?? null,
        source: "form",
        status: "PENDING",
      },
    });

    const whatsappUrl = buildWhatsAppUrl({
      name: data.name,
      phone: data.phone,
      service: data.service,
      date: data.date,
      timeSlot: data.timeSlot,
      notes: data.notes,
    });

    return NextResponse.json({
      success: true,
      bookingId: booking.id,
      whatsappUrl,
    });
  } catch (err) {
    console.error("Booking error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return NextResponse.json(bookings);
}
