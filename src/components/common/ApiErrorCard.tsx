"use client";

import React from "react";
import { RotateCcw, AlertCircle } from "lucide-react";

interface ApiErrorCardProps {
  onRetry?: () => void;
  title?: string;
  message?: string;
  compact?: boolean;
}

export default function ApiErrorCard({
  onRetry,
  title = "Something didn't go as planned.",
  message = "Please try again.",
  compact = false,
}: ApiErrorCardProps) {
  if (compact) {
    return (
      <div className="p-3 rounded-2xl bg-brand-goldMuted/70 border border-brand-gold/40 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <img
            src="/icon-64.png"
            alt="GraminCare AI Symbol"
            className="w-5 h-5 object-contain rounded-md"
          />
          <span className="font-bold text-brand-forest">{title}</span>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-2.5 py-1 rounded-lg bg-brand-forest hover:bg-brand-forestLight text-brand-cream text-[11px] font-bold flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3 text-brand-gold" />
            <span>Try Again</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="w-full p-6 sm:p-8 rounded-3xl bg-white border border-brand-charcoalBorder shadow-card text-center max-w-md mx-auto my-6">
      {/* Symbol Emblem */}
      <div className="relative mb-4 inline-block">
        <img
          src="/icon-64.png"
          alt="GraminCare AI Symbol"
          className="w-14 h-14 object-contain rounded-2xl shadow-soft border border-brand-charcoalBorder mx-auto"
        />
        <span className="absolute -bottom-1 -right-1 p-1 rounded-full bg-brand-gold text-brand-forest shadow-xs">
          <AlertCircle className="w-3.5 h-3.5" />
        </span>
      </div>

      <h3 className="text-base font-extrabold text-brand-forest mb-1">
        {title}
      </h3>
      <p className="text-xs text-brand-charcoalMuted mb-6 leading-relaxed">
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="px-5 py-2.5 rounded-xl bg-brand-forest hover:bg-brand-forestLight text-brand-cream text-xs font-bold inline-flex items-center gap-2 shadow-xs transition-colors hover:scale-105 active:scale-95"
        >
          <RotateCcw className="w-4 h-4 text-brand-gold" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
}
