interface Step {
  number: number;
  title: string;
  description: string;
}

interface HowToStartProps {
  headline?: string;
  subtext?: string;
  steps?: Step[];
}

const defaultSteps: Step[] = [
  {
    number: 1,
    title: "Sign Up (Free)",
    description: "No account needed. Just visit our AI Signals page and start.",
  },
  {
    number: 2,
    title: "Pick a Coin",
    description: "Choose from 10 popular coins: Bitcoin, Ethereum, Solana, and more.",
  },
  {
    number: 3,
    title: "Follow AI Signals",
    description: "Our AI tells you: BUY, SELL, or WAIT. Simple as that.",
  },
  {
    number: 4,
    title: "Make Smart Decisions",
    description: "Use our signals to trade wisely on any platform. Stay safe, stay profitable.",
  },
];

export default function HowToStart({
  headline = "How It Works — 4 Simple Steps",
  subtext = "No complicated setup. No fees. Just free AI guidance.",
  steps = defaultSteps,
}: HowToStartProps) {
  return (
    <section id="how-to-start" className="py-20">
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

        {/* Steps */}
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative text-center">
              {/* Number Circle */}
              <div className="w-14 h-14 rounded-full bg-brand/10 border-2 border-brand flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-brand">{step.number}</span>
              </div>

              {/* Dashed Line (desktop only) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-7 left-[60%] w-[80%] border-t-2 border-dashed border-gray-300 dark:border-dark-500" />
              )}

              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
