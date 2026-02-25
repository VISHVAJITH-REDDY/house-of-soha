import type { Service } from "@/types";

export const services: Service[] = [
  // ── Bridal & Event Makeup ──────────────────────────────────────
  {
    id: "bridal-makeup",
    name: "Bridal Makeup",
    category: "makeup",
    description:
      "Opulent, timeless bridal looks — The SOHA Way. HD Glam, South Indian Traditional, Cocktail, or Minimalist styles crafted for your perfect day.",
    icon: "💍",
    duration: "3–4 hrs",
  },
  {
    id: "engagement-makeup",
    name: "Engagement Makeup",
    category: "makeup",
    description:
      "Luminous, picture-perfect engagement looks using Huda Beauty, Lakme & Forever 52 for a flawless, long-lasting finish.",
    icon: "💐",
    duration: "2–3 hrs",
  },
  {
    id: "party-makeup",
    name: "Party & Cocktail Makeup",
    category: "makeup",
    description:
      "Smokey eyes, dewy skin, or full glam — tailored for every event from cocktail parties to festive celebrations.",
    icon: "✨",
    duration: "60–90 min",
  },
  {
    id: "roka-mehendi",
    name: "Roka / Mehendi Makeup",
    category: "makeup",
    description:
      "Soft, radiant looks perfect for Roka and Mehendi ceremonies. Lightweight yet camera-ready.",
    icon: "🌸",
    duration: "60–90 min",
  },
  {
    id: "saree-draping",
    name: "Saree Draping & Hair Styling",
    category: "makeup",
    description:
      "Expert saree draping including two-way drapes with dupatta, plus bridal hair — Gold-jada braids and floral designs.",
    icon: "👘",
    duration: "45–60 min",
  },

  // ── Skin & Semi-Permanent ──────────────────────────────────────
  {
    id: "medi-facial",
    name: "Medi Facial / BB Glow",
    category: "skin",
    description:
      "Medical-grade facials including BB Glow for instant luminosity. Curated for your specific skin concern.",
    icon: "🧬",
    duration: "45–60 min",
  },
  {
    id: "microblading",
    name: "Microblading",
    category: "skin",
    description:
      "Semi-permanent brow perfection. Natural, full brows with hair-stroke precision that last 12–18 months.",
    icon: "〰️",
    duration: "2 hrs",
  },
  {
    id: "lip-tinting",
    name: "Lip Tinting",
    category: "skin",
    description:
      "Semi-permanent lip tinting for a naturally flushed, defined pout that stays beautiful around the clock.",
    icon: "💋",
    duration: "60–90 min",
  },
  {
    id: "eyebrow-threading",
    name: "Eyebrow Threading & Shaping",
    category: "skin",
    description:
      "Precise eyebrow threading and shaping to perfectly frame your face.",
    icon: "🪡",
    duration: "15–20 min",
  },

  // ── Hair Care ──────────────────────────────────────────────────
  {
    id: "hair-cut",
    name: "Advance Hair Cut",
    category: "salon",
    description:
      "Expert cuts tailored to your face shape and hair texture by our skilled stylists.",
    icon: "✂️",
    duration: "45–60 min",
  },
  {
    id: "hair-coloring",
    name: "Hair Coloring",
    category: "salon",
    description:
      "Full color, highlights, and balayage using premium products for vibrant, lasting results.",
    icon: "🎨",
    duration: "2–4 hrs",
  },
  {
    id: "hair-straightening",
    name: "Hair Straightening & Rebonding",
    category: "salon",
    description:
      "Smooth, frizz-free hair with professional straightening, rebonding, and keratin botox treatments.",
    icon: "💁",
    duration: "2–4 hrs",
  },
  {
    id: "korean-hair-spa",
    name: "Korean Hair Spa",
    category: "salon",
    description:
      "A luxurious K-beauty inspired deep-conditioning treatment that restores shine, strength, and silk-smooth softness.",
    icon: "🌿",
    duration: "60–90 min",
  },

  // ── Body & Nails ───────────────────────────────────────────────
  {
    id: "waxing",
    name: "Rica Full Body Waxing",
    category: "salon",
    description:
      "Gentle yet effective full body waxing using Rica premium wax for long-lasting smooth skin.",
    icon: "🕯️",
    duration: "60–90 min",
  },
  {
    id: "body-polishing",
    name: "Full Body Polishing",
    category: "salon",
    description:
      "Exfoliating body polishing treatment for radiant, silky-smooth skin from head to toe.",
    icon: "💎",
    duration: "60–90 min",
  },
  {
    id: "gel-nails",
    name: "Gel Nail Extensions",
    category: "salon",
    description:
      "Flawless, chip-resistant gel nail extensions and nail art in any style or length you desire.",
    icon: "💅",
    duration: "60–90 min",
  },
  {
    id: "manicure-pedicure",
    name: "Premium Manicure & Pedicure",
    category: "salon",
    description:
      "Indulgent hands and feet treatments — cleanse, exfoliate, massage, and polish for a complete finish.",
    icon: "🛁",
    duration: "60–90 min",
  },
];

export const serviceNames = services.map((s) => s.name);
