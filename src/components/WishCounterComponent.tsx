"use client";

import React, { useEffect, useRef, useState } from "react";

export default function WishCounterComponent({
  initial = 9384, // target value
  base = 8696, // starting value for animation
  storageKey = "wish_counter_value",
}: {
  initial?: number;
  base?: number;
  storageKey?: string;
}) {
  const [count, setCount] = useState<number>(base);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    let finalValue = initial;

    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = parseInt(stored, 10);
        if (!Number.isNaN(parsed)) {
          finalValue = parsed;
        }
      }
    } catch (e) {}

    const duration = 2000; // 2s counter run
    const step = (now: number) => {
      if (!startTimeRef.current) startTimeRef.current = now;
      const elapsed = now - startTimeRef.current;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = base + (finalValue - base) * eased;
      setCount(value);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        try {
          localStorage.setItem(storageKey, String(finalValue));
        } catch (e) {}
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [initial, base, storageKey]);

  return (
    <div className="min-h-[260px] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center rounded-2xl p-8">
        <p className="text-5xl md:text-6xl font-bold text-[#E85B25] mb-4">
          {count.toFixed(0).toLocaleString()}
        </p>
        <p className="text-xl md:text-2xl text-slate-700">
          Amazing people have already shared their warm wishes with{" "}
          <span className="font-semibold">Dr. Ramdas Pai</span>.  
          🌸 Would you like to add yours too?
        </p>
      </div>
    </div>
  );
}
