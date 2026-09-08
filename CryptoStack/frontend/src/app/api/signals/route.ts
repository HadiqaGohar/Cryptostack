import { NextRequest, NextResponse } from "next/server";

// Python backend URL — set SIGNALS_API_URL env var in Vercel
// For local dev: http://localhost:8000
// For production: your Render/Railway URL
const PYTHON_BACKEND_URL = process.env.SIGNALS_API_URL || "http://localhost:8000";

// Gate.io Futures API (works globally, no geo-restrictions)
const GATE_FUTURES = "https://api.gateio.ws/api/v4/futures/usdt";

const TOP_25 = [
  "BTCUSDT", "ETHUSDT", "SOLUSDT", "BNBUSDT", "XRPUSDT",
  "DOGEUSDT", "ADAUSDT", "AVAXUSDT", "LINKUSDT", "DOTUSDT",
  "POLUSDT", "UNIUSDT", "LTCUSDT", "ATOMUSDT", "NEARUSDT",
  "APTUSDT", "ARBUSDT", "OPUSDT", "SUIUSDT", "INJUSDT",
  "FILUSDT", "RENDERUSDT", "SEIUSDT", "TIAUSDT", "WLDUSDT",
];

function toGateSymbol(symbol: string): string {
  return symbol.replace("USDT", "_USDT");
}

// ─── Indicator Calculations (inlined for fallback) ──────────────────────────
function ema(data: number[], period: number): number[] {
  if (data.length < period) return data.map(() => 0);
  const mult = 2 / (period + 1);
  const result: number[] = new Array(period - 1).fill(0);
  let emaVal = data.slice(0, period).reduce((a, b) => a + b, 0) / period;
  result.push(emaVal);
  for (let i = period; i < data.length; i++) {
    emaVal = (data[i] - emaVal) * mult + emaVal;
    result.push(emaVal);
  }
  return result;
}

function rsi(closes: number[], period = 14): number {
  if (closes.length < period + 1) return 50;
  const gains: number[] = [];
  const losses: number[] = [];
  for (let i = 1; i < closes.length; i++) {
    const change = closes[i] - closes[i - 1];
    gains.push(Math.max(change, 0));
    losses.push(Math.max(-change, 0));
  }
  if (gains.length < period) return 50;
  let avgGain = gains.slice(0, period).reduce((a, b) => a + b, 0) / period;
  let avgLoss = losses.slice(0, period).reduce((a, b) => a + b, 0) / period;
  for (let i = period; i < gains.length; i++) {
    avgGain = (avgGain * (period - 1) + gains[i]) / period;
    avgLoss = (avgLoss * (period - 1) + losses[i]) / period;
  }
  if (avgLoss === 0) return 100;
  const rs = avgGain / avgLoss;
  return 100 - 100 / (1 + rs);
}

function atr(highs: number[], lows: number[], closes: number[], period = 14): number {
  if (closes.length < 2) return 0;
  const trs: number[] = [];
  for (let i = 1; i < closes.length; i++) {
    trs.push(Math.max(highs[i] - lows[i], Math.abs(highs[i] - closes[i - 1]), Math.abs(lows[i] - closes[i - 1])));
  }
  if (trs.length < period) return trs.reduce((a, b) => a + b, 0) / trs.length;
  let atrVal = trs.slice(0, period).reduce((a, b) => a + b, 0) / period;
  for (let i = period; i < trs.length; i++) {
    atrVal = (atrVal * (period - 1) + trs[i]) / period;
  }
  return atrVal;
}

function formatSym(symbol: string): string {
  return symbol.endsWith("USDT") ? symbol.slice(0, -4) + "/USDT" : symbol;
}

function fp(price: number): number {
  if (price >= 100) return Math.round(price * 100) / 100;
  if (price >= 1) return Math.round(price * 10000) / 10000;
  if (price >= 0.01) return Math.round(price * 1000000) / 1000000;
  return Math.round(price * 100000000) / 100000000;
}

