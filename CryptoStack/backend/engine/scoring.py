from engine.indicators import ema, rsi, atr, ema_slope
from config import SCORE_STRONG, SCORE_MEDIUM, SCORE_WAIT


def compute_indicators(klines: dict) -> dict:
    closes = klines["closes"]
    highs = klines["highs"]
    lows = klines["lows"]
    volumes = klines["volumes"]

    if len(closes) < 50:
        return None

    current_price = closes[-1]
    ema12 = ema(closes, 12)
    ema26 = ema(closes, 26)
    ema50 = ema(closes, 50)

    return {
        "price": current_price,
        "ema12": ema12[-1],
        "ema26": ema26[-1],
        "ema50": ema50[-1],
        "ema12_slope": ema_slope(ema12),
        "ema26_slope": ema_slope(ema26),
        "ema50_slope": ema_slope(ema50),
        "rsi": rsi(closes, 14),
        "atr": atr(highs, lows, closes, 14),
        "atr_pct": (atr(highs, lows, closes, 14) / current_price * 100) if current_price > 0 else 0,
        "volume": volumes[-1] if volumes else 0,
        "volume_avg": sum(volumes[-20:]) / 20 if len(volumes) >= 20 else sum(volumes) / len(volumes) if volumes else 1,
        "sparkline": closes[-20:],
    }


def score_trend(ind: dict) -> tuple[int, str]:
    if ind is None:
        return 0, "Sideways"
    score = 0
    price = ind["price"]
    ema12, ema26, ema50 = ind["ema12"], ind["ema26"], ind["ema50"]

    if ema12 > ema26 > ema50 and price > ema50:
        direction = "Bullish"
        if price > ema12:
            score += 25
        if ema12 > ema26:
            score += 15
        if ema26 > ema50:
            score += 10
        if ind["ema50_slope"] > 0:
            score += 10
    elif ema12 < ema26 < ema50 and price < ema50:
        direction = "Bearish"
        if price < ema12:
            score += 25
        if ema12 < ema26:
            score += 15
        if ema26 < ema50:
            score += 10
        if ind["ema50_slope"] < 0:
            score += 10
    else:
        direction = "Sideways"
        score = 5

    return min(score, 60), direction


def score_rsi(rsi_val: float) -> int:
    if 40 <= rsi_val <= 60:
        return 20
    elif 60 < rsi_val <= 70:
        return 15
    elif 30 <= rsi_val < 40:
        return 15
    elif 70 < rsi_val <= 80:
        return 5
    elif 20 <= rsi_val < 30:
        return 5
    else:
        return -10


def score_volume(vol: float, avg_vol: float) -> int:
    if avg_vol == 0:
        return 5
    ratio = vol / avg_vol
    if ratio >= 1.5:
        return 20
    elif ratio >= 1.0:
        return 10
    elif ratio >= 0.7:
        return 5
    else:
        return -10


def score_volatility(atr_pct: float) -> int:
    if 1.0 <= atr_pct <= 3.0:
        return 15
    elif 0.5 <= atr_pct < 1.0:
        return 5
    elif 3.0 < atr_pct <= 5.0:
        return 5
    else:
        return -15


def score_multi_timeframe(indicators: dict) -> int:
    directions = []
    for tf in ["15m", "1h", "4h"]:
        ind = indicators.get(tf)
        if ind is None:
            continue
        _, direction = score_trend(ind)
        directions.append(direction)

    if not directions:
        return 0

    bullish = sum(1 for d in directions if d == "Bullish")
    bearish = sum(1 for d in directions if d == "Bearish")

    if bullish == len(directions):
        return 25
    elif bearish == len(directions):
        return 25
    elif bullish >= 2 or bearish >= 2:
        return 15
    else:
        return -5


def score_funding(funding_rate: float) -> int:
    if funding_rate > 0.001:
        return -5
    elif funding_rate < -0.001:
        return -5
    return 5


def compute_score(indicators: dict, funding_rate: float) -> tuple[int, dict]:
    primary = indicators.get("1h") or indicators.get("15m") or indicators.get("4h")

    if primary is None:
        return 0, {"trend": 0, "rsi": 0, "volume": 0, "volatility": 0, "multi_tf": 0, "funding": 0, "direction": "Sideways"}

    trend_score, direction = score_trend(primary)
    rsi_score = score_rsi(primary["rsi"])
    vol_score = score_volume(primary["volume"], primary["volume_avg"])
    volat_score = score_volatility(primary["atr_pct"])
    tf_score = score_multi_timeframe(indicators)
    fund_score = score_funding(funding_rate)

    total = trend_score + rsi_score + vol_score + volat_score + tf_score + fund_score

    breakdown = {
        "trend": trend_score,
        "rsi": rsi_score,
        "volume": vol_score,
        "volatility": volat_score,
        "multi_tf": tf_score,
        "funding": fund_score,
        "direction": direction,
    }

    return max(0, min(100, total)), breakdown
