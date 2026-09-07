export interface SecurityStat {
  value: string;
  label: string;
}

export interface SecurityProps {
  headline?: string;
  subtext?: string;
  stats?: SecurityStat[];
}

const defaultStats: SecurityStat[] = [
  { value: "5,000+", label: "Users" },
  { value: "100K+", label: "Trades" },
  { value: "24/7", label: "Support" },
];

export default function Security({
  headline = "Beyond the Vault — Next-Level Security",
  subtext = "Your security is our top priority. We employ enterprise-grade measures to protect your assets and data.",
  stats = defaultStats,
}: SecurityProps) {
  return (
    <section className="relative py-24 lg:py-32 bg-dark-800/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {headline}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            {subtext}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="group relative rounded-2xl border border-white/5 bg-dark-900/50 p-12 text-center transition-all duration-300 hover:border-brand/20 hover:bg-dark-800/50"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-brand/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative space-y-3">
                <p className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-lg text-gray-400">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
