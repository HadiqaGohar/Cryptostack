"use client";

import { useState } from "react";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQProps {
  headline?: string;
  items?: FAQItem[];
  ctaText?: string;
  ctaHref?: string;
}

const defaultItems: FAQItem[] = [
  {
    question: "What is cryptocurrency?",
    answer:
      "Cryptocurrency is a digital or virtual currency that uses cryptography for security. It operates on decentralized networks based on blockchain technology, enabling secure and transparent transactions without the need for intermediaries.",
  },
  {
    question: "Is cryptocurrency safe?",
    answer:
      "Cryptocurrencies use blockchain technology which is highly secure and immutable. While no investment is completely risk-free, using reputable platforms like CryptoStack with built-in security measures significantly reduces risks.",
  },
  {
    question: "Can I use crypto for everyday purchases?",
    answer:
      "Yes, many merchants accept cryptocurrency for everyday purchases. The number of businesses accepting crypto continues to grow, making it increasingly practical for daily use.",
  },
  {
    question: "What is cryptocurrency trading?",
    answer:
      "Cryptocurrency trading involves buying and selling digital assets on exchanges or platforms. At CryptoStack, we offer pool trading and challenge-based trading to make the experience more engaging and less risky.",
  },
  {
    question: "What are the risks involved?",
    answer:
      "Market volatility, regulatory changes, and security concerns are the main risks. However, CryptoStack's pool trading model is designed to minimize individual risk by distributing it across participants.",
  },
  {
    question: "Do I need technical knowledge?",
    answer:
      "No, modern platforms make it easy for beginners. CryptoStack provides intuitive tools, educational resources, and a supportive community to help you get started regardless of your technical background.",
  },
];

export default function FAQ({
  headline = "Frequently Asked Questions",
  items = defaultItems,
  ctaText = "Contact us →",
  ctaHref = "#contact",
}: FAQProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {headline}
          </h2>
        </div>

        <div className="space-y-4">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/5 bg-dark-800/50 overflow-hidden transition-all duration-300 hover:border-white/10"
            >
              <button
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
                aria-expanded={activeIndex === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span className="text-lg font-semibold pr-4">
                  {item.question}
                </span>
                <svg
                  className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-300 ${
                    activeIndex === i ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                id={`faq-answer-${i}`}
                role="region"
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  activeIndex === i ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="px-6 pb-5 text-gray-400 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={ctaHref}
            className="inline-flex items-center gap-2 rounded-xl border border-brand/30 bg-brand/5 px-8 py-4 text-lg font-semibold text-brand transition-all duration-300 hover:bg-brand/10 hover:border-brand/50"
          >
            {ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}
