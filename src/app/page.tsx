"use client";

import React from "react";
import Link from "next/link";
import { 
  FileCheck2, 
  Stethoscope, 
  Ambulance, 
  HeartPulse, 
  Users, 
  Volume2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle 
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function HomePage() {
  const { t, speak } = useLanguage();

  const handleVoiceWelcome = () => {
    speak(
      "Welcome to GraminCare AI. A healthcare technology platform for rural India. Providing vernacular document readiness for government health schemes, clinical triage decision support, and rural emergency redirection."
    );
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Hero Section: Deep Forest Green with Soft Cream & Warm Gold */}
      <section className="bg-brand-forest text-brand-cream pt-14 pb-18 px-4 sm:px-6 lg:px-8 border-b border-brand-forestLight shadow-soft">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-forestDark text-brand-gold border border-brand-gold/30 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                <span>National Technology Innovation Expo 2026</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
                Healthcare Technology & Entitlement Delivery for Rural India
              </h1>

              {/* Body Text */}
              <p className="text-brand-cream/85 text-base sm:text-lg leading-relaxed font-normal">
                GraminCare AI closes the last-mile healthcare gap. We assist rural families in identifying and resolving document discrepancies before government scheme submission, provide vernacular voice triage, and map immediate emergency care.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  href="/schemes"
                  className="px-6 py-3.5 rounded-xl bg-brand-gold hover:bg-brand-goldLight text-brand-forest font-black text-sm flex items-center gap-2 shadow-card transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  <FileCheck2 className="w-4 h-4 text-brand-forest" />
                  <span>Document Readiness Check</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>

                <Link
                  href="/triage"
                  className="px-6 py-3.5 rounded-xl bg-brand-forestDark hover:bg-brand-forestLight text-brand-cream font-bold text-sm flex items-center gap-2 border border-brand-forestLight transition-colors"
                >
                  <Stethoscope className="w-4 h-4 text-brand-tealLight" />
                  <span>Try AI Health Triage</span>
                </Link>

                <button
                  onClick={handleVoiceWelcome}
                  className="p-3.5 rounded-xl bg-brand-forestDark hover:bg-brand-forestLight text-brand-gold border border-brand-forestLight transition-colors"
                  title="Listen to Welcome in Audio"
                  aria-label="Listen to audio overview"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {/* Highlights Pill Row */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3 text-xs text-brand-cream/75">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                  9 Indian Languages (i18n)
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                  Voice-First Architecture
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                  100% Offline Resilience
                </span>
              </div>
            </div>

            {/* Hero Live Showcase Card */}
            <div className="w-full lg:w-96 bg-white rounded-3xl p-6 text-brand-charcoal border border-brand-charcoalBorder shadow-card space-y-4">
              <div className="flex items-center justify-between border-b border-brand-creamDark pb-3">
                <div className="flex items-center gap-2">
                  <img
                    src="/icon-64.png"
                    alt="GraminCare AI Mark"
                    className="w-6 h-6 object-contain rounded-md"
                  />
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-forest">
                    Live Expo Inspection
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-brand-tealMuted text-brand-teal font-bold text-[11px] border border-brand-teal/20">
                  Ready to Demo
                </span>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-brand-cream border border-brand-charcoalBorder text-xs">
                  <div className="flex justify-between font-bold text-brand-forest mb-1">
                    <span>Target Scheme:</span>
                    <span className="text-brand-teal">PM-JAY (₹5 Lakh)</span>
                  </div>
                  <p className="text-brand-charcoalMuted text-[11px]">
                    Beneficiary: Ramesh Gowda (Mandya, Karnataka)
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-brand-goldMuted border border-brand-gold/40 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-brand-forest">
                    <AlertTriangle className="w-3.5 h-3.5 text-brand-goldDark" />
                    <span>Discrepancy Detected</span>
                  </div>
                  <p className="text-brand-charcoal text-[11px]">
                    Ration Card name reads 'Ramesh G.' vs Aadhaar 'Ramesh Gowda'.
                  </p>
                </div>

                <Link
                  href="/schemes"
                  className="w-full py-3 rounded-xl bg-brand-forest hover:bg-brand-forestLight text-brand-cream font-bold text-xs flex items-center justify-center gap-2 transition-colors block text-center shadow-xs"
                >
                  <span>Resolve Mismatch & Verify</span>
                  <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Modules Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-brand-teal uppercase tracking-widest">
            Core Modules
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-brand-forest tracking-tight">
            Integrated Rural Health & Entitlement System
          </h2>
          <p className="text-brand-charcoalMuted text-xs sm:text-sm">
            Architected specifically for rural delivery with voice-first assistance, offline resilience, and explainable guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Module 1: Document-Gap Predictor */}
          <Link
            href="/schemes"
            className="group bg-white rounded-3xl p-6 border border-brand-charcoalBorder hover:border-brand-teal hover:shadow-card transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-tealMuted text-brand-teal flex items-center justify-center group-hover:scale-105 transition-transform">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-brand-forest group-hover:text-brand-teal transition-colors">
                Document-Gap Predictor
              </h3>
              <p className="text-brand-charcoalMuted text-xs leading-relaxed">
                Pre-screens household documents against official government scheme rules (PM-JAY, Arogya Karnataka). Identifies fuzzy name discrepancies and provides clear civic fix guidance.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-brand-teal group-hover:translate-x-1 transition-transform pt-2 border-t border-brand-creamDark">
              <span>Open Document Readiness</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </Link>

          {/* Module 2: AI Health Triage */}
          <Link
            href="/triage"
            className="group bg-white rounded-3xl p-6 border border-brand-charcoalBorder hover:border-brand-teal hover:shadow-card transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-goldMuted text-brand-goldDark flex items-center justify-center group-hover:scale-105 transition-transform">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-brand-forest group-hover:text-brand-teal transition-colors">
                Voice-First Health Triage
              </h3>
              <p className="text-brand-charcoalMuted text-xs leading-relaxed">
                WHO/ICMR-informed primary clinical decision support. Detects emergency red flags (maternal preeclampsia, acute cardiac distress) and provides low-cost Jan Aushadhi generic recommendations.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-brand-teal group-hover:translate-x-1 transition-transform pt-2 border-t border-brand-creamDark">
              <span>Try Symptom Checker</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </Link>

          {/* Module 3: Health Twin & Emergency Radar */}
          <Link
            href="/health-twin"
            className="group bg-white rounded-3xl p-6 border border-brand-charcoalBorder hover:border-brand-teal hover:shadow-card transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-creamMuted text-brand-forest flex items-center justify-center group-hover:scale-105 transition-transform">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-brand-forest group-hover:text-brand-teal transition-colors">
                Rural Health Twin
              </h3>
              <p className="text-brand-charcoalMuted text-xs leading-relaxed">
                Digital health avatar tracking blood pressure, blood sugar, and chronic indicators over time. Correlates ASHA home visit records with preventative immunization schedules.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-brand-teal group-hover:translate-x-1 transition-transform pt-2 border-t border-brand-creamDark">
              <span>View Health Twin</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </Link>
        </div>
      </section>

      {/* Technology Pipeline Overview (PPT Flow) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-forest text-brand-cream rounded-3xl p-8 border border-brand-forestLight space-y-6 shadow-soft">
          <div className="max-w-2xl">
            <span className="px-3 py-1 rounded-full bg-brand-forestDark text-brand-gold font-bold text-xs border border-brand-gold/30">
              PPT Innovation Pipeline
            </span>
            <h3 className="text-xl sm:text-2xl font-black mt-3 text-white">
              From Raw Paper to Vernacular Spoken Guidance
            </h3>
            <p className="text-brand-cream/80 text-xs sm:text-sm mt-1">
              Visualized multi-stage processing pipeline built into GraminCare AI
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
            <div className="bg-brand-forestDark/80 p-4 rounded-2xl border border-brand-forestLight space-y-2">
              <span className="w-6 h-6 rounded-lg bg-brand-gold text-brand-forest flex items-center justify-center font-black text-xs">1</span>
              <h4 className="font-bold text-white">Document Input</h4>
              <p className="text-brand-cream/70 text-[11px]">Camera photo or flatbed scanner with perspective correction</p>
            </div>
            <div className="bg-brand-forestDark/80 p-4 rounded-2xl border border-brand-forestLight space-y-2">
              <span className="w-6 h-6 rounded-lg bg-brand-gold text-brand-forest flex items-center justify-center font-black text-xs">2</span>
              <h4 className="font-bold text-white">OCR Extraction</h4>
              <p className="text-brand-cream/70 text-[11px]">Devanagari, Kannada & Latin script character recognition</p>
            </div>
            <div className="bg-brand-forestDark/80 p-4 rounded-2xl border border-brand-forestLight space-y-2">
              <span className="w-6 h-6 rounded-lg bg-brand-gold text-brand-forest flex items-center justify-center font-black text-xs">3</span>
              <h4 className="font-bold text-white">Rule + ML Check</h4>
              <p className="text-brand-cream/70 text-[11px]">Fuzzy Levenshtein matching and statutory scheme rules</p>
            </div>
            <div className="bg-brand-forestDark/80 p-4 rounded-2xl border border-brand-forestLight space-y-2">
              <span className="w-6 h-6 rounded-lg bg-brand-gold text-brand-forest flex items-center justify-center font-black text-xs">4</span>
              <h4 className="font-bold text-white">Explainable Gap</h4>
              <p className="text-brand-cream/70 text-[11px]">Plain-language root cause and CSC form guidance</p>
            </div>
            <div className="bg-brand-forestDark/80 p-4 rounded-2xl border border-brand-forestLight space-y-2">
              <span className="w-6 h-6 rounded-lg bg-brand-gold text-brand-forest flex items-center justify-center font-black text-xs">5</span>
              <h4 className="font-bold text-white">Voice Output</h4>
              <p className="text-brand-cream/70 text-[11px]">Spoken audio narration in 9 regional Indian languages</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
