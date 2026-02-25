"use client";

const WA_PHONE = process.env.NEXT_PUBLIC_WA_PHONE ?? "917842588868";

const waUrl = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(
  "Hi House of Soha! 🌸 I'd like to book an appointment. Could you please help me with availability?"
)}`;

export default function BookingSection() {
  const openChat = () => {
    window.dispatchEvent(new CustomEvent("openChat"));
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
            Choose how you&apos;d like to connect with us — we&apos;re here however works best for you.
          </p>
        </div>

        {/* 3 Channel Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {/* Chat */}
          <div
            style={{
              background: "linear-gradient(135deg, #590028 0%, #b76e79 100%)",
              borderRadius: "1.5rem",
              padding: "2.5rem",
              color: "#fdf6ee",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              boxShadow: "0 8px 32px rgba(89,0,40,0.25)",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "1rem",
                background: "rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
              }}
            >
              💬
            </div>
            <div>
              <div
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(253,246,238,0.6)",
                  marginBottom: "0.4rem",
                }}
              >
                Instant
              </div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.5rem",
                  margin: "0 0 0.5rem",
                }}
              >
                Chat to Book
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "rgba(253,246,238,0.75)",
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                Chat with our AI assistant — it guides you through services, answers questions, and connects you to WhatsApp to confirm your slot.
              </p>
            </div>
            <button
              onClick={openChat}
              style={{
                marginTop: "auto",
                background: "rgba(255,255,255,0.2)",
                border: "1.5px solid rgba(255,255,255,0.3)",
                borderRadius: "9999px",
                padding: "0.875rem 1.75rem",
                color: "#fdf6ee",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: "0.95rem",
                cursor: "pointer",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.2)";
              }}
            >
              💬 Start Chat
            </button>
          </div>

          {/* WhatsApp */}
          <div
            style={{
              background: "#fffaf4",
              borderRadius: "1.5rem",
              padding: "2.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              boxShadow: "0 4px 32px rgba(44,26,29,0.08)",
              border: "1px solid rgba(37,211,102,0.2)",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "1rem",
                background: "rgba(37,211,102,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
              }}
            >
              💚
            </div>
            <div>
              <div
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#25D366",
                  fontWeight: 600,
                  marginBottom: "0.4rem",
                }}
              >
                Responds in 30 mins
              </div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.5rem",
                  color: "#2c1a1d",
                  margin: "0 0 0.5rem",
                }}
              >
                Book via WhatsApp
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#6b4c52",
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                Message us directly on WhatsApp. Tell us what you&apos;re looking for and our team will suggest the best date and time for you.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.85rem", color: "#6b4c52" }}>
              <div>📞 Makeup: +91 78425 88868</div>
              <div>📞 Salon: +91 91116 11171</div>
              <div>🕐 Mon–Sun: 11AM – 8PM</div>
            </div>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginTop: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                background: "#25D366",
                border: "none",
                borderRadius: "9999px",
                padding: "0.875rem 1.75rem",
                color: "#fff",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: "0.95rem",
                cursor: "pointer",
                textDecoration: "none",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#1ebe5b";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#25D366";
              }}
            >
              💚 Open WhatsApp
            </a>
          </div>

          {/* Call */}
          <div
            style={{
              background: "#fffaf4",
              borderRadius: "1.5rem",
              padding: "2.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              boxShadow: "0 4px 32px rgba(44,26,29,0.08)",
              border: "1px solid rgba(201,169,110,0.2)",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "1rem",
                background: "rgba(201,169,110,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
              }}
            >
              📞
            </div>
            <div>
              <div
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#c9a96e",
                  fontWeight: 600,
                  marginBottom: "0.4rem",
                }}
              >
                Speak Directly
              </div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.5rem",
                  color: "#2c1a1d",
                  margin: "0 0 0.5rem",
                }}
              >
                Call to Book
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#6b4c52",
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                Prefer to talk? Call us directly and our team will book your appointment right away. Our AI receptionist is available 24/7.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { label: "Makeup Enquiries", number: "+91 78425 88868", href: "tel:+917842588868" },
                { label: "Salon Services", number: "+91 91116 11171", href: "tel:+919111611171" },
                { label: "General", number: "+91 99896 71456", href: "tel:+919989671456" },
              ].map((c) => (
                <a
                  key={c.href}
                  href={c.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "rgba(201,169,110,0.08)",
                    border: "1px solid rgba(201,169,110,0.2)",
                    borderRadius: "0.75rem",
                    padding: "0.65rem 1rem",
                    textDecoration: "none",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(201,169,110,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(201,169,110,0.08)";
                  }}
                >
                  <span style={{ fontSize: "0.78rem", color: "#9e7b82" }}>{c.label}</span>
                  <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#2c1a1d" }}>{c.number}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #booking > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
