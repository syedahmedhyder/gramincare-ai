"use client";

import React, { useState, useEffect } from "react";

export default function StartupSplashScreen() {
  const [stage, setStage] = useState<"visible" | "fading" | "hidden">("visible");

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setStage("hidden");
      return;
    }

    // Check if splash already ran in this session
    try {
      const alreadyShown = sessionStorage.getItem("gramincare_splash_shown");
      if (alreadyShown) {
        setStage("hidden");
        return;
      }
    } catch {
      // Ignore sessionStorage errors
    }

    // Timeline: 1.1s reveal + 0.3s fadeout = ~1.4s total
    const fadeTimer = setTimeout(() => {
      setStage("fading");
    }, 1150);

    const hideTimer = setTimeout(() => {
      setStage("hidden");
      try {
        sessionStorage.setItem("gramincare_splash_shown", "true");
      } catch {
        // Ignore
      }
    }, 1450);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (stage === "hidden") {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading GraminCare AI"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-cream text-brand-charcoal select-none transition-opacity duration-300 ${
        stage === "fading" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background Soft Ambience */}
      <div className="absolute inset-0 bg-radial from-white/70 via-transparent to-brand-creamDark/40 pointer-events-none" />

      {/* Main Brand Box */}
      <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center animate-in fade-in zoom-in-95 duration-700">
        {/* Logo with Soft Aura */}
        <div className="relative mb-5 group">
          <div className="absolute -inset-2 rounded-3xl bg-brand-gold/15 blur-lg opacity-75 animate-pulse" />
          <img
            src="/logo.jpg"
            alt="GraminCare AI Official Logo"
            className="relative h-28 sm:h-32 w-auto object-contain rounded-2xl shadow-card"
          />
        </div>

        {/* Brand Tagline */}
        <div className="space-y-2 mt-1">
          <p className="text-[11px] sm:text-xs font-black tracking-widest text-brand-forest uppercase">
            BRIDGING CARE. EMPOWERING RURAL LIVES.
          </p>

          {/* Tri-color dots signature */}
          <div className="flex items-center justify-center gap-2 pt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-forest" />
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
            <span className="w-1.5 h-1.5 rounded-full bg-brand-teal" />
          </div>
        </div>

        {/* Subtle, calm loading indicator bar */}
        <div className="w-36 h-1 bg-brand-charcoalBorder/50 rounded-full overflow-hidden mt-6">
          <div className="h-full bg-gradient-to-r from-brand-forest via-brand-gold to-brand-teal rounded-full animate-[progress_1.2s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
