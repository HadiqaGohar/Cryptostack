export interface MockSignal {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
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
  indicators: { ema12: number; ema26: number; ema50: number; rsi: number };
  marketContext: { trend: string; trendStrength: string; volatility: string; volume: string };
  sparkline: number[];
}

export const MOCK_SIGNALS: MockSignal[] = [
  {
    symbol: "BTCUSDT",
    name: "Bitcoin",
    price: 84892.40,
    change24h: 2.15,
    decision: "LONG",
    strength: "Strong",
    riskLevel: "LOW",
    entryPrice: 84750.00,
    entryZone: { low: 84500, high: 85000 },
    stopLoss: 82800.00,
    takeProfit1: 86500.00,
    takeProfit2: 88000.00,
    takeProfit3: 91000.00,
    riskReward: "1:2.34",
    leverageRange: "1x-3x",
    reason: "Strong uptrend confirmed. Price above EMA50, momentum strong.",
    indicators: { ema12: 84700, ema26: 84200, ema50: 83500, rsi: 62.4 },
    marketContext: { trend: "UP", trendStrength: "STRONG", volatility: "NORMAL", volume: "HIGH" },
    sparkline: [45, 48, 50, 52, 49, 53, 56, 58, 60, 62, 65, 68, 70, 72, 75],
  },
  {
    symbol: "ETHUSDT",
    name: "Ethereum",
    price: 3421.50,
    change24h: -1.23,
    decision: "SHORT",
    strength: "Medium",
    riskLevel: "MEDIUM",
    entryPrice: 3430.00,
    entryZone: { low: 3400, high: 3460 },
    stopLoss: 3520.00,
    takeProfit1: 3320.00,
    takeProfit2: 3250.00,
    takeProfit3: 3100.00,
    riskReward: "1:1.87",
    leverageRange: "1x-2x",
    reason: "Price below EMA50, selling pressure increasing.",
    indicators: { ema12: 3410, ema26: 3450, ema50: 3480, rsi: 38.2 },
    marketContext: { trend: "DOWN", trendStrength: "WEAK", volatility: "NORMAL", volume: "NORMAL" },
    sparkline: [65, 63, 60, 58, 55, 52, 50, 48, 46, 44, 42, 40, 38, 36, 35],
  },
  {
    symbol: "SOLUSDT",
    name: "Solana",
    price: 178.25,
    change24h: 4.56,
    decision: "LONG",
    strength: "Strong",
    riskLevel: "LOW",
    entryPrice: 177.00,
    entryZone: { low: 176, high: 179 },
    stopLoss: 172.00,
    takeProfit1: 184.00,
    takeProfit2: 189.00,
    takeProfit3: 198.00,
    riskReward: "1:2.89",
    leverageRange: "1x-3x",
    reason: "Strong momentum. Price above all EMAs, RSI healthy.",
    indicators: { ema12: 177.5, ema26: 175.0, ema50: 172.0, rsi: 68.5 },
    marketContext: { trend: "UP", trendStrength: "STRONG", volatility: "HIGH", volume: "HIGH" },
    sparkline: [40, 42, 45, 48, 50, 53, 56, 60, 64, 68, 72, 76, 80, 82, 85],
  },
  {
    symbol: "XRPUSDT",
    name: "Ripple",
    price: 0.5234,
    change24h: -0.87,
    decision: "WAIT",
    strength: "Weak",
    riskLevel: "MEDIUM",
    entryPrice: 0.5240,
    entryZone: { low: 0.520, high: 0.528 },
    stopLoss: 0.510,
    takeProfit1: 0.540,
    takeProfit2: 0.555,
    takeProfit3: 0.580,
    riskReward: "1:1.14",
    leverageRange: "1x-1x",
    reason: "Mixed signals. Price near EMA50, no clear direction.",
    indicators: { ema12: 0.523, ema26: 0.525, ema50: 0.524, rsi: 51.3 },
    marketContext: { trend: "SIDEWAYS", trendStrength: "WEAK", volatility: "LOW", volume: "LOW" },
    sparkline: [50, 51, 49, 50, 51, 50, 49, 50, 51, 50, 49, 50, 51, 50, 50],
  },
  {
    symbol: "ADAUSDT",
    name: "Cardano",
    price: 0.4521,
    change24h: -2.34,
    decision: "SHORT",
    strength: "Medium",
    riskLevel: "MEDIUM",
    entryPrice: 0.4550,
    entryZone: { low: 0.450, high: 0.460 },
    stopLoss: 0.470,
    takeProfit1: 0.435,
    takeProfit2: 0.420,
    takeProfit3: 0.395,
    riskReward: "1:1.53",
    leverageRange: "1x-2x",
    reason: "Downtrend continuing. Price below EMA50, selling pressure.",
    indicators: { ema12: 0.453, ema26: 0.458, ema50: 0.462, rsi: 35.8 },
    marketContext: { trend: "DOWN", trendStrength: "STRONG", volatility: "NORMAL", volume: "NORMAL" },
    sparkline: [60, 58, 55, 52, 50, 48, 45, 43, 40, 38, 36, 34, 32, 30, 28],
  },
  {
    symbol: "DOGEUSDT",
    name: "Dogecoin",
    price: 0.1534,
    change24h: 5.67,
    decision: "LONG",
    strength: "Medium",
    riskLevel: "HIGH",
    entryPrice: 0.1520,
    entryZone: { low: 0.150, high: 0.155 },
    stopLoss: 0.145,
    takeProfit1: 0.162,
    takeProfit2: 0.170,
    takeProfit3: 0.185,
    riskReward: "1:1.93",
    leverageRange: "1x-2x",
    reason: "Momentum building. Price above EMA26, watch for confirmation.",
    indicators: { ema12: 0.153, ema26: 0.150, ema50: 0.148, rsi: 72.1 },
    marketContext: { trend: "UP", trendStrength: "WEAK", volatility: "HIGH", volume: "HIGH" },
    sparkline: [30, 32, 35, 38, 42, 45, 48, 52, 55, 60, 65, 70, 75, 78, 80],
  },
  {
    symbol: "LTCUSDT",
    name: "Litecoin",
    price: 85.42,
    change24h: 0.45,
    decision: "WAIT",
    strength: "Weak",
    riskLevel: "LOW",
    entryPrice: 85.30,
    entryZone: { low: 84.50, high: 86.00 },
    stopLoss: 83.00,
    takeProfit1: 87.50,
    takeProfit2: 89.00,
    takeProfit3: 92.00,
    riskReward: "1:0.96",
    leverageRange: "1x-1x",
    reason: "Consolidation phase. No clear trend, wait for breakout.",
    indicators: { ema12: 85.3, ema26: 85.1, ema50: 84.9, rsi: 50.2 },
    marketContext: { trend: "SIDEWAYS", trendStrength: "WEAK", volatility: "LOW", volume: "LOW" },
    sparkline: [50, 51, 49, 50, 51, 50, 49, 50, 51, 50, 49, 50, 51, 50, 50],
  },
  {
    symbol: "LINKUSDT",
    name: "Chainlink",
    price: 14.28,
    change24h: -1.56,
    decision: "SHORT",
    strength: "Weak",
    riskLevel: "MEDIUM",
    entryPrice: 14.40,
    entryZone: { low: 14.20, high: 14.60 },
    stopLoss: 15.00,
    takeProfit1: 13.60,
    takeProfit2: 13.00,
    takeProfit3: 12.00,
    riskReward: "1:1.33",
    leverageRange: "1x-1x",
    reason: "Weak downtrend. Price below EMAs but momentum fading.",
    indicators: { ema12: 14.3, ema26: 14.5, ema50: 14.7, rsi: 42.1 },
    marketContext: { trend: "DOWN", trendStrength: "WEAK", volatility: "NORMAL", volume: "LOW" },
    sparkline: [55, 53, 50, 48, 46, 44, 42, 40, 38, 37, 36, 35, 34, 33, 32],
  },
  {
    symbol: "AVAXUSDT",
    name: "Avalanche",
    price: 35.67,
    change24h: 3.21,
    decision: "LONG",
    strength: "Strong",
    riskLevel: "LOW",
    entryPrice: 35.40,
    entryZone: { low: 35.00, high: 35.80 },
    stopLoss: 34.00,
    takeProfit1: 37.50,
    takeProfit2: 39.00,
    takeProfit3: 42.00,
    riskReward: "1:2.57",
    leverageRange: "1x-3x",
    reason: "Strong breakout. Price above all EMAs, volume surging.",
    indicators: { ema12: 35.5, ema26: 34.8, ema50: 34.0, rsi: 65.8 },
    marketContext: { trend: "UP", trendStrength: "STRONG", volatility: "NORMAL", volume: "HIGH" },
    sparkline: [35, 37, 40, 42, 45, 48, 52, 55, 58, 62, 65, 68, 72, 75, 78],
  },
  {
    symbol: "BNBUSDT",
    name: "BNB",
    price: 610.50,
    change24h: -0.34,
    decision: "WAIT",
    strength: "Medium",
    riskLevel: "LOW",
    entryPrice: 611.00,
    entryZone: { low: 608.00, high: 614.00 },
    stopLoss: 600.00,
    takeProfit1: 622.00,
    takeProfit2: 630.00,
    takeProfit3: 645.00,
    riskReward: "1:1.00",
    leverageRange: "1x-1x",
    reason: "Consolidation near EMA50. Wait for clearer signal.",
    indicators: { ema12: 610.8, ema26: 611.2, ema50: 610.0, rsi: 49.8 },
    marketContext: { trend: "SIDEWAYS", trendStrength: "WEAK", volatility: "LOW", volume: "NORMAL" },
    sparkline: [50, 51, 50, 49, 50, 51, 50, 49, 50, 51, 50, 49, 50, 51, 50],
  },
];

