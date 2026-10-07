"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
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
import VisualFlowDiagram from "@/components/home/VisualFlowDiagram";
import SmartSchemeFinder from "@/components/schemes/SmartSchemeFinder";
import VisualDataSection from "@/components/home/VisualDataSection";
import ResearchMindMap from "@/components/home/ResearchMindMap";

export default function HomePage() {
  const { speak } = useLanguage();

  const handleVoiceWelcome = () => {
    speak(
      "Welcome to GraminCare AI. A healthcare technology platform for rural India. Providing vernacular document readiness for government health schemes, clinical triage decision support, and rural emergency redirection."
    );
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section: Deep Forest Green with Soft Cream & Warm Gold (PRESERVED AS REQUIRED) */}
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

      {/* FEATURE 3: VISUAL FLOW DIAGRAM (Need → Match → Verify → Prepare → Connect → Claim) */}
      <VisualFlowDiagram />

      {/* FEATURE 1 & 5: SMART SCHEME FINDER WITH PROMINENT VOICE & SEARCH */}
      <SmartSchemeFinder />

      {/* FEATURE 2: VISUAL DATA SECTION (India's Health Benefit Landscape & Karnataka AB-ArK) */}
      <VisualDataSection />

      {/* FEATURE 4: RESEARCH MIND MAP (Interactive Taxonomy) */}
      <ResearchMindMap />

      {/* EDITORIAL STORYTELLING: EXPLORE GRAMINCARE (Dignified Rural Photography) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-brand-creamDark pb-4">
          <div>
            <span className="text-[11px] font-black uppercase tracking-widest text-brand-goldDark">
              Visual Perspectives
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-forest tracking-tight">
              Explore GraminCare
            </h2>
          </div>
          <span className="text-xs text-brand-charcoalMuted font-medium">
            3 Core Pillars of Rural Care Delivery
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Visual Card 1: UNDERSTAND */}
          <Link
            href="/triage"
            className="group bg-white rounded-3xl border border-brand-charcoalBorder hover:border-brand-teal overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 active:translate-y-0"
          >
            <div>
              <div className="relative aspect-[16/10] overflow-hidden bg-brand-forest">
                <Image
                  src="/images/rural-doctor-consult.jpg"
                  alt="Doctor consulting with rural patient in health clinic"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-brand-forestDark/85 backdrop-blur-md text-brand-cream border border-brand-forestLight/60 text-[11px] font-bold tracking-wide">
                    Clinical AI Triage
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-2.5">
                <span className="text-xs font-black tracking-widest text-brand-teal uppercase block">
                  UNDERSTAND
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-brand-forest tracking-tight group-hover:text-brand-teal transition-colors">
                  Understand your health.
                </h3>
                <p className="text-brand-charcoalMuted text-xs sm:text-sm leading-relaxed">
                  Speak symptoms in regional dialects. Get instant clinical triage, red-flag risk alerts, and Jan Aushadhi generic recommendations.
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2">
              <div className="pt-3 border-t border-brand-creamDark flex items-center justify-between text-brand-forest group-hover:text-brand-teal transition-colors">
                <span className="font-bold text-xs sm:text-sm">Start voice triage</span>
                <div className="w-8 h-8 rounded-full bg-brand-cream group-hover:bg-brand-forest text-brand-forest group-hover:text-brand-cream flex items-center justify-center transition-all duration-300 group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>

          {/* Visual Card 2: PREPARE */}
          <Link
            href="/schemes"
            className="group bg-white rounded-3xl border border-brand-charcoalBorder hover:border-brand-goldDark overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 active:translate-y-0"
          >
            <div>
              <div className="relative aspect-[16/10] overflow-hidden bg-brand-forest">
                <Image
                  src="/images/village-document-prep.jpg"
                  alt="Rural citizen reviewing documents at Seva Kendra"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-brand-forestDark/85 backdrop-blur-md text-brand-cream border border-brand-forestLight/60 text-[11px] font-bold tracking-wide">
                    Document Readiness
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-2.5">
                <span className="text-xs font-black tracking-widest text-brand-goldDark uppercase block">
                  PREPARE
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-brand-forest tracking-tight group-hover:text-brand-goldDark transition-colors">
                  Prepare before you apply.
                </h3>
                <p className="text-brand-charcoalMuted text-xs sm:text-sm leading-relaxed">
                  Pre-screen Aadhaar and Ration Card documents. Catch spelling discrepancies and generate official Gram Panchayat fix steps.
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2">
              <div className="pt-3 border-t border-brand-creamDark flex items-center justify-between text-brand-forest group-hover:text-brand-goldDark transition-colors">
                <span className="font-bold text-xs sm:text-sm">Check document readiness</span>
                <div className="w-8 h-8 rounded-full bg-brand-cream group-hover:bg-brand-forest text-brand-forest group-hover:text-brand-cream flex items-center justify-center transition-all duration-300 group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>

          {/* Visual Card 3: CONNECT */}
          <Link
            href="/emergency"
            className="group bg-white rounded-3xl border border-brand-charcoalBorder hover:border-red-600 overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 active:translate-y-0"
          >
            <div>
              <div className="relative aspect-[16/10] overflow-hidden bg-brand-forest">
                <Image
                  src="/images/rural-emergency-connect.jpg"
                  alt="108 Ambulance and emergency responder at health centre"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-brand-forestDark/85 backdrop-blur-md text-brand-cream border border-brand-forestLight/60 text-[11px] font-bold tracking-wide">
                    Rapid 108 Dispatch
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-2.5">
                <span className="text-xs font-black tracking-widest text-red-600 uppercase block">
                  CONNECT
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-brand-forest tracking-tight group-hover:text-red-600 transition-colors">
                  Connect to care.
                </h3>
                <p className="text-brand-charcoalMuted text-xs sm:text-sm leading-relaxed">
                  One-tap 108 emergency dispatch and live radar to nearest operating Primary Health Centres with oxygen and maternity care.
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2">
              <div className="pt-3 border-t border-brand-creamDark flex items-center justify-between text-brand-forest group-hover:text-red-600 transition-colors">
                <span className="font-bold text-xs sm:text-sm">Access emergency radar</span>
                <div className="w-8 h-8 rounded-full bg-brand-cream group-hover:bg-brand-forest text-brand-forest group-hover:text-brand-cream flex items-center justify-center transition-all duration-300 group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Frontline ASHA Community Trust Spotlight */}
        <div className="bg-gradient-to-r from-brand-forest to-brand-forestDark rounded-3xl p-6 sm:p-8 text-brand-cream border border-brand-forestLight shadow-soft flex flex-col md:flex-row items-center gap-6 sm:gap-8">
          <div className="relative w-full md:w-64 h-44 sm:h-48 rounded-2xl overflow-hidden shrink-0 border border-brand-gold/30">
            <Image
              src="/images/rural-health-worker.jpg"
              alt="Indian community health worker (ASHA) with digital tablet at Arogya Kendra"
              fill
              sizes="(max-width: 768px) 100vw, 256px"
              className="object-cover"
            />
          </div>
          <div className="space-y-2.5 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-brand-forestDark text-brand-gold text-xs font-bold border border-brand-gold/30">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
              <span>Ground-Level Verification</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white">
              Designed for Frontline ASHA Workers & Rural Families
            </h3>
            <p className="text-brand-cream/80 text-xs sm:text-sm leading-relaxed max-w-2xl">
              Engineered for low-bandwidth village conditions. Works on budget smartphones, speaks 9 regional Indian languages, and ensures zero gatekeeping at hospital admission desks.
            </p>
          </div>
        </div>
      </section>

      {/* Technology Pipeline Overview (PPT Flow) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-forest text-brand-cream rounded-3xl p-6 sm:p-8 border border-brand-forestLight space-y-6 shadow-soft">
          <div className="max-w-2xl">
            <span className="px-3 py-1 rounded-full bg-brand-forestDark text-brand-gold font-bold text-xs border border-brand-gold/30">
              PPT Innovation Pipeline
            </span>
            <h3 className="text-xl sm:text-2xl font-black mt-2 text-white">
              From Raw Paper to Vernacular Spoken Guidance
            </h3>
            <p className="text-brand-cream/80 text-xs sm:text-sm mt-0.5">
              Multi-stage automated pipeline built into GraminCare AI
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
            <div className="bg-brand-forestDark/80 p-3.5 rounded-2xl border border-brand-forestLight space-y-1">
              <span className="w-5 h-5 rounded-md bg-brand-gold text-brand-forest flex items-center justify-center font-black text-xs">1</span>
              <h4 className="font-bold text-white">Document Input</h4>
              <p className="text-brand-cream/70 text-[11px]">Camera photo or scanner</p>
            </div>
            <div className="bg-brand-forestDark/80 p-3.5 rounded-2xl border border-brand-forestLight space-y-1">
              <span className="w-5 h-5 rounded-md bg-brand-gold text-brand-forest flex items-center justify-center font-black text-xs">2</span>
              <h4 className="font-bold text-white">OCR Extraction</h4>
              <p className="text-brand-cream/70 text-[11px]">Devanagari, Kannada, Latin</p>
            </div>
            <div className="bg-brand-forestDark/80 p-3.5 rounded-2xl border border-brand-forestLight space-y-1">
              <span className="w-5 h-5 rounded-md bg-brand-gold text-brand-forest flex items-center justify-center font-black text-xs">3</span>
              <h4 className="font-bold text-white">Rule + ML Check</h4>
              <p className="text-brand-cream/70 text-[11px]">Fuzzy Levenshtein matching</p>
            </div>
            <div className="bg-brand-forestDark/80 p-3.5 rounded-2xl border border-brand-forestLight space-y-1">
              <span className="w-5 h-5 rounded-md bg-brand-gold text-brand-forest flex items-center justify-center font-black text-xs">4</span>
              <h4 className="font-bold text-white">Explainable Gap</h4>
              <p className="text-brand-cream/70 text-[11px]">Plain-language CSC advice</p>
            </div>
            <div className="bg-brand-forestDark/80 p-3.5 rounded-2xl border border-brand-forestLight space-y-1 col-span-2 sm:col-span-1">
              <span className="w-5 h-5 rounded-md bg-brand-gold text-brand-forest flex items-center justify-center font-black text-xs">5</span>
              <h4 className="font-bold text-white">Voice Output</h4>
              <p className="text-brand-cream/70 text-[11px]">Spoken audio in 9 languages</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
