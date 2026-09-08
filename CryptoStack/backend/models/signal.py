from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class MarketContext(BaseModel):
    trend: str
    trendStrength: str
    higherTimeframe: str
    volatility: str
    volume: str
    funding: str
    openInterest: str


class SignalCard(BaseModel):
    symbol: str
    name: str
    price: float
    change24h: float
    decision: str
    strength: str
    riskLevel: str

    entryPrice: float
    entryZone: dict
    stopLoss: float
    takeProfit1: float
    takeProfit2: float
    takeProfit3: float
    riskReward: float
    leverageRange: str

    marketContext: MarketContext
    reason: str
    signalTime: str

    score: float
    sparkline: list[float]
