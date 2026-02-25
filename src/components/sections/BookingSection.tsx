"use client";

import { useState } from "react";
import { serviceNames } from "@/data/services";
import type { BookingFormData } from "@/lib/validations";

const today = new Date().toISOString().split("T")[0];

const timeSlots = [
  { value: "morning", label: "Morning", sub: "10:00 AM – 1:00 PM", emoji: "🌤" },
  { value: "afternoon", label: "Afternoon", sub: "1:00 PM – 5:00 PM", emoji: "☀️" },
  { value: "evening", label: "Evening", sub: "5:00 PM – 8:00 PM", emoji: "🌆" },
];

const initial: BookingFormData = {
  name: "",
  phone: "",
  email: "",
  service: "",
  date: "",
  timeSlot: "morning",
  notes: "",
};

export default function BookingSection() {
  const [form, setForm] = useState<BookingFormData>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const set = (field: keyof BookingFormData, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  const validate = (): boolean => {
    const errs: typeof errors = {};
    if (!form.name.trim() || form.name.length < 2) errs.name = "Name must be at least 2 characters";
    if (!/^[6-9]\d{9}$/.test(form.phone)) errs.phone = "Enter a valid 10-digit Indian mobile number";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email";
    if (!form.service) errs.service = "Please select a service";
    if (!form.date) errs.date = "Please select a date";
    if (!form.timeSlot) errs.timeSlot = "Please select a time preference";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");
      setStatus("success");
      // Open WhatsApp with pre-filled message
      if (data.whatsappUrl) {
        setTimeout(() => window.open(data.whatsappUrl, "_blank"), 400);
      }
      setForm(initial);
    } catch {
      setStatus("error");
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
      <div style={{ maxWidth: "820px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div className="script-accent">Reserve Your Spot</div>
          <div className="gold-divider" style={{ maxWidth: "200px", margin: "0.75rem auto" }}>
            <span style={{ fontSize: "1rem", color: "#c9a96e" }}>✦</span>
          </div>
          <h2 className="section-heading" style={{ marginBottom: "0.75rem" }}>
            Book an Appointment
          </h2>
          <p className="section-subheading" style={{ maxWidth: "480px", margin: "0 auto" }}>
            Fill in the form below and we&apos;ll connect with you on WhatsApp to
            confirm your booking.
          </p>
        </div>

        {status === "success" ? (
          <SuccessState onReset={() => setStatus("idle")} />
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              background: "#fffaf4",
              borderRadius: "1.5rem",
              padding: "2.5rem",
              boxShadow: "0 4px 32px rgba(44,26,29,0.1)",
              border: "1px solid rgba(183,110,121,0.15)",
            }}
          >
            {/* Row 1: Name + Phone */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
              <FormField label="Your Name *" error={errors.name}>
                <input
                  className="input-luxury"
                  type="text"
                  placeholder="e.g. Priya Reddy"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                />
              </FormField>
              <FormField label="Phone Number *" error={errors.phone}>
                <input
                  className="input-luxury"
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  maxLength={10}
                />
              </FormField>
            </div>

            {/* Row 2: Email + Service */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
              <FormField label="Email (optional)" error={errors.email}>
                <input
                  className="input-luxury"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                />
              </FormField>
              <FormField label="Service *" error={errors.service}>
                <select
                  className="input-luxury"
                  value={form.service}
                  onChange={(e) => set("service", e.target.value)}
                  style={{ appearance: "none" }}
                >
                  <option value="">Select a service...</option>
                  {serviceNames.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </FormField>
            </div>

            {/* Date */}
            <FormField label="Preferred Date *" error={errors.date} style={{ marginBottom: "1.25rem" }}>
              <input
                className="input-luxury"
                type="date"
                min={today}
                value={form.date}
                onChange={(e) => set("date", e.target.value)}
              />
            </FormField>

            {/* Time slot */}
            <div style={{ marginBottom: "1.25rem" }}>
              <label
                style={{
                  display: "block",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  color: "#2c1a1d",
                  marginBottom: "0.6rem",
                  letterSpacing: "0.02em",
                }}
              >
                Preferred Time *
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem" }}>
                {timeSlots.map((slot) => (
                  <button
                    key={slot.value}
                    type="button"
                    onClick={() => set("timeSlot", slot.value)}
                    style={{
                      padding: "1rem 0.75rem",
                      borderRadius: "0.875rem",
                      border: `2px solid ${form.timeSlot === slot.value ? "#b76e79" : "rgba(183,110,121,0.2)"}`,
                      background: form.timeSlot === slot.value ? "rgba(183,110,121,0.1)" : "#fffaf4",
                      cursor: "pointer",
                      textAlign: "center",
                      transition: "all 0.2s",
                    }}
                  >
                    <div style={{ fontSize: "1.25rem", marginBottom: "0.25rem" }}>{slot.emoji}</div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#2c1a1d" }}>{slot.label}</div>
                    <div style={{ fontSize: "0.7rem", color: "#9e7b82" }}>{slot.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <FormField label="Notes (optional)" style={{ marginBottom: "2rem" }}>
              <textarea
                className="input-luxury"
                placeholder="Any specific requirements, preferences, or questions..."
                rows={3}
                value={form.notes}
                onChange={(e) => set("notes", e.target.value)}
                style={{ resize: "vertical" }}
              />
            </FormField>

            {status === "error" && (
              <div
                style={{
                  background: "#fff0f3",
                  border: "1px solid #ffb3c1",
                  borderRadius: "0.75rem",
                  padding: "0.875rem 1rem",
                  fontSize: "0.875rem",
                  color: "#c1121f",
                  marginBottom: "1.25rem",
                }}
              >
                Something went wrong. Please try again or call us directly.
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-primary"
              style={{ width: "100%", fontSize: "1rem", padding: "1.1rem" }}
            >
              {status === "loading" ? (
                <>⏳ Submitting...</>
              ) : (
                <>💬 Confirm on WhatsApp</>
              )}
            </button>

            <p
              style={{
                textAlign: "center",
                fontSize: "0.8rem",
                color: "#9e7b82",
                marginTop: "1rem",
              }}
            >
              After submitting, WhatsApp will open with your booking details.
              Our team confirms within 30 minutes (10am–8pm).
            </p>
          </form>
        )}
      </div>

      <style>{`
        @media (max-width: 600px) {
          #booking form > div:first-of-type,
          #booking form > div:nth-of-type(2) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function FormField({
  label,
  children,
  error,
  style,
}: {
  label?: string;
  children: React.ReactNode;
  error?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={style}>
      {label && (
        <label
          style={{
            display: "block",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: "0.875rem",
            color: "#2c1a1d",
            marginBottom: "0.5rem",
            letterSpacing: "0.02em",
          }}
        >
          {label}
        </label>
      )}
      {children}
      {error && (
        <p style={{ fontSize: "0.78rem", color: "#c1121f", marginTop: "0.3rem" }}>
          {error}
        </p>
      )}
    </div>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div
      style={{
        background: "#fffaf4",
        borderRadius: "1.5rem",
        padding: "3rem 2.5rem",
        textAlign: "center",
        boxShadow: "0 4px 32px rgba(44,26,29,0.1)",
        border: "1px solid rgba(183,110,121,0.2)",
      }}
    >
      <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🌸</div>
      <h3
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.75rem",
          color: "#2c1a1d",
          marginBottom: "0.75rem",
        }}
      >
        Booking Request Sent!
      </h3>
      <p
        style={{
          color: "#6b4c52",
          lineHeight: 1.7,
          marginBottom: "1.75rem",
          maxWidth: "400px",
          margin: "0 auto 1.75rem",
        }}
      >
        WhatsApp should have opened with your booking details. Our team will
        confirm your appointment within 30 minutes during business hours.
      </p>
      <button onClick={onReset} className="btn-rose-outline">
        Book Another Appointment
      </button>
    </div>
  );
}
