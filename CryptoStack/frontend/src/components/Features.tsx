"use client";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesProps {
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
    title: "Trade Together",
    description: "Join a pool of traders. Share strategies, share profits. Safer than trading alone.",
  },
  {
    icon: "🛡️",
    title: "Low Risk, Smart Trading",
    description: "Our AI watches the market for you. We alert you before losses happen.",
  },
  {
    icon: "🔍",
    title: "Transparent & Honest",
    description: "See exactly how your pool is performing. No hidden fees, no surprises.",
  },
];

export default function Features({
  badge = "✨ Why CryptoStack?",
  headline = "Join a Trading Pool — Earn Together",
  subtext = "Trading alone is risky. Join a pool, share knowledge, and grow together with AI guidance.",
  features = defaultFeatures,
  ctaText = "Explore Pools →",
  ctaHref = "/signals",
}: FeaturesProps) {
  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-dark-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand/10 text-brand text-sm font-semibold mb-4">
            {badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {headline}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {subtext}
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group relative bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-2xl p-8 hover:border-brand/50 dark:hover:border-brand/50 transition-all duration-300 hover:shadow-xl hover:shadow-brand/5"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href={ctaHref}
            className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-brand text-brand font-semibold rounded-xl hover:bg-brand hover:text-white transition-all duration-200"
          >
            {ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}
