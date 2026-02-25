import { founders } from "@/data/founders";

export default function AboutSection() {
  return (
    <section
      id="about"
      style={{
        background: "linear-gradient(180deg, #f5ebe0 0%, #fdf6ee 100%)",
        padding: "5rem 1.5rem",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div className="script-accent">Our Story</div>
          <div className="gold-divider" style={{ maxWidth: "200px", margin: "0.75rem auto" }}>
            <span style={{ fontSize: "1rem", color: "#c9a96e" }}>✦</span>
          </div>
          <h2 className="section-heading" style={{ marginBottom: "1rem" }}>
            Meet the Founders
          </h2>
          <p
            className="section-subheading"
            style={{ maxWidth: "620px", margin: "0 auto" }}
          >
            Born from a shared passion for beauty and a desire to make luxury
            accessible, House of Soha is a testament to sisterhood, vision, and
            the art of self-care.
          </p>
        </div>

        {/* Story block */}
        <div
          style={{
            background: "#fffaf4",
            borderRadius: "1.5rem",
            padding: "2.5rem",
            marginBottom: "3.5rem",
            border: "1px solid rgba(183,110,121,0.15)",
            boxShadow: "0 2px 16px rgba(44,26,29,0.06)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-30px",
              right: "-30px",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%)",
            }}
          />
          <div
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: "5rem",
              color: "rgba(183,110,121,0.15)",
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
              fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
              color: "#2c1a1d",
              lineHeight: 1.7,
              maxWidth: "800px",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            The word &apos;Soha&apos; is all our names combined uniquely, and we couldn&apos;t
            help but call it &apos;House of Soha&apos; — because it is right under one of
            our houses. It was just meant to be; the three of us share the same
            dreams and passion for beauty.
          </p>
          <div
            style={{
              textAlign: "center",
              marginTop: "1.5rem",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.85rem",
              color: "#b76e79",
              letterSpacing: "0.1em",
            }}
          >
            — The Founders
          </div>
        </div>

        {/* Founder cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.75rem",
            marginBottom: "3rem",
          }}
        >
          {founders.map((founder) => (
            <FounderCard key={founder.name} founder={founder} />
          ))}
        </div>

        {/* Makeup Artist */}
        <div
          style={{
            background: "linear-gradient(135deg, #590028, #b76e79)",
            borderRadius: "1.5rem",
            padding: "2.5rem",
            display: "flex",
            alignItems: "center",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "rgba(253,246,238,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2.5rem",
              flexShrink: 0,
            }}
          >
            🎨
          </div>
          <div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(253,246,238,0.6)",
                marginBottom: "0.4rem",
              }}
            >
              Lead Makeup Artist
            </div>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.5rem",
                color: "#fdf6ee",
                margin: 0,
                marginBottom: "0.5rem",
              }}
            >
              Vaishnavi
            </h3>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "rgba(253,246,238,0.8)",
                fontSize: "0.9375rem",
                lineHeight: 1.65,
                margin: 0,
                maxWidth: "480px",
              }}
            >
              A self-taught makeup artist who chose her profession out of pure
              passion. Vaishnavi specialises in glamorous, minimal, and smokey
              eye looks — and has been enhancing bridal beauty since 2018.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FounderCard({
  founder,
}: {
  founder: typeof import("@/data/founders").founders[0];
}) {
  return (
    <div
      className="card-luxury"
      style={{ padding: "2rem", textAlign: "center" }}
    >
      <div
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${founder.color}30, ${founder.color}60)`,
          border: `2px solid ${founder.color}40`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 1.25rem",
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.5rem",
          fontWeight: 700,
          color: founder.color,
        }}
      >
        {founder.initials}
      </div>
      <h3
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.2rem",
          color: "#2c1a1d",
          marginBottom: "0.3rem",
        }}
      >
        {founder.name}
      </h3>
      <div
        style={{
          fontSize: "0.8rem",
          color: founder.color,
          fontWeight: 600,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          marginBottom: "1rem",
        }}
      >
        {founder.title}
      </div>
      <p
        style={{
          fontSize: "0.875rem",
          color: "#6b4c52",
          lineHeight: 1.7,
          margin: 0,
        }}
      >
        {founder.bio}
      </p>
    </div>
  );
}
