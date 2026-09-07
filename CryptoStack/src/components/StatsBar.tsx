"use client";

import { useState, useEffect, useRef } from "react";

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface StatsBarProps {
  stats?: StatItem[];
}

const defaultStats: StatItem[] = [
  { value: 5000, suffix: "+", label: "Active Traders" },
  { value: 100000, suffix: "+", label: "Trades Completed" },
  { value: 2, suffix: "M+", label: "Total Volume" },
];

function formatNumber(value: number, suffix: string): string {
  if (suffix === "M+") {
    return `${value}M+`;
  }
  return `${value.toLocaleString()}${suffix}`;
}

function useCountUp(target: number, duration: number = 2000, inView: boolean): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration, inView]);

  return count;
}

function StatCounter({ item, inView }: { item: StatItem; inView: boolean }) {
  const count = useCountUp(item.value, 2000, inView);

  return (
    <div className="flex flex-col items-center gap-1 px-6 py-4">
      <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">
        {formatNumber(count, item.suffix)}
      </p>
      <p className="text-sm text-gray-500">{item.label}</p>
    </div>
  );
}

export default function StatsBar({ stats = defaultStats }: StatsBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="border-y border-white/5 bg-dark-800/50 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {stats.map((stat, i) => (
            <StatCounter key={i} item={stat} inView={inView} />
          ))}
        </div>
      </div>
    </div>
  );
}
