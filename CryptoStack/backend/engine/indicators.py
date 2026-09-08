def ema(data: list[float], period: int) -> list[float]:
    if len(data) < period:
        return [0.0] * len(data)
    multiplier = 2 / (period + 1)
    ema_values = [sum(data[:period]) / period]
    for i in range(period, len(data)):
        val = (data[i] - ema_values[-1]) * multiplier + ema_values[-1]
        ema_values.append(val)
    return [0.0] * (period - 1) + ema_values


def sma(data: list[float], period: int) -> list[float]:
    if len(data) < period:
        return [0.0] * len(data)
    result = []
    for i in range(len(data)):
        if i < period - 1:
            result.append(0.0)
        else:
            result.append(sum(data[i - period + 1:i + 1]) / period)
    return result


def rsi(closes: list[float], period: int = 14) -> float:
    if len(closes) < period + 1:
        return 50.0
    gains = []
    losses = []
    for i in range(1, len(closes)):
        change = closes[i] - closes[i - 1]
        gains.append(max(change, 0))
        losses.append(max(-change, 0))
    if len(gains) < period:
        return 50.0
    avg_gain = sum(gains[:period]) / period
    avg_loss = sum(losses[:period]) / period
    for i in range(period, len(gains)):
        avg_gain = (avg_gain * (period - 1) + gains[i]) / period
        avg_loss = (avg_loss * (period - 1) + losses[i]) / period
    if avg_loss == 0:
        return 100.0
    rs = avg_gain / avg_loss
    return 100 - (100 / (1 + rs))


def atr(highs: list[float], lows: list[float], closes: list[float], period: int = 14) -> float:
    if len(closes) < 2:
        return 0.0
    true_ranges = []
    for i in range(1, len(closes)):
        tr = max(
            highs[i] - lows[i],
            abs(highs[i] - closes[i - 1]),
            abs(lows[i] - closes[i - 1])
        )
        true_ranges.append(tr)
    if len(true_ranges) < period:
        return sum(true_ranges) / len(true_ranges) if true_ranges else 0.0
    atr_val = sum(true_ranges[:period]) / period
    for i in range(period, len(true_ranges)):
        atr_val = (atr_val * (period - 1) + true_ranges[i]) / period
    return atr_val


def ema_slope(ema_values: list[float], lookback: int = 5) -> float:
    if len(ema_values) < lookback + 1:
        return 0.0
    recent = ema_values[-lookback - 1:]
    if recent[0] == 0:
        return 0.0
    return (recent[-1] - recent[0]) / recent[0] * 100
