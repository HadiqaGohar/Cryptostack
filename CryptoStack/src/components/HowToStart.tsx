export interface Step {
  number: number;
  title: string;
  description: string;
}

export interface HowToStartProps {
  headline?: string;
  subtext?: string;
  steps?: Step[];
}

const defaultSteps: Step[] = [
  {
    number: 1,
    title: "Create Account",
    description: "Sign up and verify your identity in minutes with our streamlined onboarding process.",
  },
  {
    number: 2,
    title: "Choose Challenge",
    description: "Select from various trading challenges that match your skill level and goals.",
  },
  {
    number: 3,
    title: "Start Trading",
    description: "Execute trades with our advanced tools and real-time market data.",
  },
  {
    number: 4,
    title: "Earn Rewards",
    description: "Win prizes and grow your portfolio by ranking high on the leaderboard.",
  },
];

export default function HowToStart({
  headline = "How to get started",
  subtext = "Enhance your crypto skills and grow your portfolio in four simple steps.",
  steps = defaultSteps,
}: HowToStartProps) {
  return (
    <section id="how-to-start" className="relative py-24 lg:py-32 bg-dark-800/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {headline}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            {subtext}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="relative group">
              <div className="relative rounded-2xl border border-white/5 bg-dark-800/50 p-8 transition-all duration-300 hover:border-brand/20 hover:bg-dark-700/50 h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-dark-900 text-lg font-bold mb-6 transition-transform duration-300 group-hover:scale-110">
                  {step.number}
                </div>

                <h3 className="text-xl font-bold mb-3">{step.title}</h3>

                <p className="text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {step.number < steps.length && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 border-t border-dashed border-white/10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
