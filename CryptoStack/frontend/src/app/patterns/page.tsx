import type { Metadata } from "next";
import PatternsClient from "./PatternsClient";

export const metadata: Metadata = {
  title: "Candlestick Patterns Guide - CryptoStack",
  description: "Learn all 47 candlestick patterns from beginner to pro. Complete guide with visual diagrams.",
};

export default function PatternsPage() {
  return <PatternsClient />;
}
