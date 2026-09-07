interface Payout {
  icon: string;
  title: string;
  description: string;
}

interface PayoutsProps {
  headline?: string;
  subtext?: string;
  payouts?: Payout[];
}

const defaultPayouts: Payout[] = [
  {
    icon: "⚡",
    title: "Instant Signals",
    description: "Get signals in real-time. No delays, no waiting.",
  },
  {
    icon: "🔒",
    title: "Your Data, Safe",
    description: "We never ask for personal info. Your privacy matters.",
  },
  {
    icon: "🚀",
    title: "No Limits",
    description: "Use our signals on any platform. No restrictions.",
  },
];

export default function Payouts({
  headline = "Why Trust CryptoStack?",
  subtext = "We focus on keeping you safe. No hidden agenda, no tricks.",
  payouts = defaultPayouts,
}: PayoutsProps) {
  return (
    <section className="py-20 bg-gray-50 dark:bg-dark-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {headline}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {subtext}
          </p>
        </div>

        {/* Payout Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {payouts.map((payout, i) => (
            <div
              key={i}
              className="text-center bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-2xl p-8 hover:border-brand/50 dark:hover:border-brand/50 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{payout.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {payout.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {payout.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
