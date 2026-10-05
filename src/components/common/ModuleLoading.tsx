"use client";

import React from "react";

interface ModuleLoadingProps {
  label?: string;
  compact?: boolean;
}

export default function ModuleLoading({
  label = "Loading GraminCare AI module...",
  compact = false,
}: ModuleLoadingProps) {
  if (compact) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-brand-cream border border-brand-charcoalBorder text-xs text-brand-charcoal"
      >
        <img
          src="/icon-64.png"
          alt="GraminCare AI Symbol"
          className="w-4 h-4 object-contain rounded-md animate-pulse"
        />
        <span className="font-semibold text-brand-forest">{label}</span>
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="w-full min-h-[220px] flex flex-col items-center justify-center p-6 text-center rounded-3xl bg-white border border-brand-charcoalBorder shadow-soft select-none"
    >
      <div className="relative mb-3.5">
        <div className="absolute -inset-1.5 rounded-2xl bg-brand-gold/20 blur-xs animate-pulse" />
        <img
          src="/icon-64.png"
          alt="GraminCare AI Symbol"
          className="relative w-12 h-12 object-contain rounded-xl shadow-2xs"
        />
      </div>

      <p className="text-xs font-bold text-brand-forest tracking-tight">
        {label}
      </p>
      <p className="text-[11px] text-brand-charcoalMuted mt-0.5">
        Processing verified local clinical & document rules
      </p>

      {/* Subtle pulsing line */}
      <div className="w-24 h-1 bg-brand-creamDark rounded-full overflow-hidden mt-3">
        <div className="w-1/2 h-full bg-brand-forest rounded-full animate-[progress_1s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}
