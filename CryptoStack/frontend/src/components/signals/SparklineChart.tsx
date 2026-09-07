"use client";

import { useMemo } from "react";

export interface SparklineChartProps {
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
    const safeData = data.length > 0 ? data : [50];
    const len = safeData.length;
    const minVal = Math.min(...safeData);
    const maxVal = Math.max(...safeData);
    const range = maxVal - minVal || 1;
    const padY = 4;
    const padX = 2;
    const innerW = width - padX * 2;
    const innerH = height - padY * 2;

    return safeData
      .map((v, i) => {
        const x = padX + (i / (len - 1)) * innerW;
        const y = padY + innerH - ((v - minVal) / range) * innerH;
        return `${x},${y}`;
      })
      .join(" ");
  }, [data, width, height]);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-label="Sparkline chart"
      className="inline-block"
    >
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
