"use client";

const COINS = [
  { symbol: "BTCUSDT", name: "Bitcoin", icon: "₿" },
  { symbol: "ETHUSDT", name: "Ethereum", icon: "Ξ" },
  { symbol: "SOLUSDT", name: "Solana", icon: "◎" },
  { symbol: "XRPUSDT", name: "Ripple", icon: "✕" },
  { symbol: "ADAUSDT", name: "Cardano", icon: "₳" },
  { symbol: "DOGEUSDT", name: "Dogecoin", icon: "Ð" },
  { symbol: "LTCUSDT", name: "Litecoin", icon: "Ł" },
  { symbol: "LINKUSDT", name: "Chainlink", icon: "⬡" },
  { symbol: "AVAXUSDT", name: "Avalanche", icon: "▲" },
  { symbol: "BNBUSDT", name: "BNB", icon: "◆" },
];

interface TradeHeaderProps {
  selectedSymbol: string;
  onSymbolChange: (symbol: string) => void;
  currentPrice: number;
  highPrice: number;
  lowPrice: number;
  priceChangePercent: number;
  balance: number;
  onResetBalance: () => void;
}

export default function TradeHeader({
  selectedSymbol,
  onSymbolChange,
  currentPrice,
  highPrice,
  lowPrice,
  priceChangePercent,
  balance,
  onResetBalance,
}: TradeHeaderProps) {
  const selectedCoin = COINS.find((c) => c.symbol === selectedSymbol) || COINS[0];

  const formatPrice = (price: number) => {
    if (price >= 1000) return price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (price >= 1) return price.toFixed(2);
    return price.toFixed(4);
  };

  return (
    <div className="bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-xl p-4">
      {/* Practice Mode Badge */}
      <div className="flex items-center gap-2 mb-3">
        <span className="px-2 py-0.5 bg-brand/10 text-brand text-xs font-bold rounded-full">PRACTICE MODE</span>
        <span className="text-xs text-gray-500 dark:text-gray-400">No real money involved</span>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Symbol Picker */}
        <div className="flex items-center gap-3">
          <select
            value={selectedSymbol}
            onChange={(e) => onSymbolChange(e.target.value)}
            className="bg-gray-100 dark:bg-dark-700 border border-gray-200 dark:border-dark-500 rounded-lg px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand"
          >
            {COINS.map((coin) => (
              <option key={coin.symbol} value={coin.symbol}>
                {coin.icon} {coin.name} ({coin.symbol.replace("USDT", "")})
              </option>
            ))}
          </select>

          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              ${formatPrice(currentPrice)}
            </p>
            <p className={`text-sm font-medium ${priceChangePercent >= 0 ? "text-emerald-500" : "text-red-500"}`}>
              {priceChangePercent >= 0 ? "+" : ""}{priceChangePercent.toFixed(2)}%
            </p>
          </div>
        </div>

        {/* 24h Stats */}
        <div className="flex items-center gap-6 text-sm">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-xs">24h High</p>
            <p className="font-semibold text-gray-900 dark:text-white">${formatPrice(highPrice)}</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-xs">24h Low</p>
            <p className="font-semibold text-gray-900 dark:text-white">${formatPrice(lowPrice)}</p>
          </div>
        </div>

        {/* Balance */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs text-gray-500 dark:text-gray-400">Virtual Balance</p>
            <p className="text-xl font-bold text-brand">${balance.toFixed(2)}</p>
          </div>
          <button
            onClick={onResetBalance}
            className="px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-dark-700 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
