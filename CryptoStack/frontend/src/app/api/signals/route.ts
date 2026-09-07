import { NextRequest, NextResponse } from "next/server";
import { calculateSignal, calculateSparkline } from "@/lib/indicators";

const COINS = [
  "BTCUSDT", "ETHUSDT", "SOLUSDT", "XRPUSDT", "ADAUSDT",
  "DOGEUSDT", "LTCUSDT", "LINKUSDT", "AVAXUSDT", "BNBUSDT",
];

const COIN_NAMES: Record<string, string> = {
  BTCUSDT: "Bitcoin",
  ETHUSDT: "Ethereum",
  SOLUSDT: "Solana",
  XRPUSDT: "Ripple",
  ADAUSDT: "Cardano",
  DOGEUSDT: "Dogecoin",
  LTCUSDT: "Litecoin",
  LINKUSDT: "Chainlink",
  AVAXUSDT: "Avalanche",
  BNBUSDT: "BNB",
};

const VALID_INTERVALS = ["15m", "1h"] as const;

type Kline = [
  number, // openTime
  string, // open
  string, // high
  string, // low
  string, // close
  string, // volume
  number, // closeTime
  string, // quoteAssetVolume
  number, // trades
  string, // takerBuyBaseVolume
  string, // takerBuyQuoteVolume
  string, // ignore
];

async function fetchCoinData(symbol: string, interval: string) {
  const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=100`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Binance API error for ${symbol}: ${res.status}`);
  }

  const klines: Kline[] = await res.json();

  const closes = klines.map((k) => parseFloat(k[4]));
  const highs = klines.map((k) => parseFloat(k[2]));
  const lows = klines.map((k) => parseFloat(k[3]));
  const volumes = klines.map((k) => parseFloat(k[5]));

  const currentPrice = closes[closes.length - 1];

  const lookback = interval === "15m" ? 96 : 24;
  const previousPrice = closes[Math.max(0, closes.length - 1 - lookback)];
  const change24h = previousPrice > 0
    ? ((currentPrice - previousPrice) / previousPrice) * 100
    : 0;

  const signal = calculateSignal(symbol, closes, highs, lows, volumes);
  const sparkline = calculateSparkline(closes, 20);

  return {
    symbol,
    name: COIN_NAMES[symbol] || symbol,
    price: currentPrice,
    change24h: parseFloat(change24h.toFixed(2)),
    decision: signal.decision,
    strength: signal.strength,
    riskLevel: signal.riskLevel,
    entryPrice: signal.entryPrice,
    entryZone: signal.entryZone,
    stopLoss: signal.stopLoss,
    takeProfit1: signal.takeProfit1,
    takeProfit2: signal.takeProfit2,
    takeProfit3: signal.takeProfit3,
    riskReward: signal.riskReward,
    leverageRange: signal.leverageRange,
    reason: signal.reason,
    indicators: signal.indicators,
    marketContext: signal.marketContext,
    sparkline,
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawInterval = searchParams.get("interval") || "15m";
  const interval = VALID_INTERVALS.includes(rawInterval as typeof VALID_INTERVALS[number])
    ? rawInterval
    : "15m";

  try {
    const results = await Promise.all(
      COINS.map((symbol) => fetchCoinData(symbol, interval))
    );

    return NextResponse.json({
      interval,
      lastUpdated: new Date().toISOString(),
      coins: results,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to fetch signal data", details: message },
      { status: 500 }
    );
  }
}
