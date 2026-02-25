"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "all 0.35s ease",
          backgroundColor: scrolled ? "rgba(253,246,238,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          boxShadow: scrolled ? "0 2px 20px rgba(44,26,29,0.1)" : "none",
          borderBottom: scrolled ? "1px solid rgba(183,110,121,0.15)" : "none",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "72px",
          }}
        >
          {/* Logo */}
          <a
            href="#"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                overflow: "hidden",
                flexShrink: 0,
                boxShadow: scrolled ? "0 2px 12px rgba(183,110,121,0.3)" : "0 2px 12px rgba(0,0,0,0.3)",
                transition: "box-shadow 0.35s",
              }}
            >
              <Image
                src="/logo.png"
                alt="House of Soha"
                width={48}
                height={48}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                priority
              />
            </div>
            <div>
              <span
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: "1.6rem",
                  fontWeight: 600,
                  color: scrolled ? "#590028" : "#fdf6ee",
                  lineHeight: 1,
                  display: "block",
                  transition: "color 0.35s",
                }}
              >
                House of Soha
              </span>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: scrolled ? "#b76e79" : "rgba(253,246,238,0.7)",
                  transition: "color 0.35s",
                }}
              >
                Jubilee Hills · Hyderabad
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <div
              className="desktop-nav"
              style={{ display: "flex", gap: "2rem", alignItems: "center" }}
            >
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: "0.9375rem",
                    letterSpacing: "0.01em",
                    color: scrolled ? "#2c1a1d" : "rgba(253,246,238,0.9)",
                    transition: "color 0.2s",
                    padding: "0.25rem 0",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.color = "#b76e79";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.color = scrolled
                      ? "#2c1a1d"
                      : "rgba(253,246,238,0.9)";
                  }}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNav("#booking")}
                className="btn-primary"
                style={{
                  padding: "0.6rem 1.5rem",
                  fontSize: "0.875rem",
                  background: scrolled
                    ? "#b76e79"
                    : "rgba(183,110,121,0.85)",
                }}
              >
                Book Now
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="mobile-hamburger"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.5rem",
                display: "none",
              }}
              aria-label="Toggle menu"
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    style={{
                      display: "block",
                      width: "22px",
                      height: "2px",
                      background: scrolled ? "#2c1a1d" : "#fdf6ee",
                      borderRadius: "2px",
                      transition: "all 0.2s",
                      transform:
                        menuOpen && i === 0
                          ? "rotate(45deg) translate(5px, 5px)"
                          : menuOpen && i === 1
                            ? "scaleX(0)"
                            : menuOpen && i === 2
                              ? "rotate(-45deg) translate(5px, -5px)"
                              : "none",
                    }}
                  />
                ))}
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 40,
            backgroundColor: "rgba(89,0,40,0.97)",
            backdropFilter: "blur(8px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
            animation: "fadeIn 0.25s ease",
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Playfair Display', serif",
                fontSize: "2rem",
                color: "#fdf6ee",
                padding: "0.5rem",
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNav("#booking")}
            className="btn-primary"
            style={{ marginTop: "1rem" }}
          >
            Book an Appointment
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