// ─── Direct Gate.io Futures Fetch (Fallback) ────────────────────────────────
async function fetchFromGate(interval: string) {
  const now = new Date().toISOString();
  const signals = [];

  for (const symbol of TOP_25) {
    try {
      const gateSym = toGateSymbol(symbol);

      const [tickersRes, klinesRes, contractRes] = await Promise.all([
        fetch(`${GATE_FUTURES}/tickers?contract=${gateSym}`),
        fetch(`${GATE_FUTURES}/candlesticks?contract=${gateSym}&interval=${interval}&limit=100`),
        fetch(`${GATE_FUTURES}/contracts/${gateSym}`),
      ]);

      const tickersData = await tickersRes.json();
      const klinesData = await klinesRes.json();
      const contractData = await contractRes.json();

      const ticker = Array.isArray(tickersData) ? tickersData[0] : null;
      const klines = Array.isArray(klinesData) ? klinesData : [];

      if (!ticker || !klines.length || klines.length < 50) continue;

      // Gate.io klines: {o, h, l, c, v, t, sum}
      const closes = klines.map((k: any) => parseFloat(k.c));
      const highs = klines.map((k: any) => parseFloat(k.h));
      const lows = klines.map((k: any) => parseFloat(k.l));
      const volumes = klines.map((k: any) => parseFloat(k.v));

      const currentPrice = parseFloat(ticker.last || "0");
      if (currentPrice === 0) continue;

      const ema12 = ema(closes, 12);
      const ema26 = ema(closes, 26);
      const ema50 = ema(closes, 50);
      const rsiVal = rsi(closes, 14);
      const atrVal = atr(highs, lows, closes, 14);
      const atrPct = (atrVal / currentPrice) * 100;
      const volAvg = volumes.slice(-20).reduce((a, b) => a + b, 0) / 20;
      const fundingRate = parseFloat(ticker.funding_rate_indicative || contractData.funding_rate || "0");
      const fundingBps = Math.round(fundingRate * 10000 * 100) / 100;
      const oiVal = parseFloat(contractData.position_size || "0");

      // Trend
      let direction = "Sideways";
      let trendScore = 0;
      if (ema12[ema12.length - 1] > ema26[ema26.length - 1] && ema26[ema26.length - 1] > ema50[ema50.length - 1] && currentPrice > ema50[ema50.length - 1]) {
        direction = "Bullish";
        trendScore = currentPrice > ema12[ema12.length - 1] ? 50 : 35;
      } else if (ema12[ema12.length - 1] < ema26[ema26.length - 1] && ema26[ema26.length - 1] < ema50[ema50.length - 1] && currentPrice < ema50[ema50.length - 1]) {
        direction = "Bearish";
        trendScore = currentPrice < ema12[ema12.length - 1] ? 50 : 35;
      }

      // RSI score
      let rsiScore = 0;
      if (rsiVal >= 40 && rsiVal <= 60) rsiScore = 20;
      else if (rsiVal > 60 && rsiVal <= 70) rsiScore = 15;
      else if (rsiVal >= 30 && rsiVal < 40) rsiScore = 15;
      else rsiScore = -5;

      // Volume score
      const volRatio = volumes[volumes.length - 1] / volAvg;
      const volScore = volRatio >= 1.5 ? 20 : volRatio >= 1 ? 10 : volRatio >= 0.7 ? 5 : -5;

      // Volatility score
      const volatScore = atrPct >= 1 && atrPct <= 3 ? 15 : atrPct < 1 ? 5 : atrPct <= 5 ? 5 : -10;

      const totalScore = Math.max(0, Math.min(100, trendScore + rsiScore + volScore + volatScore));

      let decision: "LONG" | "SHORT" | "WAIT";
      let strength: "Strong" | "Medium" | "Weak";

      if (totalScore >= 65) { decision = direction === "Bullish" ? "LONG" : "SHORT"; strength = "Strong"; }
      else if (totalScore >= 45) { decision = direction === "Bullish" ? "LONG" : "SHORT"; strength = "Medium"; }
      else if (totalScore >= 25) { decision = direction === "Bullish" ? "LONG" : "SHORT"; strength = "Weak"; }
      else { decision = "WAIT"; strength = "Weak"; }

      const riskLevel = atrPct > 4 ? "High" : atrPct > 2.5 ? "Medium" : "Low";

      let entry = currentPrice;
      let sl = 0, tp1 = 0, tp2 = 0, tp3 = 0;
      let rr = 0;

      if (decision !== "WAIT") {
        if (decision === "LONG") {
          sl = fp(entry - atrVal * 1.5);
          tp1 = fp(entry + atrVal * 2);
          tp2 = fp(entry + atrVal * 3);
          tp3 = fp(entry + atrVal * 5);
        } else {
          sl = fp(entry + atrVal * 1.5);
          tp1 = fp(entry - atrVal * 2);
          tp2 = fp(entry - atrVal * 3);
          tp3 = fp(entry - atrVal * 5);
        }
        const risk = Math.abs(entry - sl);
        const reward = Math.abs(tp1 - entry);
        rr = risk > 0 ? Math.round(reward / risk * 10) / 10 : 0;
      }

      const volBucket = atrPct < 1 ? "Low" : atrPct <= 3 ? "Normal" : "High";
      const volState = volRatio < 0.7 ? "Low" : volRatio <= 1.5 ? "Normal" : "High";

      let reason = "Waiting for confirmation";
      if (decision !== "WAIT") {
        if (trendScore >= 40) reason = `Strong ${direction.toLowerCase()} alignment, RSI healthy, volume confirms`;
        else if (trendScore >= 25) reason = `Trend ${direction.toLowerCase()}, momentum confirmed`;
        else reason = `${direction === "Bullish" ? "Bullish" : "Bearish"} setup confirmed`;
      }

      signals.push({
        symbol,
        name: formatSym(symbol),
        price: fp(currentPrice),
        change24h: Math.round(parseFloat(ticker.change_percentage || "0") * 100) / 100,
        decision,
        strength,
        riskLevel,
        entryPrice: fp(entry),
        entryZone: { low: fp(entry - atrVal * 0.3), high: fp(entry + atrVal * 0.3) },
        stopLoss: sl,
        takeProfit1: tp1,
        takeProfit2: tp2,
        takeProfit3: tp3,
        riskReward: rr,
        leverageRange: riskLevel === "Low" ? "5-15x" : riskLevel === "Medium" ? "3-10x" : "2-5x",
        marketContext: {
          trend: direction,
          trendStrength: trendScore >= 40 ? "Strong" : trendScore >= 25 ? "Moderate" : "Weak",
          higherTimeframe: "N/A",
          volatility: volBucket,
          volume: volState,
          funding: `${fundingBps} bps`,
          openInterest: oiVal > 0 ? oiVal.toLocaleString() : "N/A",
        },
        reason,
        signalTime: now,
        score: totalScore,
        sparkline: closes.slice(-20),
      });
    } catch (err) {
      console.error(`Error fetching ${symbol}:`, err);
    }
  }

  // Sort: Strong → Medium → Weak, LONG → SHORT → WAIT
  const dp: Record<string, number> = { LONG: 0, SHORT: 1, WAIT: 2 };
  const sp: Record<string, number> = { Strong: 0, Medium: 1, Weak: 2 };
  signals.sort((a, b) => (dp[a.decision] ?? 3) - (dp[b.decision] ?? 3) || (sp[a.strength] ?? 3) - (sp[b.strength] ?? 3));

  return { interval, lastUpdated: now, status: "updated", count: signals.length, signals };
}

// ─── API Route ──────────────────────────────────────────────────────────────
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const interval = searchParams.get("interval") || "1h";

  // Try Python backend first
  try {
    const res = await fetch(`${PYTHON_BACKEND_URL}/signals?interval=${interval}`, {
      signal: AbortSignal.timeout(5000),
    });
    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    }
  } catch {
    console.log("Python backend unavailable, falling back to direct Gate.io fetch");
  }

  // Fallback: fetch directly from Gate.io Futures (no geo-restrictions)
  try {
    const data = await fetchFromGate(interval);
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch signals", signals: [], count: 0 },
      { status: 500 }
    );
  }
}
