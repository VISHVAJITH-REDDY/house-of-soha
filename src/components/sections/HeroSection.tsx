"use client";

import Image from "next/image";

const scrollTo = (id: string) => {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
};

export default function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "linear-gradient(135deg, #590028 0%, #2c1a1d 40%, #1a0810 100%)",
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(183,110,121,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-15%",
          left: "-10%",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,169,110,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Floating ornament dots */}
      {[
        { top: "20%", left: "8%", size: 6, delay: "0s" },
        { top: "70%", left: "5%", size: 4, delay: "1s" },
        { top: "30%", right: "10%", size: 5, delay: "0.5s" },
        { top: "80%", right: "8%", size: 7, delay: "1.5s" },
        { top: "50%", left: "15%", size: 3, delay: "2s" },
      ].map((dot, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: dot.top,
            left: "left" in dot ? dot.left : undefined,
            right: "right" in dot ? dot.right : undefined,
            width: dot.size,
            height: dot.size,
            borderRadius: "50%",
            background: "#c9a96e",
            opacity: 0.4,
            animation: `float 4s ease-in-out ${dot.delay} infinite`,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Gold border frame */}
      <div
        style={{
          position: "absolute",
          inset: "1.5rem",
          border: "1px solid rgba(201,169,110,0.2)",
          borderRadius: "0.5rem",
          pointerEvents: "none",
        }}
      />

      {/* Main content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "2rem 1.5rem",
          maxWidth: "800px",
          animation: "fadeUp 0.8s ease-out both",
        }}
      >
        {/* Logo */}
        <div
          style={{
            width: "120px",
            height: "120px",
            margin: "0 auto 1.5rem",
            borderRadius: "50%",
            overflow: "hidden",
            boxShadow: "0 0 0 3px rgba(201,169,110,0.4), 0 8px 40px rgba(0,0,0,0.4)",
            animation: "fadeIn 1s ease both",
          }}
        >
          <Image
            src="/logo.png"
            alt="House of Soha"
            width={120}
            height={120}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
            priority
          />
        </div>

        <div className="script-accent" style={{ marginBottom: "0.5rem", fontSize: "1.4rem" }}>
          Welcome to
        </div>

        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(3rem, 8vw, 6rem)",
            fontWeight: 700,
            color: "#fdf6ee",
            lineHeight: 1.05,
            marginBottom: "0.5rem",
            letterSpacing: "-0.01em",
          }}
        >
          House of Soha
        </h1>

        <div className="gold-divider" style={{ maxWidth: "320px", margin: "1.25rem auto" }}>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#c9a96e",
              whiteSpace: "nowrap",
            }}
          >
            Jubilee Hills · Hyderabad
          </span>
        </div>

        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
            color: "rgba(253,246,238,0.85)",
            marginBottom: "1.5rem",
            lineHeight: 1.5,
          }}
        >
          Elevating you, not just transforming you
        </p>

        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "1rem",
            color: "rgba(253,246,238,0.65)",
            maxWidth: "520px",
            margin: "0 auto 2.5rem",
            lineHeight: 1.75,
          }}
        >
          A sanctuary for bridal makeup, microblading, medi facials & premium
          salon services — crafted with medical expertise and artistic soul.
        </p>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => scrollTo("#booking")}
            className="btn-primary"
            style={{ fontSize: "1rem", padding: "1rem 2.25rem" }}
          >
            ✨ Book Appointment
          </button>
          <button
            onClick={() => scrollTo("#services")}
            className="btn-outline"
            style={{ fontSize: "1rem", padding: "1rem 2.25rem" }}
          >
            Explore Services
          </button>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "3rem",
            marginTop: "4rem",
            flexWrap: "wrap",
          }}
        >
          {[
            { num: "7+", label: "Years of Excellence" },
            { num: "10K+", label: "Happy Clients" },
            { num: "10+", label: "Premium Services" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "#c9a96e",
                  lineHeight: 1,
                }}
              >
                {stat.num}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(253,246,238,0.5)",
                  marginTop: "0.4rem",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          animation: "float 2s ease-in-out infinite",
        }}
      >
        <span
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(253,246,238,0.4)",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Scroll
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(201,169,110,0.5)"
          strokeWidth="2"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
