export type QuickReply = {
  label: string;
  value: string;
  nextId: string;
};

export type ChatNode = {
  id: string;
  message: string;
  quickReplies?: QuickReply[];
  // If set, the widget renders a text input after showing the message
  awaitInput?: "name" | "phone";
  // Leaf node — triggers WA redirect or scroll to form
  isLeaf?: boolean;
  leafAction?: "whatsapp" | "scroll-form" | "end";
};

export const chatNodes: Record<string, ChatNode> = {
  start: {
    id: "start",
    message:
      "Hey there! 🌸 Welcome to House of Soha. I'm here to help you book an appointment or answer any questions. How can I help you today?",
    quickReplies: [
      { label: "Book an appointment 📅", value: "book", nextId: "service_select" },
      { label: "Our services 💄", value: "services", nextId: "services_info" },
      { label: "Prices & info 💰", value: "info", nextId: "pricing_info" },
      { label: "Location & hours 📍", value: "contact", nextId: "contact_info" },
    ],
  },

  service_select: {
    id: "service_select",
    message:
      "Amazing! Which service are you looking for? 😊",
    quickReplies: [
      { label: "💍 Bridal / Engagement Makeup", value: "bridal", nextId: "bridal_info" },
      { label: "✨ Party Makeup", value: "party", nextId: "party_info" },
      { label: "〰️ Microblading / Lash Ext", value: "pmu", nextId: "pmu_info" },
      { label: "💧 Facials / Skin", value: "skin", nextId: "skin_info" },
      { label: "💆 Salon Services", value: "salon", nextId: "salon_info" },
    ],
  },

  bridal_info: {
    id: "bridal_info",
    message:
      "Our bridal looks are crafted by Vaishnavi, our lead makeup artist who has been doing this since 2018. We specialise in everything from traditional to super contemporary looks — think natural glam, smokey eyes, the works! 💍\n\nShall I book you in for a consultation or a trial?",
    quickReplies: [
      { label: "Yes, book me in! 🎉", value: "book_bridal", nextId: "collect_name" },
      { label: "Tell me more first", value: "more", nextId: "bridal_more" },
      { label: "Go back ←", value: "back", nextId: "service_select" },
    ],
  },

  bridal_more: {
    id: "bridal_more",
    message:
      "We cover all functions — Roka, Engagement, Mehendi, Wedding day, and Reception. Products used: Huda Beauty, Lakme, Forever 52 and other premium brands. Everything is customised to your skin tone and preference. Would you like to book?",
    quickReplies: [
      { label: "Yes, let's book! ✨", value: "book", nextId: "collect_name" },
      { label: "Back to services", value: "back", nextId: "service_select" },
    ],
  },

  party_info: {
    id: "party_info",
    message:
      "Party glam is our speciality! Whether it's a Diwali look, bachelorette, anniversary dinner or a casual event — we've got you covered. Takes about 60–90 minutes. Want to book a slot? 🎉",
    quickReplies: [
      { label: "Book appointment ✨", value: "book", nextId: "collect_name" },
      { label: "Go back ←", value: "back", nextId: "service_select" },
    ],
  },

  pmu_info: {
    id: "pmu_info",
    message:
      "Our semi-permanent makeup services include Microblading, Lash Extensions, Lip Blush, Eyeliner Tattoo and more. These are done by certified artists. One thing — a patch test 48 hrs before is required. Shall I book you a consultation? 〰️",
    quickReplies: [
      { label: "Book consultation 📅", value: "book", nextId: "collect_name" },
      { label: "Go back ←", value: "back", nextId: "service_select" },
    ],
  },

  skin_info: {
    id: "skin_info",
    message:
      "Our skin treatments are curated by Dr. Sohini Reddy, a dermatology resident — so you know you're in safe hands! We offer HydraFacials, Medi Facials, and targeted treatments for acne, pigmentation, anti-aging, and more. 💧\n\nShall I book you a skin assessment?",
    quickReplies: [
      { label: "Book assessment 🌿", value: "book", nextId: "collect_name" },
      { label: "Go back ←", value: "back", nextId: "service_select" },
    ],
  },

  salon_info: {
    id: "salon_info",
    message:
      "Our full salon offers hair, nails, threading, waxing, and much more — all under one luxurious roof. Ready to treat yourself? 💆",
    quickReplies: [
      { label: "Book salon appointment", value: "book", nextId: "collect_name" },
      { label: "Go back ←", value: "back", nextId: "service_select" },
    ],
  },

  collect_name: {
    id: "collect_name",
    message:
      "Wonderful! To get you booked in, can I have your name please? 😊",
    awaitInput: "name",
  },

  collect_phone: {
    id: "collect_phone",
    message:
      "Got it! And your WhatsApp number so our team can confirm your appointment?",
    awaitInput: "phone",
  },

  confirm_booking: {
    id: "confirm_booking",
    message:
      "Perfect! I'll open WhatsApp right now so our team can confirm your date and time. They usually respond within 30 minutes (10am–8pm). 🌸",
    quickReplies: [
      { label: "Open WhatsApp 💬", value: "wa", nextId: "wa_sent" },
      { label: "Call instead 📞", value: "call", nextId: "call_info" },
    ],
  },

  wa_sent: {
    id: "wa_sent",
    message:
      "WhatsApp is opening now! 🎉 Our team will be in touch very soon to confirm everything. We can't wait to see you at House of Soha! ✨",
    isLeaf: true,
    leafAction: "whatsapp",
  },

  call_info: {
    id: "call_info",
    message:
      "Of course! You can reach us on:\n\n📞 Makeup: +91 78425 88868\n📞 Salon: +91 91116 11171\n📞 General: +91 99896 71456\n\n🕐 Mon–Sun: 11AM – 8PM\n\nOur AI receptionist answers 24/7 too! 🤖",
    quickReplies: [
      { label: "Open WhatsApp instead 💬", value: "wa", nextId: "wa_sent" },
      { label: "Back to start ←", value: "back", nextId: "start" },
    ],
  },

  services_info: {
    id: "services_info",
    message:
      "We offer:\n\n💄 Bridal & Engagement Makeup\n✨ Party Makeup\n〰️ Microblading & Lash Extensions\n🎨 Semi-Permanent Makeup\n💧 HydraFacials & Medi Facials\n🌿 Skin Treatments\n💆 Salon Services (hair, nails, waxing...)\n\nWhat sounds interesting to you?",
    quickReplies: [
      { label: "Book an appointment 📅", value: "book", nextId: "service_select" },
      { label: "Pricing info 💰", value: "info", nextId: "pricing_info" },
      { label: "Back to start ←", value: "back", nextId: "start" },
    ],
  },

  pricing_info: {
    id: "pricing_info",
    message:
      "Our pricing is tailored to each service and package. For exact quotes, it's best to chat with our team directly — they'll give you the best deal! 🌸\n\nWant to connect with them on WhatsApp?",
    quickReplies: [
      { label: "WhatsApp for pricing 💬", value: "wa_pricing", nextId: "wa_pricing" },
      { label: "Book appointment 📅", value: "book", nextId: "service_select" },
      { label: "Back to start ←", value: "back", nextId: "start" },
    ],
  },

  wa_pricing: {
    id: "wa_pricing",
    message:
      "Opening WhatsApp now! Ask our team about any service and they'll give you a detailed quote. 😊",
    isLeaf: true,
    leafAction: "whatsapp",
  },

  contact_info: {
    id: "contact_info",
    message:
      "Here are our details:\n\n📞 Makeup: +91 78425 88868\n📞 Salon: +91 91116 11171\n📍 Plot 72, Huda Enclave, Road No. 70, Jubilee Hills, Hyderabad\n🕐 Mon–Sat: 10am–8pm | Sun: 10am–6pm\n📸 Instagram: @houseofsoha_",
    quickReplies: [
      { label: "Book appointment 📅", value: "book", nextId: "service_select" },
      { label: "Back to start ←", value: "back", nextId: "start" },
    ],
  },

  end: {
    id: "end",
    message:
      "Is there anything else I can help you with? 😊",
    quickReplies: [
      { label: "Book appointment 📅", value: "book", nextId: "service_select" },
      { label: "Start over 🔄", value: "restart", nextId: "start" },
    ],
    isLeaf: true,
    leafAction: "end",
  },
};
