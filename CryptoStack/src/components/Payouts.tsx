export interface Payout {
  icon: string;
  title: string;
  description: string;
}

export interface PayoutsProps {
  headline?: string;
  subtext?: string;
  payouts?: Payout[];
}

const defaultPayouts: Payout[] = [
  {
    icon: "⚡",
    title: "Instantly",
    description: "Quick access to your funds with instant crypto withdrawals. No waiting periods.",
  },
  {
    icon: "🔒",
    title: "Secure & Insured",
    description: "Assets protected at every step with enterprise-grade security and insurance coverage.",
  },
  {
    icon: "🚀",
    title: "No Limits",
    description: "Trade without constraints. Withdraw your earnings anytime with no hidden fees.",
  },
];

export default function Payouts({
  headline = "Receive your payments in crypto",
  subtext = "Fast, secure, and limitless crypto payouts directly to your wallet.",
  payouts = defaultPayouts,
}: PayoutsProps) {
  return (
    <section id="payouts" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-16">
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
          {payouts.map((payout, i) => (
            <div
              key={i}
              className="group relative rounded-2xl border border-white/5 bg-dark-800/50 p-8 transition-all duration-300 hover:border-brand/20 hover:bg-dark-700/50 hover:shadow-xl hover:shadow-brand/5 text-center"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10 text-3xl mb-6 transition-transform duration-300 group-hover:scale-110">
                {payout.icon}
              </div>

              <h3 className="text-xl font-bold mb-3">{payout.title}</h3>

              <p className="text-gray-400 leading-relaxed">
                {payout.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
