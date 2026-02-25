"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

const posts = [
  // Pinned
  "https://www.instagram.com/p/DUvot_lCX6z/",
  "https://www.instagram.com/p/DUvGHwrgc4I/",
  "https://www.instagram.com/p/DOyz8FXyyM7/",
  "https://www.instagram.com/p/DVK2PtxgZS_/",
  // Recent
  "https://www.instagram.com/p/DVJX4JJCTyx/",
  "https://www.instagram.com/p/DVJQfo5kSw0/",
  "https://www.instagram.com/p/DVIz0xWgUg5/",
  "https://www.instagram.com/p/DVFtwyXAe7X/",
  "https://www.instagram.com/p/DVK4gKLmfuG/",
  "https://www.instagram.com/p/DVDdd-nkpZS/",
  "https://www.instagram.com/p/DVDI0xbkYEh/",
  "https://www.instagram.com/p/DU-ifqpCBpN/",
];

export default function InstagramSection() {
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
    <section
      id="instagram"
      style={{ background: "#fdf6ee", padding: "5rem 1.5rem" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div className="script-accent">Our Work</div>
          <div
            className="gold-divider"
            style={{ maxWidth: "200px", margin: "0.75rem auto" }}
          >
            <span style={{ fontSize: "1rem", color: "#c9a96e" }}>✦</span>
          </div>
          <h2 className="section-heading" style={{ marginBottom: "0.75rem" }}>
            From Our Studio
          </h2>
          <p
            className="section-subheading"
            style={{ maxWidth: "520px", margin: "0 auto" }}
          >
            Real transformations, real clients. Every look crafted with love at
            House of Soha.
          </p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.25rem",
            alignItems: "start",
          }}
        >
          {posts.map((url) => (
            <div key={url} style={{ minWidth: 0 }}>
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={url}
                data-instgrm-version="14"
                style={{
                  background: "#fff",
                  border: "0",
                  borderRadius: "1rem",
                  boxShadow: "0 2px 16px rgba(44,26,29,0.08)",
                  margin: "0 auto",
                  maxWidth: "100%",
                  minWidth: "326px",
                  padding: "0",
                  width: "calc(100% - 2px)",
                }}
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <a
            href="https://instagram.com/houseofsoha_"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            📸 Follow @houseofsoha_
          </a>
        </div>
      </div>
    </section>
  );
}
