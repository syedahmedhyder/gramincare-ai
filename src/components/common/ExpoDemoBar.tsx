"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ShieldCheck, WifiOff, FileCheck2, HeartPulse, Stethoscope } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function ExpoDemoBar() {
  const { language } = useLanguage();

  return (
    <div className="bg-brand-forestDark text-brand-cream border-b border-brand-forest text-xs py-2 px-4 shadow-soft">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Expo Title & Badges */}
        <div className="flex items-center flex-wrap gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-forest text-brand-gold font-bold border border-brand-gold/40">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            National Tech Expo 2026
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 text-brand-cream/80 text-[11px]">
            <WifiOff className="w-3 h-3 text-brand-tealLight" />
            Offline-First Resilience
          </span>
          <span className="hidden md:inline-flex items-center gap-1 text-brand-cream/80 text-[11px] border-l border-brand-forestLight pl-2.5">
            <ShieldCheck className="w-3 h-3 text-brand-gold" />
            Curated Indian Healthcare Benchmark
          </span>
        </div>

        {/* Right: One-Click Judge Scenarios */}
        <div className="flex items-center flex-wrap gap-1.5">
          <span className="text-brand-cream/60 font-semibold mr-1 hidden lg:inline text-[11px]">Judge Quick-Run:</span>
          
          <Link
            href="/schemes"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-forest hover:bg-brand-forestLight text-brand-cream border border-brand-forestLight hover:border-brand-gold transition-colors text-[11px] font-medium"
          >
            <FileCheck2 className="w-3 h-3 text-brand-gold" />
            <span>1. Document Mismatch & Fix</span>
          </Link>

          <Link
            href="/triage?demo=maternal"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-forest hover:bg-brand-forestLight text-brand-cream border border-brand-forestLight hover:border-brand-gold transition-colors text-[11px] font-medium"
          >
            <Stethoscope className="w-3 h-3 text-brand-tealLight" />
            <span>2. Maternal Emergency Triage</span>
          </Link>

          <Link
            href="/health-twin"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-forest hover:bg-brand-forestLight text-brand-cream border border-brand-forestLight hover:border-brand-gold transition-colors text-[11px] font-medium"
          >
            <HeartPulse className="w-3 h-3 text-brand-gold" />
            <span>3. Rural Health Twin</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
