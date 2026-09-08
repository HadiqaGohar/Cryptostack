import httpx
import asyncio
from data.binance_client import BinanceClient
from config import SYMBOLS


client = BinanceClient()


def parse_klines(raw_klines: list) -> dict:
    if not raw_klines:
        return {"opens": [], "highs": [], "lows": [], "closes": [], "volumes": [], "times": []}
    return {
        "opens": [float(k[1]) for k in raw_klines],
        "highs": [float(k[2]) for k in raw_klines],
        "lows": [float(k[3]) for k in raw_klines],
        "closes": [float(k[4]) for k in raw_klines],
        "volumes": [float(k[5]) for k in raw_klines],
        "times": [int(k[0]) for k in raw_klines],
    }


async def fetch_all_symbols(symbols: list[str] = None) -> list[dict]:
    if symbols is None:
        symbols = SYMBOLS

    print(f"📡 Fetching data for {len(symbols)} symbols...")

    tasks = [client.get_all_market_data(sym) for sym in symbols]
    results = await asyncio.gather(*tasks, return_exceptions=True)

    market_data = []
    for i, result in enumerate(results):
        if isinstance(result, Exception):
            print(f"❌ Error fetching {symbols[i]}: {result}")
            continue

        parsed = {
            "symbol": result["symbol"],
            "ticker": result["ticker"],
            "funding": result["funding"],
            "openInterest": result["openInterest"],
            "klines": {}
        }

        for tf in ["15m", "1h", "4h"]:
            parsed["klines"][tf] = parse_klines(result["klines"][tf])

        market_data.append(parsed)

    print(f"✅ Got data for {len(market_data)}/{len(symbols)} symbols")
    return market_data
