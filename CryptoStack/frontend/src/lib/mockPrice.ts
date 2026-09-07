import { MOCK_SIGNALS, MockSignal } from "./mockData";

// Store current simulated prices
const currentPrices: Map<string, number> = new Map();

// Initialize prices from mock data
MOCK_SIGNALS.forEach(signal => {
  currentPrices.set(signal.symbol, signal.price);
});

/**
 * Get current simulated price for a symbol
 */
export function getCurrentPrice(symbol: string): number {
  return currentPrices.get(symbol) || 0;
}

/**
 * Simulate a small price change (±0.1%)
 */
export function simulatePriceChange(basePrice: number): number {
  const change = (Math.random() - 0.5) * 0.002;
  return basePrice * (1 + change);
}

/**
 * Update all prices by small random amounts
 */
export function updateAllPrices(): Map<string, number> {
  currentPrices.forEach((price, symbol) => {
    currentPrices.set(symbol, simulatePriceChange(price));
  });
  return new Map(currentPrices);
}

/**
 * Get price stream for a specific symbol
 * Returns a function to stop the stream
 */
export function createPriceStream(
  symbol: string,
  callback: (price: number) => void,
  intervalMs: number = 3000
): () => void {
  let currentPrice = getCurrentPrice(symbol);
  
  const timer = setInterval(() => {
    currentPrice = simulatePriceChange(currentPrice);
    currentPrices.set(symbol, currentPrice);
    callback(currentPrice);
  }, intervalMs);
  
  return () => clearInterval(timer);
}

/**
 * Get all current prices
 */
export function getAllPrices(): Map<string, number> {
  return new Map(currentPrices);
}

/**
 * Get formatted price with proper decimals
 */
export function formatPrice(price: number, symbol: string): string {
  if (price >= 1000) {
    return price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  } else if (price >= 1) {
    return price.toFixed(2);
  } else {
    return price.toFixed(4);
  }
}

/**
 * Format change percentage
 */
export function formatChange(change: number): string {
  const sign = change >= 0 ? "+" : "";
  return `${sign}${change.toFixed(2)}%`;
}