export interface MockPool {
  id: string;
  name: string;
  symbol: string;
  description: string;
  traders: number;
  totalVolume: number;
  apy: number;
  risk: "Low" | "Medium" | "High";
  status: "Active" | "Full" | "Paused";
  minInvestment: number;
  dailyReturn: number;
}

export const MOCK_POOLS: MockPool[] = [
  {
    id: "pool-1",
    name: "Bitcoin Safety Pool",
    symbol: "BTCUSDT",
    description: "Low-risk BTC pool with steady returns. Best for beginners.",
    traders: 1247,
    totalVolume: 2450000,
    apy: 12.5,
    risk: "Low",
    status: "Active",
    minInvestment: 100,
    dailyReturn: 0.03,
  },
  {
    id: "pool-2",
    name: "Ethereum Growth Pool",
    symbol: "ETHUSDT",
    description: "Medium-risk ETH pool for consistent growth.",
    traders: 892,
    totalVolume: 1800000,
    apy: 18.5,
    risk: "Medium",
    status: "Active",
    minInvestment: 50,
    dailyReturn: 0.05,
  },
  {
    id: "pool-3",
    name: "Solana Momentum Pool",
    symbol: "SOLUSDT",
    description: "Higher risk, higher reward. For experienced traders.",
    traders: 456,
    totalVolume: 980000,
    apy: 28.0,
    risk: "High",
    status: "Active",
    minInvestment: 25,
    dailyReturn: 0.08,
  },
  {
    id: "pool-4",
    name: "Multi-Coin Balanced Pool",
    symbol: "MULTI",
    description: "Diversified across top 5 coins. Balanced risk.",
    traders: 2100,
    totalVolume: 5200000,
    apy: 15.0,
    risk: "Medium",
    status: "Active",
    minInvestment: 75,
    dailyReturn: 0.04,
  },
];

