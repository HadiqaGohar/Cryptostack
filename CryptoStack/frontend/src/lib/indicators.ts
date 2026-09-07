export interface SignalResult {
  symbol: string;
  decision: "LONG" | "SHORT" | "WAIT";
  strength: "Strong" | "Medium" | "Weak";
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  entryPrice: number;
  entryZone: { low: number; high: number };
  stopLoss: number;
  takeProfit1: number;
  takeProfit2: number;
  takeProfit3: number;
  riskReward: string;
  leverageRange: string;
  reason: string;
  indicators: {
    ema12: number;
    ema26: number;
    ema50: number;
    rsi: number;
  };
  marketContext: {
    trend: "UP" | "DOWN" | "SIDEWAYS";
    trendStrength: "STRONG" | "WEAK";
    volatility: "LOW" | "NORMAL" | "HIGH";
    volume: "LOW" | "NORMAL" | "HIGH";
  };
}

export function calculateEMA(prices: number[], period: number): number[] {
  if (prices.length === 0) return [];
  if (prices.length < period) return [];

  const emaValues: number[] = [];
  const multiplier = 2 / (period + 1);

  // First EMA = SMA of first `period` prices
  let sum = 0;
  for (let i = 0; i < period; i++) {
    sum += prices[i];
  }
  let prevEma = sum / period;
  emaValues.push(prevEma);

  for (let i = period; i < prices.length; i++) {
    const ema = (prices[i] - prevEma) * multiplier + prevEma;
    emaValues.push(ema);
    prevEma = ema;
  }

  return emaValues;
}

export function calculateSMA(prices: number[], period: number): number[] {
  if (prices.length === 0) return [];
  if (prices.length < period) return [];

  const smaValues: number[] = [];

  for (let i = period - 1; i < prices.length; i++) {
    let sum = 0;
    for (let j = i - period + 1; j <= i; j++) {
      sum += prices[j];
    }
    smaValues.push(sum / period);
  }

  return smaValues;
}

export function calculateRSI(prices: number[], period: number = 14): number[] {
  if (prices.length < period + 1) return [];

  const rsiValues: number[] = [];
  const gains: number[] = [];
  const losses: number[] = [];

  // Calculate price changes
  for (let i = 1; i < prices.length; i++) {
    const change = prices[i] - prices[i - 1];
    gains.push(change > 0 ? change : 0);
    losses.push(change < 0 ? Math.abs(change) : 0);
  }

  // Initial average gain/loss (simple average of first `period` changes)
  let avgGain = 0;
  let avgLoss = 0;
  for (let i = 0; i < period; i++) {
    avgGain += gains[i];
    avgLoss += losses[i];
  }
  avgGain /= period;
  avgLoss /= period;

  // First RSI
  if (avgLoss === 0) {
    rsiValues.push(100);
  } else {
    const rs = avgGain / avgLoss;
    rsiValues.push(100 - 100 / (1 + rs));
  }

  // Subsequent RSI values using Wilder's smoothing
  for (let i = period; i < gains.length; i++) {
    avgGain = (avgGain * (period - 1) + gains[i]) / period;
    avgLoss = (avgLoss * (period - 1) + losses[i]) / period;

    if (avgLoss === 0) {
      rsiValues.push(100);
    } else {
      const rs = avgGain / avgLoss;
      rsiValues.push(100 - 100 / (1 + rs));
    }
  }

  return rsiValues;
}

export function calculateSparkline(closes: number[], points: number = 20): number[] {
  if (closes.length === 0) return [];

  const data = closes.slice(-points);
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;

  if (range === 0) return data.map(() => 50);

  return data.map((value) => ((value - min) / range) * 100);
}

