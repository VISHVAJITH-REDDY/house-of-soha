const WA_PHONE = process.env.NEXT_PUBLIC_WA_PHONE ?? "917842588868";

interface WhatsAppParams {
  name: string;
  phone: string;
  service: string;
  date?: string;
  timeSlot?: string;
  notes?: string;
  source?: string;
}

export function buildWhatsAppUrl(params: WhatsAppParams): string {
  const timeLabel =
    params.timeSlot === "morning"
      ? "Morning (10am–1pm)"
      : params.timeSlot === "afternoon"
        ? "Afternoon (1pm–5pm)"
        : params.timeSlot === "evening"
          ? "Evening (5pm–8pm)"
          : params.timeSlot ?? "";

  const lines = [
    `Hello House of Soha! 🌸`,
    `I'd like to book an appointment.`,
    ``,
    `Name: ${params.name}`,
    `Phone: ${params.phone}`,
    `Service: ${params.service}`,
    params.date ? `Date: ${params.date}` : null,
    timeLabel ? `Time: ${timeLabel}` : null,
    params.notes ? `Notes: ${params.notes}` : null,
    params.source === "voice" ? `(Booked via AI Voice Agent)` : null,
  ]
    .filter(Boolean)
    .join("\n");

  return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(lines)}`;
}
