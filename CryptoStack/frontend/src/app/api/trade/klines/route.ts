import { NextRequest, NextResponse } from "next/server";

const VALID_SYMBOLS = [
  "BTCUSDT", "ETHUSDT", "SOLUSDT", "XRPUSDT", "ADAUSDT",
  "DOGEUSDT", "LTCUSDT", "LINKUSDT", "AVAXUSDT", "BNBUSDT",
];

const VALID_INTERVALS = ["1m", "5m", "15m", "1h", "4h", "1d"];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol") || "BTCUSDT";
  const interval = searchParams.get("interval") || "1m";
  const limit = parseInt(searchParams.get("limit") || "100");

  if (!VALID_SYMBOLS.includes(symbol)) {
    return NextResponse.json({ error: "Invalid symbol" }, { status: 400 });
  }

  if (!VALID_INTERVALS.includes(interval)) {
    return NextResponse.json({ error: "Invalid interval" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${Math.min(limit, 500)}`,
      { next: { revalidate: 0 } }
    );

    if (!response.ok) {
      throw new Error(`Binance API error: ${response.status}`);
    }

    const data = await response.json();

    const klines = data.map((kline: any[]) => ({
      time: Math.floor(kline[0] / 1000),
      open: parseFloat(kline[1]),
      high: parseFloat(kline[2]),
      low: parseFloat(kline[3]),
      close: parseFloat(kline[4]),
      volume: parseFloat(kline[5]),
    }));

    return NextResponse.json({
      symbol,
      interval,
      klines,
      timestamp: Date.now(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch kline data" },
      { status: 500 }
    );
  }
}
