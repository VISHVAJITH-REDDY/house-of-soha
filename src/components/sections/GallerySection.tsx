"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

const posts = [
  "https://www.instagram.com/p/DUvot_lCX6z/",
  "https://www.instagram.com/p/DUvGHwrgc4I/",
  "https://www.instagram.com/p/DOyz8FXyyM7/",
  "https://www.instagram.com/p/DVK2PtxgZS_/",
  "https://www.instagram.com/p/DVJX4JJCTyx/",
  "https://www.instagram.com/p/DVJQfo5kSw0/",
  "https://www.instagram.com/p/DVIz0xWgUg5/",
  "https://www.instagram.com/p/DVFtwyXAe7X/",
  "https://www.instagram.com/p/DVK4gKLmfuG/",
  "https://www.instagram.com/p/DVDdd-nkpZS/",
  "https://www.instagram.com/p/DVDI0xbkYEh/",
  "https://www.instagram.com/p/DU-ifqpCBpN/",
];

// Instagram embed header height ~88px, footer ~154px
const HEADER_H = 88;
const FOOTER_H = 154;
const COVER = "#fff";

export default function GallerySection() {
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = () => window.instgrm?.Embeds.process();
    document.body.appendChild(script);
  }, []);

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
            Real transformations, real clients. Every look crafted with love at House of Soha.
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

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.25rem",
            alignItems: "start",
          }}
        >
          {posts.map((url) => (
            <div
              key={url}
              style={{
                position: "relative",
                borderRadius: "1rem",
                overflow: "hidden",
                background: COVER,
                boxShadow: "0 2px 20px rgba(44,26,29,0.1)",
              }}
            >
              {/* Overlay: hides Instagram profile header */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: `${HEADER_H}px`,
                  background: COVER,
                  zIndex: 10,
                  pointerEvents: "none",
                  borderRadius: "1rem 1rem 0 0",
                }}
              />

              <blockquote
                className="instagram-media"
                data-instgrm-permalink={url}
                data-instgrm-version="14"
                style={{
                  background: COVER,
                  border: "0",
                  borderRadius: "0",
                  margin: "0 auto",
                  maxWidth: "100%",
                  minWidth: "300px",
                  padding: "0",
                  width: "100%",
                }}
              />

              {/* Overlay: hides "View more on Instagram" + likes + comment bar */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: `${FOOTER_H}px`,
                  background: COVER,
                  zIndex: 10,
                  pointerEvents: "none",
                  borderRadius: "0 0 1rem 1rem",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #gallery > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
