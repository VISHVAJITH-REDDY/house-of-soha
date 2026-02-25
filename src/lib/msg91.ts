const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY!;
const MSG91_INTEGRATED_NUMBER = process.env.MSG91_WHATSAPP_NUMBER!;

// Send a plain text WhatsApp message via MSG91
export async function sendWhatsAppMessage(to: string, message: string) {
  const payload = {
    integrated_number: MSG91_INTEGRATED_NUMBER,
    content_type: "text",
    payload: {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: to.replace(/\D/g, ""), // digits only
      type: "text",
      text: {
        preview_url: false,
        body: message,
      },
    },
  };

  const res = await fetch(
    "https://api.msg91.com/api/v5/whatsapp/whatsapp-outbound-message/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authkey: MSG91_AUTH_KEY,
      },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error("MSG91 send error:", err);
  }
  return res.ok;
}

// WhatsApp conversation steps
export type WaStep =
  | "start"
  | "ask_service"
  | "ask_date"
  | "ask_time"
  | "ask_name"
  | "ask_phone"
  | "ask_email"
  | "done";

export interface WaSession {
  step: WaStep;
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  preferred_date?: string;
  time_slot?: string;
}

// Bot messages for each step
export const stepMessages: Record<WaStep, string> = {
  start: `🌸 Welcome to *House of Soha* — Jubilee Hills, Hyderabad!\n\nI'm your booking assistant. Let's get you an appointment in just a few steps.\n\nWhich service are you interested in?\n\n1️⃣ Bridal / Engagement Makeup\n2️⃣ Party Makeup\n3️⃣ Microblading / Lash Extensions\n4️⃣ Facial / Skin Treatment\n5️⃣ Salon Services (hair, nails, waxing)\n\nReply with the number or the name of the service.`,
  ask_service: `Which service are you interested in?\n\n1️⃣ Bridal / Engagement Makeup\n2️⃣ Party Makeup\n3️⃣ Microblading / Lash Extensions\n4️⃣ Facial / Skin Treatment\n5️⃣ Salon Services (hair, nails, waxing)\n\nReply with the number or the name.`,
  ask_date: `Great choice! 🎉\n\nWhat date would you prefer? Please reply in *DD/MM/YYYY* format.\nExample: 15/03/2026`,
  ask_time: `Got it! What time works best for you?\n\n1️⃣ Morning (10AM – 1PM)\n2️⃣ Afternoon (1PM – 5PM)\n3️⃣ Evening (5PM – 8PM)`,
  ask_name: `Almost there! What's your *full name* please?`,
  ask_phone: `And your *WhatsApp / phone number* so our team can confirm? (We'll send confirmation here)`,
  ask_email: `Last one — your *email address* for the booking confirmation?\n\n_(Reply "skip" if you'd like to skip this)_`,
  done: `✅ *Booking request received!*\n\nThank you {name}! Our team will confirm your appointment shortly.\n\n📞 Makeup: +91 78425 88868\n📞 Salon: +91 91116 11171\n🕐 Mon–Sun: 11AM – 8PM\n\nSee you at House of Soha! 🌸`,
};

// Parse service from user reply
export function parseService(text: string): string | null {
  const t = text.trim().toLowerCase();
  if (t === "1" || t.includes("bridal") || t.includes("engagement"))
    return "Bridal / Engagement Makeup";
  if (t === "2" || t.includes("party")) return "Party Makeup";
  if (t === "3" || t.includes("microbla") || t.includes("lash"))
    return "Microblading / Lash Extensions";
  if (t === "4" || t.includes("facial") || t.includes("skin"))
    return "Facial / Skin Treatment";
  if (t === "5" || t.includes("salon") || t.includes("hair") || t.includes("nail"))
    return "Salon Services";
  return null;
}

// Parse time slot from user reply
export function parseTimeSlot(text: string): string | null {
  const t = text.trim().toLowerCase();
  if (t === "1" || t.includes("morn") || t.includes("10") || t.includes("am"))
    return "Morning (10AM–1PM)";
  if (t === "2" || t.includes("after") || t.includes("1pm") || t.includes("noon"))
    return "Afternoon (1PM–5PM)";
  if (t === "3" || t.includes("even") || t.includes("5pm") || t.includes("pm"))
    return "Evening (5PM–8PM)";
  return null;
}
