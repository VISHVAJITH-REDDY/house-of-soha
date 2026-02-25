import { NextRequest, NextResponse } from "next/server";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

// Vapi.ai sends a POST webhook when a call ends.
// The payload contains a `message` with type "end-of-call-report"
// and a `transcript` of the conversation.
// We parse the structured data Vapi extracts (via function calls or analysis)
// and save the booking.

interface VapiCallData {
  type: string;
  call?: {
    id: string;
    phoneNumber?: { number: string };
  };
  analysis?: {
    structuredData?: {
      name?: string;
      phone?: string;
      service?: string;
      date?: string;
      timeSlot?: string;
      notes?: string;
    };
    summary?: string;
  };
  transcript?: string;
}

export async function POST(req: NextRequest) {
  try {
    // Optional: verify Vapi webhook secret
    const secret = req.headers.get("x-vapi-secret");
    if (
      process.env.VAPI_WEBHOOK_SECRET &&
      secret !== process.env.VAPI_WEBHOOK_SECRET
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload: VapiCallData = await req.json();

    // Only process end-of-call reports
    if (payload.type !== "end-of-call-report") {
      return NextResponse.json({ received: true });
    }

    const structured = payload.analysis?.structuredData;

    const name = structured?.name ?? "Voice Caller";
    const phone = structured?.phone ?? payload.call?.phoneNumber?.number ?? "Not provided";
    const service = structured?.service ?? "Not specified";
    const date = structured?.date ?? "To be confirmed";
    const timeSlot = structured?.timeSlot ?? "To be confirmed";
    const notes = structured?.notes ?? payload.analysis?.summary ?? undefined;

    // Build WhatsApp notification URL for the salon team
    const waUrl = buildWhatsAppUrl({ name, phone, service, date, timeSlot, notes, source: "voice" });

    console.log(`[Voice Booking] received. WA: ${waUrl}`);

    return NextResponse.json({ success: true, whatsappUrl: waUrl });
  } catch (err) {
    console.error("Voice webhook error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
