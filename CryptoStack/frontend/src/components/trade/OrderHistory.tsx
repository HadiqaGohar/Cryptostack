"use client";

import { OrderHistoryEntry } from "@/hooks/useVirtualWallet";

interface OrderHistoryProps {
  history: OrderHistoryEntry[];
}

export default function OrderHistory({ history }: OrderHistoryProps) {
  const formatPrice = (price: number) => {
    if (price >= 1000) return price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (price >= 1) return price.toFixed(2);
    return price.toFixed(4);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-dark-600">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          Trade History ({history.length})
        </h3>
      </div>

      {history.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-gray-400 dark:text-gray-500 text-sm">No trades completed yet</p>
        </div>
      ) : (
        <div className="overflow-x-auto max-h-64 overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-white dark:bg-dark-800">
              <tr className="text-left text-xs text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-dark-600">
                <th className="px-4 py-2">Pair</th>
                <th className="px-4 py-2">Dir</th>
                <th className="px-4 py-2">Entry</th>
                <th className="px-4 py-2">Close</th>
                <th className="px-4 py-2">PnL</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry) => (
                <tr key={entry.id} className="border-b border-gray-100 dark:border-dark-700 last:border-0">
                  <td className="px-4 py-2 font-semibold text-gray-900 dark:text-white">
                    {entry.symbol.replace("USDT", "")}
                  </td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                      entry.direction === "LONG"
                        ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400"
                        : "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400"
                    }`}>
                      {entry.direction}
                    </span>
                  </td>
                  <td className="px-4 py-2 font-mono text-gray-700 dark:text-gray-300">
                    ${formatPrice(entry.entryPrice)}
                  </td>
                  <td className="px-4 py-2 font-mono text-gray-700 dark:text-gray-300">
                    ${formatPrice(entry.closePrice)}
                  </td>
                  <td className={`px-4 py-2 font-mono font-semibold ${entry.pnl >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                    {entry.pnl >= 0 ? "+" : ""}{entry.pnl.toFixed(2)} ({entry.pnlPercent >= 0 ? "+" : ""}{entry.pnlPercent.toFixed(1)}%)
                  </td>
                  <td className="px-4 py-2 text-gray-500 dark:text-gray-400 text-xs">
                    {formatDate(entry.closedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
