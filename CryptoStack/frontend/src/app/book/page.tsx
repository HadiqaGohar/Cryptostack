import type { Metadata } from "next";
import BookClient from "./BookClient";

export const metadata: Metadata = {
  title: "The Book - Learn Trading from Zero - CryptoStack",
  description: "Complete trading education: from basics to advanced strategies. Learn candlesticks, indicators, risk management, and more.",
};

export default function BookPage() {
  return <BookClient />;
}