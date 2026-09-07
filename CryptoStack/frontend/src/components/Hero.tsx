"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const checks = [
    "Get AI signals that protect your money",
    "No fees, no risk — just smart guidance",
    "Learn trading without losing a penny",
    "For real trading, use any live platform",
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand/10 rounded-full blur-3xl animate-[blob_8s_infinite]" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-[blob_10s_infinite_2s]" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-brand/5 rounded-full blur-3xl animate-[blob_7s_infinite_4s]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 border border-brand/20 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
              </span>
              <span className="text-sm font-medium text-brand">Free AI Signals — No Subscription</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              AI-Powered Crypto{" "}
              <span className="bg-gradient-to-r from-brand to-cyan-400 bg-clip-text text-transparent">
                Signals
              </span>{" "}
              That Protect You
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg leading-relaxed">
              We analyze the market so you don&apos;t lose money. Get free trading signals. 
              For actual trading, use any live exchange. Our job: <strong className="text-brand">keep you safe and profitable.</strong>
            </p>

            {/* Checkmarks */}
            <ul className="space-y-3 mb-8">
              {checks.map((check, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-brand/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>{check}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <a
                href="/signals"
                className="px-8 py-3.5 bg-brand text-white font-semibold rounded-xl hover:bg-brand-dark transition-all duration-200 shadow-lg shadow-brand/25 hover:shadow-brand/40 animate-[pulse-green_3s_infinite]"
              >
                Get Free Signals →
              </a>
              <a
                href="/#how-to-start"
                className="px-8 py-3.5 border-2 border-gray-300 dark:border-dark-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:border-brand hover:text-brand transition-colors duration-200"
              >
                How It Works
              </a>
            </div>
          </div>

          {/* Right - Price Card */}
          <div className={`hidden lg:block transition-all duration-1000 delay-300 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            <div className="relative">
              {/* Main Card */}
              <div className="bg-white dark:bg-dark-800/80 backdrop-blur-xl border border-gray-200 dark:border-dark-600 rounded-2xl p-6 shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">BTC / USD</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">$84,892.40</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-brand/10 text-brand text-sm font-semibold">
                    +0.89%
                  </span>
                </div>

                {/* Mini Chart */}
                <div className="h-32 mb-4">
                  <svg viewBox="0 0 200 80" className="w-full h-full">
                    <defs>
                      <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#36bb91" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#36bb91" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,60 L20,55 L40,50 L60,45 L80,48 L100,40 L120,35 L140,30 L160,25 L180,20 L200,15"
                      fill="none"
                      stroke="#36bb91"
                      strokeWidth="2"
                    />
                    <path
                      d="M0,60 L20,55 L40,50 L60,45 L80,48 L100,40 L120,35 L140,30 L160,25 L180,20 L200,15 L200,80 L0,80 Z"
                      fill="url(#chartGradient)"
                    />
                  </svg>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-dark-600">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">24h High</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">$85,200</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">24h Low</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">$83,100</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Volume</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">$2.4B</p>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-brand text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg animate-[float_3s_infinite]">
                🤖 AI Signals Active
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
