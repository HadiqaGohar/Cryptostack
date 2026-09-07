import type { Metadata } from "next";
import SignalsClient from "./SignalsClient";

export const metadata: Metadata = {
  title: "AI Signal Bot - CryptoStack",
  description: "Real-time AI-powered crypto trading signals for 10 popular coins.",
};

export default function SignalsPage() {
  return <SignalsClient />;
}
