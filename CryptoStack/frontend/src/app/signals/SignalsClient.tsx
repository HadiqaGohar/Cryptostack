"use client";

import { useState, useEffect, useCallback, useMemo } from "react";

// ─── Types ──────────────────────────────────────────────────────────────────
interface MarketContext {
  trend: string;
  trendStrength: string;
  higherTimeframe: string;
  volatility: string;
  volume: string;
  funding: string;
  openInterest: string;
}

interface Signal {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  decision: "LONG" | "SHORT" | "WAIT" | "AVOID";
  strength: "Strong" | "Medium" | "Weak";
  riskLevel: string;
  entryPrice: number;
  entryZone: { low: number; high: number };
  stopLoss: number;
  takeProfit1: number;
  takeProfit2: number;
  takeProfit3: number;
  riskReward: number;
  leverageRange: string;
  marketContext: MarketContext;
  reason: string;
  signalTime: string;
  score: number;
  sparkline: number[];
}

// ─── Helpers ────────────────────────────────────────────────────────────────
function formatPrice(price: number): string {
  if (price === 0) return "—";
  if (price >= 100) return price.toLocaleString("en-US", { maximumFractionDigits: 2 });
  if (price >= 1) return price.toLocaleString("en-US", { maximumFractionDigits: 4 });
  if (price >= 0.01) return price.toLocaleString("en-US", { maximumFractionDigits: 6 });
  return price.toLocaleString("en-US", { maximumFractionDigits: 8 });
}

function formatTime(iso: string): string {
  try {
    return new Date(iso).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "—";
  }
}

