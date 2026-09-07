import { NextRequest, NextResponse } from "next/server";

const VALID_SYMBOLS = [
  "BTCUSDT", "ETHUSDT", "SOLUSDT", "XRPUSDT", "ADAUSDT",
  "DOGEUSDT", "LTCUSDT", "LINKUSDT", "AVAXUSDT", "BNBUSDT",
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol") || "BTCUSDT";

  if (!VALID_SYMBOLS.includes(symbol)) {
    return NextResponse.json({ error: "Invalid symbol" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`,
      { next: { revalidate: 0 } }
    );

    if (!response.ok) {
      throw new Error(`Binance API error: ${response.status}`);
    }

    const data = await response.json();

    const statsResponse = await fetch(
      `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`,
      { next: { revalidate: 0 } }
    );

    const stats = await statsResponse.json();

    return NextResponse.json({
      symbol,
      price: parseFloat(data.price),
      highPrice: parseFloat(stats.highPrice),
      lowPrice: parseFloat(stats.lowPrice),
      priceChangePercent: parseFloat(stats.priceChangePercent),
      volume: parseFloat(stats.volume),
      timestamp: Date.now(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch price data" },
      { status: 500 }
    );
  }
}
