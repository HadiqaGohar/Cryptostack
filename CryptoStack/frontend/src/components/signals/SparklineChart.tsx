"use client";

import { useMemo } from "react";

interface SparklineChartProps {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
}

export default function SparklineChart({
  data,
  color = "#36bb91",
  width = 120,
  height = 40,
}: SparklineChartProps) {
  const points = useMemo(() => {
    if (!data || data.length < 2) return "";

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    return data
      .map((value, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((value - min) / range) * (height - 4) - 2;
        return `${x},${y}`;
      })
      .join(" ");
  }, [data, width, height]);

  if (!points) {
    return (
      <svg width={width} height={height}>
        <line x1="0" y1={height / 2} x2={width} y2={height / 2} stroke={color} strokeWidth="1" opacity="0.3" />
      </svg>
    );
  }

  return (
    <svg width={width} height={height} className="w-full h-full">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
