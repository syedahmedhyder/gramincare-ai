"use client";

import React, { useState } from "react";
import { WifiOff, RotateCcw, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { useNetworkStatus } from "@/lib/useNetworkStatus";

export default function OfflineStateNotice() {
  const { isOnline, isChecking, checkConnection } = useNetworkStatus();
  const [minimized, setMinimized] = useState<boolean>(false);
  const [lastCheckResult, setLastCheckResult] = useState<string | null>(null);

  if (isOnline) {
    return null;
  }

  const handleRetry = async () => {
    const success = await checkConnection();
    if (success) {
      setLastCheckResult("Connection restored!");
    } else {
      setLastCheckResult("Still offline — using cached data.");
      setTimeout(() => setLastCheckResult(null), 3000);
    }
  };

  return (
    <aside
      role="region"
      aria-label="Offline status notification"
      className="fixed bottom-4 right-4 z-50 max-w-md w-[calc(100vw-2rem)] animate-in slide-in-from-bottom-3 duration-200"
    >
      <div className="bg-white rounded-2xl border-2 border-brand-gold/60 p-4 shadow-dropdown text-brand-charcoal text-xs">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="relative shrink-0">
              <img
                src="/icon-64.png"
                alt="GraminCare AI Symbol"
                className="w-9 h-9 object-contain rounded-xl shadow-2xs border border-brand-charcoalBorder"
              />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-brand-gold border-2 border-white flex items-center justify-center">
                <WifiOff className="w-2 h-2 text-brand-forest" />
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-sm text-brand-forest">
                  You're offline
                </h3>
                <span className="px-2 py-0.2 rounded-full bg-brand-goldMuted text-brand-goldDark text-[10px] font-bold">
                  Offline-First Active
                </span>
              </div>
              {!minimized && (
                <p className="text-brand-charcoalMuted leading-relaxed text-[11px]">
                  GraminCare AI is using saved information available on this device. All document checks, clinical triage, and emergency records remain fully functional.
                </p>
              )}
            </div>
          </div>

          <button
            onClick={() => setMinimized(!minimized)}
            className="p-1 rounded-lg text-brand-charcoalMuted hover:bg-brand-cream transition-colors"
            aria-label={minimized ? "Expand offline notice" : "Minimize offline notice"}
          >
            {minimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Action Controls */}
        {!minimized && (
          <div className="mt-3 pt-3 border-t border-brand-creamDark flex items-center justify-between gap-2">
            <span className="text-[10px] text-brand-forest font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-brand-teal" />
              Local cache operational
            </span>

            <div className="flex items-center gap-2">
              {lastCheckResult && (
                <span className="text-[10px] text-brand-goldDark font-semibold">
                  {lastCheckResult}
                </span>
              )}
              <button
                onClick={handleRetry}
                disabled={isChecking}
                className="px-3 py-1.5 rounded-xl bg-brand-forest hover:bg-brand-forestLight text-brand-cream text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs disabled:opacity-50"
              >
                <RotateCcw className={`w-3 h-3 ${isChecking ? "animate-spin" : ""}`} />
                <span>{isChecking ? "Testing..." : "Retry connection"}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
