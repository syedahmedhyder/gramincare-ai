"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { RotateCcw, Home, AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("GraminCare AI Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
      {/* Official Symbol Mark */}
      <div className="relative mb-5">
        <img
          src="/icon-64.png"
          alt="GraminCare AI Symbol"
          className="w-16 h-16 object-contain rounded-2xl shadow-card border border-brand-charcoalBorder mx-auto"
        />
        <span className="absolute -bottom-1 -right-1 p-1 rounded-full bg-brand-gold text-brand-forest shadow-xs">
          <AlertCircle className="w-4 h-4" />
        </span>
      </div>

      <h2 className="text-lg font-black text-brand-forest mb-1.5">
        Something didn't go as planned.
      </h2>

      <p className="text-xs text-brand-charcoalMuted mb-6 leading-relaxed">
        GraminCare AI encountered an issue rendering this section. Saved records and other modules remain safe.
      </p>

      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => reset()}
          className="px-4 py-2.5 rounded-xl bg-brand-forest hover:bg-brand-forestLight text-brand-cream text-xs font-bold flex items-center gap-2 transition-colors shadow-xs"
        >
          <RotateCcw className="w-4 h-4 text-brand-gold" />
          <span>Try Again</span>
        </button>

        <Link
          href="/"
          className="px-4 py-2.5 rounded-xl bg-white border border-brand-charcoalBorder text-brand-charcoal hover:bg-brand-cream text-xs font-semibold flex items-center gap-2 transition-colors"
        >
          <Home className="w-4 h-4 text-brand-teal" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}
