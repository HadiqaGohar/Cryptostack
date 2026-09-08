import asyncio
import time
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from data.market_data import fetch_all_symbols
from engine.signals import generate_signals
from models.signal import SignalCard
from config import REFRESH_INTERVAL, SYMBOLS

app = FastAPI(title="CryptoStack Signal Engine", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://crypto-stack-one.vercel.app",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_methods=["GET"],
    allow_headers=["*"],
)

signal_cache = {
    "signals": [],
    "lastUpdated": "",
    "status": "loading",
}


@app.on_event("startup")
async def startup():
    asyncio.create_task(refresh_signals())


async def refresh_signals():
    while True:
        try:
            start = time.time()
            market_data = await fetch_all_symbols(SYMBOLS)
            signals = generate_signals(market_data)

            signal_cache["signals"] = [s.model_dump() for s in signals]
            signal_cache["lastUpdated"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
            signal_cache["status"] = "updated"

            elapsed = round(time.time() - start, 1)
            print(f"✅ Signals refreshed: {len(signals)} signals in {elapsed}s")

        except Exception as e:
            print(f"❌ Refresh error: {e}")
            signal_cache["status"] = "error"

        await asyncio.sleep(REFRESH_INTERVAL)


@app.get("/signals")
async def get_signals(interval: str = "1h"):
    return {
        "interval": interval,
        "lastUpdated": signal_cache["lastUpdated"],
        "status": signal_cache["status"],
        "count": len(signal_cache["signals"]),
        "signals": signal_cache["signals"],
    }


@app.get("/health")
async def health():
    return {"status": "ok", "signals_count": len(signal_cache["signals"])}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
