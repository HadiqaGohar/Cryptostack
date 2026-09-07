"use client";

import { Position } from "@/hooks/useVirtualWallet";

interface PositionsTableProps {
  positions: Position[];
  currentPrices: Map<string, number>;
  getPnL: (positionId: string, currentPrice: number) => { pnl: number; pnlPercent: number };
  onClosePosition: (positionId: string, currentPrice: number) => void;
}

export default function PositionsTable({
  positions,
  currentPrices,
  getPnL,
  onClosePosition,
}: PositionsTableProps) {
  const formatPrice = (price: number) => {
    if (price >= 1000) return price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (price >= 1) return price.toFixed(2);
    return price.toFixed(4);
  };

  return (
    <div className="bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-dark-600">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          Open Positions ({positions.length})
        </h3>
      </div>

      {positions.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-gray-400 dark:text-gray-500 text-sm">No open positions yet</p>
          <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">Place a trade above to get started</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-dark-600">
                <th className="px-4 py-2">Pair</th>
                <th className="px-4 py-2">Dir</th>
                <th className="px-4 py-2">Size</th>
                <th className="px-4 py-2">Entry</th>
                <th className="px-4 py-2">Current</th>
                <th className="px-4 py-2">PnL</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((pos) => {
                const currentPrice = currentPrices.get(pos.symbol) || pos.entryPrice;
                const { pnl, pnlPercent } = getPnL(pos.id, currentPrice);

                return (
                  <tr key={pos.id} className="border-b border-gray-100 dark:border-dark-700 last:border-0">
                    <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">
                      {pos.symbol.replace("USDT", "")}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                        pos.direction === "LONG"
                          ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400"
                          : "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400"
                      }`}>
                        {pos.direction}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-gray-700 dark:text-gray-300">
                      {pos.size.toFixed(6)}
                    </td>
                    <td className="px-4 py-3 font-mono text-gray-700 dark:text-gray-300">
                      ${formatPrice(pos.entryPrice)}
                    </td>
                    <td className="px-4 py-3 font-mono text-gray-700 dark:text-gray-300">
                      ${formatPrice(currentPrice)}
                    </td>
                    <td className={`px-4 py-3 font-mono font-semibold ${pnl >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                      {pnl >= 0 ? "+" : ""}{pnl.toFixed(2)} ({pnlPercent >= 0 ? "+" : ""}{pnlPercent.toFixed(2)}%)
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => onClosePosition(pos.id, currentPrice)}
                        className="px-3 py-1 text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 rounded-md hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors"
                      >
                        Close
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
