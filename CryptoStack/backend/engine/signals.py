from datetime import datetime, timezone
from data.market_data import fetch_all_symbols
from engine.indicators import ema, rsi, atr
from engine.scoring import compute_indicators, compute_score
from models.signal import SignalCard, MarketContext
from config import SCORE_STRONG, SCORE_MEDIUM, SCORE_WAIT, SYMBOLS


def format_price(price: float) -> float:
    if price >= 100:
        return round(price, 2)
    elif price >= 1:
        return round(price, 4)
    elif price >= 0.01:
        return round(price, 6)
    else:
        return round(price, 8)


def format_symbol_name(symbol: str) -> str:
    if symbol.endswith("USDT"):
        base = symbol[:-4]
        return f"{base}/USDT"
    return symbol


def generate_reason(decision: str, strength: str, breakdown: dict, context: dict) -> str:
    if decision == "WAIT":
        return "Waiting for confirmation — no clear setup right now"
    if decision == "AVOID":
        if context.get("volatility") == "High":
            return "Market too volatile for a clean entry"
        elif context.get("volume") == "Low":
            return "Volume too low to confirm a move"
        else:
            return "Conditions are unclear — conflicting signals"

    trend_dir = breakdown.get("direction", "Sideways")

    if breakdown.get("multi_tf", 0) >= 20:
        timeframes = "3 timeframes"
    elif breakdown.get("multi_tf", 0) >= 10:
        timeframes = "2 timeframes"
    else:
        timeframes = "primary timeframe"

    if breakdown.get("volume", 0) >= 15:
        vol_text = "volume confirms"
    elif breakdown.get("volume", 0) >= 5:
        vol_text = "volume normal"
    else:
        vol_text = "volume low"

    if breakdown.get("trend", 0) >= 40:
        return f"Strong {trend_dir.lower()} alignment across {timeframes}, RSI healthy, {vol_text}"
    elif breakdown.get("trend", 0) >= 25:
        return f"Trend {trend_dir.lower()} across {timeframes}, momentum confirmed, {vol_text}"
    else:
        if decision == "LONG":
            return f"Bullish setup confirmed — {timeframes} aligned, {vol_text}"
        else:
            return f"Bearish setup confirmed — {timeframes} aligned, {vol_text}"


