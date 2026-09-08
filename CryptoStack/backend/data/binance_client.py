import httpx
import asyncio
from config import BINANCE_FUTURES_BASE, KLINES_LIMIT, MAX_CONCURRENT


class BinanceClient:
    def __init__(self):
        self.base_url = BINANCE_FUTURES_BASE
        self.semaphore = asyncio.Semaphore(MAX_CONCURRENT)

    async def _get(self, client: httpx.AsyncClient, endpoint: str, params: dict = None) -> dict:
        async with self.semaphore:
            url = f"{self.base_url}{endpoint}"
            resp = await client.get(url, params=params, timeout=15.0)
            resp.raise_for_status()
            return resp.json()

    async def get_klines(self, client: httpx.AsyncClient, symbol: str, interval: str, limit: int = KLINES_LIMIT) -> list:
        return await self._get(client, "/fapi/v1/klines", {"symbol": symbol, "interval": interval, "limit": limit})

    async def get_funding_rate(self, client: httpx.AsyncClient, symbol: str) -> dict:
        return await self._get(client, "/fapi/v1/premiumIndex", {"symbol": symbol})

    async def get_open_interest(self, client: httpx.AsyncClient, symbol: str) -> dict:
        return await self._get(client, "/fapi/v1/openInterest", {"symbol": symbol})

    async def get_24hr_ticker(self, client: httpx.AsyncClient, symbol: str) -> dict:
        return await self._get(client, "/fapi/v1/ticker/24hr", {"symbol": symbol})

    async def get_depth(self, client: httpx.AsyncClient, symbol: str, limit: int = 20) -> dict:
        return await self._get(client, "/fapi/v1/depth", {"symbol": symbol, "limit": limit})

    async def get_all_market_data(self, symbol: str) -> dict:
        async with httpx.AsyncClient() as client:
            tasks = [
                self.get_klines(client, symbol, "15m"),
                self.get_klines(client, symbol, "1h"),
                self.get_klines(client, symbol, "4h"),
                self.get_24hr_ticker(client, symbol),
                self.get_funding_rate(client, symbol),
                self.get_open_interest(client, symbol),
            ]
            results = await asyncio.gather(*tasks, return_exceptions=True)

            return {
                "symbol": symbol,
                "klines": {
                    "15m": results[0] if not isinstance(results[0], Exception) else [],
                    "1h": results[1] if not isinstance(results[1], Exception) else [],
                    "4h": results[2] if not isinstance(results[2], Exception) else [],
                },
                "ticker": results[3] if not isinstance(results[3], Exception) else {},
                "funding": results[4] if not isinstance(results[4], Exception) else {},
                "openInterest": results[5] if not isinstance(results[5], Exception) else {},
            }
