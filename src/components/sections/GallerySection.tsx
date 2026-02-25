"use client";

import { useEffect, useState } from "react";

interface BeholdPost {
  id: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  mediaUrl: string;
  thumbnailUrl?: string;
  permalink: string;
  caption?: string;
  timestamp: string;
}

const FEED_ID = process.env.NEXT_PUBLIC_BEHOLD_FEED_ID ?? "";

export default function GallerySection() {
  const [posts, setPosts] = useState<BeholdPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!FEED_ID) {
      setLoading(false);
      return;
    }
    fetch(`https://feeds.behold.so/${FEED_ID}`)
      .then((r) => r.json())
      .then((data: BeholdPost[]) => {
        // Show only videos/reels
        const videos = data.filter((p) => p.mediaType === "VIDEO");
        setPosts(videos.slice(0, 9));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
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

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: "center", padding: "3rem", color: "#b76e79" }}>
            Loading gallery…
          </div>
        )}

        {/* No feed ID configured */}
        {!loading && !FEED_ID && (
          <div
            style={{
              textAlign: "center",
              padding: "2rem",
              color: "#9e7b82",
              background: "#fff",
              borderRadius: "1rem",
              fontSize: "0.9rem",
            }}
          >
            Add <code>NEXT_PUBLIC_BEHOLD_FEED_ID</code> to your environment variables to show the Instagram feed.
          </div>
        )}

        {/* Video grid */}
        {!loading && posts.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.25rem",
              alignItems: "start",
            }}
          >
            {posts.map((post) => (
              <a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  borderRadius: "1rem",
                  overflow: "hidden",
                  boxShadow: "0 2px 20px rgba(44,26,29,0.1)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  position: "relative",
                  background: "#000",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(44,26,29,0.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 20px rgba(44,26,29,0.1)";
                }}
              >
                {/* Thumbnail */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.thumbnailUrl ?? post.mediaUrl}
                  alt={post.caption?.slice(0, 80) ?? "House of Soha"}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    objectFit: "cover",
                  }}
                  loading="lazy"
                />
                {/* Play icon overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(0,0,0,0.15)",
                    transition: "background 0.2s",
                  }}
                >
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.85)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.25rem",
                    }}
                  >
                    ▶
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
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
