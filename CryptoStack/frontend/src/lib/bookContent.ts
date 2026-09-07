export interface BookPage {
  slug: string;
  title: string;
  content: string;
}

export interface BookChapter {
  id: string;
  title: string;
  icon: string;
  pages: BookPage[];
}

export const BOOK_CHAPTERS: BookChapter[] = [
  // ============================================
  // CHAPTER 1 — Getting Started
  // ============================================
  {
    id: "getting-started",
    title: "Getting Started",
    icon: "🚀",
    pages: [
      {
        slug: "what-is-crypto-trading",
        title: "What is Crypto Trading?",
        content: `# What is Crypto Trading?

Buying and selling digital currencies (like Bitcoin, Ethereum) to make a profit from price changes.

## The Idea

Crypto trading means you buy a coin when you think the price will go up, and sell it when it goes up — or you sell first (short) when you think the price will drop, then buy it back cheaper.

**Real example:** You buy 0.1 BTC at $78,000. Price goes to $82,000. You sell. You made $400 profit (minus fees).

## How It Works

1. **Choose a coin** — BTC, ETH, SOL, etc.
2. **Pick a direction** — Long (buy, hope price rises) or Short (sell, hope price drops)
3. **Set your risk** — Always use a Stop Loss (more on this in Risk Management)
4. **Execute the trade** — On an exchange like Binance, Coinbase, etc.

## Common Mistake

Beginners often buy because "everyone says Bitcoin will moon." That's not a strategy — that's gambling. Always have a reason for every trade.

## Related Pages
- [Long vs Short](/book/getting-started/long-vs-short)
- [How Exchanges Work](/book/getting-started/how-exchanges-work)`,
      },
      {
        slug: "long-vs-short",
        title: "Long vs Short",
        content: `# Long vs Short

**Long** = buy, profit if price goes UP. **Short** = sell first, profit if price goes DOWN.

## The Idea

- **Long (Buy):** You buy Bitcoin at $78,000, price goes to $82,000, you sell → profit $4,000
- **Short (Sell):** You sell Bitcoin at $78,000, price drops to $74,000, you buy back → profit $4,000

## Example

| Direction | Entry | Exit | Profit |
|-----------|-------|------|--------|
| Long | $78,000 | $82,000 | +$4,000 |
| Long | $78,000 | $74,000 | -$4,000 (loss) |
| Short | $78,000 | $74,000 | +$4,000 |
| Short | $78,000 | $82,000 | -$4,000 (loss) |

## Common Mistake

Beginners only go long because "prices always go up." They don't. In 2022, Bitcoin dropped 77%. Knowing how to short (or stay out) saves money.

## Related Pages
- [Risk Management](/book/risk-management/why-stop-loss-matters)
- [What is a Trading Signal](/book/signals-and-strategy/what-is-a-trading-signal)`,
      },
      {
        slug: "spot-vs-futures",
        title: "Spot vs Futures",
        content: `# Spot vs Futures

**Spot** = buy the actual coin. **Futures** = bet on the price without owning the coin.

## The Idea

- **Spot Trading:** You buy 1 BTC. You own 1 BTC. It sits in your wallet.
- **Futures Trading:** You open a contract saying "I think BTC will go up." You don't own BTC, but you profit if you're right. You can also use leverage (borrow money to trade bigger).

## Example

With $1,000:
- **Spot:** Buy $1,000 of ETH. If ETH goes up 10%, you have $1,100.
- **Futures (10x leverage):** Control $10,000 of ETH. If ETH goes up 10%, you make $1,000 (100% return). If ETH goes down 10%, you lose $1,000 (100% loss — liquidated).

## Common Mistake

Beginners love leverage because "more money = more profit." But leverage multiplies LOSSES too. Start with spot trading. Learn futures much later.

## Related Pages
- [Leverage Explained](/book/risk-management/leverage-explained)
- [Why Stop Loss Matters](/book/risk-management/why-stop-loss-matters)`,
      },
      {
        slug: "how-exchanges-work",
        title: "How Exchanges Work",
        content: `# How Exchanges Work

Exchanges are marketplaces where buyers and sellers meet. They match your order with someone else's.

## The Idea

When you click "Buy BTC" on Binance:
1. Your order goes into the order book
2. The exchange finds a seller at your price
3. Trade executes — you get BTC, they get USDT
4. Exchange takes a small fee (0.1% typically)

## Types of Exchanges

| Type | Example | How it works |
|------|---------|--------------|
| **Centralized (CEX)** | Binance, Coinbase | Company runs it, holds your money |
| **Decentralized (DEX)** | Uniswap, PancakeSwap | No company, smart contracts run it |

## Common Mistake

Keeping all your money on an exchange. If the exchange gets hacked or shuts down, your money is gone. Move profits to your own wallet.

## Related Pages
- [Spot vs Futures](/book/getting-started/spot-vs-futures)
- [Position Sizing](/book/risk-management/position-sizing)`,
      },
    ],
  },

  // ============================================
  // CHAPTER 2 — Reading a Chart
  // ============================================
  {
    id: "reading-a-chart",
    title: "Reading a Chart",
    icon: "📈",
    pages: [
      {
        slug: "what-is-a-candlestick",
        title: "What is a Candlestick?",
        content: `# What is a Candlestick

A candlestick shows 4 prices in one bar: Open, High, Low, Close (OHLC).

## The Idea

Each candle tells you what happened during a time period:
- **Open:** Price at the start
- **High:** Highest price reached
- **Low:** Lowest price reached
- **Close:** Price at the end

**Green candle:** Close > Open (price went UP)
**Red candle:** Close < Open (price went DOWN)

## Example

Bitcoin 1-hour candle:
- Open: $78,000
- High: $78,500
- Low: $77,800
- Close: $78,300

This candle is GREEN because $78,300 > $78,000.

## Common Mistake

Only looking at the close price. The wicks (shadows) tell you about rejection and volatility. A long lower wick means buyers stepped in aggressively.

## Related Pages
- [Candlestick Patterns](/patterns)
- [Timeframes Explained](/book/reading-a-chart/timeframes-explained)`,
      },
      {
        slug: "timeframes-explained",
        title: "Timeframes Explained",
        content: `# Timeframes Explained

Each candle represents a time period: 1 minute, 5 minutes, 1 hour, 1 day, etc.

## The Idea

- **1m chart:** Each candle = 1 minute. Very noisy, used by scalpers.
- **15m chart:** Each candle = 15 minutes. Good for short-term trades.
- **1h chart:** Each candle = 1 hour. Balanced view.
- **4h chart:** Each candle = 4 hours. Swing trading.
- **1D chart:** Each candle = 1 day. Long-term trends.

## Example

On a 15m chart, BTC shows a bullish engulfing pattern. On the 1D chart, BTC is in a strong downtrend. The 15m signal might fail because the bigger trend is against it.

## Common Mistake

Trading on low timeframes (1m, 5m) as a beginner. The noise and fees eat your profits. Start with 1h or 4h charts.

## Related Pages
- [Trend vs Range](/book/reading-a-chart/trend-vs-range)
- [Support and Resistance](/book/reading-a-chart/support-and-resistance)`,
      },
      {
        slug: "trend-vs-range",
        title: "Trend vs Range",
        content: `# Trend vs Range

**Trend** = price moving in one direction. **Range** = price bouncing between levels.

## The Idea

- **Uptrend:** Higher highs, higher lows. Price making stairs going up.
- **Downtrend:** Lower highs, lower lows. Price making stairs going down.
- **Range:** Price bouncing between a support (floor) and resistance (ceiling).

## Example

BTC at $78,000:
- Hits $82,000, drops to $76,000
- Hits $81,000, drops to $75,000
- Lower highs = downtrend

## Common Mistake

Trading against the trend. "The trend is your friend" is cliché because it's true. If BTC is dropping, don't try to catch the bottom — wait for confirmation.

## Related Pages
- [Support and Resistance](/book/reading-a-chart/support-and-resistance)
- [Volume Basics](/book/reading-a-chart/volume-basics)`,
      },
      {
        slug: "support-and-resistance",
        title: "Support and Resistance",
        content: `# Support and Resistance

**Support** = price level where buyers step in (floor). **Resistance** = where sellers step in (ceiling).

## The Idea

Prices don't move randomly. They bounce off "invisible walls" where lots of orders are sitting.

- **Support:** Price drops to $75,000 and bounces back up multiple times. $75K is support.
- **Resistance:** Price rises to $82,000 and drops back multiple times. $82K is resistance.

## Example

BTC trades between $75,000 (support) and $82,000 (resistance) for 2 weeks. You buy near $75K, sell near $82K. Simple range trading.

## Common Mistake

Assuming support/resistance are exact lines. They're zones. BTC might bounce at $74,800 or $75,300 — both are "at support."

## Related Pages
- [Trend vs Range](/book/reading-a-chart/trend-vs-range)
- [Risk/Reward Ratio](/book/risk-management/risk-reward-ratio)`,
      },
      {
        slug: "volume-basics",
        title: "Volume Basics",
        content: `# Volume Basics

Volume = how much was traded. High volume = strong move. Low volume = weak move.

## The Idea

Volume confirms price action:
- Price going UP on HIGH volume = strong bullish move
- Price going UP on LOW volume = weak move, might reverse
- Price going DOWN on HIGH volume = strong bearish move

## Example

BTC jumps from $78,000 to $80,000 in 1 hour with massive volume. That's real buying pressure. But if it jumps on tiny volume, it might be a fakeout.

## Common Mistake

Ignoring volume. A breakout on low volume is often a trap. Wait for volume confirmation before entering.

## Related Pages
- [What is a Candlestick](/book/reading-a-chart/what-is-a-candlestick)
- [RSI Explained](/book/indicators/rsi-explained)`,
      },
    ],
  },

  // ============================================
  // CHAPTER 3 — Candlestick Patterns
  // ============================================
  {
    id: "candlestick-patterns",
    title: "Candlestick Patterns",
    icon: "🕯️",
    pages: [
      {
        slug: "beginner-patterns",
        title: "Beginner Patterns",
        content: `# Beginner Patterns (Single Candle)

11 patterns you can spot by looking at just ONE candle.

## Key Patterns

| Pattern | What it looks like | Signal |
|---------|-------------------|--------|
| **Doji** | Tiny body, wicks both sides | Indecision — wait |
| **Hammer** | Small body top, long wick down | Bullish reversal |
| **Shooting Star** | Small body bottom, long wick up | Bearish reversal |
| **Marubozu** | Full body, no wicks | Strong trend |
| **Dragonfly Doji** | Flat top, long lower wick | Bullish reversal |

## Example

After BTC drops from $82,000 to $74,000 over 3 days, a Hammer candle appears. The long lower wick means buyers pushed back hard. Next candle confirms with a green close → bullish reversal likely.

## Common Mistake

Trading every Hammer/Shooting Star you see. Context matters — a Hammer after a small 2% drop means nothing. A Hammer after a 20% crash is significant.

## Related Pages
- [Intermediate Patterns](/book/candlestick-patterns/intermediate-patterns)
- [Pattern Guide](/patterns)`,
      },
      {
        slug: "intermediate-patterns",
        title: "Intermediate Patterns",
        content: `# Intermediate Patterns (Two Candles)

10 patterns that require comparing TWO consecutive candles.

## Key Patterns

| Pattern | What it looks like | Signal |
|---------|-------------------|--------|
| **Bullish Engulfing** | Small red → bigger green covers it | Strong bullish reversal |
| **Bearish Engulfing** | Small green → bigger red covers it | Strong bearish reversal |
| **Piercing Line** | Red → green closing above midpoint | Bullish reversal |
| **Dark Cloud Cover** | Green → red closing below midpoint | Bearish reversal |
| **Bullish Harami** | Big red → small green inside it | Possible bullish reversal |

## Example

ETH at $3,400. Green candle (open $3,380, close $3,420). Next candle: Red, opens at $3,430 (above high), closes at $3,350 (below midpoint). This is Dark Cloud Cover — bearish reversal signal.

## Common Mistake

Confusing Harami with Engulfing. Harami = small candle INSIDE the previous body. Engulfing = bigger candle COVERING the previous body. Engulfing is stronger.

## Related Pages
- [Advanced Patterns](/book/candlestick-patterns/advanced-patterns)
- [Pattern Guide](/patterns)`,
      },
      {
        slug: "advanced-patterns",
        title: "Advanced Patterns",
        content: `# Advanced Patterns (Three+ Candles)

14 patterns that require reading a sequence of 3+ candles.

## Key Patterns

| Pattern | What it looks like | Signal |
|---------|-------------------|--------|
| **Morning Star** | Red → small → green | Strong bullish reversal |
| **Evening Star** | Green → small → red | Strong bearish reversal |
| **Three White Soldiers** | 3 consecutive green candles | Strong uptrend |
| **Three Black Crows** | 3 consecutive red candles | Strong downtrend |
| **Rising/Falling Methods** | Big candle + 3 small + big candle | Continuation |

## Example

SOL drops from $180 to $150. Morning Star appears:
1. Red candle (bearish)
2. Small Doji at $148 (indecision)
3. Strong green candle closing at $155 (bullish reversal)

This is a textbook Morning Star — one of the strongest reversal signals.

## Common Mistake

Expecting patterns to work every time. Even the best patterns fail 30-40% of the time. Always combine with other analysis.

## Related Pages
- [Pro Chart Structures](/book/candlestick-patterns/pro-chart-structures)
- [Risk/Reward Ratio](/book/risk-management/risk-reward-ratio)`,
      },
      {
        slug: "pro-chart-structures",
        title: "Pro Chart Structures",
        content: `# Pro Chart Structures

12 multi-candle patterns that form across many bars — the shapes professional traders watch.

## Key Patterns

| Pattern | What it looks like | Signal |
|---------|-------------------|--------|
| **Double Top** | Price hits high twice, fails | Bearish reversal |
| **Double Bottom** | Price hits low twice, bounces | Bullish reversal |
| **Head & Shoulders** | Three peaks, middle highest | Bearish reversal |
| **Inverse H&S** | Three troughs, middle lowest | Bullish reversal |
| **Ascending Triangle** | Flat top, rising bottom | Usually bullish breakout |
| **Bull Flag** | Sharp rise + small pull-down | Bullish continuation |
| **Cup and Handle** | U-shape + small dip | Bullish breakout |

## Example

BTC hits $84,000 twice in one week, drops to $78,000 between. Third attempt fails at $83,500. Double Top confirmed → bearish reversal likely. Target: $72,000 (based on pattern height).

## Common Mistake

Trading chart patterns without a stop loss. Even "textbook" patterns fail. Always protect your downside.

## Related Pages
- [Support and Resistance](/book/reading-a-chart/support-and-resistance)
- [Risk Management](/book/risk-management/why-stop-loss-matters)`,
      },
    ],
  },

  // ============================================
  // CHAPTER 4 — Indicators
  // ============================================
  {
    id: "indicators",
    title: "Indicators",
    icon: "📊",
    pages: [
      {
        slug: "moving-averages-ma-ema",
        title: "Moving Averages (MA/EMA)",
        content: `# Moving Averages (MA/EMA)

Average price over N periods. Smooths out noise to show the trend.

## The Idea

- **SMA (Simple):** Average of last N closes. Equal weight to all.
- **EMA (Exponential):** Weighted average. Recent prices matter more.

**Common periods:**
- EMA(12) = short-term trend
- EMA(26) = medium-term trend
- EMA(50) = long-term trend
- EMA(200) = major trend direction

## Example

BTC at $78,000. EMA(12) = $78,200. EMA(26) = $77,500.
- EMA(12) > EMA(26) → short-term trend is UP
- Price > EMA(50) → overall trend is UP
- This is what our AI Signal Bot uses to generate LONG signals!

## Common Mistake

Using too many EMAs at once. You'll get "analysis paralysis." Stick to 2-3 EMAs max. Our signals use EMA(12), EMA(26), and EMA(50) — that's enough.

## Related Pages
- [RSI Explained](/book/indicators/rsi-explained)
- [How Signals Calculate](/book/signals-and-strategy/how-apna-signal-calculates-signals)`,
      },
      {
        slug: "rsi-explained",
        title: "RSI Explained",
        content: `# RSI (Relative Strength Index)

Measures momentum: is a coin overbought (too expensive) or oversold (too cheap)?

## The Idea

RSI ranges from 0 to 100:
- **Above 70** = Overbought → might drop soon
- **Below 30** = Oversold → might bounce soon
- **30-70** = Normal range

## Example

BTC RSI at 72 → overbought territory. Price might pull back. But in strong uptrends, RSI can stay above 70 for days. Don't sell just because RSI is 72 — look at the trend too.

**Our AI signals use RSI(14).** If RSI > 70, strength is downgraded. If RSI < 30, also downgraded. RSI between 30-70 is ideal for signals.

## Common Mistake

Selling the moment RSI hits 70. RSI can stay overbought for weeks in a bull market. Use RSI as confirmation, not a standalone signal.

## Related Pages
- [Moving Averages](/book/indicators/moving-averages-ma-ema)
- [MACD Explained](/book/indicators/macd-explained)`,
      },
      {
        slug: "macd-explained",
        title: "MACD Explained",
        content: `# MACD (Moving Average Convergence Divergence)

Shows trend changes by comparing two EMAs.

## The Idea

MACD has 3 parts:
- **MACD Line:** EMA(12) minus EMA(26)
- **Signal Line:** EMA(9) of the MACD Line
- **Histogram:** Difference between MACD and Signal

**Buy signal:** MACD crosses above Signal line
**Sell signal:** MACD crosses below Signal line

## Example

ETH MACD line crosses above signal line at $3,200. Histogram turns green and growing. This suggests upward momentum is building. Enter long.

## Common Mistake

Using MACD on very short timeframes (1m, 5m). It gives too many false signals. Use MACD on 1h, 4h, or daily charts.

## Related Pages
- [Bollinger Bands](/book/indicators/bollinger-bands)
- [Volume Indicators](/book/indicators/volume-indicators)`,
      },
      {
        slug: "bollinger-bands",
        title: "Bollinger Bands",
        content: `# Bollinger Bands

Three lines that expand/contract based on volatility.

## The Idea

- **Middle band:** SMA(20) — 20-period simple moving average
- **Upper band:** Middle + 2 standard deviations
- **Lower band:** Middle - 2 standard deviations

**When bands squeeze** (narrow) → big move coming
**When bands expand** (wide) → high volatility

## Example

BTC Bollinger Bands squeeze tight at $78,000. Price touches lower band. Then bands expand as BTC breaks upward to $82,000. The squeeze predicted the breakout.

## Common Mistake

Assuming price "must" bounce off the bands. In strong trends, price can ride the upper or lower band for a long time.

## Related Pages
- [RSI Explained](/book/indicators/rsi-explained)
- [Volume Indicators](/book/indicators/volume-indicators)`,
      },
      {
        slug: "volume-indicators",
        title: "Volume Indicators",
        content: `# Volume Indicators

Measure trading activity — confirms if a move is real or fake.

## The Idea

- **On-Balance Volume (OBV):** Cumulative volume. Rising OBV = buying pressure.
- **Volume Profile:** Shows price levels with most trading activity.
- **VWAP:** Volume-Weighted Average Price. Institutional traders use this.

## Example

BTC breaks above $80,000 resistance. OBV is rising sharply → real buying. But if OBV is flat while price rises → the breakout might fail.

## Common Mistake

Ignoring volume on breakouts. 80% of failed breakouts happen on low volume. Always check volume before entering.

## Related Pages
- [Volume Basics](/book/reading-a-chart/volume-basics)
- [RSI Explained](/book/indicators/rsi-explained)`,
      },
    ],
  },

  // ============================================
  // CHAPTER 5 — Risk Management
  // ============================================
  {
    id: "risk-management",
    title: "Risk Management",
    icon: "🛡️",
    pages: [
      {
        slug: "why-stop-loss-matters",
        title: "Why Stop Loss Matters",
        content: `# Why Stop Loss Matters

A Stop Loss is your safety net — it automatically sells when price drops to a certain level, limiting your loss.

## The Idea

Without a Stop Loss:
- BTC drops 5% → you hold
- Drops 10% → you hold
- Drops 30% → you panic sell at massive loss

With a Stop Loss at -5%:
- BTC drops 5% → automatic sell, loss capped at 5%
- You preserve 95% of your capital for the next trade

## Example

You buy SOL at $180 with a Stop Loss at $171 (-5%).
- SOL drops to $160 → you lose $10 per SOL (5.5% loss)
- Without SL, you'd lose $20 per SOL (11% loss)
- Your SL saved you nearly half the loss

## Common Mistake

Moving your Stop Loss further away when price approaches it. "Maybe it'll come back." It usually doesn't. Trust your SL.

## Related Pages
- [Position Sizing](/book/risk-management/position-sizing)
- [Risk/Reward Ratio](/book/risk-management/risk-reward-ratio)`,
      },
      {
        slug: "position-sizing",
        title: "Position Sizing",
        content: `# Position Sizing

How much money to put into each trade. The #1 rule: never risk more than 1-2% per trade.

## The Idea

**The 1% Rule:** If you have $1,000, never risk more than $10 on a single trade.

This means:
- Even if you lose 10 trades in a row, you only lose 10% of your account
- You survive long enough to recover

## Example

Account: $1,000. Risk per trade: 1% ($10).
- Entry: $78,000. Stop Loss: $76,000 (2.5% risk per unit)
- Position size: $10 / $2,000 risk per BTC = 0.005 BTC
- If SL hit: lose $10. If TP hit at $82,000: gain $20 (2:1 reward)

## Common Mistake

Going "all in" on one trade because you're "sure" it'll work. One bad trade wipes your account. Position sizing keeps you alive.

## Related Pages
- [Risk/Reward Ratio](/book/risk-management/risk-reward-ratio)
- [Common Beginner Mistakes](/book/risk-management/common-beginner-mistakes)`,
      },
      {
        slug: "risk-reward-ratio",
        title: "Risk/Reward Ratio",
        content: `# Risk/Reward Ratio

How much you risk vs. how much you can gain. Aim for 1:2 or better.

## The Idea

- **Risk:** Distance from Entry to Stop Loss
- **Reward:** Distance from Entry to Take Profit
- **Ratio:** Reward ÷ Risk

A 1:2 ratio means you risk $1 to make $2. Even if you only win 50% of trades, you're profitable.

## Example

Entry: $78,000. SL: $76,000 (risk: $2,000). TP: $82,000 (reward: $4,000).
Risk/Reward = 4000/2000 = **1:2**

Over 10 trades (5 wins, 5 losses):
- Wins: 5 × $4,000 = $20,000
- Losses: 5 × $2,000 = $10,000
- **Net profit: $10,000** ✅

## Common Mistake

Taking trades with 1:0.5 risk/reward (risking $2 to make $1). You need 67% win rate just to break even. Our signals always aim for 1:1.5 or better.

## Related Pages
- [Position Sizing](/book/risk-management/position-sizing)
- [Why Stop Loss Matters](/book/risk-management/why-stop-loss-matters)`,
      },
      {
        slug: "leverage-explained",
        title: "Leverage Explained",
        content: `# Leverage Explained

Borrowing money to trade bigger. Amplifies both profits AND losses.

## The Idea

With 10x leverage:
- $100 controls $1,000 worth of crypto
- 1% price move = 10% gain (or loss)
- 10% price move = 100% gain (or total loss — liquidation)

## Example

$100 account, 10x leverage, buying BTC at $78,000:
- BTC goes up 5% → You make $50 (50% return on $100)
- BTC goes down 5% → You lose $50 (50% loss)
- BTC goes down 10% → You lose $100 (100% loss — liquidated)

## Common Mistake

Using high leverage as a beginner. 5x-10x leverage is for experienced traders only. Start with 1x (spot) or 2x max.

## Related Pages
- [Why Stop Loss Matters](/book/risk-management/why-stop-loss-matters)
- [Common Beginner Mistakes](/book/risk-management/common-beginner-mistakes)`,
      },
      {
        slug: "common-beginner-mistakes",
        title: "Common Beginner Mistakes",
        content: `# Common Beginner Mistakes

The top mistakes that cause beginners to lose money — and how to avoid them.

## The Top 7 Mistakes

1. **No Stop Loss** → One trade wipes your account
2. **Over-leveraging** → 10x leverage as a beginner = guaranteed loss
3. **FOMO buying** → "It's going up fast, I need to buy NOW!" → buys at the top
4. **No position sizing** → Going all-in on one trade
5. **Ignoring the trend** → Buying in a downtrend because "it's cheap"
6. **Revenge trading** → Losing a trade, immediately entering another to "get it back"
7. **No journal** → Making the same mistakes repeatedly

## Example

You lose $50 on a trade. Angry, you enter another trade immediately with double the size to "recover." You lose another $100. Now you're down $150 instead of $50.

**The fix:** After a loss, walk away. Come back tomorrow with a clear head.

## The Golden Rule

Never risk money you can't afford to lose. If losing this trade would stress you out, your position is too big.

## Related Pages
- [Risk/Reward Ratio](/book/risk-management/risk-reward-ratio)
- [FOMO and Panic](/book/psychology/fomo-and-panic)`,
      },
    ],
  },

  // ============================================
  // CHAPTER 6 — Signals & Strategy
  // ============================================
  {
    id: "signals-and-strategy",
    title: "Signals & Strategy",
    icon: "🤖",
    pages: [
      {
        slug: "what-is-a-trading-signal",
        title: "What is a Trading Signal?",
        content: `# What is a Trading Signal?

A recommendation to buy, sell, or wait — based on analysis.

## The Idea

A signal includes:
- **Direction:** Long, Short, or Wait
- **Entry Price:** Where to enter
- **Stop Loss:** Where to exit if wrong
- **Take Profit:** Where to exit if right
- **Strength:** How confident the analysis is

## Example

Signal: BTC/USDT — LONG — Entry: $78,000 — SL: $76,000 — TP: $82,000 — Strength: Strong

This means: "Buy BTC at $78,000. If it drops to $76,000, cut losses. If it rises to $82,000, take profit. The signal is strong."

## Common Mistake

Following signals blindly without understanding them. Signals are tools, not guarantees. Understand WHY a signal was generated before following it.

## Related Pages
- [How Our Signals Calculate](/book/signals-and-strategy/how-apna-signal-calculates-signals)
- [Combining Indicators with Patterns](/book/signals-and-strategy/combining-indicators-with-patterns)`,
      },
      {
        slug: "how-apna-signal-calculates-signals",
        title: "How Our Signals Calculate",
        content: `# How Our Signals Calculate

Our AI uses EMA(12), EMA(26), EMA(50), and RSI(14) to generate signals.

## The Logic

1. **Price > EMA(50) AND EMA(12) > EMA(26)** → LONG
2. **Price < EMA(50) AND EMA(12) < EMA(26)** → SHORT
3. **No clear match** → WAIT

**Strength calculation:**
- EMA gap > 2% + RSI between 30-70 → Strong
- EMA gap > 0.5% → Medium
- Otherwise → Weak

## Example

BTC at $78,000. EMA(12) = $78,200. EMA(26) = $77,500. EMA(50) = $76,000. RSI(14) = 62.
- Price > EMA(50) ✅
- EMA(12) > EMA(26) ✅ → **LONG**
- Gap: (78200-77500)/77500 = 0.9% → Medium
- RSI 62 is healthy → **Strong** (gap + RSI both good)

## Common Mistake

Expecting signals to work 100% of the time. They don't. Our signals are based on technical indicators — they work well in trending markets but less in sideways markets.

## Related Pages
- [Moving Averages](/book/indicators/moving-averages-ma-ema)
- [RSI Explained](/book/indicators/rsi-explained)`,
      },
      {
        slug: "combining-indicators-with-patterns",
        title: "Combining Indicators with Patterns",
        content: `# Combining Indicators with Patterns

The best trades happen when indicators AND patterns agree.

## The Idea

- Indicator says LONG (EMA crossover, RSI healthy)
- Candlestick pattern confirms (Bullish Engulfing at support)
- Volume confirms (high volume on the breakout)
- **Result: High-confidence trade**

## Example

ETH shows:
1. EMA(12) crosses above EMA(26) → indicator says LONG
2. Bullish Engulfing at $3,200 support → pattern confirms
3. Volume spikes 3x average → volume confirms
4. Entry: $3,250. SL: $3,100. TP: $3,550. Risk/Reward: 1:2

This is a high-probability setup.

## Common Mistake

Using only one indicator or one pattern. Multiple confirmations = higher probability. No single indicator is perfect.

## Related Pages
- [What is a Trading Signal](/book/signals-and-strategy/what-is-a-trading-signal)
- [Backtesting Basics](/book/signals-and-strategy/backtesting-basics)`,
      },
      {
        slug: "backtesting-basics",
        title: "Backtesting Basics",
        content: `# Backtesting Basics

Testing your strategy on historical data to see if it would have worked.

## The Idea

Before risking real money:
1. Take your strategy (e.g., EMA crossover + RSI)
2. Apply it to past data (last 6 months of BTC)
3. Count wins vs losses
4. Calculate profit/loss

If it worked historically, it MIGHT work in the future (no guarantees).

## Example

Strategy: Buy when EMA(12) crosses above EMA(26), sell when it crosses below.
Backtest on BTC (6 months): 15 trades, 9 wins, 6 losses. Average win: +4.2%. Average loss: -2.1%. Net profit: +18.3%.

## Common Mistake

Optimizing strategy to fit past data perfectly ("curve fitting"). It will fail on new data. Keep strategies simple.

## Related Pages
- [How Our Signals Calculate](/book/signals-and-strategy/how-apna-signal-calculates-signals)
- [Risk/Reward Ratio](/book/risk-management/risk-reward-ratio)`,
      },
    ],
  },

  // ============================================
  // CHAPTER 7 — Psychology
  // ============================================
  {
    id: "psychology",
    title: "Psychology",
    icon: "🧠",
    pages: [
      {
        slug: "fomo-and-panic",
        title: "FOMO and Panic",
        content: `# FOMO and Panic

The two emotions that destroy beginner traders: Fear Of Missing Out and panic selling.

## The Idea

- **FOMO:** "BTC is pumping! I need to buy NOW!" → You buy at the top → price drops → you panic sell at a loss
- **Panic:** "My trade is losing! I need to sell NOW!" → You sell at the bottom → price recovers → you missed the bounce

## Example

BTC pumps from $78,000 to $84,000 in 2 hours. You FOMO buy at $84,000. BTC drops to $80,000. You panic sell. BTC then goes to $90,000. You lost money AND missed the rally.

**The fix:** If you didn't plan the trade, don't take it. There's always another opportunity.

## Common Mistake

Checking prices every 5 minutes. It creates emotional decisions. Set alerts, check once or twice a day, trust your strategy.

## Related Pages
- [Discipline and Journaling](/book/psychology/discipline-and-journaling)
- [Why Most Beginners Lose Money](/book/psychology/why-most-beginners-lose-money)`,
      },
      {
        slug: "discipline-and-journaling",
        title: "Discipline and Journaling",
        content: `# Discipline and Journaling

The edge that separates profitable traders from everyone else: following rules and learning from mistakes.

## The Idea

- **Discipline:** Follow your strategy even when it's hard
- **Journaling:** Record every trade — why you entered, what happened, what you learned

## Example

You journal every trade:
| Date | Coin | Entry | SL | TP | Result | Notes |
|------|------|-------|----|----|--------|-------|
| Jan 15 | BTC | $78,000 | $76,000 | $82,000 | +$4,000 ✅ | Followed plan, worked perfectly |
| Jan 16 | ETH | $3,400 | $3,200 | $3,600 | -$200 ❌ | Moved SL too early |

After 50 trades, patterns emerge. You notice you lose money when you move SL. You stop doing it. Win rate improves.

## Common Mistake

Not journaling because "it's boring." The traders who journal are the ones who improve. The ones who don't repeat the same mistakes.

## Related Pages
- [FOMO and Panic](/book/psychology/fomo-and-panic)
- [Common Beginner Mistakes](/book/risk-management/common-beginner-mistakes)`,
      },
      {
        slug: "why-most-beginners-lose-money",
        title: "Why Most Beginners Lose Money",
        content: `# Why Most Beginners Lose Money

90% of beginner traders lose money. Here's why — and how to be in the 10%.

## The Statistics

- 90% of day traders lose money
- 80% quit within 2 years
- The 10% who succeed share common traits

## Why They Lose

1. **No risk management** — risking too much per trade
2. **Emotional trading** — FOMO, panic, revenge trading
3. **No strategy** — trading based on tips/hunches
4. **Over-leveraging** — using 10x-50x leverage as beginners
5. **No learning** — skipping education, jumping straight in

## How to Be in the 10%

1. Start with paper trading (like our Practice Trading)
2. Learn risk management FIRST
3. Use small positions (1-2% risk per trade)
4. Journal every trade
5. Be patient — it takes 6-12 months to become consistent

## Common Mistake

Thinking trading is "easy money." It's a skill that takes years to master. Treat it like learning a profession, not a get-rich-quick scheme.

## Related Pages
- [Common Beginner Mistakes](/book/risk-management/common-beginner-mistakes)
- [Discipline and Journaling](/book/psychology/discipline-and-journaling)`,
      },
    ],
  },

  // ============================================
  // CHAPTER 8 — Glossary
  // ============================================
  {
    id: "glossary",
    title: "Glossary",
    icon: "📖",
    pages: [
      {
        slug: "terms-a-z",
        title: "Terms A-Z",
        content: `# Terms A-Z

Every trading term used in this app, explained simply.

## A

**AML (Anti-Money Laundering):** Laws requiring exchanges to verify user identity to prevent illegal money flows.

**APY (Annual Percentage Yield):** Yearly return on investment, including compound interest.

## B

**Bear Market:** A market where prices are falling (typically >20% from recent highs).

**Bid:** The highest price a buyer is willing to pay.

**Bollinger Bands:** Indicator showing price volatility — upper/lower bands expand when volatile, contract when calm.

**Breakout:** Price moves beyond a support or resistance level with conviction.

**Bull Market:** A market where prices are rising.

## C

**Candlestick:** A chart element showing Open, High, Low, Close prices for a time period.

**CEX (Centralized Exchange):** A company-run exchange (Binance, Coinbase).

**CMC (Crypto Market Cap):** Total value of all coins in circulation.

## D

**DEX (Decentralized Exchange):** Exchange run by smart contracts, no company involved.

**DCA (Dollar-Cost Averaging):** Investing a fixed amount regularly regardless of price.

**Depth:** The amount of orders at each price level in the order book.

## E

**EMA (Exponential Moving Average):** Weighted average giving more importance to recent prices.

**Entry:** The price at which you open a trade.

## F

**FOMO (Fear Of Missing Out):** Emotional buying because price is rising fast.

**FUD (Fear, Uncertainty, Doubt):** Negative news/sentiment causing panic selling.

**Futures:** Contracts to buy/sell at a future date at a set price.

## G

**Gas Fee:** Transaction cost on Ethereum network.

**GTC (Good Till Cancelled):** Order that stays active until filled or cancelled.

## H

**HODL:** Hold on for dear life — slang for long-term holding.

**Hedge:** Opening an opposite position to reduce risk.

## I

**Indicator:** Mathematical calculation based on price/volume used to predict future movement.

**Illiquid:** Market with few buyers/sellers, hard to execute trades.

## K

**K线 (K-line):** Japanese term for candlestick chart.

## L

**Limit Order:** Order to buy/sell at a specific price or better.

**Liquidation:** Forced closure of a leveraged position when losses exceed margin.

**Long:** Buying a coin expecting price to rise.

**Leverage:** Borrowing money to increase position size.

## M

**Market Cap:** Total value of a cryptocurrency (price × circulating supply).

**Market Order:** Order to buy/sell immediately at current market price.

**MACD:** Moving Average Convergence Divergence — trend-following momentum indicator.

## O

**Open Interest:** Total number of outstanding futures contracts.

**Order Book:** List of all buy/sell orders at each price level.

**OTC (Over The Counter):** Trading directly between two parties, not on an exchange.

## P

**PnL (Profit and Loss):** The money you've made or lost on a trade.

**Position:** An active trade (open long or short).

**Portfolio:** Collection of all your crypto holdings.

## R

**RSI (Relative Strength Index):** Momentum indicator (0-100) showing overbought/oversold conditions.

**Risk/Reward Ratio:** Comparison of potential loss vs potential gain on a trade.

## S

**SMA (Simple Moving Average):** Average price over N periods, equal weight.

**Spot:** Buying/selling the actual asset (not a derivative).

**Spread:** Difference between bid and ask price.

**Stop Loss:** Automatic sell order to limit losses.

**Support:** Price level where buyers historically step in.

## T

**Take Profit:** Automatic sell order to lock in profits.

**Timeframe:** The period each candle represents (1m, 15m, 1h, etc.).

**Trend:** General direction of price movement (up, down, sideways).

## V

**Volume:** Amount of an asset traded during a period.

**VWAP:** Volume-Weighted Average Price — average price weighted by volume.

## W

**Whale:** Individual or entity holding large amounts of crypto.

**Wallet:** Software/hardware for storing cryptocurrency.

## Y

**Yield:** Return earned on staked or invested crypto.

---

*Last updated: 2025*
*Note: This glossary is for educational purposes. Not financial advice.*`,
      },
    ],
  },
];

// Helper functions
export function getAllChapters(): BookChapter[] {
  return BOOK_CHAPTERS;
}

export function getChapterById(id: string): BookChapter | undefined {
  return BOOK_CHAPTERS.find((c) => c.id === id);
}

export function getPageBySlug(chapterId: string, pageSlug: string): BookPage | undefined {
  const chapter = getChapterById(chapterId);
  return chapter?.pages.find((p) => p.slug === pageSlug);
}

export function searchBook(query: string): BookPage[] {
  const results: BookPage[] = [];
  const lowerQuery = query.toLowerCase();

  BOOK_CHAPTERS.forEach((chapter) => {
    chapter.pages.forEach((page) => {
      if (
        page.title.toLowerCase().includes(lowerQuery) ||
        page.content.toLowerCase().includes(lowerQuery)
      ) {
        results.push(page);
      }
    });
  });

  return results;
}
