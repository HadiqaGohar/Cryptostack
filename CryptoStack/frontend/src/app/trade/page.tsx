import type { Metadata } from "next";
import TradeClient from "./TradeClient";

export const metadata: Metadata = {
  title: "Practice Trading - CryptoStack",
  description: "Practice crypto trading with virtual money. Learn risk-free with real-time prices.",
};

export default function TradePage() {
  return <TradeClient />;
}
