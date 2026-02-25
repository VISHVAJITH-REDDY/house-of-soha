"use client";

const VAPI_PHONE = process.env.NEXT_PUBLIC_VAPI_PHONE ?? "+91 XXXX XXXXXX";

export default function ContactSection() {
  return (
    <section
      id="contact"
      style={{ background: "#f5ebe0", padding: "5rem 1.5rem" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div className="script-accent">Get in Touch</div>
          <div className="gold-divider" style={{ maxWidth: "200px", margin: "0.75rem auto" }}>
            <span style={{ fontSize: "1rem", color: "#c9a96e" }}>✦</span>
          </div>
          <h2 className="section-heading" style={{ marginBottom: "0.75rem" }}>
            Contact Us
          </h2>
          <p className="section-subheading" style={{ maxWidth: "480px", margin: "0 auto" }}>
            We&apos;d love to hear from you. Reach us via call, WhatsApp, or visit
            our studio in Jubilee Hills.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
            marginBottom: "2.5rem",
          }}
        >
          {/* AI Voice Agent card */}
          <div
            style={{
              background: "linear-gradient(135deg, #590028, #b76e79)",
              borderRadius: "1.25rem",
              padding: "2rem",
              color: "#fdf6ee",
              gridColumn: "1 / -1",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: "1.25rem", flexWrap: "wrap" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.75rem",
                  flexShrink: 0,
                }}
              >
                🤖
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.6)",
                    marginBottom: "0.3rem",
                  }}
                >
                  AI Voice Receptionist
                </div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.4rem",
                    margin: "0 0 0.5rem",
                    color: "#fdf6ee",
                  }}
                >
                  Call & Book Instantly
                </h3>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "rgba(255,255,255,0.75)",
                    lineHeight: 1.65,
                    margin: "0 0 1.25rem",
                    maxWidth: "480px",
                  }}
                >
                  Our AI voice assistant — powered by natural Indian English —
                  answers 24/7, collects your details, and books your appointment.
                  No hold music, no waiting.
                </p>
                <a
                  href={`tel:${VAPI_PHONE.replace(/\s/g, "")}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background: "rgba(255,255,255,0.2)",
                    color: "#fdf6ee",
                    textDecoration: "none",
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "9999px",
                    border: "1px solid rgba(255,255,255,0.3)",
                    transition: "background 0.2s",
                  }}
                >
                  📞 {VAPI_PHONE}
                </a>
              </div>
            </div>
          </div>

          {/* Makeup phone */}
          <ContactCard
            emoji="💄"
            label="Makeup Enquiries"
            value="+91 78425 88868"
            href="tel:+917842588868"
            bgColor="#fffaf4"
            accentColor="#b76e79"
          />

          {/* Salon phone */}
          <ContactCard
            emoji="💆"
            label="Salon Services"
            value="+91 91116 11171"
            href="tel:+919111611171"
            bgColor="#fffaf4"
            accentColor="#c9a96e"
          />

          {/* Secondary phone */}
          <ContactCard
            emoji="📞"
            label="General Enquiries"
            value="+91 99896 71456"
            href="tel:+919989671456"
            bgColor="#fffaf4"
            accentColor="#590028"
          />

          {/* WhatsApp */}
          <ContactCard
            emoji="💬"
            label="WhatsApp Us"
            value="Chat on WhatsApp"
            href="https://wa.me/917842588868"
            bgColor="#fffaf4"
            accentColor="#25D366"
          />

          {/* Instagram */}
          <ContactCard
            emoji="📸"
            label="Instagram"
            value="@houseofsoha_"
            href="https://instagram.com/houseofsoha_"
            bgColor="#fffaf4"
            accentColor="#C13584"
          />
        </div>

        {/* Address + Map */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.5rem",
            alignItems: "stretch",
          }}
        >
          <div
            className="card-luxury"
            style={{ padding: "2rem" }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>📍</div>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.2rem",
                color: "#2c1a1d",
                marginBottom: "0.75rem",
              }}
            >
              Visit Our Studio
            </h3>
            <p
              style={{
                fontSize: "0.95rem",
                color: "#6b4c52",
                lineHeight: 1.75,
                marginBottom: "1.25rem",
              }}
            >
              Meadows Court, Plot 72,
              <br />
              HUDA Enclave, Road No. 70,
              <br />
              Aswini Layout, Prashasan Nagar,
              <br />
              Jubilee Hills, Hyderabad 500033
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div style={{ fontSize: "0.85rem", color: "#2c1a1d" }}>
                <span style={{ color: "#b76e79", fontWeight: 600 }}>Mon – Sun:</span>{" "}
                11:00 AM – 8:00 PM
              </div>
              <div style={{ fontSize: "0.8rem", color: "#9e7b82", marginTop: "0.25rem" }}>
                💳 Cash · UPI · Credit / Debit Cards
              </div>
            </div>
          </div>

          {/* Map embed */}
          <div
            style={{
              borderRadius: "1.25rem",
              overflow: "hidden",
              minHeight: "250px",
              boxShadow: "0 2px 16px rgba(44,26,29,0.1)",
            }}
          >
            
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4441.207012164357!2d78.40047337579068!3d17.423830183469672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91bfd76d9d0d%3A0x191b614ce82d64ca!2sHouse%20of%20Soha!5e0!3m2!1sen!2sin!4v1772031616147!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "250px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="House of Soha Location"
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #contact > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function ContactCard({
  emoji,
  label,
  value,
  href,
  bgColor,
  accentColor,
}: {
  emoji: string;
  label: string;
  value: string;
  href: string;
  bgColor: string;
  accentColor: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      style={{
        display: "block",
        background: bgColor,
        borderRadius: "1.25rem",
        padding: "1.5rem",
        textDecoration: "none",
        border: `1px solid ${accentColor}20`,
        boxShadow: "0 2px 16px rgba(44,26,29,0.06)",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
        (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${accentColor}25`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 16px rgba(44,26,29,0.06)";
      }}
    >
      <div style={{ fontSize: "1.75rem", marginBottom: "0.75rem" }}>{emoji}</div>
      <div
        style={{
          fontSize: "0.75rem",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: accentColor,
          fontWeight: 600,
          marginBottom: "0.25rem",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.05rem",
          color: "#2c1a1d",
          fontWeight: 600,
        }}
      >
        {value}
      </div>
    </a>
  );
}
