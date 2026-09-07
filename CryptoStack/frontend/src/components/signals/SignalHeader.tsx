"use client";

interface SignalHeaderProps {
  interval?: "15m" | "1h";
  onIntervalChange?: (interval: "15m" | "1h") => void;
  lastUpdated?: string;
  loading?: boolean;
}

export default function SignalHeader({
  interval = "15m",
  onIntervalChange,
  lastUpdated,
  loading = false,
}: SignalHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-brand"></span>
        </span>
        AI Signal Bot
      </h1>
    </div>
  );
}
