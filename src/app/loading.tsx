"use client";

import React from "react";

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center select-none"
    >
      <div className="relative mb-4">
        <div className="absolute -inset-2 rounded-2xl bg-brand-gold/20 blur-sm animate-pulse" />
        <img
          src="/icon-64.png"
          alt="GraminCare AI Symbol"
          className="relative w-14 h-14 object-contain rounded-2xl shadow-card"
        />
      </div>

      <h2 className="text-sm font-extrabold text-brand-forest tracking-tight">
        Loading GraminCare AI...
      </h2>
      <p className="text-xs text-brand-charcoalMuted mt-1">
        Accessing verified rural healthcare benchmarks
      </p>

      {/* Smooth clinical progress indicator */}
      <div className="w-28 h-1 bg-brand-creamDark rounded-full overflow-hidden mt-4">
        <div className="w-1/2 h-full bg-gradient-to-r from-brand-forest to-brand-teal rounded-full animate-[progress_1.1s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}
