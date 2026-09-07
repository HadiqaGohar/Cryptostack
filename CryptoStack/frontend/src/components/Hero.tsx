"use client";

export interface HeroProps {
  badge?: string;
  headline?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  checks?: string[];
}

const defaultChecks = [
  "Deposit once — trade freely with zero loss risk",
  "Compete with real traders & climb the ranks for daily rewards",
  "Enjoy worry-free spot trading with all fees covered",
  "Top 4 positions win — 5th place gets maximum refund",
];

export default function Hero({
  badge = "🚀 NEW FEATURE LIVE",
  headline = "Join the Future of Crypto Trading",
  description = "Experience risk-free trading pools where you can compete, earn, and grow your portfolio without worrying about losses.",
  ctaText = "Start Trading Now →",
  ctaHref = "#get-started",
  checks = defaultChecks,
}: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden pt-16"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 h-96 w-96 rounded-full bg-brand/10 blur-[120px]" style={{ animation: "blob 7s infinite" }} />
        <div className="absolute bottom-20 right-1/4 h-80 w-80 rounded-full bg-cyan-500/10 blur-[100px]" style={{ animation: "blob 10s infinite 2s" }} />
        <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/5 blur-[80px]" style={{ animation: "blob 8s infinite 4s" }} />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8" style={{ animation: "fade-in-up 0.8s ease-out" }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              <span className="text-sm font-medium text-brand">{badge}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-brand via-brand-light to-cyan-400 bg-clip-text text-transparent">
                {headline.split("Crypto Trading").map((part, i) =>
                  i === 0 ? (
                    <span key={i}>
                      {part}
                      <span className="bg-gradient-to-r from-brand to-cyan-400 bg-clip-text text-transparent">
                        Crypto Trading
                      </span>
                    </span>
                  ) : (
                    <span key={i}>{part}</span>
                  )
                )}
              </span>
            </h1>

            <p className="max-w-lg text-lg text-gray-400 leading-relaxed">
              {description}
            </p>

            <ul className="space-y-3">
              {checks.map((check, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand text-xs">
                    ✅
                  </span>
                  <span className="text-sm text-gray-300">{check}</span>
                </li>
              ))}
            </ul>

            <a
              href={ctaHref}
              className="group inline-flex items-center gap-2 rounded-xl bg-brand px-8 py-4 text-lg font-bold text-dark-900 transition-all duration-300 hover:bg-brand-light hover:shadow-xl hover:shadow-brand/25 hover:scale-105"
              style={{ animation: "pulse-green 2s infinite" }}
            >
              {ctaText}
            </a>
          </div>

          <div
            className="relative hidden lg:block"
            style={{ animation: "slide-in-right 0.8s ease-out 0.2s both" }}
          >
            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl shadow-black/40">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-brand/20 to-cyan-500/20 blur-xl opacity-50" />

              <div className="relative space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/20 text-2xl">
                      ₿
                    </div>
                    <div>
                      <p className="font-semibold">Bitcoin</p>
                      <p className="text-xs text-gray-500">BTC/USD</p>
                    </div>
                  </div>
                  <span className="rounded-lg bg-brand/10 px-3 py-1 text-sm font-medium text-brand">
                    +0.89%
                  </span>
                </div>

                <div>
                  <p className="text-3xl font-bold tracking-tight">$84,892.40</p>
                  <p className="mt-1 text-sm text-gray-500">Current Price</p>
                </div>

                <div className="relative h-40 w-full">
                  <svg
                    viewBox="0 0 400 160"
                    className="h-full w-full"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#36bb91" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#36bb91" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,120 C40,100 60,110 80,90 C100,70 140,80 160,60 C180,40 220,50 240,30 C260,10 300,20 320,25 C340,30 360,15 400,20 L400,160 L0,160 Z"
                      fill="url(#chartGradient)"
                    />
                    <path
                      d="M0,120 C40,100 60,110 80,90 C100,70 140,80 160,60 C180,40 220,50 240,30 C260,10 300,20 320,25 C340,30 360,15 400,20"
                      fill="none"
                      stroke="#36bb91"
                      strokeWidth="3"
                    />
                    <circle cx="400" cy="20" r="5" fill="#36bb91" style={{ animation: "pulse-green 2s infinite" }}>
                      <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite" />
                    </circle>
                  </svg>
                </div>

                <div className="grid grid-cols-3 gap-4 rounded-xl bg-white/5 p-4">
                  <div className="text-center">
                    <p className="text-xs text-gray-500">24h High</p>
                    <p className="text-sm font-semibold text-brand">$85,210</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">24h Low</p>
                    <p className="text-sm font-semibold text-red-400">$83,450</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Volume</p>
                    <p className="text-sm font-semibold">$2.4B</p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="absolute -bottom-4 -right-4 rounded-xl border border-white/10 bg-dark-800/80 p-4 backdrop-blur-xl"
              style={{ animation: "float 3s ease-in-out infinite" }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand">
                  📈
                </div>
                <div>
                  <p className="text-xs text-gray-500">Trading Pools</p>
                  <p className="font-semibold text-brand">Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
