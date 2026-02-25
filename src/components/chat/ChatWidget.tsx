"use client";

import { useState, useEffect, useRef } from "react";
import ChatBubble from "./ChatBubble";
import { chatNodes } from "./chatFlow";
import type { ChatMessage } from "@/types";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

let msgId = 0;
const makeId = () => String(++msgId);

const botMsg = (text: string): ChatMessage => ({
  id: makeId(),
  role: "bot",
  text,
  timestamp: new Date(),
});

const userMsg = (text: string): ChatMessage => ({
  id: makeId(),
  role: "user",
  text,
  timestamp: new Date(),
});

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [nodeId, setNodeId] = useState("start");
  const [awaitInput, setAwaitInput] = useState<"name" | "phone" | null>(null);
  const [inputVal, setInputVal] = useState("");
  const [collectedName, setCollectedName] = useState("");
  const [collectedPhone, setCollectedPhone] = useState("");
  const [collectedService, setCollectedService] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasNotif, setHasNotif] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Init with start message
  useEffect(() => {
    if (open && messages.length === 0) {
      showNode("start");
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const addBot = (text: string) => {
    setMessages((m) => [...m, botMsg(text)]);
  };

  const simulateTyping = (text: string, delay = 600) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addBot(text);
    }, delay);
  };

  const showNode = (id: string, delay = 0) => {
    const node = chatNodes[id];
    if (!node) return;
    setNodeId(id);

    const show = () => {
      simulateTyping(node.message, 700);
      setTimeout(() => {
        if (node.awaitInput) {
          setAwaitInput(node.awaitInput);
        } else {
          setAwaitInput(null);
        }

        // Handle leaf actions
        if (node.isLeaf && node.leafAction === "whatsapp") {
          const waUrl = buildWhatsAppUrl({
            name: collectedName || "Guest",
            phone: collectedPhone || "Not provided",
            service: collectedService || "General enquiry",
            source: "chat",
          });
          setTimeout(() => window.open(waUrl, "_blank"), 1200);
        }

        if (node.isLeaf && node.leafAction === "scroll-form") {
          setTimeout(() => {
            document
              .querySelector("#booking")
              ?.scrollIntoView({ behavior: "smooth" });
            setOpen(false);
          }, 1200);
        }
      }, 800);
    };

    if (delay) {
      setTimeout(show, delay);
    } else {
      show();
    }
  };

  const handleQuickReply = (label: string, nextId: string, value: string) => {
    setMessages((m) => [...m, userMsg(label)]);

    // Track service selection
    if (
      [
        "bridal",
        "party",
        "pmu",
        "skin",
        "salon",
        "book_bridal",
        "book_party",
        "book_pmu",
        "book_skin",
        "book_salon",
      ].includes(value)
    ) {
      const serviceMap: Record<string, string> = {
        bridal: "Bridal / Engagement Makeup",
        party: "Party Makeup",
        pmu: "Microblading / Semi-Permanent",
        skin: "Facial / Skin Treatment",
        salon: "Salon Services",
        book_bridal: "Bridal Makeup",
        book_party: "Party Makeup",
        book_pmu: "Microblading",
        book_skin: "Skin Treatment",
        book_salon: "Salon Service",
      };
      if (serviceMap[value]) setCollectedService(serviceMap[value]);
    }

    showNode(nextId, 300);
  };

  const handleTextInput = () => {
    const val = inputVal.trim();
    if (!val) return;

    setMessages((m) => [...m, userMsg(val)]);
    setInputVal("");

    if (awaitInput === "name") {
      setCollectedName(val);
      setAwaitInput(null);
      showNode("collect_phone", 300);
    } else if (awaitInput === "phone") {
      // Simple validation
      const clean = val.replace(/\D/g, "");
      if (clean.length < 10) {
        simulateTyping(
          "Hmm, that doesn't look like a valid number. Could you try again? 😊",
          500
        );
        setAwaitInput("phone");
        return;
      }
      setCollectedPhone(clean.slice(-10));
      setAwaitInput(null);
      showNode("confirm_booking", 300);
    }
  };

  const currentNode = chatNodes[nodeId];

  return (
    <>
      {/* Floating button */}
      <div
        style={{
          position: "fixed",
          bottom: "1.75rem",
          right: "1.75rem",
          zIndex: 999,
        }}
      >
        {!open && hasNotif && (
          <div
            style={{
              position: "absolute",
              bottom: "110%",
              right: 0,
              background: "#fffaf4",
              border: "1px solid rgba(183,110,121,0.2)",
              borderRadius: "1rem 1rem 0 1rem",
              padding: "0.75rem 1rem",
              boxShadow: "0 4px 24px rgba(44,26,29,0.15)",
              whiteSpace: "nowrap",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.875rem",
              color: "#2c1a1d",
              cursor: "pointer",
              animation: "fadeUp 0.4s ease",
            }}
            onClick={() => {
              setHasNotif(false);
              setOpen(true);
            }}
          >
            💬 Chat to book an appointment!
          </div>
        )}

        <button
          onClick={() => {
            setOpen((o) => !o);
            setHasNotif(false);
          }}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #590028, #b76e79)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            boxShadow: "0 4px 24px rgba(183,110,121,0.4)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1)";
          }}
          aria-label="Open chat"
        >
          {open ? "✕" : "💬"}
        </button>
      </div>

      {/* Chat drawer */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "6rem",
            right: "1.75rem",
            zIndex: 998,
            width: "min(380px, calc(100vw - 2rem))",
            background: "#fffaf4",
            borderRadius: "1.25rem",
            boxShadow: "0 8px 48px rgba(44,26,29,0.2)",
            border: "1px solid rgba(183,110,121,0.2)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            animation: "fadeUp 0.3s ease",
            maxHeight: "min(560px, 80vh)",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #590028, #b76e79)",
              padding: "1rem 1.25rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.25rem",
              }}
            >
              🌸
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1rem",
                  color: "#fdf6ee",
                  fontWeight: 600,
                }}
              >
                House of Soha
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.75rem",
                  color: "rgba(253,246,238,0.7)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#4ade80",
                    display: "inline-block",
                  }}
                />
                Online · Replies instantly
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                marginLeft: "auto",
                background: "none",
                border: "none",
                color: "rgba(253,246,238,0.7)",
                cursor: "pointer",
                fontSize: "1.1rem",
                padding: "0.25rem",
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {messages.map((m) => (
              <ChatBubble key={m.id} message={m} />
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.75rem",
                }}
              >
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
                  }}
                >
                  🌸
                </div>
                <div
                  style={{
                    background: "#fffaf4",
                    border: "1px solid rgba(183,110,121,0.15)",
                    borderRadius: "1rem 1rem 1rem 0.2rem",
                    padding: "0.75rem 1rem",
                    boxShadow: "0 2px 8px rgba(44,26,29,0.08)",
                    display: "flex",
                    gap: "4px",
                    alignItems: "center",
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#b76e79",
                        display: "block",
                        animation: `float 1s ease-in-out ${i * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quick replies */}
            {!isTyping &&
              !awaitInput &&
              currentNode?.quickReplies &&
              currentNode.quickReplies.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                    marginTop: "0.5rem",
                    justifyContent: "flex-end",
                  }}
                >
                  {currentNode.quickReplies.map((qr) => (
                    <button
                      key={qr.value}
                      onClick={() =>
                        handleQuickReply(qr.label, qr.nextId, qr.value)
                      }
                      style={{
                        background: "#fffaf4",
                        border: "1.5px solid rgba(183,110,121,0.4)",
                        borderRadius: "9999px",
                        padding: "0.45rem 0.875rem",
                        fontSize: "0.8rem",
                        color: "#b76e79",
                        cursor: "pointer",
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 500,
                        transition: "all 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background =
                          "#b76e79";
                        (e.currentTarget as HTMLElement).style.color = "#fdf6ee";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background =
                          "#fffaf4";
                        (e.currentTarget as HTMLElement).style.color = "#b76e79";
                      }}
                    >
                      {qr.label}
                    </button>
                  ))}
                </div>
              )}

            <div ref={bottomRef} />
          </div>

          {/* Text input */}
          {awaitInput && (
            <div
              style={{
                padding: "0.75rem",
                borderTop: "1px solid rgba(183,110,121,0.15)",
                display: "flex",
                gap: "0.5rem",
              }}
            >
              <input
                type={awaitInput === "phone" ? "tel" : "text"}
                placeholder={
                  awaitInput === "name"
                    ? "Your name..."
                    : "Your WhatsApp number..."
                }
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleTextInput()}
                autoFocus
                style={{
                  flex: 1,
                  background: "#fffaf4",
                  border: "1.5px solid rgba(183,110,121,0.3)",
                  borderRadius: "0.625rem",
                  padding: "0.6rem 0.875rem",
                  fontSize: "0.875rem",
                  color: "#2c1a1d",
                  outline: "none",
                  fontFamily: "'DM Sans', sans-serif",
                }}
                onFocus={(e) => {
                  (e.target as HTMLElement).style.borderColor = "#b76e79";
                }}
                onBlur={(e) => {
                  (e.target as HTMLElement).style.borderColor =
                    "rgba(183,110,121,0.3)";
                }}
              />
              <button
                onClick={handleTextInput}
                disabled={!inputVal.trim()}
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: inputVal.trim() ? "#b76e79" : "#e0c9ca",
                  border: "none",
                  cursor: inputVal.trim() ? "pointer" : "not-allowed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1rem",
                  flexShrink: 0,
                  transition: "background 0.2s",
                }}
              >
                ➤
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
