"use client";

import { useState, useEffect } from "react";
import { MOCK_SIGNALS, MockSignal } from "@/lib/mockData";
import { createPriceStream, getCurrentPrice, formatPrice, formatChange } from "@/lib/mockPrice";
import Navbar from "@/components/Navbar";
import ThemeToggle from "@/components/ThemeToggle";
import SignalBadge from "@/components/signals/SignalBadge";
import StrengthBadge from "@/components/signals/StrengthBadge";
import SparklineChart from "@/components/signals/SparklineChart";

export default function SignalsClient() {
  const [selectedSymbol, setSelectedSymbol] = useState<string>("BTCUSDT");
  const [livePrices, setLivePrices] = useState<Map<string, number>>(new Map());
  const [selectedCoin, setSelectedCoin] = useState<MockSignal | null>(null);
  const [interval, setInterval] = useState<"15m" | "1h">("15m");
  const [lastUpdated, setLastUpdated] = useState<string>(new Date().toLocaleTimeString());
  const [showDetail, setShowDetail] = useState(false);

  // Initialize live prices from mock data
  useEffect(() => {
    const prices = new Map<string, number>();
    MOCK_SIGNALS.forEach(signal => {
      prices.set(signal.symbol, signal.price);
    });
    setLivePrices(prices);
  }, []);

  // Set up price stream for selected coin
  useEffect(() => {
    const stopStream = createPriceStream(selectedSymbol, (newPrice) => {
      setLivePrices(prev => {
        const updated = new Map(prev);
        updated.set(selectedSymbol, newPrice);
        return updated;
      });
      setLastUpdated(new Date().toLocaleTimeString());
    }, 3000);

    return () => stopStream();
  }, [selectedSymbol]);

  // Update selected coin data
  useEffect(() => {
    const coin = MOCK_SIGNALS.find(s => s.symbol === selectedSymbol);
    if (coin) {
      setSelectedCoin({
        ...coin,
        price: livePrices.get(selectedSymbol) || coin.price,
      });
    }
  }, [selectedSymbol, livePrices]);

  const handleSelectCoin = (symbol: string) => {
    setSelectedSymbol(symbol);
    setShowDetail(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <Navbar />

      {/* Practice Mode Banner */}
      <div className="bg-brand/10 border-b border-brand/20">
        <div className="max-w-7xl mx-auto px-4 py-2 text-center">
          <p className="text-sm text-brand font-medium">
            🎯 Practice Mode — AI signals for learning. Not real trading. For real trades, use any live platform.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand"></span>
              </span>
              AI Signal Bot
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Free signals for 10 popular coins • Updated {lastUpdated}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Interval Toggle */}
            <div className="flex bg-gray-200 dark:bg-dark-700 rounded-lg p-1">
              {(["15m", "1h"] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => setInterval(opt)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                    interval === opt
                      ? "bg-brand text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            <ThemeToggle />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Coin List - Left Side */}
          <div className="lg:col-span-2 space-y-3">
            {MOCK_SIGNALS.map((signal) => {
              const livePrice = livePrices.get(signal.symbol) || signal.price;
              const isSelected = signal.symbol === selectedSymbol;
              const priceChange = ((livePrice - signal.price) / signal.price) * 100;

              return (
                <button
                  key={signal.symbol}
                  onClick={() => handleSelectCoin(signal.symbol)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                    isSelected
                      ? "bg-brand/10 border-brand/50 dark:border-brand/50 shadow-lg shadow-brand/10"
                      : "bg-white dark:bg-dark-800 border-gray-200 dark:border-dark-600 hover:border-gray-300 dark:hover:border-dark-500"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white">
                          {signal.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {signal.symbol}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          ${formatPrice(livePrice, signal.symbol)}
                        </p>
                        <p className={`text-xs font-medium ${priceChange >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                          {formatChange(priceChange)}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <SignalBadge decision={signal.decision} />
                        <StrengthBadge strength={signal.strength} />
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detail Panel - Right Side */}
          <div className="lg:col-span-3">
            {selectedCoin ? (
              <div className="bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-2xl p-6 shadow-sm">
                {/* Coin Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedCoin.name}
                      <span className="ml-2 text-lg font-normal text-gray-500 dark:text-gray-400">
                        {selectedCoin.symbol}
                      </span>
                    </h2>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                      ${formatPrice(selectedCoin.price, selectedCoin.symbol)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <SignalBadge decision={selectedCoin.decision} />
                    <StrengthBadge strength={selectedCoin.strength} />
                  </div>
                </div>

                {/* Decision Card */}
                <div className={`rounded-xl p-6 mb-6 ${
                  selectedCoin.decision === "LONG"
                    ? "bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20"
                    : selectedCoin.decision === "SHORT"
                    ? "bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20"
                    : "bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20"
                }`}>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">AI Decision</p>
                  <p className={`text-2xl font-bold ${
                    selectedCoin.decision === "LONG"
                      ? "text-emerald-500"
                      : selectedCoin.decision === "SHORT"
                      ? "text-red-500"
                      : "text-amber-500"
                  }`}>
                    {selectedCoin.decision === "LONG" ? "🟢 BUY (Long)" : selectedCoin.decision === "SHORT" ? "🔴 SELL (Short)" : "🟡 WAIT"}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mt-2">
                    {selectedCoin.reason}
                  </p>
                </div>

                {/* Trade Levels Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-4">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Entry Price</p>
                    <p className="font-bold text-gray-900 dark:text-white">${formatPrice(selectedCoin.entryPrice, selectedCoin.symbol)}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-4">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Entry Zone</p>
                    <p className="font-bold text-gray-900 dark:text-white text-sm">
                      ${formatPrice(selectedCoin.entryZone.low, selectedCoin.symbol)} - ${formatPrice(selectedCoin.entryZone.high, selectedCoin.symbol)}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-4">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Stop Loss</p>
                    <p className="font-bold text-red-500">${formatPrice(selectedCoin.stopLoss, selectedCoin.symbol)}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-4">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Take Profit 1</p>
                    <p className="font-bold text-emerald-500">${formatPrice(selectedCoin.takeProfit1, selectedCoin.symbol)}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-4">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Take Profit 2</p>
                    <p className="font-bold text-emerald-500">${formatPrice(selectedCoin.takeProfit2, selectedCoin.symbol)}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-4">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Take Profit 3</p>
                    <p className="font-bold text-emerald-500">${formatPrice(selectedCoin.takeProfit3, selectedCoin.symbol)}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-4">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Risk/Reward</p>
                    <p className="font-bold text-brand">{selectedCoin.riskReward}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-4">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Leverage</p>
                    <p className="font-bold text-gray-900 dark:text-white">{selectedCoin.leverageRange}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-4">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Risk Level</p>
                    <p className={`font-bold ${
                      selectedCoin.riskLevel === "LOW" ? "text-emerald-500" : selectedCoin.riskLevel === "MEDIUM" ? "text-amber-500" : "text-red-500"
                    }`}>
                      {selectedCoin.riskLevel}
                    </p>
                  </div>
                </div>

                {/* Sparkline */}
                <div className="mb-6">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Recent Price Action</p>
                  <div className="bg-gray-50 dark:bg-dark-700 rounded-xl p-4">
                    <SparklineChart
                      data={selectedCoin.sparkline}
                      color={selectedCoin.decision === "LONG" ? "#10b981" : selectedCoin.decision === "SHORT" ? "#ef4444" : "#f59e0b"}
                      width={400}
                      height={80}
                    />
                  </div>
                </div>

                {/* Indicators */}
                <div className="mb-6">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Technical Indicators</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">EMA(12)</p>
                      <p className="font-bold text-gray-900 dark:text-white text-sm">${formatPrice(selectedCoin.indicators.ema12, selectedCoin.symbol)}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">EMA(26)</p>
                      <p className="font-bold text-gray-900 dark:text-white text-sm">${formatPrice(selectedCoin.indicators.ema26, selectedCoin.symbol)}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">EMA(50)</p>
                      <p className="font-bold text-gray-900 dark:text-white text-sm">${formatPrice(selectedCoin.indicators.ema50, selectedCoin.symbol)}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">RSI(14)</p>
                      <p className={`font-bold text-sm ${
                        selectedCoin.indicators.rsi > 70 ? "text-red-500" : selectedCoin.indicators.rsi < 30 ? "text-red-500" : "text-emerald-500"
                      }`}>
                        {selectedCoin.indicators.rsi.toFixed(1)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Market Context */}
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Market Context</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Trend</p>
                      <p className={`font-bold text-sm ${
                        selectedCoin.marketContext.trend === "UP" ? "text-emerald-500" : selectedCoin.marketContext.trend === "DOWN" ? "text-red-500" : "text-amber-500"
                      }`}>
                        {selectedCoin.marketContext.trend === "UP" ? "↑" : selectedCoin.marketContext.trend === "DOWN" ? "↓" : "→"} {selectedCoin.marketContext.trend}
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Strength</p>
                      <p className={`font-bold text-sm ${
                        selectedCoin.marketContext.trendStrength === "STRONG" ? "text-emerald-500" : "text-amber-500"
                      }`}>
                        {selectedCoin.marketContext.trendStrength}
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Volatility</p>
                      <p className={`font-bold text-sm ${
                        selectedCoin.marketContext.volatility === "HIGH" ? "text-red-500" : selectedCoin.marketContext.volatility === "NORMAL" ? "text-amber-500" : "text-emerald-500"
                      }`}>
                        {selectedCoin.marketContext.volatility}
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Volume</p>
                      <p className={`font-bold text-sm ${
                        selectedCoin.marketContext.volume === "HIGH" ? "text-emerald-500" : selectedCoin.marketContext.volume === "NORMAL" ? "text-amber-500" : "text-red-500"
                      }`}>
                        {selectedCoin.marketContext.volume}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Note */}
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-dark-600">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Based on EMA(12), EMA(26), EMA(50) & RSI(14) indicators • Timeframe: {interval}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-2xl p-12 text-center">
                <p className="text-gray-400 dark:text-gray-500 text-lg">
                  👈 Select a coin to view its AI signal
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Disclaimer */}
      <div className="bg-gray-100 dark:bg-dark-800 border-t border-gray-200 dark:border-dark-600 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            ⚠️ <strong>Disclaimer:</strong> These signals are based on technical indicators (EMA & RSI). 
            They are NOT financial advice. Always do your own research. 
            <strong className="text-brand"> For real trading, use any live platform.</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
