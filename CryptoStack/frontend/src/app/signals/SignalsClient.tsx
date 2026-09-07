"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  SignalHeader,
  CoinList,
  CoinDetail,
  SignalDisclaimer,
} from "@/components/signals";
import type { CoinData } from "@/components/signals/CoinList";
import type { CoinDetailData } from "@/components/signals/CoinDetail";

export default function SignalsClient() {
  const [interval, setInterval_] = useState<"15m" | "1h">("15m");
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const [selectedCoin, setSelectedCoin] = useState<CoinDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchSignals = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/signals?interval=${interval}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setCoins(data.coins ?? []);
      setLastUpdated(new Date().toISOString());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load signals");
    } finally {
      setLoading(false);
    }
  }, [interval]);

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/signals?interval=${interval}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setCoins(data.coins ?? []);
        setLastUpdated(new Date().toISOString());
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(
          err instanceof Error ? err.message : "Failed to load signals"
        );
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => controller.abort();
  }, [interval]);

  useEffect(() => {
    intervalRef.current = setInterval(fetchSignals, 60000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchSignals]);

  const handleIntervalChange = useCallback((val: "15m" | "1h") => {
    setInterval_(val);
    setSelectedSymbol(null);
    setSelectedCoin(null);
    setShowDetail(false);
  }, []);

  const handleRefresh = useCallback(() => {
    fetchSignals();
  }, [fetchSignals]);

  const handleSelectCoin = useCallback(
    async (symbol: string) => {
      setSelectedSymbol(symbol);
      setShowDetail(true);

      try {
        const res = await fetch(
          `/api/signals?interval=${interval}&symbol=${symbol}`
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setSelectedCoin(data.coin ?? null);
      } catch {
        setSelectedCoin(null);
      }
    },
    [interval]
  );

  const handleBack = useCallback(() => {
    setShowDetail(false);
    setSelectedSymbol(null);
    setSelectedCoin(null);
  }, []);

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col">
      <SignalHeader
        interval={interval}
        onIntervalChange={handleIntervalChange}
        onRefresh={handleRefresh}
        lastUpdated={lastUpdated}
        loading={loading}
      />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {error && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-center">
            <p className="text-red-400 text-sm mb-3">{error}</p>
            <button
              onClick={handleRefresh}
              className="rounded-lg bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-400 transition-colors hover:bg-red-500/30"
            >
              Retry
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* CoinList */}
          <div
            className={`md:col-span-2 ${
              showDetail && selectedSymbol ? "hidden md:block" : "block"
            }`}
          >
            <CoinList
              coins={coins}
              selectedSymbol={selectedSymbol}
              onSelect={handleSelectCoin}
              loading={loading}
            />
          </div>

          {/* CoinDetail */}
          <div
            className={`md:col-span-3 ${
              !showDetail && !selectedSymbol ? "hidden md:block" : "block"
            }`}
          >
            {selectedSymbol && selectedCoin ? (
              <div>
                <button
                  onClick={handleBack}
                  className="md:hidden mb-4 flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  ← Back to list
                </button>
                <CoinDetail coin={selectedCoin} />
              </div>
            ) : (
              <div className="hidden md:flex items-center justify-center h-[500px] bg-dark-800 rounded-xl border border-dark-600">
                <p className="text-gray-500 text-sm">
                  👈 Select a coin to view signal details
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <SignalDisclaimer />
    </div>
  );
}
