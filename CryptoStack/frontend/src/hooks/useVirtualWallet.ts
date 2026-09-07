"use client";

import { useState, useEffect, useCallback } from "react";

export interface Position {
  id: string;
  symbol: string;
  direction: "LONG" | "SHORT";
  size: number;
  entryPrice: number;
  amountSpent: number;
  openedAt: number;
}

export interface OrderHistoryEntry {
  id: string;
  symbol: string;
  direction: "LONG" | "SHORT";
  size: number;
  entryPrice: number;
  closePrice: number;
  amountSpent: number;
  pnl: number;
  pnlPercent: number;
  openedAt: number;
  closedAt: number;
}

const INITIAL_BALANCE = 500;
const STORAGE_KEY = "cryptostack-virtual-wallet";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function loadFromStorage(): { balance: number; positions: Position[]; history: OrderHistoryEntry[] } | null {
  if (typeof window === "undefined") return null;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch {}
  return null;
}

function saveToStorage(data: { balance: number; positions: Position[]; history: OrderHistoryEntry[] }) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

export function useVirtualWallet() {
  const [balance, setBalance] = useState<number>(INITIAL_BALANCE);
  const [positions, setPositions] = useState<Position[]>([]);
  const [history, setHistory] = useState<OrderHistoryEntry[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = loadFromStorage();
    if (saved) {
      setBalance(saved.balance);
      setPositions(saved.positions);
      setHistory(saved.history);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      saveToStorage({ balance, positions, history });
    }
  }, [balance, positions, history, mounted]);

  const openPosition = useCallback(
    (symbol: string, direction: "LONG" | "SHORT", amount: number, currentPrice: number) => {
      if (amount <= 0 || amount > balance) return false;

      const size = amount / currentPrice;
      const newPosition: Position = {
        id: generateId(),
        symbol,
        direction,
        size,
        entryPrice: currentPrice,
        amountSpent: amount,
        openedAt: Date.now(),
      };

      setBalance((prev) => prev - amount);
      setPositions((prev) => [...prev, newPosition]);
      return true;
    },
    [balance]
  );

  const closePosition = useCallback(
    (positionId: string, currentPrice: number) => {
      const position = positions.find((p) => p.id === positionId);
      if (!position) return null;

      let pnl: number;
      if (position.direction === "LONG") {
        pnl = (currentPrice - position.entryPrice) * position.size;
      } else {
        pnl = (position.entryPrice - currentPrice) * position.size;
      }

      const pnlPercent = (pnl / position.amountSpent) * 100;
      const newBalance = position.amountSpent + pnl;

      const historyEntry: OrderHistoryEntry = {
        id: position.id,
        symbol: position.symbol,
        direction: position.direction,
        size: position.size,
        entryPrice: position.entryPrice,
        closePrice: currentPrice,
        amountSpent: position.amountSpent,
        pnl,
        pnlPercent,
        openedAt: position.openedAt,
        closedAt: Date.now(),
      };

      setBalance((prev) => prev + newBalance);
      setPositions((prev) => prev.filter((p) => p.id !== positionId));
      setHistory((prev) => [historyEntry, ...prev]);

      return historyEntry;
    },
    [positions]
  );

  const resetBalance = useCallback(() => {
    setBalance(INITIAL_BALANCE);
    setPositions([]);
    setHistory([]);
  }, []);

  const getPnL = useCallback(
    (positionId: string, currentPrice: number) => {
      const position = positions.find((p) => p.id === positionId);
      if (!position) return { pnl: 0, pnlPercent: 0 };

      let pnl: number;
      if (position.direction === "LONG") {
        pnl = (currentPrice - position.entryPrice) * position.size;
      } else {
        pnl = (position.entryPrice - currentPrice) * position.size;
      }

      const pnlPercent = (pnl / position.amountSpent) * 100;
      return { pnl, pnlPercent };
    },
    [positions]
  );

  return {
    balance,
    positions,
    history,
    mounted,
    openPosition,
    closePosition,
    resetBalance,
    getPnL,
    maxPositions: 10,
    canOpenPosition: positions.length < 10 && balance > 0,
  };
}
