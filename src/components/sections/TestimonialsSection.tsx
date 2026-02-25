"use client";

import { useState, useEffect } from "react";
import { testimonials } from "@/data/testimonials";

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[current];

  return (
    <section
      id="testimonials"
      style={{
        background: "linear-gradient(135deg, #590028 0%, #1a0810 100%)",
        padding: "5rem 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* BG circles */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,169,110,0.1), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div
            className="script-accent"
            style={{ color: "#c9a96e", fontSize: "1.4rem" }}
          >
            Client Love
          </div>
          <div className="gold-divider" style={{ maxWidth: "200px", margin: "0.75rem auto" }}>
            <span style={{ fontSize: "1rem", color: "#c9a96e" }}>✦</span>
          </div>
          <h2
            className="section-heading"
            style={{ color: "#fdf6ee", marginBottom: "0.5rem" }}
          >
            What Our Clients Say
          </h2>
        </div>

        {/* Testimonial card */}
        <div
          key={t.id}
          style={{
            background: "rgba(253,246,238,0.06)",
            border: "1px solid rgba(201,169,110,0.2)",
            borderRadius: "1.5rem",
            padding: "3rem 2.5rem",
            textAlign: "center",
            animation: "fadeIn 0.4s ease",
          }}
        >
          {/* Stars */}
          <div style={{ marginBottom: "1.5rem" }}>
            {Array.from({ length: t.rating }).map((_, i) => (
              <span key={i} style={{ color: "#c9a96e", fontSize: "1.25rem" }}>
                ★
              </span>
            ))}
          </div>

          <div
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: "4rem",
              color: "rgba(183,110,121,0.3)",
              lineHeight: 1,
              marginBottom: "-1rem",
            }}
          >
            &ldquo;
          </div>

          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "clamp(1.05rem, 2vw, 1.3rem)",
              color: "rgba(253,246,238,0.9)",
              lineHeight: 1.75,
              maxWidth: "680px",
              margin: "0 auto 2rem",
            }}
          >
            {t.quote}
          </p>

          <div>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.1rem",
                color: "#c9a96e",
                fontWeight: 600,
              }}
            >
              {t.clientName}
            </div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.8rem",
                color: "rgba(253,246,238,0.5)",
                marginTop: "0.25rem",
                letterSpacing: "0.08em",
              }}
            >
              {t.service}
            </div>
          </div>
        </div>

        {/* Dots */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.6rem",
            marginTop: "2rem",
          }}
        >
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
                background: i === current ? "#c9a96e" : "rgba(255,255,255,0.25)",
                transition: "all 0.3s ease",
                padding: 0,
              }}
            />
          ))}
        </div>

        {/* All reviews summary */}
        <div
          style={{
            textAlign: "center",
            marginTop: "3rem",
            display: "flex",
            justifyContent: "center",
            gap: "3rem",
            flexWrap: "wrap",
          }}
        >
          {[
            { value: "5.0", label: "Average Rating" },
            { value: "500+", label: "Happy Brides" },
            { value: "100%", label: "Satisfaction" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "#c9a96e",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "rgba(253,246,238,0.5)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginTop: "0.25rem",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