function timeAgo(iso: string): string {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

// ─── Mini Sparkline SVG ─────────────────────────────────────────────────────
function Sparkline({ data, color }: { data: number[]; color: string }) {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const h = 32;
  const w = 80;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(" ");
  return (
    <svg width={w} height={h} className="shrink-0">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

// ─── Decision Badge ─────────────────────────────────────────────────────────
function DecisionBadge({ decision }: { decision: string }) {
  const styles: Record<string, string> = {
    LONG: "border-emerald-500/40 bg-emerald-500/15 text-emerald-200",
    SHORT: "border-rose-400/60 bg-rose-500/10 text-rose-100",
    WAIT: "border-amber-500/35 bg-amber-500/15 text-amber-100",
    AVOID: "border-zinc-500/60 bg-zinc-800/80 text-zinc-100",
  };
  return (
    <span className={`whitespace-nowrap rounded-md border px-2 py-1 text-xs font-semibold ${styles[decision] || styles.WAIT}`}>
      {decision}
    </span>
  );
}

// ─── Stat Box ───────────────────────────────────────────────────────────────
function StatBox({ label, value, reached }: { label: string; value: string; reached?: boolean }) {
  return (
    <div className={`rounded-md border px-3 py-2 ${reached ? "border-emerald-400/40 bg-emerald-500/15" : "border-white/10 bg-white/[0.03]"}`}>
      <div className={`text-[11px] uppercase tracking-normal ${reached ? "text-emerald-300" : "text-zinc-500"}`}>{label}</div>
      <div className={`mt-1 text-sm font-semibold ${reached ? "text-emerald-100" : "text-white"}`}>{value}</div>
      {reached && <div className="mt-1 text-[11px] font-semibold text-emerald-300">Reached</div>}
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────
export default function SignalsClient() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState<string>("BTCUSDT");
  const [interval, setInterval] = useState<"15m" | "1h">("1h");
  const [direction, setDirection] = useState<"All" | "LONG" | "SHORT">("All");
  const [search, setSearch] = useState("");
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [status, setStatus] = useState<"loading" | "updated" | "error">("loading");
  const [refreshing, setRefreshing] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showMobileDetail, setShowMobileDetail] = useState(false);

  // Fetch signals from Next.js API route (which proxies to Python backend)
  const fetchSignals = useCallback(async () => {
    try {
      setRefreshing(true);
      const res = await fetch(`/api/signals?interval=${interval}`);
      const data = await res.json();
      
      if (data.signals && data.signals.length > 0) {
        setSignals(data.signals);
        setLastUpdated(data.lastUpdated || new Date().toISOString());
        setStatus("updated");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Failed to fetch signals:", err);
      setStatus("error");
    } finally {
      setRefreshing(false);
    }
  }, [interval]);

  // Initial fetch + auto-refresh every 60s
  useEffect(() => {
    fetchSignals();
    const interval_id = window.setInterval(() => { fetchSignals(); }, 60000);
    return () => window.clearInterval(interval_id);
  }, [fetchSignals]);

  // Filter signals
  const filteredSignals = useMemo(() => {
    return signals.filter((s) => {
      if (direction !== "All" && s.decision !== direction) return false;
      if (search && !s.symbol.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [signals, direction, search]);

  const selectedSignal = signals.find((s) => s.symbol === selectedSymbol) || filteredSignals[0] || null;

  const statusColor: Record<string, string> = {
    updated: "bg-emerald-400",
    loading: "bg-sky-400",
    error: "bg-red-400",
  };
  const statusLabel: Record<string, string> = {
    updated: "Updated",
    loading: "Loading",
    error: "Refresh failed",
  };

  // ─── Render ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#07090f] text-zinc-100">
      {/* Spacer for Navbar */}
      <div className="h-16" />

      <div className="mx-auto w-full max-w-[1500px] flex-1 flex-col gap-4 px-4 py-6 sm:px-6 lg:px-8">
        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="border-b border-white/10 pb-4">
          <p className="text-xs font-semibold uppercase text-sky-300">AI trade ideas</p>
          <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">AI Signals Bot</h1>
        </div>

        {/* ── Filters Bar ───────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Timeframe Toggle */}
          <div className="flex shrink-0 rounded-md border border-white/10 bg-zinc-950 p-1">
            {(["15m", "1h"] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setInterval(tf)}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  interval === tf
                    ? "bg-sky-500 text-white"
                    : "text-zinc-400 hover:bg-white/10"
                }`}
              >
                {tf === "15m" ? "15m Faster" : "1h Hourly"}
              </button>
            ))}
          </div>

          {/* Direction Filter */}
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value as "All" | "LONG" | "SHORT")}
            className="h-11 rounded-md border border-white/10 bg-zinc-950 px-3 text-sm text-white outline-none"
          >
            <option value="All">Action: All</option>
            <option value="LONG">Action: Long</option>
            <option value="SHORT">Action: Short</option>
          </select>

          {/* Search */}
          <label className="flex h-11 min-w-52 items-center gap-2 rounded-md border border-white/10 bg-zinc-950 px-3 text-sm text-zinc-200">
            <svg className="h-4 w-4 shrink-0 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="BTCUSDT"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-white outline-none placeholder:text-zinc-600"
            />
          </label>

          {/* Refresh */}
          <button
            onClick={fetchSignals}
            disabled={refreshing}
            className="flex h-11 items-center gap-2 rounded-md border border-white/10 bg-zinc-950 px-4 text-sm text-zinc-200 transition-colors hover:bg-white/10"
          >
            <svg className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>

        {/* ── Status + Disclaimer ────────────────────────────────────── */}
        <div className="flex items-center gap-2 text-sm">
          <span className={`h-2 w-2 rounded-full ${statusColor[status]}`} />
          <span className="text-zinc-300">{statusLabel[status]}</span>
          {lastUpdated && <span className="text-zinc-500">| {timeAgo(lastUpdated)}</span>}
        </div>

        <div className="rounded-md border border-white/10 bg-white/[0.02] px-4 py-3 text-xs text-zinc-400">
          Signals are market ideas, not automatic trades. Always use stop-loss and risk only what you can afford to lose. Trade on{" "}
          <a href="https://cryptofleet.io" target="_blank" rel="noopener noreferrer" className="text-sky-400 underline">
            cryptofleet.io
          </a>
        </div>

        {/* ── Main Content: Table + Detail Panel ─────────────────────── */}
        <div className="flex flex-col gap-6 xl:flex-row">
          {/* ── Signal Table (left) ──────────────────────────────────── */}
          <div className="min-w-0 flex-1">
            {/* Desktop Table */}
            <div className="hidden lg:block">
              <table className="w-full table-fixed border-collapse text-left text-sm">
                <colgroup>
                  <col className="w-[32%]" />
                  <col className="w-[12%]" />
                  <col className="w-[10%]" />
                  <col className="w-[15%]" />
                  <col className="w-[15%]" />
                  <col className="w-[16%]" />
                </colgroup>
                <thead>
                  <tr className="bg-white/[0.03] text-xs uppercase tracking-normal text-zinc-500">
                    <th className="px-3 py-3 font-semibold">Symbol</th>
                    <th className="px-3 py-3 font-semibold">Decision</th>
                    <th className="px-3 py-3 font-semibold">Strength</th>
                    <th className="px-3 py-3 font-semibold">Entry near</th>
                    <th className="px-3 py-3 font-semibold">Stop loss</th>
                    <th className="px-3 py-3 font-semibold">Take profit</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSignals.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-16 text-center">
                        <div className="text-lg font-semibold text-white">No signals found</div>
                        <div className="mt-1 text-sm text-zinc-400">Try another timeframe or direction.</div>
                      </td>
                    </tr>
                  )}
                  {filteredSignals.map((signal) => (
                    <tr
                      key={signal.symbol}
                      onClick={() => { setSelectedSymbol(signal.symbol); setShowMobileDetail(true); }}
                      className={`cursor-pointer transition-colors ${
                        selectedSymbol === signal.symbol
                          ? "bg-white/[0.06]"
                          : "hover:bg-white/[0.04]"
                      } ${signal.decision === "WAIT" ? "border-l-2 border-l-amber-400/50" : ""}`}
                    >
                      <td className="px-3 py-4">
                        <div className="font-semibold text-white">{signal.name}</div>
                        <div className="text-xs text-zinc-500">{formatPrice(signal.price)} · {signal.change24h > 0 ? "+" : ""}{signal.change24h}%</div>
                        <div className="mt-1 max-w-[200px] truncate text-xs text-zinc-500">{signal.reason}</div>
                      </td>
                      <td className="px-3 py-4"><DecisionBadge decision={signal.decision} /></td>
                      <td className="px-3 py-4 text-sm font-semibold text-zinc-200">{signal.strength}</td>
                      <td className="px-3 py-4 font-mono text-sm tabular-nums">{formatPrice(signal.entryPrice)}</td>
                      <td className="px-3 py-4 font-mono text-sm tabular-nums text-rose-400">{formatPrice(signal.stopLoss)}</td>
                      <td className="px-3 py-4 font-mono text-sm tabular-nums text-emerald-400">{formatPrice(signal.takeProfit1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="grid gap-3 p-3 lg:hidden">
              {filteredSignals.length === 0 && (
                <div className="px-4 py-16 text-center">
                  <div className="text-lg font-semibold text-white">No signals found</div>
                  <div className="mt-1 text-sm text-zinc-400">Try another timeframe or direction.</div>
                </div>
              )}
              {filteredSignals.map((signal) => (
                <button
                  key={signal.symbol}
                  onClick={() => { setSelectedSymbol(signal.symbol); setShowMobileDetail(true); }}
                  className={`rounded-md border p-4 text-left transition-colors ${
                    selectedSymbol === signal.symbol
                      ? "border-sky-500/40 bg-sky-500/10"
                      : signal.decision === "WAIT"
                        ? "border-amber-500/25 bg-amber-500/5"
                        : "border-white/10 bg-black/25"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">{signal.name}</span>
                    <span className="text-xs text-zinc-500">{formatTime(signal.signalTime)}</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <DecisionBadge decision={signal.decision} />
                    <span className="whitespace-nowrap rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs font-semibold text-zinc-200">
                      {signal.strength}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-zinc-400">{signal.reason}</div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1">
                      <div className="text-[10px] uppercase text-zinc-500">Entry</div>
                      <div className="text-xs font-semibold text-white">{formatPrice(signal.entryPrice)}</div>
                    </div>
                    <div className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1">
                      <div className="text-[10px] uppercase text-zinc-500">Stop loss</div>
                      <div className="text-xs font-semibold text-rose-400">{formatPrice(signal.stopLoss)}</div>
                    </div>
                    <div className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1">
                      <div className="text-[10px] uppercase text-zinc-500">Take profit</div>
                      <div className="text-xs font-semibold text-emerald-400">{formatPrice(signal.takeProfit1)}</div>
                    </div>
                    <div className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1">
                      <div className="text-[10px] uppercase text-zinc-500">R/R</div>
                      <div className="text-xs font-semibold text-white">1:{signal.riskReward}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* ── Detail Panel (right, sticky) ──────────────────────────── */}
          {selectedSignal && (
            <>
              {/* Desktop */}
              <div className="hidden xl:block xl:min-w-[430px] xl:max-w-[430px]">
                <DetailPanel signal={selectedSignal} />
              </div>

              {/* Mobile Bottom Sheet */}
              {showMobileDetail && (
                <div className="fixed inset-0 z-50 xl:hidden">
                  <div className="absolute inset-0 bg-black/75" onClick={() => setShowMobileDetail(false)} />
                  <div className="absolute inset-x-0 bottom-0 flex h-[92vh] flex-col rounded-t-lg border border-white/10 bg-zinc-950 shadow-2xl">
                    <div className="flex items-center justify-center pt-3">
                      <div className="h-1.5 w-12 rounded-full bg-zinc-700" />
                    </div>
                    <div className="min-h-0 flex-1 overflow-y-auto p-4">
                      <DetailPanel signal={selectedSignal} onClose={() => setShowMobileDetail(false)} />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Detail Panel ───────────────────────────────────────────────────────────
function DetailPanel({ signal, onClose }: { signal: Signal; onClose?: () => void }) {
  const s = signal;
  const isLong = s.decision === "LONG";

  return (
    <div className="rounded-md border border-white/10 bg-zinc-950 p-5 lg:sticky lg:top-20">
      {/* Close button (mobile) */}
      {onClose && (
        <button onClick={onClose} className="absolute right-4 top-4 text-zinc-400 hover:text-white">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* Header */}
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-semibold text-white">{s.name}</h2>
        <DecisionBadge decision={s.decision} />
        <span className="whitespace-nowrap rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs font-semibold text-zinc-200">
          {s.strength}
        </span>
      </div>
      <p className="mt-1 text-xs text-zinc-500">{s.marketContext.trend} · {s.marketContext.trendStrength}</p>

      {/* Entry & Price Levels */}
      <div className="mt-5 rounded-md border border-white/10 bg-black/25 p-4">
        <h3 className="text-sm font-semibold text-white">Entry & Price Levels</h3>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <StatBox label="Entry near" value={`$${formatPrice(s.entryPrice)}`} />
          <StatBox label="Stop loss" value={`$${formatPrice(s.stopLoss)}`} />
          <StatBox label="Take profit" value={`$${formatPrice(s.takeProfit1)}`} />
          <StatBox label="Entry zone" value={`$${formatPrice(s.entryZone.low)} - $${formatPrice(s.entryZone.high)}`} />
          <StatBox label="Risk / reward" value={`1 : ${s.riskReward}`} />
          <StatBox label="Leverage range" value={s.leverageRange} />
          <StatBox label="Risk level" value={s.riskLevel} />
          <StatBox label="Score" value={`${s.score}/100`} />
        </div>
      </div>

      {/* Profit Targets */}
      <div className="mt-5 rounded-md border border-white/10 bg-black/25 p-4">
        <h3 className="text-sm font-semibold text-white">Profit targets</h3>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <StatBox label="TP 1" value={`$${formatPrice(s.takeProfit1)}`} />
          <StatBox label="TP 2" value={`$${formatPrice(s.takeProfit2)}`} />
          <StatBox label="TP 3" value={`$${formatPrice(s.takeProfit3)}`} />
        </div>
      </div>

      {/* Market Context */}
      <div className="mt-5 rounded-md border border-white/10 bg-black/25 p-4">
        <h3 className="text-sm font-semibold text-white">Market context</h3>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <StatBox label="Trend" value={`${s.marketContext.trend} (${s.marketContext.trendStrength})`} />
          <StatBox label="Higher timeframe" value={s.marketContext.higherTimeframe} />
          <StatBox label="Volatility" value={s.marketContext.volatility} />
          <StatBox label="Volume" value={s.marketContext.volume} />
          <StatBox label="Funding" value={s.marketContext.funding} />
          <StatBox label="Open interest" value={s.marketContext.openInterest} />
        </div>
      </div>

      {/* Reason */}
      <div className="mt-5 rounded-md border border-white/10 bg-black/25 p-4">
        <h3 className="text-sm font-semibold text-white">Reason</h3>
        <p className="mt-3 text-sm text-zinc-300">{s.reason}</p>
      </div>

      {/* Trade on cryptofleet */}
      <a
        href="https://cryptofleet.io"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-sky-500 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-600"
      >
        Trade on CryptoFleet
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>

      {/* Signal Time */}
      <p className="mt-3 text-center text-xs text-zinc-500">
        Signal time: {formatTime(s.signalTime)} UTC · Refreshes every 60s
      </p>
    </div>
  );
}
