"use client";

import { useMemo } from "react";

export interface SignalHeaderProps {
  interval: "15m" | "1h";
  onIntervalChange: (interval: "15m" | "1h") => void;
  onRefresh: () => void;
  lastUpdated: string | null;
  loading: boolean;
}

export default function SignalHeader({
  interval,
  onIntervalChange,
  onRefresh,
  lastUpdated,
  loading,
}: SignalHeaderProps) {
  const lastUpdatedText = useMemo(() => {
    if (!lastUpdated) return "Never";
    const diff = Date.now() - new Date(lastUpdated).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins === 1) return "1 minute ago";
    return `${mins} minutes ago`;
  }, [lastUpdated]);

  return (
    <div className="bg-dark-800 border-b border-dark-600 px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-bold text-white whitespace-nowrap">
          🤖 AI Signal Bot
        </h1>
        <span className="relative flex h-2.5 w-2.5" aria-label="Live indicator">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
        </span>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center bg-dark-700 rounded-lg p-0.5">
          {(["15m", "1h"] as const).map((i) => (
            <button
              key={i}
              onClick={() => onIntervalChange(i)}
              disabled={loading}
              aria-label={`Switch to ${i} interval`}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                interval === i
                  ? "bg-emerald-500 text-white"
                  : "text-gray-400 hover:text-white hover:bg-dark-600"
              } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {i}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onRefresh}
            disabled={loading}
            aria-label="Refresh signals"
            className={`w-8 h-8 flex items-center justify-center rounded-full bg-dark-700 text-gray-400 hover:text-white hover:bg-dark-600 transition-colors text-sm font-bold ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            ↻
          </button>
          <span className="text-xs text-gray-400 whitespace-nowrap hidden sm:inline">
            Last updated: {lastUpdatedText}
          </span>
        </div>
      </div>
    </div>
  );
}
