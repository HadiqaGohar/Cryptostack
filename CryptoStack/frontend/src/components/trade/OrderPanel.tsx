"use client";

import { useState } from "react";

interface OrderPanelProps {
  symbol: string;
  currentPrice: number;
  balance: number;
  canOpenPosition: boolean;
  onOpenPosition: (symbol: string, direction: "LONG" | "SHORT", amount: number, price: number) => boolean;
}

export default function OrderPanel({
  symbol,
  currentPrice,
  balance,
  canOpenPosition,
  onOpenPosition,
}: OrderPanelProps) {
  const [amount, setAmount] = useState<string>("");
  const [orderType, setOrderType] = useState<"market" | "limit">("market");

  const amountNum = parseFloat(amount) || 0;
  const estimatedSize = currentPrice > 0 ? amountNum / currentPrice : 0;
  const shortSymbol = symbol.replace("USDT", "");

  const quickAmounts = [
    { label: "25%", value: balance * 0.25 },
    { label: "50%", value: balance * 0.5 },
    { label: "75%", value: balance * 0.75 },
    { label: "100%", value: balance },
  ];

  const handleOpen = (direction: "LONG" | "SHORT") => {
    if (amountNum <= 0 || amountNum > balance) return;
    const success = onOpenPosition(symbol, direction, amountNum, currentPrice);
    if (success) setAmount("");
  };

  return (
    <div className="bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-xl p-4">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Place Order</h3>

      {/* Order Type Tabs */}
      <div className="flex bg-gray-100 dark:bg-dark-700 rounded-lg p-1 mb-4">
        <button
          onClick={() => setOrderType("market")}
          className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
            orderType === "market" ? "bg-brand text-white" : "text-gray-500 dark:text-gray-400"
          }`}
        >
          Market
        </button>
        <button
          onClick={() => setOrderType("limit")}
          className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
            orderType === "limit" ? "bg-brand text-white" : "text-gray-500 dark:text-gray-400"
          }`}
          disabled
        >
          Limit (Soon)
        </button>
      </div>

      {/* Amount Input */}
      <div className="mb-3">
        <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Amount to Spend (USDT)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          min="0"
          max={balance}
          className="w-full bg-gray-100 dark:bg-dark-700 border border-gray-200 dark:border-dark-500 rounded-lg px-3 py-2.5 text-sm font-mono text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand"
        />
      </div>

      {/* Quick Amount Buttons */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {quickAmounts.map((qa) => (
          <button
            key={qa.label}
            onClick={() => setAmount(qa.value.toFixed(2))}
            className="px-2 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-dark-700 rounded-md hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
          >
            {qa.label}
          </button>
        ))}
      </div>

      {/* Estimated Size */}
      <div className="flex items-center justify-between text-sm mb-4 px-1">
        <span className="text-gray-500 dark:text-gray-400">Est. Size</span>
        <span className="font-mono font-semibold text-gray-900 dark:text-white">
          {estimatedSize.toFixed(6)} {shortSymbol}
        </span>
      </div>

      {/* Open Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => handleOpen("LONG")}
          disabled={!canOpenPosition || amountNum <= 0 || amountNum > balance}
          className="py-3 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors text-sm"
        >
          🟢 Open Long
        </button>
        <button
          onClick={() => handleOpen("SHORT")}
          disabled={!canOpenPosition || amountNum <= 0 || amountNum > balance}
          className="py-3 bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors text-sm"
        >
          🔴 Open Short
        </button>
      </div>

      {!canOpenPosition && (
        <p className="text-xs text-amber-500 mt-2 text-center">
          {balance <= 0 ? "Insufficient balance" : "Max 10 positions reached"}
        </p>
      )}
    </div>
  );
}
