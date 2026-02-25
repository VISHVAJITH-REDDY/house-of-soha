import type { ChatMessage } from "@/types";

export default function ChatBubble({ message }: { message: ChatMessage }) {
  const isBot = message.role === "bot";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isBot ? "flex-start" : "flex-end",
        marginBottom: "0.75rem",
        alignItems: "flex-end",
        gap: "0.5rem",
      }}
    >
      {isBot && (
        <div
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #590028, #b76e79)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.9rem",
            flexShrink: 0,
          }}
        >
          🌸
        </div>
      )}
      <div
        style={{
          maxWidth: "80%",
          padding: "0.75rem 1rem",
          borderRadius: isBot
            ? "1rem 1rem 1rem 0.2rem"
            : "1rem 1rem 0.2rem 1rem",
          background: isBot ? "#fffaf4" : "#b76e79",
          color: isBot ? "#2c1a1d" : "#fdf6ee",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.875rem",
          lineHeight: 1.6,
          boxShadow: isBot
            ? "0 2px 8px rgba(44,26,29,0.08)"
            : "0 2px 8px rgba(183,110,121,0.3)",
          whiteSpace: "pre-line",
          border: isBot ? "1px solid rgba(183,110,121,0.15)" : "none",
        }}
      >
        {message.text}
      </div>
    </div>
  );
}
