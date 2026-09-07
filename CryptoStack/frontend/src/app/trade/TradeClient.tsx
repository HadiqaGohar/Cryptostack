"use client";

import { useState, useEffect, useCallback } from "react";
import { useVirtualWallet } from "@/hooks/useVirtualWallet";
import Navbar from "@/components/Navbar";
import ThemeToggle from "@/components/ThemeToggle";
import TradeHeader from "@/components/trade/TradeHeader";
import PriceChart from "@/components/trade/PriceChart";
import OrderPanel from "@/components/trade/OrderPanel";
import PositionsTable from "@/components/trade/PositionsTable";
import OrderHistory from "@/components/trade/OrderHistory";

export default function TradeClient() {
  const [selectedSymbol, setSelectedSymbol] = useState("BTCUSDT");
  const [chartInterval, setChartInterval] = useState("1m");
  const [currentPrice, setCurrentPrice] = useState(0);
  const [highPrice, setHighPrice] = useState(0);
  const [lowPrice, setLowPrice] = useState(0);
  const [priceChangePercent, setPriceChangePercent] = useState(0);
  const [livePrices, setLivePrices] = useState<Map<string, number>>(new Map());

  const {
    balance,
    positions,
    history,
    openPosition,
    closePosition,
    resetBalance,
    getPnL,
    canOpenPosition,
  } = useVirtualWallet();

  // Fetch current price
  const fetchPrice = useCallback(async () => {
    try {
      const res = await fetch(`/api/trade/price?symbol=${selectedSymbol}`);
      const data = await res.json();
      if (data.price) {
        setCurrentPrice(data.price);
        setHighPrice(data.highPrice);
        setLowPrice(data.lowPrice);
        setPriceChangePercent(data.priceChangePercent);

        setLivePrices((prev) => {
          const updated = new Map(prev);
          updated.set(selectedSymbol, data.price);
          return updated;
        });
      }
    } catch (err) {
      console.error("Failed to fetch price:", err);
    }
  }, [selectedSymbol]);

  // Initial fetch + polling
  useEffect(() => {
    fetchPrice();
    const timer = setInterval(fetchPrice, 3000);
    return () => clearInterval(timer);
  }, [fetchPrice]);

  const handleOpenPosition = useCallback(
    (symbol: string, direction: "LONG" | "SHORT", amount: number, price: number) => {
      return openPosition(symbol, direction, amount, price);
    },
    [openPosition]
  );

  const handleClosePosition = useCallback(
    (positionId: string) => {
      const pos = positions.find((p) => p.id === positionId);
      if (pos) {
        const price = livePrices.get(pos.symbol) || pos.entryPrice;
        closePosition(positionId, price);
      }
    },
    [positions, livePrices, closePosition]
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <Navbar />

      {/* Practice Mode Banner */}
      <div className="bg-brand/10 border-b border-brand/20">
        <div className="max-w-7xl mx-auto px-4 py-2 text-center">
          <p className="text-sm text-brand font-medium">
            🎯 Practice Trading — Virtual money only. No real trades. Learn risk-free.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            📊 Practice Trading
          </h1>
          <ThemeToggle />
        </div>

        {/* Trade Header */}
        <div className="mb-6">
          <TradeHeader
            selectedSymbol={selectedSymbol}
            onSymbolChange={setSelectedSymbol}
            currentPrice={currentPrice}
            highPrice={highPrice}
            lowPrice={lowPrice}
            priceChangePercent={priceChangePercent}
            balance={balance}
            onResetBalance={resetBalance}
          />
        </div>

        {/* Main Trading Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Chart - Left Side */}
          <div className="lg:col-span-2">
            <PriceChart
              symbol={selectedSymbol}
              interval={chartInterval}
              onIntervalChange={setChartInterval}
            />
          </div>

          {/* Order Panel - Right Side */}
          <div>
            <OrderPanel
              symbol={selectedSymbol}
              currentPrice={currentPrice}
              balance={balance}
              canOpenPosition={canOpenPosition}
              onOpenPosition={handleOpenPosition}
            />
          </div>
        </div>

        {/* Positions & History */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PositionsTable
            positions={positions}
            currentPrices={livePrices}
            getPnL={getPnL}
            onClosePosition={handleClosePosition}
          />
          <OrderHistory history={history} />
        </div>
      </main>

      {/* Disclaimer */}
      <div className="bg-gray-100 dark:bg-dark-800 border-t border-gray-200 dark:border-dark-600 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            ⚠️ <strong>Practice Tool:</strong> This is a simulation for learning only. No real money is involved. 
            All balances and positions are virtual. For real trading, use a licensed exchange.
          </p>
        </div>
      </div>
    </div>
  );
}
