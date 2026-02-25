"use client";

import { useState } from "react";

const galleryItems = [
  { id: 1, label: "Bridal Look", emoji: "👰", bg: "linear-gradient(135deg, #590028, #b76e79)", aspect: "tall" },
  { id: 2, label: "Engagement Glam", emoji: "💍", bg: "linear-gradient(135deg, #c9a96e, #8b4a54)", aspect: "normal" },
  { id: 3, label: "Microblading", emoji: "〰️", bg: "linear-gradient(135deg, #b76e79, #d4a0a7)", aspect: "normal" },
  { id: 4, label: "Lash Extensions", emoji: "👁️", bg: "linear-gradient(135deg, #1a0810, #590028)", aspect: "tall" },
  { id: 5, label: "Hydra Facial Glow", emoji: "💧", bg: "linear-gradient(135deg, #c9a96e, #fdf6ee)", aspect: "normal" },
  { id: 6, label: "Smokey Eye", emoji: "✨", bg: "linear-gradient(135deg, #2c1a1d, #b76e79)", aspect: "normal" },
  { id: 7, label: "Bridal Full Look", emoji: "💐", bg: "linear-gradient(135deg, #590028, #c9a96e)", aspect: "normal" },
  { id: 8, label: "Natural Glam", emoji: "🌿", bg: "linear-gradient(135deg, #8b4a54, #d4a0a7)", aspect: "tall" },
  { id: 9, label: "Party Makeup", emoji: "🎉", bg: "linear-gradient(135deg, #b76e79, #590028)", aspect: "normal" },
];

export default function GallerySection() {
  const [selected, setSelected] = useState<number | null>(null);
  const selectedItem = galleryItems.find((g) => g.id === selected);

  return (
    <section id="gallery" style={{ background: "#fdf6ee", padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div className="script-accent">Our Work</div>
          <div className="gold-divider" style={{ maxWidth: "200px", margin: "0.75rem auto" }}>
            <span style={{ fontSize: "1rem", color: "#c9a96e" }}>✦</span>
          </div>
          <h2 className="section-heading" style={{ marginBottom: "1rem" }}>
            Gallery
          </h2>
          <p className="section-subheading" style={{ maxWidth: "480px", margin: "0 auto 1.5rem" }}>
            A glimpse into our world of artistry. Each look is a story.
          </p>
          <a
            href="https://instagram.com/houseofsoha_"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-rose-outline"
            style={{ fontSize: "0.875rem", padding: "0.6rem 1.5rem" }}
          >
            📸 Follow @houseofsoha_
          </a>
        </div>

        {/* Gallery grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelected(item.id)}
              style={{
                background: item.bg,
                borderRadius: "1rem",
                aspectRatio: item.aspect === "tall" ? "3/4" : "4/3",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 12px 40px rgba(44,26,29,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div style={{ fontSize: "3rem" }}>{item.emoji}</div>
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "1.25rem 1rem 1rem",
                  background:
                    "linear-gradient(transparent, rgba(0,0,0,0.5))",
                  color: "#fdf6ee",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>

        <p
          style={{
            textAlign: "center",
            fontSize: "0.85rem",
            color: "#9e7b82",
            fontStyle: "italic",
          }}
        >
          Visit our Instagram for the latest work and client transformations.
        </p>
      </div>

      {/* Lightbox */}
      {selected && selectedItem && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(26,8,16,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "fadeIn 0.2s ease",
            cursor: "pointer",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: selectedItem.bg,
              borderRadius: "1.5rem",
              width: "min(420px, 90vw)",
              aspectRatio: "3/4",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "default",
              position: "relative",
            }}
          >
            <div style={{ fontSize: "5rem" }}>{selectedItem.emoji}</div>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.5rem",
                color: "#fdf6ee",
                marginTop: "1rem",
              }}
            >
              {selectedItem.label}
            </div>
            <button
              onClick={() => setSelected(null)}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "rgba(255,255,255,0.2)",
                border: "none",
                color: "#fdf6ee",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          #gallery > div > div:nth-child(2) {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
