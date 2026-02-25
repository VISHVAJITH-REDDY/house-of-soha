"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#1a0810",
        color: "#fdf6ee",
        padding: "4rem 1.5rem 2rem",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "3rem",
            marginBottom: "3rem",
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "1rem" }}>
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  flexShrink: 0,
                  boxShadow: "0 0 0 2px rgba(201,169,110,0.4)",
                }}
              >
                <Image
                  src="/logo.png"
                  alt="House of Soha"
                  width={52}
                  height={52}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>
              <div
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: "1.75rem",
                  color: "#c9a96e",
                  lineHeight: 1.1,
                }}
              >
                House of Soha
              </div>
            </div>
            <p
              style={{
                fontSize: "0.9rem",
                color: "rgba(253,246,238,0.65)",
                lineHeight: 1.7,
                maxWidth: "240px",
              }}
            >
              Where luxury meets artistry. Your sanctuary for beauty, skin, and
              self-care in the heart of Hyderabad.
            </p>
            <div style={{ display: "flex", gap: "1rem", marginTop: "1.25rem" }}>
              <a
                href="https://instagram.com/houseofsoha_"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: "rgba(183,110,121,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#b76e79",
                  textDecoration: "none",
                  fontSize: "1.1rem",
                  transition: "background 0.2s",
                }}
              >
                📸
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.1rem",
                color: "#c9a96e",
                marginBottom: "1rem",
              }}
            >
              Services
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                "Bridal Makeup",
                "Engagement Makeup",
                "Roka / Mehendi Makeup",
                "Microblading",
                "Medi Facial / BB Glow",
                "Korean Hair Spa",
                "Gel Nail Extensions",
                "Rica Full Body Waxing",
              ].map((s) => (
                <li key={s} style={{ marginBottom: "0.5rem" }}>
                  <a
                    href="#services"
                    style={{
                      color: "rgba(253,246,238,0.65)",
                      textDecoration: "none",
                      fontSize: "0.9rem",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLElement).style.color = "#b76e79")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.color =
                        "rgba(253,246,238,0.65)")
                    }
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.1rem",
                color: "#c9a96e",
                marginBottom: "1rem",
              }}
            >
              Contact
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#b76e79",
                    marginBottom: "0.2rem",
                  }}
                >
                  Makeup Enquiries
                </div>
                <a
                  href="tel:+917842588868"
                  style={{
                    color: "rgba(253,246,238,0.85)",
                    textDecoration: "none",
                    fontSize: "0.95rem",
                  }}
                >
                  +91 78425 88868
                </a>
              </div>
              <div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#b76e79",
                    marginBottom: "0.2rem",
                  }}
                >
                  Salon Services
                </div>
                <a
                  href="tel:+919111611171"
                  style={{
                    color: "rgba(253,246,238,0.85)",
                    textDecoration: "none",
                    fontSize: "0.95rem",
                  }}
                >
                  +91 91116 11171
                </a>
              </div>
              <div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#b76e79",
                    marginBottom: "0.2rem",
                  }}
                >
                  Address
                </div>
                <p
                  style={{
                    color: "rgba(253,246,238,0.65)",
                    fontSize: "0.875rem",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  Meadows Court, Plot 72,
                  <br />
                  HUDA Enclave, Road No. 70,
                  <br />
                  Jubilee Hills, Hyderabad 500033
                </p>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.1rem",
                color: "#c9a96e",
                marginBottom: "1rem",
              }}
            >
              Hours
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                ["Mon – Sun", "11:00 AM – 8:00 PM"],
              ].map(([day, time]) => (
                <div key={day}>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: "rgba(253,246,238,0.5)",
                      display: "block",
                    }}
                  >
                    {day}
                  </span>
                  <span
                    style={{
                      fontSize: "0.9rem",
                      color: "rgba(253,246,238,0.85)",
                    }}
                  >
                    {time}
                  </span>
                </div>
              ))}
              <div style={{ marginTop: "1rem" }}>
                <a
                  href="#booking"
                  className="btn-primary"
                  style={{
                    fontSize: "0.85rem",
                    padding: "0.6rem 1.4rem",
                    display: "inline-flex",
                  }}
                >
                  Book Appointment
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <p
            style={{
              fontSize: "0.8rem",
              color: "rgba(253,246,238,0.4)",
              margin: 0,
            }}
          >
            © 2025 House of Soha. All rights reserved.
          </p>
          <p
            style={{
              fontSize: "0.8rem",
              color: "rgba(253,246,238,0.4)",
              margin: 0,
            }}
          >
            Made with ❤️ in Hyderabad
          </p>
        </div>
      </div>
    </footer>
  );
}