export function calculateSignal(
  symbol: string,
  closes: number[],
  highs: number[],
  lows: number[],
  volumes: number[]
): SignalResult {
  const ema12Values = calculateEMA(closes, 12);
  const ema26Values = calculateEMA(closes, 26);
  const ema50Values = calculateEMA(closes, 50);
  const rsiValues = calculateRSI(closes, 14);

  // Get aligned values (last valid indices)
  const ema12 = ema12Values[ema12Values.length - 1] || closes[closes.length - 1];
  const ema26 = ema26Values[ema26Values.length - 1] || closes[closes.length - 1];
  const ema50 = ema50Values[ema50Values.length - 1] || closes[closes.length - 1];
  const rsi = rsiValues[rsiValues.length - 1] || 50;

  const currentPrice = closes[closes.length - 1];
  const last10Highs = highs.slice(-10);
  const last10Lows = lows.slice(-10);

  // --- Decision ---
  let decision: "LONG" | "SHORT" | "WAIT";
  if (currentPrice > ema50 && ema12 > ema26) {
    decision = "LONG";
  } else if (currentPrice < ema50 && ema12 < ema26) {
    decision = "SHORT";
  } else {
    decision = "WAIT";
  }

  // --- Strength ---
  const gap = Math.abs(ema12 - ema26) / ema26 * 100;
  const rsiNotExtreme = rsi >= 30 && rsi <= 70;
  let strength: "Strong" | "Medium" | "Weak";
  if (gap > 2 && rsiNotExtreme) {
    strength = "Strong";
  } else if (gap > 0.5) {
    strength = "Medium";
  } else {
    strength = "Weak";
  }

  // --- Volatility (average candle range as %) ---
  const ranges: number[] = [];
  for (let i = 0; i < highs.length; i++) {
    ranges.push((highs[i] - lows[i]) / closes[i] * 100);
  }
  const avgVolatility = ranges.length > 0
    ? ranges.slice(-10).reduce((a, b) => a + b, 0) / Math.min(10, ranges.length)
    : 0;

  // --- Risk Level ---
  let riskLevel: "LOW" | "MEDIUM" | "HIGH";
  if (rsi > 70 || rsi < 30) {
    riskLevel = "HIGH";
  } else if (avgVolatility > 3) {
    riskLevel = "MEDIUM";
  } else {
    riskLevel = "LOW";
  }

  // --- Entry Price & Zone ---
  const entryPrice = currentPrice;
  const entryZone = {
    low: entryPrice * 0.997,
    high: entryPrice * 1.003,
  };

  // --- Stop Loss ---
  let stopLoss: number;
  if (decision === "LONG") {
    stopLoss = Math.min(...last10Lows);
  } else if (decision === "SHORT") {
    stopLoss = Math.max(...last10Highs);
  } else {
    stopLoss = entryPrice * 0.98;
  }

  // --- Take Profits ---
  let takeProfit1: number;
  let takeProfit2: number;
  let takeProfit3: number;
  const risk = Math.abs(entryPrice - stopLoss);

  if (decision === "LONG") {
    takeProfit1 = entryPrice + risk * 1.5;
    takeProfit2 = entryPrice + risk * 2.0;
    takeProfit3 = entryPrice + risk * 3.0;
  } else if (decision === "SHORT") {
    takeProfit1 = entryPrice - risk * 1.5;
    takeProfit2 = entryPrice - risk * 2.0;
    takeProfit3 = entryPrice - risk * 3.0;
  } else {
    takeProfit1 = entryPrice + risk * 1.5;
    takeProfit2 = entryPrice + risk * 2.0;
    takeProfit3 = entryPrice + risk * 3.0;
  }

  // --- Risk/Reward ---
  const reward = Math.abs(takeProfit1 - entryPrice);
  const rr = risk > 0 ? reward / risk : 1;
  const riskReward = `1:${rr.toFixed(2)}`;

  // --- Leverage ---
  let leverageRange: string;
  if (strength === "Strong" && riskLevel === "LOW") {
    leverageRange = "1x-3x";
  } else if (strength === "Medium" && (riskLevel === "LOW" || riskLevel === "MEDIUM")) {
    leverageRange = "1x-2x";
  } else {
    leverageRange = "1x-1x";
  }

  // --- Reason ---
  let reason: string;
  if (decision === "LONG") {
    if (strength === "Strong") {
      reason = "Trend and momentum confirmed - bullish alignment across multiple indicators";
    } else if (strength === "Medium") {
      reason = "Moderate bullish signals with EMA crossover supporting upward move";
    } else {
      reason = "Weak bullish bias - limited momentum confirmation";
    }
  } else if (decision === "SHORT") {
    if (strength === "Strong") {
      reason = "Trend and momentum confirmed - bearish alignment across multiple indicators";
    } else if (strength === "Medium") {
      reason = "Moderate bearish signals with EMA crossover supporting downward move";
    } else {
      reason = "Weak bearish bias - limited momentum confirmation";
    }
  } else {
    reason = "Mixed signals - no clear direction. Wait for confirmation.";
  }

  // --- Market Context ---
  // Trend based on EMA50 slope over last 10 candles
  const ema50Sliced = ema50Values.slice(-10);
  let trend: "UP" | "DOWN" | "SIDEWAYS";
  let trendStrength: "STRONG" | "WEAK";
  if (ema50Sliced.length >= 2) {
    const trendChange = (ema50Sliced[ema50Sliced.length - 1] - ema50Sliced[0]) / ema50Sliced[0] * 100;
    if (trendChange > 0.5) {
      trend = "UP";
      trendStrength = trendChange > 1.5 ? "STRONG" : "WEAK";
    } else if (trendChange < -0.5) {
      trend = "DOWN";
      trendStrength = trendChange < -1.5 ? "STRONG" : "WEAK";
    } else {
      trend = "SIDEWAYS";
      trendStrength = "WEAK";
    }
  } else {
    trend = "SIDEWAYS";
    trendStrength = "WEAK";
  }

  // Volatility
  let volatility: "LOW" | "NORMAL" | "HIGH";
  if (avgVolatility > 4) {
    volatility = "HIGH";
  } else if (avgVolatility > 2) {
    volatility = "NORMAL";
  } else {
    volatility = "LOW";
  }

  // Volume
  const avgVolume = volumes.length > 0
    ? volumes.slice(-20).reduce((a, b) => a + b, 0) / Math.min(20, volumes.length)
    : 0;
  const recentVolume = volumes.length > 0 ? volumes[volumes.length - 1] : 0;
  let volumeContext: "LOW" | "NORMAL" | "HIGH";
  if (avgVolume > 0 && recentVolume > avgVolume * 1.5) {
    volumeContext = "HIGH";
  } else if (avgVolume > 0 && recentVolume < avgVolume * 0.5) {
    volumeContext = "LOW";
  } else {
    volumeContext = "NORMAL";
  }

  return {
    symbol,
    decision,
    strength,
    riskLevel,
    entryPrice,
    entryZone,
    stopLoss,
    takeProfit1,
    takeProfit2,
    takeProfit3,
    riskReward,
    leverageRange,
    reason,
    indicators: {
      ema12,
      ema26,
      ema50,
      rsi,
    },
    marketContext: {
      trend,
      trendStrength,
      volatility,
      volume: volumeContext,
    },
  };
}
