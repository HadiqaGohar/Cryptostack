"use client";

import { useState, useEffect } from "react";

function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const statsEl = document.getElementById("stats-bar");
      if (statsEl) {
        const rect = statsEl.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          setIsVisible(true);
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { isVisible };
}

function useCountUp(end: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start]);

  return count;
}

const faqData = [
  {
    question: "What is cryptocurrency?",
    answer:
      "Cryptocurrency is a digital or virtual currency that uses cryptography for security and operates on decentralized networks based on blockchain technology. Unlike traditional currencies, it is not controlled by any central authority.",
  },
  {
    question: "Is cryptocurrency safe?",
    answer:
      "Cryptocurrency transactions are secured by blockchain technology, making them highly secure. However, like any investment, there are risks involved. Always use reputable platforms, enable two-factor authentication, and never share your private keys.",
  },
  {
    question: "Can I use crypto for everyday purchases?",
    answer:
      "Yes! Many merchants and businesses now accept cryptocurrency as a form of payment. From online shopping to travel bookings, crypto is becoming increasingly integrated into everyday transactions.",
  },
  {
    question: "What is cryptocurrency trading?",
    answer:
      "Cryptocurrency trading involves buying and selling digital currencies on exchanges. Traders can profit from price fluctuations through spot trading, futures, or by participating in trading pools like CryptoStack.",
  },
  {
    question: "What are the risks involved?",
    answer:
      "Crypto markets can be volatile. Risks include price fluctuations, regulatory changes, and security vulnerabilities. CryptoStack mitigates these risks through our pool trading model with built-in loss protection.",
  },
  {
    question: "Do I need technical knowledge?",
    answer:
      "Not at all! CryptoStack is designed for both beginners and experienced traders. Our intuitive platform guides you through every step, from account setup to executing your first trade.",
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const statsSection = useScrollAnimation();
  const tradersCount = useCountUp(5000, 2000, statsSection.isVisible);
  const tradesCount = useCountUp(100, 2000, statsSection.isVisible);
  const volumeCount = useCountUp(2, 2000, statsSection.isVisible);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed]">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#222]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              <span className="text-xl font-bold text-white">CryptoStack</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-sm text-gray-300 hover:text-[#36bb91] transition-colors">
                Home
              </a>
              <a href="#features" className="text-sm text-gray-300 hover:text-[#36bb91] transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sm text-gray-300 hover:text-[#36bb91] transition-colors">
                How It Works
              </a>
              <a href="#payouts" className="text-sm text-gray-300 hover:text-[#36bb91] transition-colors">
                Payouts
              </a>
              <a href="#faq" className="text-sm text-gray-300 hover:text-[#36bb91] transition-colors">
                FAQ
              </a>
              <a
                href="#get-started"
                className="px-5 py-2 bg-[#36bb91] text-black font-semibold rounded-lg hover:bg-[#2a9a76] transition-colors"
              >
                Get Started
              </a>
            </div>

            <button
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#111] border-t border-[#222] px-4 py-4">
            <div className="flex flex-col gap-3">
              <a href="#home" className="text-gray-300 hover:text-[#36bb91] py-2" onClick={() => setMobileMenuOpen(false)}>
                Home
              </a>
              <a href="#features" className="text-gray-300 hover:text-[#36bb91] py-2" onClick={() => setMobileMenuOpen(false)}>
                Features
              </a>
              <a href="#how-it-works" className="text-gray-300 hover:text-[#36bb91] py-2" onClick={() => setMobileMenuOpen(false)}>
                How It Works
              </a>
              <a href="#payouts" className="text-gray-300 hover:text-[#36bb91] py-2" onClick={() => setMobileMenuOpen(false)}>
                Payouts
              </a>
              <a href="#faq" className="text-gray-300 hover:text-[#36bb91] py-2" onClick={() => setMobileMenuOpen(false)}>
                FAQ
              </a>
              <a
                href="#get-started"
                className="px-5 py-2 bg-[#36bb91] text-black font-semibold rounded-lg text-center hover:bg-[#2a9a76] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 -left-20 w-72 h-72 bg-[#36bb91]/10 rounded-full blur-3xl" style={{ animation: "blob 7s infinite" }} />
          <div className="absolute top-40 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" style={{ animation: "blob 7s infinite 2s" }} />
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-[#36bb91]/5 rounded-full blur-3xl" style={{ animation: "blob 7s infinite 4s" }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div style={{ animation: "fade-in 0.8s ease-out" }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#36bb91]/10 border border-[#36bb91]/30 rounded-full text-[#36bb91] text-sm font-medium mb-6">
                <span>🚀</span>
                <span>NEW FEATURE LIVE</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Join the{" "}
                <span className="bg-gradient-to-r from-[#36bb91] to-cyan-400 bg-clip-text text-transparent">
                  Future
                </span>{" "}
                of Crypto Trading
              </h1>

              <p className="text-gray-400 text-lg mb-8 max-w-lg">
                Experience risk-free trading pools where you deposit once and trade freely. Compete with real traders, climb the ranks, and earn daily rewards — all with zero loss risk.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Deposit once — trade freely with zero loss risk",
                  "Compete with real traders & climb the ranks for daily rewards",
                  "Enjoy worry-free spot trading with all fees covered",
                  "Top 4 positions win — 5th place gets maximum refund",
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-[#36bb91] mt-0.5">✅</span>
                    <span className="text-gray-300">{text}</span>
                  </div>
                ))}
              </div>

              <a
                href="#get-started"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#36bb91] text-black font-bold rounded-xl hover:bg-[#2a9a76] transition-all text-lg"
                style={{ animation: "pulse-green 2s infinite" }}
              >
                Start Trading Now
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>

            {/* Trading Card Mockup */}
            <div className="relative hidden lg:flex justify-center" style={{ animation: "float 6s ease-in-out infinite" }}>
              <div className="w-80 bg-[#111]/80 backdrop-blur-xl border border-[#222] rounded-2xl p-6 shadow-2xl shadow-[#36bb91]/5">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#f7931a] rounded-full flex items-center justify-center text-white font-bold text-sm">
                      ₿
                    </div>
                    <div>
                      <div className="font-semibold text-white">Bitcoin</div>
                      <div className="text-xs text-gray-400">BTC/USDT</div>
                    </div>
                  </div>
                  <span className="text-[#36bb91] text-sm font-medium">+2.4%</span>
                </div>

                <div className="text-3xl font-bold text-white mb-2">$67,432.18</div>
                <div className="text-sm text-gray-400 mb-6">24h Change: +$1,572.34</div>

                <div className="flex gap-2 mb-6">
                  {["1H", "4H", "1D", "1W", "1M"].map((period, i) => (
                    <button
                      key={period}
                      className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                        i === 2
                          ? "bg-[#36bb91] text-black"
                          : "bg-[#1a1a1a] text-gray-400 hover:text-white"
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>

                {/* Chart mockup */}
                <div className="h-32 relative mb-6">
                  <svg viewBox="0 0 300 100" className="w-full h-full">
                    <defs>
                      <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#36bb91" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#36bb91" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,80 C30,75 60,60 90,55 C120,50 150,65 180,40 C210,15 240,25 270,10 L300,5"
                      fill="none"
                      stroke="#36bb91"
                      strokeWidth="2"
                    />
                    <path
                      d="M0,80 C30,75 60,60 90,55 C120,50 150,65 180,40 C210,15 240,25 270,10 L300,5 L300,100 L0,100 Z"
                      fill="url(#chartGradient)"
                    />
                  </svg>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 py-3 bg-[#36bb91] text-black font-semibold rounded-lg hover:bg-[#2a9a76] transition-colors">
                    Buy
                  </button>
                  <button className="flex-1 py-3 bg-[#1a1a1a] text-white font-semibold rounded-lg hover:bg-[#222] transition-colors border border-[#333]">
                    Sell
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section
        id="stats-bar"
        className="relative z-10 border-y border-[#222] bg-[#111]/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#222]">
            <div className="py-8 sm:py-12 text-center sm:px-8">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2" style={{ animation: statsSection.isVisible ? "counter 0.5s ease-out" : "none" }}>
                {tradersCount.toLocaleString()}+
              </div>
              <div className="text-gray-400">Active Traders</div>
            </div>
            <div className="py-8 sm:py-12 text-center sm:px-8">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2" style={{ animation: statsSection.isVisible ? "counter 0.5s ease-out 0.2s" : "none" }}>
                {tradesCount}K+
              </div>
              <div className="text-gray-400">Trades Completed</div>
            </div>
            <div className="py-8 sm:py-12 text-center sm:px-8">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2" style={{ animation: statsSection.isVisible ? "counter 0.5s ease-out 0.4s" : "none" }}>
                ${volumeCount}M+
              </div>
              <div className="text-gray-400">Total Volume</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#36bb91]/10 border border-[#36bb91]/30 rounded-full text-[#36bb91] text-sm font-medium mb-4">
              NEW FEATURE
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Pool Trading is <span className="text-[#36bb91]">HERE!</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Join collaborative trading pools and multiply your profits
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "🤝",
                title: "Collaborative Trading",
                description:
                  "Pool resources with other traders for bigger market impact and shared profits. Our pool system amplifies your trading power.",
              },
              {
                icon: "🛡️",
                title: "Minimum Risk Trading",
                description:
                  "Designed to keep your money safe with built-in risk management. Trade confidently knowing your capital is protected.",
              },
              {
                icon: "🔍",
                title: "Secure & Transparent",
                description:
                  "Real-time pool performance tracking with full transparency. Every trade and profit is visible and verifiable.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group p-8 bg-[#111] border border-[#222] rounded-2xl hover:border-[#36bb91]/30 hover:shadow-lg hover:shadow-[#36bb91]/5 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#36bb91] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="#get-started"
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-[#36bb91] text-[#36bb91] font-semibold rounded-xl hover:bg-[#36bb91] hover:text-black transition-all"
            >
              Explore Pool Trading
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* How to Start Section */}
      <section id="how-it-works" className="py-20 sm:py-28 bg-[#111]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              How to get started
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Embark on a journey to enhance your crypto skills
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: "Create Account",
                description:
                  "Sign up and verify your identity in minutes. Quick and secure onboarding process.",
              },
              {
                step: 2,
                title: "Choose Challenge",
                description:
                  "Select from various trading challenges that match your skill level and goals.",
              },
              {
                step: 3,
                title: "Start Trading",
                description:
                  "Execute trades with our advanced tools and real-time market data.",
              },
              {
                step: 4,
                title: "Earn Rewards",
                description:
                  "Win prizes and grow your portfolio. Top performers earn daily rewards.",
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-[#36bb91]/10 border-2 border-[#36bb91] rounded-full flex items-center justify-center text-[#36bb91] text-2xl font-bold mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payouts Section */}
      <section id="payouts" className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Receive your payments in crypto
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Send, collect, convert payouts to fiat, or keep cryptocurrency
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "⚡",
                title: "Instantly",
                description:
                  "Quick access to your funds. Withdraw and receive your earnings in minutes, not days.",
              },
              {
                icon: "🔒",
                title: "Secure & Insured",
                description:
                  "Assets protected at every step with enterprise-grade security and insurance coverage.",
              },
              {
                icon: "🚀",
                title: "No Limits",
                description:
                  "Trade without constraints. No withdrawal limits, no hidden fees, complete freedom.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 bg-[#111] border border-[#222] rounded-2xl text-center hover:border-[#36bb91]/30 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 sm:py-28 bg-[#111]/30 border-y border-[#222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Beyond the Vault —{" "}
              <span className="bg-gradient-to-r from-[#36bb91] to-cyan-400 bg-clip-text text-transparent">
                Next-Level Security
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center p-6">
              <div className="text-3xl font-bold text-[#36bb91] mb-2">5,000+</div>
              <div className="text-gray-400">Trusted Users</div>
            </div>
            <div className="text-center p-6">
              <div className="text-3xl font-bold text-[#36bb91] mb-2">100K+</div>
              <div className="text-gray-400">Secure Trades</div>
            </div>
            <div className="text-center p-6">
              <div className="text-3xl font-bold text-[#36bb91] mb-2">24/7</div>
              <div className="text-gray-400">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400 text-lg">
              Everything you need to know about CryptoStack
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="bg-[#111] border border-[#222] rounded-xl overflow-hidden hover:border-[#36bb91]/20 transition-colors"
              >
                <button
                  className="w-full flex items-center justify-between p-6 text-left"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaq === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="font-semibold text-white pr-4">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === index && (
                  <div
                    id={`faq-answer-${index}`}
                    className="px-6 pb-6"
                    style={{ animation: "fade-in 0.3s ease-out" }}
                  >
                    <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-400 mb-4">Still have questions?</p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#36bb91] text-black font-semibold rounded-xl hover:bg-[#2a9a76] transition-colors"
            >
              Contact us
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] border-t border-[#222] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🔥</span>
                <span className="text-xl font-bold text-white">CryptoStack</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                The future of crypto trading. Join thousands of traders in risk-free pool trading.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="text-gray-400 text-sm hover:text-[#36bb91] transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#careers" className="text-gray-400 text-sm hover:text-[#36bb91] transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#blog" className="text-gray-400 text-sm hover:text-[#36bb91] transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 text-sm hover:text-[#36bb91] transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Features</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#pools" className="text-gray-400 text-sm hover:text-[#36bb91] transition-colors">
                    Pool Trading
                  </a>
                </li>
                <li>
                  <a href="#challenges" className="text-gray-400 text-sm hover:text-[#36bb91] transition-colors">
                    Challenges
                  </a>
                </li>
                <li>
                  <a href="#rewards" className="text-gray-400 text-sm hover:text-[#36bb91] transition-colors">
                    Rewards
                  </a>
                </li>
                <li>
                  <a href="#security" className="text-gray-400 text-sm hover:text-[#36bb91] transition-colors">
                    Security
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Follow Us</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#twitter" className="text-gray-400 text-sm hover:text-[#36bb91] transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#discord" className="text-gray-400 text-sm hover:text-[#36bb91] transition-colors">
                    Discord
                  </a>
                </li>
                <li>
                  <a href="#telegram" className="text-gray-400 text-sm hover:text-[#36bb91] transition-colors">
                    Telegram
                  </a>
                </li>
                <li>
                  <a href="#github" className="text-gray-400 text-sm hover:text-[#36bb91] transition-colors">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#222] pt-8 text-center">
            <p className="text-gray-500 text-sm">
              © 2024 CryptoStack. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
