"use client"

import React, { useEffect, useRef, useState } from 'react';

// WishCounterComponent.tsx
// A centered UI component that shows a live, animated counter
// and a "Wish now" button. Built with React + Tailwind CSS.
// - Counter animates smoothly from previous value to new value
// - Click "Wish now" increments the count and persists to localStorage
// - Accessible button with simple visual feedback

export default function WishCounterComponent({
  initial = 9384, // default starting value (you can override when importing)
  storageKey = 'wish_counter_value',
}: {
  initial?: number;
  storageKey?: string;
}) {
  const [count, setCount] = useState<number>(initial);
  const [isWished, setIsWished] = useState<boolean>(false);
  const rafRef = useRef<number | null>(null);
  const animStartRef = useRef<number | null>(null);
  const animFromRef = useRef<number>(initial);
  const animToRef = useRef<number>(initial);

  // Load persisted count from localStorage (if available)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = parseInt(stored, 10);
        if (!Number.isNaN(parsed)) {
          setCount(parsed);
          animFromRef.current = parsed;
          animToRef.current = parsed;
        }
      }
      // also check if user already wished (so button can show state)
      const wished = localStorage.getItem(storageKey + ':wished');
      setIsWished(wished === 'true');
    } catch (e) {
      // ignore (e.g., private mode)
    }
  }, [storageKey]);

  // Generic smooth number animator using requestAnimationFrame
  const animateTo = (to: number, duration = 600) => {
    cancelAnimation();
    animFromRef.current = count;
    animToRef.current = to;
    animStartRef.current = performance.now();

    const step = (now: number) => {
      if (!animStartRef.current) return;
      const elapsed = now - animStartRef.current;
      const t = Math.min(1, elapsed / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(animFromRef.current + (animToRef.current - animFromRef.current) * eased);
      setCount(value);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        rafRef.current = null;
        // persist final value
        try {
          localStorage.setItem(storageKey, String(to));
        } catch (e) {}
      }
    };

    rafRef.current = requestAnimationFrame(step);
  };

  const cancelAnimation = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    animStartRef.current = null;
  };

  // click handler for "Wish now"
  const handleWish = () => {
    // if user already wished, do nothing (or toggle depending on requirement)
    if (isWished) return;

    const newVal = (animToRef.current ?? count) + 1;
    animToRef.current = newVal;
    setIsWished(true);
    try {
      localStorage.setItem(storageKey + ':wished', 'true');
    } catch (e) {}

    // animate counter to new value
    animateTo(newVal, 700);

    // small visual feedback (could expand to confetti, etc.)
  };

  // cleanup RAF on unmount
  useEffect(() => {
    return () => cancelAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-[240px] flex items-center justify-center p-6">
      <div className="max-w-xl w-full text-center  rounded-2xl  p-8">
        {/* <p className="text-sm uppercase tracking-wide text-slate-600 mb-2">Currently</p>
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-3">
          {count.toLocaleString()} <span className="text-lg font-medium text-slate-700">people visited</span>
        </h2> */}

        <p className="text-slate-600 mb-6">So far, <strong>{count.toLocaleString()}  </strong> people have extended their wishes to Dr. Ramdas Pai. You may share yours too.</p>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleWish}
            disabled={isWished}
            aria-pressed={isWished}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform active:scale-[0.98] ${
              isWished
                ? 'bg-slate-200 text-slate-600 cursor-default'
                : 'bg-indigo-600 text-white hover:brightness-110'
            }`}
          >
            {isWished ? 'Wished' : 'Wish now'}
          </button>

          {/* <button
            onClick={() => {
              // quick demo: reset persisted wished state (dev only)
              try {
                localStorage.removeItem(storageKey + ':wished');
                localStorage.removeItem(storageKey);
              } catch (e) {}
              // reset to initial value visually
              setIsWished(false);
              animateTo(initial, 600);
            }}
            className="text-sm underline text-slate-600"
            title="Reset demo state"
          >
            Reset
          </button> */}
        </div>

        {/* <p className="mt-4 text-xs text-slate-500">Counts are stored locally in your browser. To persist globally (Firebase), I can add that for you.</p> */}
      </div>
    </div>
  );
}
