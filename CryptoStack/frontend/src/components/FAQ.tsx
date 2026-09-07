"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  headline?: string;
  items?: FAQItem[];
}

const defaultItems: FAQItem[] = [
  {
    question: "What is CryptoStack?",
    answer: "CryptoStack is a free AI-powered crypto signal platform. We analyze the market and give you trading signals — so you don't lose money. For real trading, use any live exchange.",
  },
  {
    question: "Is this real trading?",
    answer: "No. CryptoStack is for learning and signals only. We never touch your money. For actual trading, use platforms like Binance, Coinbase, or any exchange you trust.",
  },
  {
    question: "How do AI signals work?",
    answer: "Our AI analyzes price trends using technical indicators (EMA, RSI). It tells you when to BUY (LONG), SELL (SHORT), or WAIT. Signals are free — no subscription needed.",
  },
  {
    question: "Can I lose money here?",
    answer: "No. CryptoStack is completely free and does not handle any money. We only provide signals. If you trade on other platforms, always manage your risk carefully.",
  },
  {
    question: "What are Trading Pools?",
    answer: "Trading Pools let you join a group of traders. Together, you share strategies and returns. It's safer than trading alone — but remember, all trading has risk.",
  },
  {
    question: "How do I start?",
    answer: "Simply visit our AI Signals page, pick a coin, and follow the signals. No account needed, no fees, no risk. Just free AI-powered guidance.",
  },
];

export default function FAQ({
  headline = "Common Questions",
  items = defaultItems,
}: FAQProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gray-50 dark:bg-dark-800/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {headline}
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between p-5 text-left"
                aria-expanded={activeIndex === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span className="font-semibold text-gray-900 dark:text-white pr-4">
                  {item.question}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                    activeIndex === i ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                id={`faq-answer-${i}`}
                role="region"
                className={`overflow-hidden transition-all duration-300 ${
                  activeIndex === i ? "max-h-96 pb-5" : "max-h-0"
                }`}
              >
                <p className="px-5 text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <a
            href="mailto:support@cryptostack.com"
            className="inline-flex items-center gap-2 text-brand hover:text-brand-dark font-semibold transition-colors"
          >
            Still have questions? Contact us →
          </a>
        </div>
      </div>
    </section>
  );
}
