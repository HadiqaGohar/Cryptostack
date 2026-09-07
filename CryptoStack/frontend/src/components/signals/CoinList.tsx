"use client";

import SignalBadge from "./SignalBadge";
import StrengthBadge from "./StrengthBadge";

export interface CoinData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  decision: "LONG" | "SHORT" | "WAIT";
  strength: "Strong" | "Medium" | "Weak";
}

export interface CoinListProps {
  coins: CoinData[];
  selectedSymbol: string | null;
  onSelect: (symbol: string) => void;
  loading: boolean;
}

function formatPrice(price: number): string {
  if (price >= 1) {
    return `$${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `$${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 6 })}`;
}

function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 px-4 py-3 border-b border-dark-600 animate-pulse">
      <div className="flex-1">
        <div className="h-4 w-16 bg-dark-600 rounded mb-1"></div>
        <div className="h-3 w-24 bg-dark-600 rounded"></div>
      </div>
      <div className="h-4 w-20 bg-dark-600 rounded"></div>
      <div className="h-4 w-16 bg-dark-600 rounded"></div>
      <div className="h-5 w-16 bg-dark-600 rounded-full"></div>
      <div className="h-4 w-16 bg-dark-600 rounded"></div>
    </div>
  );
}

export default function CoinList({
  coins,
  selectedSymbol,
  onSelect,
  loading,
}: CoinListProps) {
  if (loading && coins.length === 0) {
    return (
      <div className="bg-dark-800 rounded-xl overflow-hidden">
        <div className="px-4 py-2 border-b border-dark-600 text-xs text-gray-400 font-semibold hidden sm:block">
          <div className="grid grid-cols-[1.5fr_1fr_0.8fr_0.8fr_0.8fr] gap-4">
            <span>Symbol</span>
            <span>Price</span>
            <span>24h</span>
            <span>Signal</span>
            <span>Strength</span>
          </div>
        </div>
        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow />
      </div>
    );
  }

  return (
    <div className="bg-dark-800 rounded-xl overflow-hidden max-h-[600px] overflow-y-auto">
      {/* Desktop header */}
      <div className="px-4 py-2 border-b border-dark-600 text-xs text-gray-400 font-semibold hidden sm:block sticky top-0 bg-dark-800 z-10">
        <div className="grid grid-cols-[1.5fr_1fr_0.8fr_0.8fr_0.8fr] gap-4">
          <span>Symbol</span>
          <span>Price</span>
          <span>24h</span>
          <span>Signal</span>
          <span>Strength</span>
        </div>
      </div>

      {coins.map((coin) => {
        const isSelected = coin.symbol === selectedSymbol;
        const changeColor =
          coin.change24h >= 0 ? "text-emerald-400" : "text-red-400";
        const arrow = coin.change24h >= 0 ? "▲" : "▼";

        return (
          <button
            key={coin.symbol}
            onClick={() => onSelect(coin.symbol)}
            aria-label={`View details for ${coin.name}`}
            className={`w-full text-left px-4 py-3 border-b border-dark-600 hover:bg-dark-700 transition-colors ${
              isSelected
                ? "bg-dark-700 border-l-2 border-l-emerald-500"
                : "border-l-2 border-l-transparent"
            }`}
          >
            {/* Desktop row */}
            <div className="hidden sm:grid grid-cols-[1.5fr_1fr_0.8fr_0.8fr_0.8fr] gap-4 items-center">
              <div>
                <span className="font-bold text-white">{coin.symbol}</span>
                <span className="text-gray-400 text-xs ml-2">{coin.name}</span>
              </div>
              <span className="text-white text-sm">{formatPrice(coin.price)}</span>
              <span className={`text-sm font-medium ${changeColor}`}>
                {arrow} {Math.abs(coin.change24h).toFixed(2)}%
              </span>
              <SignalBadge decision={coin.decision} />
              <StrengthBadge strength={coin.strength} />
            </div>

            {/* Mobile card */}
            <div className="sm:hidden">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <span className="font-bold text-white text-sm">
                    {coin.symbol}
                  </span>
                  <span className="text-gray-400 text-xs ml-2">
                    {coin.name}
                  </span>
                </div>
                <StrengthBadge strength={coin.strength} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white text-sm">
                  {formatPrice(coin.price)}
                </span>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-medium ${changeColor}`}>
                    {arrow} {Math.abs(coin.change24h).toFixed(2)}%
                  </span>
                  <SignalBadge decision={coin.decision} />
                </div>
              </div>
            </div>
          </button>
        );
      })}

      {coins.length === 0 && !loading && (
        <div className="px-4 py-8 text-center text-gray-400 text-sm">
          No signals available
        </div>
      )}
    </div>
  );
}