def generate_signals(market_data: list[dict]) -> list[SignalCard]:
    signals = []

    for data in market_data:
        symbol = data["symbol"]
        ticker = data.get("ticker", {})
        funding = data.get("funding", {})
        oi = data.get("openInterest", {})

        current_price = float(ticker.get("lastPrice", 0))
        if current_price == 0:
            continue

        change_24h = float(ticker.get("priceChangePercent", 0))

        indicators = {}
        for tf in ["15m", "1h", "4h"]:
            klines = data["klines"].get(tf, {})
            ind = compute_indicators(klines)
            if ind:
                indicators[tf] = ind

        funding_rate = float(funding.get("lastFundingRate", 0))
        funding_bps = round(funding_rate * 10000, 2)

        oi_val = float(oi.get("openInterest", 0))

        score, breakdown = compute_score(indicators, funding_rate)

        if score >= SCORE_STRONG:
            decision = "LONG" if breakdown["direction"] == "Bullish" else "SHORT"
            strength = "Strong"
        elif score >= SCORE_MEDIUM:
            decision = "LONG" if breakdown["direction"] == "Bullish" else "SHORT"
            strength = "Medium"
        elif score >= SCORE_WAIT:
            decision = "LONG" if breakdown["direction"] == "Bullish" else "SHORT"
            strength = "Weak"
        else:
            decision = "WAIT"
            strength = "Weak"

        atr_pct = indicators.get("1h", {}).get("atr_pct", 2.0) if indicators.get("1h") else 2.0
        rsi_val = indicators.get("1h", {}).get("rsi", 50) if indicators.get("1h") else 50

        if atr_pct > 4 or rsi_val > 75 or rsi_val < 25:
            risk_level = "High"
        elif atr_pct > 2.5 or rsi_val > 65 or rsi_val < 35:
            risk_level = "Medium"
        else:
            risk_level = "Low"

        atr_val = indicators.get("1h", {}).get("atr", current_price * 0.02) if indicators.get("1h") else current_price * 0.02

        if decision in ["LONG", "SHORT"]:
            entry = current_price

            if decision == "LONG":
                entry_zone_low = format_price(entry - atr_val * 0.3)
                entry_zone_high = format_price(entry + atr_val * 0.3)
                stop_loss = format_price(entry - atr_val * 1.5)
                tp1 = format_price(entry + atr_val * 2.0)
                tp2 = format_price(entry + atr_val * 3.0)
                tp3 = format_price(entry + atr_val * 5.0)
            else:
                entry_zone_low = format_price(entry - atr_val * 0.3)
                entry_zone_high = format_price(entry + atr_val * 0.3)
                stop_loss = format_price(entry + atr_val * 1.5)
                tp1 = format_price(entry - atr_val * 2.0)
                tp2 = format_price(entry - atr_val * 3.0)
                tp3 = format_price(entry - atr_val * 5.0)

            risk = abs(entry - stop_loss)
            reward = abs(tp1 - entry)
            rr = round(reward / risk, 1) if risk > 0 else 0

            if risk_level == "Low":
                leverage = "5-15x"
            elif risk_level == "Medium":
                leverage = "3-10x"
            else:
                leverage = "2-5x"

        else:
            entry = current_price
            entry_zone_low = format_price(entry - atr_val * 0.5)
            entry_zone_high = format_price(entry + atr_val * 0.5)
            stop_loss = 0
            tp1 = tp2 = tp3 = 0
            rr = 0
            leverage = "—"

        primary_ind = indicators.get("1h") or indicators.get("15m")
        higher_tf_ind = indicators.get("4h")

        atr_pct_val = primary_ind["atr_pct"] if primary_ind else 0
        vol_bucket = "Low" if atr_pct_val < 1.0 else ("Normal" if atr_pct_val <= 3.0 else "High")

        if primary_ind:
            vol_ratio = primary_ind["volume"] / primary_ind["volume_avg"] if primary_ind["volume_avg"] > 0 else 1
        else:
            vol_ratio = 1
        vol_state = "Low" if vol_ratio < 0.7 else ("Normal" if vol_ratio <= 1.5 else "High")

        if higher_tf_ind:
            _, htf_breakdown = compute_score({"4h": higher_tf_ind}, 0)
            htf_trend = htf_breakdown.get("direction", "Sideways")
        else:
            htf_trend = "N/A"

        context = MarketContext(
            trend=breakdown["direction"],
            trendStrength="Strong" if breakdown["trend"] >= 40 else "Moderate" if breakdown["trend"] >= 25 else "Weak",
            higherTimeframe=htf_trend,
            volatility=vol_bucket,
            volume=vol_state,
            funding=f"{funding_bps} bps",
            openInterest=f"{oi_val:,.0f}" if oi_val > 0 else "N/A",
        )

        sparkline = indicators.get("1h", {}).get("sparkline", []) if indicators.get("1h") else []

        reason = generate_reason(decision, strength, breakdown, {"volatility": vol_bucket, "volume": vol_state})

        signal = SignalCard(
            symbol=symbol,
            name=format_symbol_name(symbol),
            price=format_price(current_price),
            change24h=round(change_24h, 2),
            decision=decision,
            strength=strength,
            riskLevel=risk_level,
            entryPrice=format_price(entry),
            entryZone={"low": entry_zone_low, "high": entry_zone_high},
            stopLoss=stop_loss,
            takeProfit1=tp1,
            takeProfit2=tp2,
            takeProfit3=tp3,
            riskReward=rr,
            leverageRange=leverage,
            marketContext=context,
            reason=reason,
            signalTime=datetime.now(timezone.utc).isoformat(),
            score=score,
            sparkline=sparkline,
        )

        signals.append(signal)

    priority = {"Strong": 0, "Medium": 1, "Weak": 2}
    decision_priority = {"LONG": 0, "SHORT": 1, "WAIT": 2}
    signals.sort(key=lambda s: (decision_priority.get(s.decision, 3), priority.get(s.strength, 3), -abs(s.score - 50)))

    return signals
