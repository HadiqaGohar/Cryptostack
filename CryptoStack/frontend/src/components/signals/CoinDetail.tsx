"use client";

import SignalBadge from "./SignalBadge";
import StrengthBadge from "./StrengthBadge";
import SparklineChart from "./SparklineChart";

export interface CoinDetailData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  decision: "LONG" | "SHORT" | "WAIT";
  strength: "Strong" | "Medium" | "Weak";
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  entryPrice: number;
  entryZone: { low: number; high: number };
  stopLoss: number;
  takeProfit1: number;
  takeProfit2: number;
  takeProfit3: number;
  riskReward: string;
  leverageRange: string;
  reason: string;
  indicators: {
    ema12: number;
    ema26: number;
    ema50: number;
    rsi: number;
  };
  marketContext: {
    trend: "UP" | "DOWN" | "SIDEWAYS";
    trendStrength: "STRONG" | "WEAK";
    volatility: "LOW" | "NORMAL" | "HIGH";
    volume: "LOW" | "NORMAL" | "HIGH";
  };
  sparkline: number[];
  interval?: string;
}

export interface CoinDetailProps {
  coin: CoinDetailData;
}

function fmt(price: number): string {
  if (price >= 1) {
    return `$${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `$${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 6 })}`;
}

function RiskLevelBadge({ level }: { level: string }) {
  const colors: Record<string, string> = {
    LOW: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
    MEDIUM: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
    HIGH: "bg-red-500/20 text-red-400 border border-red-500/30",
  };
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase ${colors[level] ?? colors.MEDIUM}`}>
      {level} Risk
    </span>
  );
}

function TradeLevelCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-dark-700 rounded-lg p-3">
      <div className="text-xs text-gray-400 mb-1">{label}</div>
      <div className="text-sm font-bold text-white">{value}</div>
    </div>
  );
}

function IndicatorCard({
  label,
  value,
  unit,
  isRsi,
}: {
  label: string;
  value: number;
  unit?: string;
  isRsi?: boolean;
}) {
  let color = "text-white";
  if (isRsi) {
    if (value >= 30 && value <= 70) {
      color = "text-emerald-400";
    } else {
      color = "text-red-400";
    }
  }

  return (
    <div className="bg-dark-700 rounded-lg p-3">
      <div className="text-xs text-gray-400 mb-1">{label}</div>
      <div className={`text-sm font-bold ${color}`}>
        {value.toLocaleString("en-US", { maximumFractionDigits: 4 })}
        {unit && <span className="text-gray-400 ml-1">{unit}</span>}
      </div>
    </div>
  );
}

function MarketContextCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: string;
}) {
  const colorMap: Record<string, string> = {
    UP: "text-emerald-400",
    DOWN: "text-red-400",
    SIDEWAYS: "text-amber-400",
    STRONG: "text-emerald-400",
    WEAK: "text-red-400",
    LOW: "text-amber-400",
    NORMAL: "text-emerald-400",
    HIGH: "text-red-400",
  };

  return (
    <div className="bg-dark-700 rounded-lg p-3">
      <div className="text-xs text-gray-400 mb-1">{label}</div>
      <div className={`text-sm font-bold ${colorMap[value] ?? "text-white"}`}>
        {icon && <span className="mr-1">{icon}</span>}
        {value}
      </div>
    </div>
  );
}

const trendIcon: Record<string, string> = {
  UP: "↑",
  DOWN: "↓",
  SIDEWAYS: "→",
};

export default function CoinDetail({ coin }: CoinDetailProps) {
  const changeColor =
    coin.change24h >= 0 ? "text-emerald-400" : "text-red-400";
  const arrow = coin.change24h >= 0 ? "▲" : "▼";

  const decisionGradient: Record<string, string> = {
    LONG: "from-emerald-500/20 to-emerald-900/20 border-emerald-500/30",
    SHORT: "from-red-500/20 to-red-900/20 border-red-500/30",
    WAIT: "from-amber-500/20 to-amber-900/20 border-amber-500/30",
  };

  return (
    <div className="bg-dark-800 rounded-xl p-4 sm:p-6 space-y-6">
      {/* Top section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-2xl font-bold text-white">{coin.name}</h2>
            <span className="text-gray-400 text-sm font-semibold">
              {coin.symbol}
            </span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">
            {fmt(coin.price)}
          </div>
          <span className={`text-sm font-medium ${changeColor}`}>
            {arrow} {Math.abs(coin.change24h).toFixed(2)}%
          </span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <SignalBadge decision={coin.decision} />
          <StrengthBadge strength={coin.strength} />
          <RiskLevelBadge level={coin.riskLevel} />
        </div>
      </div>

      {/* Decision Card */}
      <div
        className={`rounded-xl border bg-gradient-to-r p-5 ${decisionGradient[coin.decision]}`}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-bold text-white">
            {coin.decision}
          </span>
          <SignalBadge decision={coin.decision} />
        </div>
        <p className="text-gray-300 text-sm">{coin.reason}</p>
      </div>

      {/* Trade Levels */}
      <div>
        <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
          Trade Levels
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <TradeLevelCard label="Entry Price" value={fmt(coin.entryPrice)} />
          <TradeLevelCard
            label="Entry Zone"
            value={`${fmt(coin.entryZone.low)} - ${fmt(coin.entryZone.high)}`}
          />
          <TradeLevelCard label="Stop Loss" value={fmt(coin.stopLoss)} />
          <TradeLevelCard label="Risk / Reward" value={coin.riskReward} />
          <TradeLevelCard label="Take Profit 1" value={fmt(coin.takeProfit1)} />
          <TradeLevelCard label="Take Profit 2" value={fmt(coin.takeProfit2)} />
          <TradeLevelCard label="Take Profit 3" value={fmt(coin.takeProfit3)} />
          <TradeLevelCard label="Leverage Range" value={coin.leverageRange} />
        </div>
      </div>

      {/* Sparkline */}
      <div>
        <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
          Recent Price Action
        </h3>
        <div className="bg-dark-700 rounded-lg p-4 flex justify-center">
          <SparklineChart
            data={coin.sparkline}
            color={
              coin.decision === "SHORT"
                ? "#ef4444"
                : coin.decision === "WAIT"
                  ? "#f59e0b"
                  : "#36bb91"
            }
            width={280}
            height={80}
          />
        </div>
      </div>

      {/* Indicator Values */}
      <div>
        <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
          Indicators
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <IndicatorCard
            label="EMA(12)"
            value={coin.indicators.ema12}
            unit="USD"
          />
          <IndicatorCard
            label="EMA(26)"
            value={coin.indicators.ema26}
            unit="USD"
          />
          <IndicatorCard
            label="EMA(50)"
            value={coin.indicators.ema50}
            unit="USD"
          />
          <IndicatorCard
            label="RSI(14)"
            value={coin.indicators.rsi}
            isRsi
          />
        </div>
      </div>

      {/* Market Context */}
      <div>
        <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
          Market Context
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <MarketContextCard
            label="Trend"
            value={coin.marketContext.trend}
            icon={trendIcon[coin.marketContext.trend]}
          />
          <MarketContextCard
            label="Trend Strength"
            value={coin.marketContext.trendStrength}
          />
          <MarketContextCard
            label="Volatility"
            value={coin.marketContext.volatility}
          />
          <MarketContextCard
            label="Volume"
            value={coin.marketContext.volume}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-500 pt-4 border-t border-dark-600">
        <p>Based on EMA12, EMA26, EMA50 &amp; RSI(14) indicators</p>
        <p className="mt-1">Timeframe: {coin.interval ?? "1h"}</p>
      </div>
    </div>
  );
}
