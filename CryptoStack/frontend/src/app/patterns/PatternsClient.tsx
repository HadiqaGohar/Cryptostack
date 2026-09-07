"use client";

import { useState } from "react";
import { CANDLESTICK_PATTERNS, LEVEL_INFO, CandlePattern, Level, Signal } from "@/lib/candlestickPatterns";
import Navbar from "@/components/Navbar";
import ThemeToggle from "@/components/ThemeToggle";

// SVG component to render pattern diagrams
function PatternSVG({ pattern }: { pattern: CandlePattern }) {
  const isBullish = pattern.signal === "bullish";
  const isBearish = pattern.signal === "bearish";

  // Parse the SVG path and create a candle-style diagram
  const renderCandles = () => {
    const candles: React.JSX.Element[] = [];
    const pathParts = pattern.svgPath.split(" ");
    
    let i = 0;
    let candleIndex = 0;
    
    while (i < pathParts.length) {
      const part = pathParts[i];
      
      if (part.startsWith("M")) {
        // Check if this is a rectangle (candle body)
        const nextParts = pathParts.slice(i, i + 5);
        const m1 = nextParts[0]; // M x,y
        const l1 = nextParts[1]; // L x,y
        const l2 = nextParts[2]; // L x,y
        const l3 = nextParts[3]; // L x,y
        const z = nextParts[4]; // Z
        
        if (z === "Z" && m1 && l1 && l2 && l3) {
          const coords = [
            m1.slice(1).split(","),
            l1.slice(1).split(","),
            l2.slice(1).split(","),
            l3.slice(1).split(","),
          ];
          
          const x1 = parseFloat(coords[0][0]);
          const y1 = parseFloat(coords[0][1]);
          const x2 = parseFloat(coords[2][0]);
          const y2 = parseFloat(coords[2][1]);
          
          const width = Math.abs(x2 - x1);
          const height = Math.abs(y2 - y1);
          const x = Math.min(x1, x2);
          const y = Math.min(y1, y2);
          
          // Determine if this candle is green or red based on pattern signal
          const isGreen = pattern.signal === "bullish" 
            ? candleIndex % 2 === 0 
            : candleIndex % 2 === 1;
          
          candles.push(
            <rect
              key={`body-${candleIndex}`}
              x={x}
              y={y}
              width={width}
              height={Math.max(height, 2)}
              fill={isGreen ? "#10b981" : "#ef4444"}
              rx="1"
            />
          );
          candleIndex++;
          i += 5;
          continue;
        }
        
        // Check if this is a line (wick)
        if (l1 && l1.startsWith("L")) {
          const x1 = parseFloat(part.slice(1).split(",")[0]);
          const y1 = parseFloat(part.slice(1).split(",")[1]);
          const x2 = parseFloat(l1.slice(1).split(",")[0]);
          const y2 = parseFloat(l1.slice(1).split(",")[1]);
          
          candles.push(
            <line
              key={`wick-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={y2 > y1 ? "#10b981" : "#ef4444"}
              strokeWidth="1.5"
            />
          );
          i += 2;
          continue;
        }
      }
      
      i++;
    }
    
    return candles;
  };

  return (
    <svg viewBox="0 0 50 50" className="w-full h-full">
      <rect width="50" height="50" fill="transparent" />
      {renderCandles()}
    </svg>
  );
}

export default function PatternsClient() {
  const [activeLevel, setActiveLevel] = useState<Level | "all">("all");
  const [activeSignal, setActiveSignal] = useState<Signal | "all">("all");
  const [selectedPattern, setSelectedPattern] = useState<CandlePattern | null>(null);

  const filteredPatterns = CANDLESTICK_PATTERNS.filter((p) => {
    if (activeLevel !== "all" && p.level !== activeLevel) return false;
    if (activeSignal !== "all" && p.signal !== activeSignal) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <Navbar />

      {/* Hero */}
      <div className="pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              📊 Candlestick Patterns — Complete Guide
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Learn all 47 candlestick patterns from beginner to pro. 
              Understand what each pattern means and when to use it.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            {/* Level Filter */}
            <div className="flex bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-lg p-1">
              <button
                onClick={() => setActiveLevel("all")}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  activeLevel === "all"
                    ? "bg-brand text-white"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                All ({CANDLESTICK_PATTERNS.length})
              </button>
              {LEVEL_INFO.map((info) => (
                <button
                  key={info.level}
                  onClick={() => setActiveLevel(info.level)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    activeLevel === info.level
                      ? "bg-brand text-white"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {info.name} ({info.count})
                </button>
              ))}
            </div>

            {/* Signal Filter */}
            <div className="flex bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-lg p-1">
              <button
                onClick={() => setActiveSignal("all")}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  activeSignal === "all"
                    ? "bg-gray-200 dark:bg-dark-600 text-gray-900 dark:text-white"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveSignal("bullish")}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  activeSignal === "bullish"
                    ? "bg-emerald-500 text-white"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                🟢 Bullish
              </button>
              <button
                onClick={() => setActiveSignal("bearish")}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  activeSignal === "bearish"
                    ? "bg-red-500 text-white"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                🔴 Bearish
              </button>
              <button
                onClick={() => setActiveSignal("neutral")}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  activeSignal === "neutral"
                    ? "bg-amber-500 text-white"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                🟡 Neutral
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Patterns Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredPatterns.map((pattern) => (
            <button
              key={pattern.id}
              onClick={() => setSelectedPattern(pattern)}
              className={`text-left bg-white dark:bg-dark-800 border rounded-xl p-4 hover:shadow-lg transition-all duration-200 ${
                selectedPattern?.id === pattern.id
                  ? "border-brand shadow-lg shadow-brand/10"
                  : "border-gray-200 dark:border-dark-600 hover:border-gray-300 dark:hover:border-dark-500"
              }`}
            >
              {/* Pattern Diagram */}
              <div className="w-full h-24 bg-gray-50 dark:bg-dark-700 rounded-lg mb-3 flex items-center justify-center">
                <div className="w-16 h-16">
                  <PatternSVG pattern={pattern} />
                </div>
              </div>

              {/* Pattern Info */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                  {pattern.name}
                </h3>
                <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                  pattern.signal === "bullish"
                    ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400"
                    : pattern.signal === "bearish"
                    ? "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400"
                    : "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400"
                }`}>
                  {pattern.signal === "bullish" ? "🟢 Bullish" : pattern.signal === "bearish" ? "🔴 Bearish" : "🟡 Neutral"}
                </span>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                {pattern.whatItSignals}
              </p>

              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {pattern.candles} candle{pattern.candles > 1 ? "s" : ""}
                </span>
                <span className={`text-xs font-medium ${
                  pattern.reliability === "High" ? "text-emerald-500" : pattern.reliability === "Medium" ? "text-amber-500" : "text-red-500"
                }`}>
                  {pattern.reliability} reliability
                </span>
              </div>
            </button>
          ))}
        </div>

        {filteredPatterns.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 dark:text-gray-500">No patterns match your filters.</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedPattern && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setSelectedPattern(null)}>
          <div
            className="bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-2xl max-w-lg w-full p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selectedPattern.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Level {selectedPattern.level} • {selectedPattern.levelName}</p>
              </div>
              <button
                onClick={() => setSelectedPattern(null)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            {/* Diagram */}
            <div className="w-full h-32 bg-gray-50 dark:bg-dark-700 rounded-xl mb-4 flex items-center justify-center">
              <div className="w-24 h-24">
                <PatternSVG pattern={selectedPattern} />
              </div>
            </div>

            {/* Signal Badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className={`px-3 py-1 text-sm font-bold rounded-full ${
                selectedPattern.signal === "bullish"
                  ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400"
                  : selectedPattern.signal === "bearish"
                  ? "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400"
                  : "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400"
              }`}>
                {selectedPattern.signal === "bullish" ? "🟢 Bullish Signal" : selectedPattern.signal === "bearish" ? "🔴 Bearish Signal" : "🟡 Neutral Signal"}
              </span>
              <span className={`text-sm font-medium ${
                selectedPattern.reliability === "High" ? "text-emerald-500" : selectedPattern.reliability === "Medium" ? "text-amber-500" : "text-red-500"
              }`}>
                {selectedPattern.reliability} Reliability
              </span>
            </div>

            {/* Description */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">What it looks like</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{selectedPattern.description}</p>
            </div>

            {/* What it signals */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">What it signals</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{selectedPattern.whatItSignals}</p>
            </div>

            {/* Candles count */}
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span>🕯️ {selectedPattern.candles} candle{selectedPattern.candles > 1 ? "s" : ""}</span>
              <span>📊 Level {selectedPattern.level}</span>
            </div>
          </div>
        </div>
      )}

      {/* Educational Note */}
      <div className="bg-gray-100 dark:bg-dark-800 border-t border-gray-200 dark:border-dark-600 py-8">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">⚠️ Important Note</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            No candlestick pattern is a guarantee. They work best when combined with:
          </p>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div className="bg-white dark:bg-dark-700 rounded-lg p-4">
              <p className="font-semibold text-gray-900 dark:text-white mb-1">📈 Trend Context</p>
              <p className="text-gray-500 dark:text-gray-400">A bullish pattern means more after a clear downtrend</p>
            </div>
            <div className="bg-white dark:bg-dark-700 rounded-lg p-4">
              <p className="font-semibold text-gray-900 dark:text-white mb-1">📊 Volume</p>
              <p className="text-gray-500 dark:text-gray-400">A pattern on high volume is more trustworthy</p>
            </div>
            <div className="bg-white dark:bg-dark-700 rounded-lg p-4">
              <p className="font-semibold text-gray-900 dark:text-white mb-1">🎯 Support/Resistance</p>
              <p className="text-gray-500 dark:text-gray-400">Patterns at known levels carry more weight</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Treat every pattern as a <em>clue</em>, not a certainty — same as indicator-based signals.
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-gray-100 dark:bg-dark-800 border-t border-gray-200 dark:border-dark-600 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            📚 Educational content only. Not financial advice. Always do your own research before trading.
          </p>
        </div>
      </div>
    </div>
  );
}
