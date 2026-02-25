"use client";

import { useState, useEffect } from "react";

const WA_PHONE = process.env.NEXT_PUBLIC_WA_PHONE ?? "917842588868";
const waUrl = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(
  "Hi House of Soha! 🌸 I'd like to book an appointment. Could you please help me with availability?"
)}`;

const SERVICES = [
  "Bridal Makeup",
  "Party Makeup",
  "Hair Styling",
  "Hair Treatment",
  "Manicure & Pedicure",
  "Facial & Skin Care",
  "Threading & Waxing",
  "Nail Art",
  "Other / Not Sure",
];

// Salon hours: 11 AM – 8 PM, hourly slots
const TIME_SLOTS = [
  "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM",
  "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM",
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 1rem",
  borderRadius: "0.75rem",
  border: "1.5px solid rgba(183,110,121,0.25)",
  background: "#fffdf9",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "0.92rem",
  color: "#2c1a1d",
  outline: "none",
  transition: "border-color 0.2s",
  boxSizing: "border-box",
};

export default function BookingSection() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    preferred_date: "",
    time_slot: "",
    notes: "",
  });
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch booked slots whenever date changes
  useEffect(() => {
    if (!form.preferred_date) {
      setBookedSlots([]);
      return;
    }
    setLoadingSlots(true);
    setForm((f) => ({ ...f, time_slot: "" })); // reset slot when date changes
    fetch(`/api/availability?date=${form.preferred_date}`)
      .then((r) => r.json())
      .then((d) => setBookedSlots(d.bookedSlots ?? []))
      .catch(() => setBookedSlots([]))
      .finally(() => setLoadingSlots(false));
  }, [form.preferred_date]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, timeSlot: form.time_slot, source: "form" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="booking"
      style={{
        background: "linear-gradient(180deg, #fdf6ee 0%, #f5ebe0 100%)",
        padding: "5rem 1.5rem",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div className="script-accent">Reserve Your Spot</div>
          <div className="gold-divider" style={{ maxWidth: "200px", margin: "0.75rem auto" }}>
            <span style={{ fontSize: "1rem", color: "#c9a96e" }}>✦</span>
          </div>
          <h2 className="section-heading" style={{ marginBottom: "0.75rem" }}>
            Book an Appointment
          </h2>
          <p className="section-subheading" style={{ maxWidth: "480px", margin: "0 auto" }}>
            Fill in the form and we&apos;ll confirm your slot — or reach us directly via WhatsApp or call.
          </p>
        </div>

        {/* Layout: Form left, WhatsApp+Call right */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 380px",
            gap: "1.5rem",
            alignItems: "start",
          }}
          className="booking-grid"
        >
          {/* ── Booking Form ── */}
          <div
            style={{
              background: "linear-gradient(135deg, #590028 0%, #b76e79 100%)",
              borderRadius: "1.5rem",
              padding: "2.5rem",
              boxShadow: "0 8px 32px rgba(89,0,40,0.2)",
            }}
          >
            <div style={{ marginBottom: "1.75rem" }}>
              <div style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(253,246,238,0.6)", marginBottom: "0.4rem" }}>
                Online Booking
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", color: "#fdf6ee", margin: 0 }}>
                Request an Appointment
              </h3>
            </div>

            {submitted ? (
              <div style={{ textAlign: "center", padding: "2.5rem 1rem", color: "#fdf6ee" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🌸</div>
                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", marginBottom: "0.75rem" }}>
                  Booking Received!
                </h4>
                <p style={{ fontSize: "0.9rem", color: "rgba(253,246,238,0.8)", lineHeight: 1.65 }}>
                  Thank you, {form.name}! Our team will reach out on <strong>{form.phone}</strong> to confirm your appointment.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", phone: "", service: "", preferred_date: "", time_slot: "", notes: "" });
                  }}
                  style={{ marginTop: "1.5rem", background: "rgba(255,255,255,0.2)", border: "1.5px solid rgba(255,255,255,0.3)", borderRadius: "9999px", padding: "0.65rem 1.5rem", color: "#fdf6ee", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.9rem", cursor: "pointer" }}
                >
                  Book Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

                {/* Name + Phone */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-row">
                  <div>
                    <label style={{ display: "block", fontSize: "0.78rem", color: "rgba(253,246,238,0.7)", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Your Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} required placeholder="e.g. Priya Sharma" style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.78rem", color: "rgba(253,246,238,0.7)", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Phone / WhatsApp *</label>
                    <input name="phone" value={form.phone} onChange={handleChange} required placeholder="e.g. 98765 43210" style={inputStyle} />
                  </div>
                </div>

                {/* Service */}
                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", color: "rgba(253,246,238,0.7)", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Service</label>
                  <select name="service" value={form.service} onChange={handleChange} style={inputStyle}>
                    <option value="">Select a service…</option>
                    {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {/* Date + Time Slot */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-row">
                  <div>
                    <label style={{ display: "block", fontSize: "0.78rem", color: "rgba(253,246,238,0.7)", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Preferred Date</label>
                    <input
                      type="date"
                      name="preferred_date"
                      value={form.preferred_date}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.78rem", color: "rgba(253,246,238,0.7)", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      Time Slot {loadingSlots && <span style={{ opacity: 0.6 }}>…</span>}
                    </label>
                    <select
                      name="time_slot"
                      value={form.time_slot}
                      onChange={handleChange}
                      disabled={!form.preferred_date || loadingSlots}
                      style={{ ...inputStyle, opacity: !form.preferred_date ? 0.5 : 1 }}
                    >
                      <option value="">{form.preferred_date ? "Select a slot…" : "Pick date first"}</option>
                      {TIME_SLOTS.map((slot) => {
                        const isBooked = bookedSlots.includes(slot);
                        return (
                          <option key={slot} value={slot} disabled={isBooked}>
                            {slot}{isBooked ? " — Booked" : ""}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                {/* Visual time slot grid */}
                {form.preferred_date && (
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "rgba(253,246,238,0.6)", marginBottom: "0.6rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      Available slots on {new Date(form.preferred_date + "T00:00:00").toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                      {TIME_SLOTS.map((slot) => {
                        const isBooked = bookedSlots.includes(slot);
                        const isSelected = form.time_slot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            disabled={isBooked}
                            onClick={() => !isBooked && setForm((f) => ({ ...f, time_slot: slot }))}
                            style={{
                              padding: "0.4rem 0.875rem",
                              borderRadius: "9999px",
                              fontSize: "0.82rem",
                              fontFamily: "'DM Sans', sans-serif",
                              fontWeight: isSelected ? 700 : 500,
                              border: isBooked
                                ? "1.5px solid rgba(255,255,255,0.1)"
                                : isSelected
                                ? "1.5px solid #fdf6ee"
                                : "1.5px solid rgba(255,255,255,0.35)",
                              background: isBooked
                                ? "rgba(255,255,255,0.06)"
                                : isSelected
                                ? "#fdf6ee"
                                : "rgba(255,255,255,0.15)",
                              color: isBooked
                                ? "rgba(253,246,238,0.3)"
                                : isSelected
                                ? "#590028"
                                : "#fdf6ee",
                              cursor: isBooked ? "not-allowed" : "pointer",
                              textDecoration: isBooked ? "line-through" : "none",
                              transition: "all 0.15s",
                            }}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                    {bookedSlots.length > 0 && (
                      <div style={{ fontSize: "0.75rem", color: "rgba(253,246,238,0.45)", marginTop: "0.5rem" }}>
                        Strikethrough slots are already confirmed.
                      </div>
                    )}
                  </div>
                )}

                {/* Notes */}
                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", color: "rgba(253,246,238,0.7)", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Notes (optional)</label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Any special requests, event date, preferred artist…"
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </div>

                {error && (
                  <div style={{ fontSize: "0.85rem", color: "#fca5a5", background: "rgba(239,68,68,0.15)", padding: "0.6rem 1rem", borderRadius: "0.5rem" }}>
                    ❌ {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  style={{ background: submitting ? "rgba(255,255,255,0.1)" : "#fdf6ee", border: "none", borderRadius: "9999px", padding: "0.9rem 2rem", color: submitting ? "rgba(253,246,238,0.5)" : "#590028", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.95rem", cursor: submitting ? "not-allowed" : "pointer", transition: "all 0.2s", marginTop: "0.25rem" }}
                >
                  {submitting ? "Sending…" : "✨ Request Appointment"}
                </button>
              </form>
            )}
          </div>

          {/* ── Right column: WhatsApp + Call ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* WhatsApp */}
            <div style={{ background: "#fffaf4", borderRadius: "1.5rem", padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem", boxShadow: "0 4px 32px rgba(44,26,29,0.08)", border: "1px solid rgba(37,211,102,0.2)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "0.875rem", background: "rgba(37,211,102,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", flexShrink: 0 }}>💚</div>
                <div>
                  <div style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#25D366", fontWeight: 600, marginBottom: "0.2rem" }}>Responds in 30 mins</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: "#2c1a1d", margin: 0 }}>Book via WhatsApp</h3>
                </div>
              </div>
              <p style={{ fontSize: "0.87rem", color: "#6b4c52", lineHeight: 1.65, margin: 0 }}>
                Message us on WhatsApp and our team will suggest the best date and time for you.
              </p>
              <a href={waUrl} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", background: "#25D366", border: "none", borderRadius: "9999px", padding: "0.75rem 1.5rem", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.9rem", cursor: "pointer", textDecoration: "none" }}>
                💚 Open WhatsApp
              </a>
            </div>

            {/* Call */}
            <div style={{ background: "#fffaf4", borderRadius: "1.5rem", padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem", boxShadow: "0 4px 32px rgba(44,26,29,0.08)", border: "1px solid rgba(201,169,110,0.2)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "0.875rem", background: "rgba(201,169,110,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", flexShrink: 0 }}>📞</div>
                <div>
                  <div style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#c9a96e", fontWeight: 600, marginBottom: "0.2rem" }}>Speak Directly</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: "#2c1a1d", margin: 0 }}>Call to Book</h3>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {[
                  { label: "Makeup", number: "+91 78425 88868", href: "tel:+917842588868" },
                  { label: "Salon", number: "+91 91116 11171", href: "tel:+919111611171" },
                  { label: "General", number: "+91 99896 71456", href: "tel:+919989671456" },
                ].map((c) => (
                  <a key={c.href} href={c.href}
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(201,169,110,0.08)", border: "1px solid rgba(201,169,110,0.2)", borderRadius: "0.65rem", padding: "0.55rem 0.875rem", textDecoration: "none" }}>
                    <span style={{ fontSize: "0.75rem", color: "#9e7b82" }}>{c.label}</span>
                    <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#2c1a1d" }}>{c.number}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .booking-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 540px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
