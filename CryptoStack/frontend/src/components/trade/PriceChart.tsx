"use client";

import { useEffect, useRef, useState } from "react";
import { createChart, ColorType, CandlestickSeries, HistogramSeries } from "lightweight-charts";

interface Kline {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface PriceChartProps {
  symbol: string;
  interval: string;
  onIntervalChange: (interval: string) => void;
}

export default function PriceChart({ symbol, interval, onIntervalChange }: PriceChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const [klines, setKlines] = useState<Kline[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch klines
  useEffect(() => {
    const fetchKlines = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/trade/klines?symbol=${symbol}&interval=${interval}&limit=100`);
        const data = await res.json();
        if (data.klines) setKlines(data.klines);
      } catch (err) {
        console.error("Failed to fetch klines:", err);
      }
      setLoading(false);
    };

    fetchKlines();
    const timer = setInterval(fetchKlines, 30000); // Refresh every 30s
    return () => clearInterval(timer);
  }, [symbol, interval]);

  // Create/update chart
  useEffect(() => {
    if (!chartContainerRef.current || klines.length === 0) return;

    // Clear previous chart
    if (chartRef.current) {
      chartRef.current.remove();
      chartRef.current = null;
    }

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#9ca3af",
        fontSize: 12,
      },
      grid: {
        vertLines: { color: "rgba(156, 163, 175, 0.1)" },
        horzLines: { color: "rgba(156, 163, 175, 0.1)" },
      },
      crosshair: {
        vertLine: { color: "rgba(156, 163, 175, 0.3)", width: 1, style: 2 },
        horzLine: { color: "rgba(156, 163, 175, 0.3)", width: 1, style: 2 },
      },
      rightPriceScale: {
        borderColor: "rgba(156, 163, 175, 0.2)",
      },
      timeScale: {
        borderColor: "rgba(156, 163, 175, 0.2)",
        timeVisible: true,
        secondsVisible: false,
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
    });

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#10b981",
      downColor: "#ef4444",
      borderUpColor: "#10b981",
      borderDownColor: "#ef4444",
      wickUpColor: "#10b981",
      wickDownColor: "#ef4444",
    });

    const volumeSeries = chart.addSeries(HistogramSeries, {
      priceFormat: { type: "volume" },
      priceScaleId: "",
    });

    volumeSeries.priceScale().applyOptions({
      scaleMargins: { top: 0.8, bottom: 0 },
    });

    candlestickSeries.setData(
      klines.map((k) => ({
        time: k.time as any,
        open: k.open,
        high: k.high,
        low: k.low,
        close: k.close,
      }))
    );

    volumeSeries.setData(
      klines.map((k) => ({
        time: k.time as any,
        value: k.volume,
        color: k.close >= k.open ? "rgba(16, 185, 129, 0.3)" : "rgba(239, 68, 68, 0.3)",
      }))
    );

    chart.timeScale().fitContent();
    chartRef.current = chart;

    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [klines]);

  const intervals = ["1m", "5m", "15m", "1h"];

  return (
    <div className="bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-xl overflow-hidden">
      {/* Interval Toggle */}
      <div className="flex items-center gap-2 p-3 border-b border-gray-200 dark:border-dark-600">
        {intervals.map((int) => (
          <button
            key={int}
            onClick={() => onIntervalChange(int)}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              interval === int
                ? "bg-brand text-white"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-dark-700"
            }`}
          >
            {int}
          </button>
        ))}
        <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">
          {symbol.replace("USDT", "/USDT")} • {interval}
        </span>
      </div>

      {/* Chart */}
      <div className="p-2">
        {loading ? (
          <div className="h-[400px] flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div ref={chartContainerRef} className="w-full" />
        )}
      </div>
    </div>
  );
}
