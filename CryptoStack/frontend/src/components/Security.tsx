interface SecurityStat {
  value: string;
  label: string;
}

interface SecurityProps {
  headline?: string;
  subtext?: string;
  stats?: SecurityStat[];
}

const defaultStats: SecurityStat[] = [
  { value: "100%", label: "Free Forever" },
  { value: "Zero", label: "Hidden Fees" },
  { value: "24/7", label: "AI Monitoring" },
];

export default function Security({
  headline = "Your Data, Your Privacy",
  subtext = "We never store personal data. No login required. No tracking.",
  stats = defaultStats,
}: SecurityProps) {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {headline}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {subtext}
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-2xl p-8"
            >
              <p className="text-4xl font-bold bg-gradient-to-r from-brand to-cyan-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </p>
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
