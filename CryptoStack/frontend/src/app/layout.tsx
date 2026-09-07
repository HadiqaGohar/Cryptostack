import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
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
  title: "CryptoStack - AI Crypto Signals & Pool Trading",
  description: "Free AI-powered crypto signals. We help you avoid losses and make smart decisions. For real trading, use any live platform.",
  keywords: ["crypto", "trading", "signals", "AI", "bitcoin", "pool trading", "cryptocurrency"],
  openGraph: {
    title: "CryptoStack - AI Crypto Signals & Pool Trading",
    description: "Free AI-powered crypto signals. We help you avoid losses.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`} suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-dark-900 text-white transition-colors duration-300">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
