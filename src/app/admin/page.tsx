"use client";

import { useEffect, useState } from "react";
import type { Booking } from "@/lib/supabase";

const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "soha2024";

const SOURCE_COLORS: Record<string, string> = {
  chat: "#b76e79",
  whatsapp: "#25D366",
  voice: "#c9a96e",
};
const SOURCE_LABELS: Record<string, string> = {
  chat: "💬 Chat",
  whatsapp: "💚 WhatsApp",
  voice: "📞 Call",
};
const STATUS_COLORS: Record<string, string> = {
  pending: "#f59e0b",
  confirmed: "#22c55e",
  cancelled: "#ef4444",
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "chat" | "whatsapp" | "voice">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "confirmed" | "cancelled">("all");
  const [updating, setUpdating] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const login = () => {
    if (password === ADMIN_PASS) setAuthed(true);
    else alert("Wrong password");
  };

  const fetchBookings = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const res = await fetch("/api/admin/bookings");
      const text = await res.text();
      let data;
      try { data = JSON.parse(text); } catch { data = {}; }
      if (!res.ok) {
        setFetchError(data.error ?? `Server error ${res.status}`);
        setBookings([]);
      } else {
        setBookings(data.bookings ?? []);
      }
    } catch (e) {
      setFetchError(e instanceof Error ? e.message : "Network error");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    await fetchBookings();
    setUpdating(null);
  };

  useEffect(() => {
    if (authed) fetchBookings();
  }, [authed]);

  const filtered = bookings.filter((b) => {
    if (filter !== "all" && b.source !== filter) return false;
    if (statusFilter !== "all" && b.status !== statusFilter) return false;
    return true;
  });

  const counts = {
    all: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    chat: bookings.filter((b) => b.source === "chat").length,
    whatsapp: bookings.filter((b) => b.source === "whatsapp").length,
    voice: bookings.filter((b) => b.source === "voice").length,
  };

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", background: "#fdf6ee", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ background: "#fff", borderRadius: "1.5rem", padding: "2.5rem", width: "360px", boxShadow: "0 8px 40px rgba(44,26,29,0.12)", border: "1px solid rgba(183,110,121,0.15)" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.75rem", color: "#2c1a1d" }}>House of Soha</div>
            <div style={{ fontSize: "0.8rem", color: "#9e7b82", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "0.25rem" }}>Admin Dashboard</div>
          </div>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            style={{ width: "100%", padding: "0.75rem 1rem", border: "1.5px solid rgba(183,110,121,0.3)", borderRadius: "0.75rem", fontSize: "1rem", marginBottom: "1rem", boxSizing: "border-box", outline: "none", fontFamily: "inherit" }}
          />
          <button
            onClick={login}
            style={{ width: "100%", padding: "0.875rem", background: "linear-gradient(135deg, #590028, #b76e79)", color: "#fdf6ee", border: "none", borderRadius: "0.75rem", fontSize: "1rem", fontWeight: 600, cursor: "pointer" }}
          >
            Login →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f5ebe0" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #590028, #b76e79)", padding: "1.5rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "#fdf6ee" }}>House of Soha</div>
          <div style={{ fontSize: "0.75rem", color: "rgba(253,246,238,0.7)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Bookings Dashboard</div>
        </div>
        <button onClick={fetchBookings} style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", color: "#fdf6ee", borderRadius: "0.5rem", padding: "0.5rem 1rem", cursor: "pointer", fontSize: "0.85rem" }}>
          🔄 Refresh
        </button>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { label: "Total", value: counts.all, color: "#590028" },
            { label: "Pending", value: counts.pending, color: "#f59e0b" },
            { label: "Confirmed", value: counts.confirmed, color: "#22c55e" },
            { label: "💬 Chat", value: counts.chat, color: "#b76e79" },
            { label: "💚 WhatsApp", value: counts.whatsapp, color: "#25D366" },
            { label: "📞 Voice", value: counts.voice, color: "#c9a96e" },
          ].map((s) => (
            <div key={s.label} style={{ background: "#fff", borderRadius: "1rem", padding: "1.25rem", boxShadow: "0 2px 12px rgba(44,26,29,0.06)", borderLeft: `4px solid ${s.color}` }}>
              <div style={{ fontSize: "1.75rem", fontWeight: 700, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: "0.8rem", color: "#9e7b82", marginTop: "0.25rem" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
          {(["all", "chat", "whatsapp", "voice"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ padding: "0.4rem 1rem", borderRadius: "9999px", border: `1.5px solid ${filter === f ? "#b76e79" : "rgba(183,110,121,0.3)"}`, background: filter === f ? "#b76e79" : "#fff", color: filter === f ? "#fff" : "#6b4c52", fontSize: "0.85rem", cursor: "pointer", fontWeight: filter === f ? 600 : 400 }}>
              {f === "all" ? "All" : SOURCE_LABELS[f]}
            </button>
          ))}
          <div style={{ width: "1px", background: "rgba(183,110,121,0.2)", margin: "0 0.25rem" }} />
          {(["all", "pending", "confirmed", "cancelled"] as const).map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)}
              style={{ padding: "0.4rem 1rem", borderRadius: "9999px", border: `1.5px solid ${statusFilter === s ? STATUS_COLORS[s] ?? "#590028" : "rgba(183,110,121,0.3)"}`, background: statusFilter === s ? STATUS_COLORS[s] ?? "#590028" : "#fff", color: statusFilter === s ? "#fff" : "#6b4c52", fontSize: "0.85rem", cursor: "pointer", fontWeight: statusFilter === s ? 600 : 400, textTransform: "capitalize" }}>
              {s === "all" ? "All Status" : s}
            </button>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "#b76e79" }}>Loading bookings…</div>
        ) : fetchError ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "#ef4444", background: "#fff", borderRadius: "1rem", fontFamily: "monospace", fontSize: "0.85rem" }}>
            ❌ {fetchError}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "#9e7b82", background: "#fff", borderRadius: "1rem" }}>No bookings found.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {filtered.map((b) => (
              <div key={b.id} style={{ background: "#fff", borderRadius: "1rem", padding: "1.25rem 1.5rem", boxShadow: "0 2px 12px rgba(44,26,29,0.06)", display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "1rem", alignItems: "center" }}>
                {/* Source badge */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}>
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, color: SOURCE_COLORS[b.source] ?? "#b76e79", background: `${SOURCE_COLORS[b.source]}15`, padding: "0.25rem 0.6rem", borderRadius: "9999px", whiteSpace: "nowrap" }}>
                    {SOURCE_LABELS[b.source] ?? b.source}
                  </span>
                  <span style={{ fontSize: "0.65rem", color: "#9e7b82" }}>{new Date(b.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "2-digit" })}</span>
                </div>

                {/* Details */}
                <div>
                  <div style={{ fontWeight: 600, color: "#2c1a1d", fontSize: "0.95rem" }}>{b.name}</div>
                  <div style={{ fontSize: "0.82rem", color: "#6b4c52", marginTop: "0.15rem" }}>
                    📞 {b.phone} {b.email ? `· ✉️ ${b.email}` : ""}
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "#9e7b82", marginTop: "0.25rem" }}>
                    {b.service && `💄 ${b.service}`} {b.preferred_date && `· 📅 ${b.preferred_date}`} {b.time_slot && `· 🕐 ${b.time_slot}`}
                  </div>
                  {b.notes && <div style={{ fontSize: "0.78rem", color: "#b76e79", marginTop: "0.2rem", fontStyle: "italic" }}>"{b.notes}"</div>}
                </div>

                {/* Status controls */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", alignItems: "flex-end" }}>
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, color: STATUS_COLORS[b.status] ?? "#f59e0b", background: `${STATUS_COLORS[b.status]}15`, padding: "0.2rem 0.6rem", borderRadius: "9999px", textTransform: "capitalize" }}>
                    {b.status}
                  </span>
                  <div style={{ display: "flex", gap: "0.35rem" }}>
                    {b.status !== "confirmed" && (
                      <button onClick={() => updateStatus(b.id, "confirmed")} disabled={updating === b.id}
                        style={{ fontSize: "0.72rem", padding: "0.25rem 0.6rem", borderRadius: "0.4rem", border: "1px solid #22c55e", background: "#f0fdf4", color: "#16a34a", cursor: "pointer" }}>
                        ✓ Confirm
                      </button>
                    )}
                    {b.status !== "cancelled" && (
                      <button onClick={() => updateStatus(b.id, "cancelled")} disabled={updating === b.id}
                        style={{ fontSize: "0.72rem", padding: "0.25rem 0.6rem", borderRadius: "0.4rem", border: "1px solid #ef4444", background: "#fef2f2", color: "#dc2626", cursor: "pointer" }}>
                        ✕ Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
