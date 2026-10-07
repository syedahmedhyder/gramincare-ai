"use client";

import React from "react";
import { 
  Building2, 
  Layers, 
  Landmark, 
  CreditCard, 
  Activity, 
  CheckCircle2, 
  FileCheck, 
  TrendingUp, 
  ExternalLink 
} from "lucide-react";
import { NATIONAL_STATS, KARNATAKA_ARK_STATS } from "@/lib/schemes-finder";

export default function VisualDataSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Main Section Header */}
      <div className="space-y-2 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-forest text-brand-gold text-xs font-bold border border-brand-gold/30">
          <Layers className="w-3.5 h-3.5" />
          <span>Verified Government Data</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-forest tracking-tight">
          India's Health Benefit Landscape
        </h2>
        <p className="text-brand-charcoalMuted text-xs sm:text-sm leading-relaxed">
          Aggregated statutory figures across Central and State portals — visualizing the magnitude of public healthcare coverage.
        </p>
      </div>

      {/* Part 1: National Verified Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-brand-charcoalBorder shadow-soft space-y-2 hover:-translate-y-1 transition-transform">
          <div className="w-10 h-10 rounded-2xl bg-brand-forest text-brand-gold flex items-center justify-center font-bold">
            <Landmark className="w-5 h-5" />
          </div>
          <div className="text-2xl sm:text-4xl font-black text-brand-forest tracking-tight">
            {NATIONAL_STATS.totalSchemes}
          </div>
          <p className="text-xs font-bold text-brand-charcoal">
            Government Schemes
          </p>
          <p className="text-[11px] text-brand-charcoalMuted">
            Catalogued nationwide on official portals
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-brand-charcoalBorder shadow-soft space-y-2 hover:-translate-y-1 transition-transform">
          <div className="w-10 h-10 rounded-2xl bg-brand-tealMuted text-brand-teal flex items-center justify-center font-bold">
            <Activity className="w-5 h-5" />
          </div>
          <div className="text-2xl sm:text-4xl font-black text-brand-teal tracking-tight">
            {NATIONAL_STATS.healthWellnessSchemes}
          </div>
          <p className="text-xs font-bold text-brand-charcoal">
            Health & Wellness Schemes
          </p>
          <p className="text-[11px] text-brand-charcoalMuted">
            Dedicated health insurance & clinical support
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-brand-charcoalBorder shadow-soft space-y-2 hover:-translate-y-1 transition-transform">
          <div className="w-10 h-10 rounded-2xl bg-brand-goldMuted text-brand-goldDark flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="text-2xl sm:text-4xl font-black text-brand-forest tracking-tight">
            {NATIONAL_STATS.centralSchemes}
          </div>
          <p className="text-xs font-bold text-brand-charcoal">
            Central Schemes
          </p>
          <p className="text-[11px] text-brand-charcoalMuted">
            Directly funded pan-India welfare missions
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-brand-charcoalBorder shadow-soft space-y-2 hover:-translate-y-1 transition-transform">
          <div className="w-10 h-10 rounded-2xl bg-brand-cream text-brand-forest border border-brand-charcoalBorder/60 flex items-center justify-center font-bold">
            <Layers className="w-5 h-5" />
          </div>
          <div className="text-2xl sm:text-4xl font-black text-brand-forest tracking-tight">
            {NATIONAL_STATS.stateUtSchemes}
          </div>
          <p className="text-xs font-bold text-brand-charcoal">
            State / UT Schemes
          </p>
          <p className="text-[11px] text-brand-charcoalMuted">
            Regional state-level healthcare programs
          </p>
        </div>
      </div>

      {/* National Source Citation Bar */}
      <div className="flex items-center justify-between text-[11px] text-brand-charcoalMuted px-2">
        <span>Source: <strong>{NATIONAL_STATS.source}</strong></span>
        <a
          href={NATIONAL_STATS.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-brand-teal flex items-center gap-1 font-semibold"
        >
          <span>myScheme.gov.in</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Part 2: Karnataka Subsection — AB-ArK */}
      <div className="bg-brand-forest text-brand-cream rounded-3xl p-6 sm:p-8 border border-brand-forestLight shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-brand-forestLight pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-brand-gold text-brand-forest font-black text-[11px] uppercase tracking-wide">
                State Spotlight
              </span>
              <span className="text-xs text-brand-cream/80">
                Reporting Period: <strong>{KARNATAKA_ARK_STATS.reportingPeriod}</strong>
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Karnataka — AB-ArK (Ayushman Bharat - Arogya Karnataka)
            </h3>
          </div>

          <div className="text-xs text-brand-gold bg-brand-forestDark px-3 py-1.5 rounded-xl border border-brand-gold/30 self-start sm:self-auto font-bold">
            Live Health Implementation
          </div>
        </div>

        {/* Karnataka Big Stat Tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-brand-forestDark/80 p-4 sm:p-5 rounded-2xl border border-brand-forestLight space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-brand-gold">
              {KARNATAKA_ARK_STATS.treatmentPackages}
            </span>
            <p className="font-bold text-xs text-white">Treatment Packages</p>
            <p className="text-[11px] text-brand-cream/70">Medical & surgical care procedures</p>
          </div>

          <div className="bg-brand-forestDark/80 p-4 sm:p-5 rounded-2xl border border-brand-forestLight space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-brand-gold">
              {KARNATAKA_ARK_STATS.totalEmpanelledHospitals}
            </span>
            <p className="font-bold text-xs text-white">Empanelled Hospitals</p>
            <p className="text-[11px] text-brand-cream/70">
              {KARNATAKA_ARK_STATS.governmentHospitals} Govt • {KARNATAKA_ARK_STATS.privateHospitals} Private
            </p>
          </div>

          <div className="bg-brand-forestDark/80 p-4 sm:p-5 rounded-2xl border border-brand-forestLight space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-brand-gold">
              {KARNATAKA_ARK_STATS.cardsIssued}
            </span>
            <p className="font-bold text-xs text-white">AB-ArK Cards Issued</p>
            <p className="text-[11px] text-brand-cream/70">Beneficiaries registered across 31 districts</p>
          </div>

          <div className="bg-brand-forestDark/80 p-4 sm:p-5 rounded-2xl border border-brand-forestLight space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-brand-gold">
              {KARNATAKA_ARK_STATS.claimsPaid}
            </span>
            <p className="font-bold text-xs text-white">Claims Paid</p>
            <p className="text-[11px] text-brand-gold/90 font-bold">
              {KARNATAKA_ARK_STATS.amountPaidCrores} settled
            </p>
          </div>
        </div>

        {/* Statistical Clarification & Verification Area */}
        <div className="pt-2 border-t border-brand-forestLight flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-brand-cream/70">
          <p className="italic">
            {KARNATAKA_ARK_STATS.claimsPaidClarification}
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <span>Source: {KARNATAKA_ARK_STATS.source}</span>
            <span>•</span>
            <span className="text-brand-gold font-medium">Verified: {KARNATAKA_ARK_STATS.lastVerifiedDate}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