export interface FAQItem {
  question: string;
  answer: string;
}

export const MOCK_FAQ: FAQItem[] = [
  {
    question: "What is CryptoStack?",
    answer: "CryptoStack is a free AI-powered crypto signal platform. We analyze the market and give you trading signals — so you don't lose money. For real trading, use any live exchange.",
  },
  {
    question: "Is this real trading?",
    answer: "No. CryptoStack is for learning and signals only. We never touch your money. For actual trading, use platforms like Binance, Coinbase, or any exchange you trust.",
  },
  {
    question: "How do AI signals work?",
    answer: "Our AI analyzes price trends using technical indicators (EMA, RSI). It tells you when to BUY (LONG), SELL (SHORT), or WAIT. Signals are free — no subscription needed.",
  },
  {
    question: "Can I lose money here?",
    answer: "No. CryptoStack is completely free and does not handle any money. We only provide signals. If you trade on other platforms, always manage your risk carefully.",
  },
  {
    question: "What are Trading Pools?",
    answer: "Trading Pools let you join a group of traders. Together, you share strategies and returns. It's safer than trading alone — but remember, all trading has risk.",
  },
  {
    question: "How do I start?",
    answer: "Simply visit our AI Signals page, pick a coin, and follow the signals. No account needed, no fees, no risk. Just free AI-powered guidance.",
  },
];

export const COIN_NAMES: Record<string, string> = {
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
