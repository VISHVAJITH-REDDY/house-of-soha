export interface Service {
  id: string;
  name: string;
  category: "makeup" | "skin" | "salon";
  description: string;
  icon: string;
  duration?: string;
}

export interface Founder {
  name: string;
  title: string;
  bio: string;
  initials: string;
  color: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  service: string;
  rating: number;
  quote: string;
}

export interface ChatMessage {
  id: string;
  role: "bot" | "user";
  text: string;
  timestamp: Date;
}
