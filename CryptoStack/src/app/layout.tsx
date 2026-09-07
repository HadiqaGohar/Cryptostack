import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CryptoStack - Future of Crypto Trading",
  description:
    "Join the future of crypto trading. Deposit once, trade freely with zero loss risk. Compete with real traders, climb the ranks, and earn daily rewards.",
  keywords: [
    "crypto trading",
    "pool trading",
    "cryptocurrency",
    "trading platform",
    "risk-free trading",
  ],
  openGraph: {
    title: "CryptoStack - Future of Crypto Trading",
    description:
      "Deposit once, trade freely with zero loss risk. Compete with real traders & climb the ranks for daily rewards.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-[#0a0a0a] text-[#ededed]">
        {children}
      </body>
    </html>
  );
}
