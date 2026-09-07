import type { Metadata, Viewport } from "next";
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
    "Join the future of crypto trading with risk-free trading pools. Compete, earn rewards, and grow your portfolio.",
  keywords: [
    "crypto",
    "trading",
    "cryptocurrency",
    "bitcoin",
    "pool trading",
    "crypto rewards",
    "trading platform",
  ],
  openGraph: {
    title: "CryptoStack - Future of Crypto Trading",
    description:
      "Join the future of crypto trading with risk-free trading pools. Compete, earn rewards, and grow your portfolio.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="antialiased bg-dark-900 text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
