"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Do you do destination weddings?",
    a: "We currently serve clients in Hyderabad only. However, we do travel within the city to your venue for bridal bookings.",
  },
  {
    q: "How far in advance should I book?",
    a: "For bridal makeup, we recommend booking at least 2–3 months in advance, especially during wedding season (Oct–Feb). For salon and skin services, 2–3 days ahead is usually fine.",
  },
  {
    q: "What makeup brands do you use?",
    a: "We use premium brands including Huda Beauty, Lakme, Forever 52, and other high-end products — all selected for their quality, longevity, and skin-friendliness.",
  },
  {
    q: "Do you offer bridal trials?",
    a: "Yes! We highly recommend a bridal trial before your wedding day so you can approve the look, test the products on your skin, and make any adjustments well in advance.",
  },
  {
    q: "Is a patch test required for semi-permanent makeup?",
    a: "Yes. A patch test at least 48 hours before your Microblading, Lip Tinting, or other semi-permanent makeup appointment is mandatory for your safety.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept Cash, UPI, Credit Cards, and Debit Cards — whatever is most convenient for you.",
  },
  {
    q: "Do I need an appointment or can I walk in?",
    a: "Appointments are strongly recommended to avoid waiting, especially for bridal, skin, and semi-permanent makeup services. Walk-ins are welcome for basic salon services subject to availability.",
  },
  {
    q: "Who is the makeup artist?",
    a: "Vaishnavi is our lead bridal makeup artist — a passionate, self-taught professional specialising in HD Glam, South Indian Traditional, Cocktail, and Minimalist bridal looks since 2018.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="faq"
      style={{ background: "#fdf6ee", padding: "5rem 1.5rem" }}
    >
      <div style={{ maxWidth: "820px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div className="script-accent">Got Questions?</div>
          <div
            className="gold-divider"
            style={{ maxWidth: "200px", margin: "0.75rem auto" }}
          >
            <span style={{ fontSize: "1rem", color: "#c9a96e" }}>✦</span>
          </div>
          <h2 className="section-heading" style={{ marginBottom: "0.75rem" }}>
            Frequently Asked Questions
          </h2>
          <p
            className="section-subheading"
            style={{ maxWidth: "480px", margin: "0 auto" }}
          >
            Everything you need to know before your visit to House of Soha.
          </p>
        </div>

        {/* Accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                background: "#fffaf4",
                borderRadius: "1rem",
                border: `1px solid ${open === i ? "rgba(183,110,121,0.4)" : "rgba(183,110,121,0.15)"}`,
                overflow: "hidden",
                boxShadow:
                  open === i
                    ? "0 4px 20px rgba(183,110,121,0.12)"
                    : "0 2px 8px rgba(44,26,29,0.05)",
                transition: "all 0.25s ease",
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "1.25rem 1.5rem",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  gap: "1rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1rem",
                    color: "#2c1a1d",
                    fontWeight: 600,
                    lineHeight: 1.4,
                  }}
                >
                  {faq.q}
                </span>
                <span
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background:
                      open === i ? "#b76e79" : "rgba(183,110,121,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                    color: open === i ? "#fdf6ee" : "#b76e79",
                    flexShrink: 0,
                    transition: "all 0.25s ease",
                    transform: open === i ? "rotate(45deg)" : "none",
                  }}
                >
                  +
                </span>
              </button>

              {open === i && (
                <div
                  style={{
                    padding: "0 1.5rem 1.25rem",
                    animation: "fadeIn 0.2s ease",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.9375rem",
                      color: "#6b4c52",
                      lineHeight: 1.75,
                      margin: 0,
                    }}
                  >
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "#6b4c52",
              marginBottom: "1.25rem",
            }}
          >
            Still have questions? We&apos;re happy to help!
          </p>
          <a
            href="https://wa.me/917842588868"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            💬 Ask on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
