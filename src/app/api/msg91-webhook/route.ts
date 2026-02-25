import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import {
  sendWhatsAppMessage,
  stepMessages,
  parseService,
  parseTimeSlot,
  type WaSession,
  type WaStep,
} from "@/lib/msg91";

// In-memory session store (upgrade to Supabase for multi-instance)
const sessions = new Map<string, WaSession>();

function getSession(phone: string): WaSession {
  return sessions.get(phone) ?? { step: "start" };
}

function setSession(phone: string, session: WaSession) {
  sessions.set(phone, session);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // MSG91 sends: { data: { sender: "919...", message: "text" } }
    const sender: string = body?.data?.sender ?? body?.sender ?? "";
    const text: string = (body?.data?.message ?? body?.message ?? "").trim();

    if (!sender || !text) {
      return NextResponse.json({ received: true });
    }

    const session = getSession(sender);
    let reply = "";
    let nextStep: WaStep = session.step;

    // --- Conversation state machine ---
    if (session.step === "start" || text.toLowerCase() === "hi" || text.toLowerCase() === "hello" || text.toLowerCase() === "book") {
      reply = stepMessages.start;
      nextStep = "ask_date";
      const service = parseService(text);
      if (service) {
        session.service = service;
        reply = `Great choice — *${service}*! 🎉\n\n` + stepMessages.ask_date;
        nextStep = "ask_time";
      } else {
        nextStep = "ask_date";
        // Actually start from service selection
        reply = stepMessages.start;
        nextStep = "ask_service";
      }
    } else if (session.step === "ask_service") {
      const service = parseService(text);
      if (!service) {
        reply = `I didn't quite get that. Please reply with a number (1–5) or the service name:\n\n${stepMessages.ask_service}`;
        nextStep = "ask_service";
      } else {
        session.service = service;
        reply = `Great choice — *${service}*! 🎉\n\n` + stepMessages.ask_date;
        nextStep = "ask_date";
      }
    } else if (session.step === "ask_date") {
      // Basic date validation DD/MM/YYYY
      const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
      if (!dateRegex.test(text)) {
        reply = `Please send the date in DD/MM/YYYY format.\nExample: *15/03/2026*`;
        nextStep = "ask_date";
      } else {
        session.preferred_date = text;
        reply = stepMessages.ask_time;
        nextStep = "ask_time";
      }
    } else if (session.step === "ask_time") {
      const slot = parseTimeSlot(text);
      if (!slot) {
        reply = `Please reply with 1, 2, or 3:\n\n${stepMessages.ask_time}`;
        nextStep = "ask_time";
      } else {
        session.time_slot = slot;
        reply = stepMessages.ask_name;
        nextStep = "ask_name";
      }
    } else if (session.step === "ask_name") {
      if (text.length < 2) {
        reply = `Please enter your full name.`;
        nextStep = "ask_name";
      } else {
        session.name = text;
        reply = stepMessages.ask_phone;
        nextStep = "ask_phone";
      }
    } else if (session.step === "ask_phone") {
      const digits = text.replace(/\D/g, "");
      if (digits.length < 10) {
        reply = `That doesn't look like a valid number. Please enter your 10-digit mobile number.`;
        nextStep = "ask_phone";
      } else {
        session.phone = digits.slice(-10);
        // Save booking to Supabase
        const { error } = await supabaseAdmin.from("bookings").insert({
          name: session.name ?? "WhatsApp Customer",
          phone: session.phone,
          service: session.service ?? "Not specified",
          preferred_date: session.preferred_date ?? "To be confirmed",
          time_slot: session.time_slot ?? "To be confirmed",
          source: "whatsapp",
          status: "pending",
        });

        if (error) console.error("Supabase insert error:", error);

        // Send confirmation
        const confirmMsg = stepMessages.done.replace("{name}", session.name ?? "there");
        reply = confirmMsg;
        nextStep = "done";

        // Clear session after booking
        sessions.delete(sender);
      }
    }

    // Update session
    if (nextStep !== "done") {
      setSession(sender, { ...session, step: nextStep });
    }

    // Send reply via MSG91
    await sendWhatsAppMessage(sender, reply);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("MSG91 webhook error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
