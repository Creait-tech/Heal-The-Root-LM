import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Heal The Cycle — Discover Your Nervous System Profile",
  description:
    "Take this free assessment to discover your regulation pattern, core wound, and survival identity — and get personalized practices to start healing.",
  openGraph: {
    title: "Heal The Cycle — Discover Your Nervous System Profile",
    description:
      "Take this free assessment to discover your regulation pattern, core wound, and survival identity — and get personalized practices to start healing.",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Heal The Cycle — Discover Your Nervous System Profile",
    description:
      "Take this free assessment to discover your regulation pattern, core wound, and survival identity.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
