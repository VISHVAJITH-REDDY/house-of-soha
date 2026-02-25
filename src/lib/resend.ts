import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBookingConfirmation({
  to,
  name,
  service,
  preferredDate,
  timeSlot,
  source,
}: {
  to: string;
  name: string;
  service?: string;
  preferredDate?: string;
  timeSlot?: string;
  source: string;
}) {
  const channelLabel =
    source === "whatsapp" ? "WhatsApp" : source === "voice" ? "Phone Call" : "Chat";

  await resend.emails.send({
    from: "House of Soha <bookings@houseofsoha.in>",
    to,
    subject: "✨ Your Appointment Request — House of Soha",
    html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"/></head>
      <body style="margin:0;padding:0;background:#fdf6ee;font-family:'DM Sans',Arial,sans-serif;">
        <div style="max-width:560px;margin:0 auto;padding:40px 20px;">

          <!-- Header -->
          <div style="background:linear-gradient(135deg,#590028,#b76e79);border-radius:16px;padding:32px;text-align:center;margin-bottom:24px;">
            <p style="font-family:Georgia,serif;font-size:28px;color:#fdf6ee;margin:0 0 6px;">House of Soha</p>
            <p style="font-size:13px;color:rgba(253,246,238,0.7);margin:0;letter-spacing:2px;text-transform:uppercase;">Luxury Beauty Studio</p>
          </div>

          <!-- Body -->
          <div style="background:#fff;border-radius:16px;padding:32px;margin-bottom:16px;border:1px solid rgba(183,110,121,0.15);">
            <p style="font-size:22px;color:#2c1a1d;font-family:Georgia,serif;margin:0 0 8px;">Hi ${name}! 🌸</p>
            <p style="color:#6b4c52;line-height:1.7;margin:0 0 24px;">
              We've received your appointment request via <strong>${channelLabel}</strong>. Our team will confirm your slot shortly.
            </p>

            <!-- Booking details -->
            <div style="background:#fdf6ee;border-radius:12px;padding:20px;margin-bottom:24px;">
              <p style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#b76e79;font-weight:700;margin:0 0 14px;">Booking Details</p>
              ${service ? `<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(183,110,121,0.1);"><span style="color:#9e7b82;font-size:14px;">Service</span><span style="color:#2c1a1d;font-weight:600;font-size:14px;">${service}</span></div>` : ""}
              ${preferredDate ? `<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(183,110,121,0.1);"><span style="color:#9e7b82;font-size:14px;">Date</span><span style="color:#2c1a1d;font-weight:600;font-size:14px;">${preferredDate}</span></div>` : ""}
              ${timeSlot ? `<div style="display:flex;justify-content:space-between;padding:8px 0;"><span style="color:#9e7b82;font-size:14px;">Time Preference</span><span style="color:#2c1a1d;font-weight:600;font-size:14px;">${timeSlot}</span></div>` : ""}
            </div>

            <p style="color:#6b4c52;font-size:14px;line-height:1.7;margin:0;">
              Our team usually responds within <strong>30 minutes</strong> during business hours (11AM–8PM, Mon–Sun).
              We'll reach you on WhatsApp or call you back to confirm.
            </p>
          </div>

          <!-- Contact -->
          <div style="background:#fff;border-radius:16px;padding:24px;margin-bottom:16px;border:1px solid rgba(183,110,121,0.15);">
            <p style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#b76e79;font-weight:700;margin:0 0 14px;">Contact Us</p>
            <p style="margin:4px 0;font-size:14px;color:#6b4c52;">📞 Makeup: <a href="tel:+917842588868" style="color:#b76e79;">+91 78425 88868</a></p>
            <p style="margin:4px 0;font-size:14px;color:#6b4c52;">📞 Salon: <a href="tel:+919111611171" style="color:#b76e79;">+91 91116 11171</a></p>
            <p style="margin:4px 0;font-size:14px;color:#6b4c52;">📍 Meadows Court, Plot 72, Jubilee Hills, Hyderabad</p>
            <p style="margin:4px 0;font-size:14px;color:#6b4c52;">🕐 Mon–Sun: 11AM – 8PM</p>
          </div>

          <p style="text-align:center;font-size:12px;color:#9e7b82;margin:0;">
            © ${new Date().getFullYear()} House of Soha · Jubilee Hills, Hyderabad
          </p>
        </div>
      </body>
      </html>
    `,
  });
}
