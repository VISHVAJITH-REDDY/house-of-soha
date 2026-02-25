import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "House of Soha | Luxury Beauty Salon – Jubilee Hills, Hyderabad",
  description:
    "House of Soha is Hyderabad's premier luxury beauty salon offering bridal makeup, microblading, lash extensions, hydra facials, and more. Located in Jubilee Hills. Book your appointment today.",
  keywords:
    "House of Soha, beauty salon Hyderabad, bridal makeup Hyderabad, microblading Jubilee Hills, hydra facial, lash extensions, medi facial, luxury salon",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "House of Soha | Luxury Beauty Salon – Hyderabad",
    description:
      "Where luxury meets artistry. Premium bridal makeup, skin treatments & salon services in Jubilee Hills, Hyderabad.",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "House of Soha" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
