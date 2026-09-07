"use client";

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface FeaturesProps {
  badge?: string;
  headline?: string;
  subtext?: string;
  features?: Feature[];
  ctaText?: string;
  ctaHref?: string;
}

const defaultFeatures: Feature[] = [
  {
    icon: "🤝",
    title: "Collaborative Trading",
    description: "Pool resources for bigger market impact and maximize your trading potential with fellow traders.",
  },
  {
    icon: "🛡️",
    title: "Minimum Risk Trading",
    description: "Designed to keep your money safe with built-in risk management and loss protection mechanisms.",
  },
  {
    icon: "🔍",
    title: "Secure & Transparent",
    description: "Real-time pool performance tracking with full transparency and verifiable on-chain data.",
  },
];

export default function Features({
  badge = "✨ NEW FEATURE",
  headline = "Pool Trading is HERE!",
  subtext = "Experience the future of collaborative trading. Pool your resources with other traders for maximum impact and minimum risk.",
  features = defaultFeatures,
  ctaText = "Explore Pool Trading →",
  ctaHref = "#get-started",
}: FeaturesProps) {
  return (
    <section id="features" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-4 py-2">
            <span className="text-sm font-medium text-brand">{badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">
              {headline}
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            {subtext}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group relative rounded-2xl border border-white/5 bg-dark-800/50 p-8 transition-all duration-300 hover:border-brand/20 hover:bg-dark-700/50 hover:shadow-xl hover:shadow-brand/5"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-brand/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative space-y-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand/10 text-2xl transition-transform duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold">{feature.title}</h3>

                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={ctaHref}
            className="inline-flex items-center gap-2 rounded-xl border border-brand/30 bg-brand/5 px-8 py-4 text-lg font-semibold text-brand transition-all duration-300 hover:bg-brand/10 hover:border-brand/50 hover:shadow-lg hover:shadow-brand/10"
          >
            {ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}
