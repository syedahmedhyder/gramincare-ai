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

export default function HomePage() {
  const { t, speak } = useLanguage();

  const handleVoiceWelcome = () => {
    speak(
      "Welcome to GraminCare AI. A healthcare technology platform for rural India. Providing vernacular document readiness for government health schemes, clinical triage decision support, and rural emergency redirection."
    );
  };

  return (
    <div className="space-y-16 pb-20">
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

      {/* SECTION 1: What can GraminCare help you with? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center sm:text-left space-y-2 max-w-2xl">
          <span className="text-xs font-bold text-brand-teal uppercase tracking-widest">
            Guided Care & Entitlements
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-forest tracking-tight">
            What can GraminCare help you with?
          </h2>
          <p className="text-brand-charcoalMuted text-xs sm:text-sm leading-relaxed">
            Essential healthcare navigation designed specifically for rural households — voice-first, vernacular, and verified before you travel.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Health */}
          <Link
            href="/triage"
            className="group relative bg-white rounded-3xl p-6 border border-brand-charcoalBorder hover:border-brand-teal hover:shadow-card transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 active:translate-y-0"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-brand-tealMuted text-brand-teal flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-brand-cream border border-brand-charcoalBorder/60 text-brand-forest">
                  AI Triage
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-teal block">
                  Health
                </span>
                <h3 className="text-lg font-black text-brand-forest group-hover:text-brand-teal transition-colors leading-snug">
                  Understand a health concern
                </h3>
              </div>
              <p className="text-xs text-brand-charcoalMuted leading-relaxed">
                Describe symptoms in your regional mother tongue. Identify clinical red flags, receive ICMR-guided primary triage, and locate low-cost Jan Aushadhi medicines.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-brand-creamDark flex items-center justify-between text-xs font-bold text-brand-forest group-hover:text-brand-teal transition-colors">
              <span>Start health triage</span>
              <div className="w-7 h-7 rounded-full bg-brand-cream group-hover:bg-brand-forest text-brand-forest group-hover:text-brand-cream flex items-center justify-center transition-all duration-300 group-hover:translate-x-1">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>

          {/* Card 2: Government Schemes */}
          <Link
            href="/schemes"
            className="group relative bg-white rounded-3xl p-6 border border-brand-charcoalBorder hover:border-brand-goldDark hover:shadow-card transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 active:translate-y-0"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-brand-goldMuted text-brand-goldDark flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <FileCheck2 className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-brand-goldMuted border border-brand-gold/30 text-brand-forest">
                  PM-JAY Cover
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-goldDark block">
                  Government Schemes
                </span>
                <h3 className="text-lg font-black text-brand-forest group-hover:text-brand-goldDark transition-colors leading-snug">
                  Find benefits you're entitled to
                </h3>
              </div>
              <p className="text-xs text-brand-charcoalMuted leading-relaxed">
                Pre-screen your documents against PM-JAY and state schemes. Spot spelling mismatches between Ration Card and Aadhaar before reaching the hospital desk.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-brand-creamDark flex items-center justify-between text-xs font-bold text-brand-forest group-hover:text-brand-goldDark transition-colors">
              <span>Verify scheme eligibility</span>
              <div className="w-7 h-7 rounded-full bg-brand-cream group-hover:bg-brand-forest text-brand-forest group-hover:text-brand-cream flex items-center justify-center transition-all duration-300 group-hover:translate-x-1">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>

          {/* Card 3: Emergency */}
          <Link
            href="/emergency"
            className="group relative bg-white rounded-3xl p-6 border border-brand-charcoalBorder hover:border-red-500 hover:shadow-card transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 active:translate-y-0"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <Ambulance className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-red-50 border border-red-200 text-red-700">
                  Dial 108 Rapid
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-red-600 block">
                  Emergency
                </span>
                <h3 className="text-lg font-black text-brand-forest group-hover:text-red-600 transition-colors leading-snug">
                  Find help when it matters
                </h3>
              </div>
              <p className="text-xs text-brand-charcoalMuted leading-relaxed">
                Direct one-touch 108 emergency ambulance connection, GPS-verified distance to nearest operating Primary Health Centres, and maternal urgent care.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-brand-creamDark flex items-center justify-between text-xs font-bold text-brand-forest group-hover:text-red-600 transition-colors">
              <span>Open emergency radar</span>
              <div className="w-7 h-7 rounded-full bg-brand-cream group-hover:bg-brand-forest text-brand-forest group-hover:text-brand-cream flex items-center justify-center transition-all duration-300 group-hover:translate-x-1">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>

          {/* Card 4: Family */}
          <Link
            href="/family"
            className="group relative bg-white rounded-3xl p-6 border border-brand-charcoalBorder hover:border-emerald-600 hover:shadow-card transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 active:translate-y-0"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-brand-cream border border-brand-charcoalBorder/60 text-brand-forest">
                  Health Vault
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block">
                  Family
                </span>
                <h3 className="text-lg font-black text-brand-forest group-hover:text-emerald-700 transition-colors leading-snug">
                  Care for your whole family
                </h3>
              </div>
              <p className="text-xs text-brand-charcoalMuted leading-relaxed">
                Consolidate household ABHA accounts, track childhood vaccination milestones, and monitor chronic blood pressure and blood sugar for village elders.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-brand-creamDark flex items-center justify-between text-xs font-bold text-brand-forest group-hover:text-emerald-700 transition-colors">
              <span>View family health records</span>
              <div className="w-7 h-7 rounded-full bg-brand-cream group-hover:bg-brand-forest text-brand-forest group-hover:text-brand-cream flex items-center justify-center transition-all duration-300 group-hover:translate-x-1">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* SECTION 2: Explore GraminCare (Editorial-Style Visual Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center sm:text-left space-y-2 max-w-2xl">
          <span className="text-xs font-bold text-brand-goldDark uppercase tracking-widest">
            Editorial Perspectives
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-forest tracking-tight">
            Explore GraminCare
          </h2>
          <p className="text-brand-charcoalMuted text-xs sm:text-sm leading-relaxed">
            Crafted for the human realities of rural healthcare delivery — uniting compassionate clinical understanding, administrative preparation, and rapid emergency response.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Visual Card 1: UNDERSTAND */}
          <Link
            href="/triage"
            className="group bg-white rounded-3xl border border-brand-charcoalBorder hover:border-brand-teal overflow-hidden shadow-soft hover:shadow-card transition-all duration-500 flex flex-col justify-between hover:-translate-y-1.5 active:translate-y-0"
          >
            <div>
              {/* Large Imagery */}
              <div className="relative aspect-[16/10] overflow-hidden bg-brand-forest">
                <Image
                  src="/images/rural-doctor-consult.jpg"
                  alt="Compassionate Indian doctor explaining medical report to rural patient in village health centre"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-brand-forestDark/85 backdrop-blur-md text-brand-cream border border-brand-forestLight/60 text-xs font-bold tracking-wide shadow-sm">
                    Clinical Decision Support
                  </span>
                </div>
              </div>

              {/* Editorial Content */}
              <div className="p-6 sm:p-7 space-y-3">
                <div className="space-y-1">
                  <span className="text-xs font-black tracking-[0.25em] text-brand-teal uppercase block">
                    UNDERSTAND
                  </span>
                  <h3 className="text-2xl font-black text-brand-forest tracking-tight group-hover:text-brand-teal transition-colors">
                    Understand your health.
                  </h3>
                </div>
                <p className="text-brand-charcoalMuted text-xs sm:text-sm leading-relaxed">
                  Explain what hurts in your own voice and native dialect. GraminCare translates colloquial expressions into clinical markers, screens for critical warning signs, and recommends low-cost Jan Aushadhi generic alternatives before you travel to the clinic.
                </p>
              </div>
            </div>

            <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-2">
              <div className="pt-4 border-t border-brand-creamDark flex items-center justify-between text-brand-forest group-hover:text-brand-teal transition-colors">
                <span className="font-bold text-xs sm:text-sm">Experience voice triage</span>
                <div className="w-8 h-8 rounded-full bg-brand-cream group-hover:bg-brand-forest text-brand-forest group-hover:text-brand-cream flex items-center justify-center transition-all duration-300 group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>

          {/* Visual Card 2: PREPARE */}
          <Link
            href="/schemes"
            className="group bg-white rounded-3xl border border-brand-charcoalBorder hover:border-brand-goldDark overflow-hidden shadow-soft hover:shadow-card transition-all duration-500 flex flex-col justify-between hover:-translate-y-1.5 active:translate-y-0"
          >
            <div>
              {/* Large Imagery */}
              <div className="relative aspect-[16/10] overflow-hidden bg-brand-forest">
                <Image
                  src="/images/village-document-prep.jpg"
                  alt="Rural Indian citizen reviewing government scheme documents with community assistant at Seva Kendra"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-brand-forestDark/85 backdrop-blur-md text-brand-cream border border-brand-forestLight/60 text-xs font-bold tracking-wide shadow-sm">
                    Entitlement Assurance
                  </span>
                </div>
              </div>

              {/* Editorial Content */}
              <div className="p-6 sm:p-7 space-y-3">
                <div className="space-y-1">
                  <span className="text-xs font-black tracking-[0.25em] text-brand-goldDark uppercase block">
                    PREPARE
                  </span>
                  <h3 className="text-2xl font-black text-brand-forest tracking-tight group-hover:text-brand-goldDark transition-colors">
                    Prepare before you apply.
                  </h3>
                </div>
                <p className="text-brand-charcoalMuted text-xs sm:text-sm leading-relaxed">
                  Never face rejection at hospital admission counters because of spelling differences. Our optical scanner compares name spellings across Aadhaar, Ration, and BPL cards, generating a clear rectification roadmap for your village Gram Panchayat.
                </p>
              </div>
            </div>

            <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-2">
              <div className="pt-4 border-t border-brand-creamDark flex items-center justify-between text-brand-forest group-hover:text-brand-goldDark transition-colors">
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
            className="group bg-white rounded-3xl border border-brand-charcoalBorder hover:border-red-600 overflow-hidden shadow-soft hover:shadow-card transition-all duration-500 flex flex-col justify-between hover:-translate-y-1.5 active:translate-y-0"
          >
            <div>
              {/* Large Imagery */}
              <div className="relative aspect-[16/10] overflow-hidden bg-brand-forest">
                <Image
                  src="/images/rural-emergency-connect.jpg"
                  alt="108 Emergency ambulance vehicle and rural health responders ready outside primary health centre"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-brand-forestDark/85 backdrop-blur-md text-brand-cream border border-brand-forestLight/60 text-xs font-bold tracking-wide shadow-sm">
                    Emergency Dispatch Network
                  </span>
                </div>
              </div>

              {/* Editorial Content */}
              <div className="p-6 sm:p-7 space-y-3">
                <div className="space-y-1">
                  <span className="text-xs font-black tracking-[0.25em] text-red-600 uppercase block">
                    CONNECT
                  </span>
                  <h3 className="text-2xl font-black text-brand-forest tracking-tight group-hover:text-red-600 transition-colors">
                    Connect to care.
                  </h3>
                </div>
                <p className="text-brand-charcoalMuted text-xs sm:text-sm leading-relaxed">
                  In acute emergencies, every minute counts. GraminCare instantly connects you to 108 dispatch, locates verified operating Primary Health Centres with functioning oxygen and maternity beds, and provides urgent first-response redirection.
                </p>
              </div>
            </div>

            <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-2">
              <div className="pt-4 border-t border-brand-creamDark flex items-center justify-between text-brand-forest group-hover:text-red-600 transition-colors">
                <span className="font-bold text-xs sm:text-sm">Access emergency network</span>
                <div className="w-8 h-8 rounded-full bg-brand-cream group-hover:bg-brand-forest text-brand-forest group-hover:text-brand-cream flex items-center justify-center transition-all duration-300 group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Authentic Community & Frontline ASHA Spotlight Card */}
        <div className="bg-gradient-to-r from-brand-forest to-brand-forestDark rounded-3xl p-6 sm:p-8 text-brand-cream border border-brand-forestLight shadow-soft flex flex-col md:flex-row items-center gap-6 sm:gap-8">
          <div className="relative w-full md:w-72 h-48 sm:h-56 rounded-2xl overflow-hidden shrink-0 border border-brand-gold/30">
            <Image
              src="/images/rural-health-worker.jpg"
              alt="Dedicated Indian community health worker (ASHA) with digital tablet and elder villager at Arogya Kendra"
              fill
              sizes="(max-width: 768px) 100vw, 288px"
              className="object-cover"
            />
          </div>
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-forestDark text-brand-gold text-xs font-bold border border-brand-gold/30">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
              <span>Ground-Level Verification</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Designed for Frontline ASHA Workers & Rural Families
            </h3>
            <p className="text-brand-cream/80 text-xs sm:text-sm leading-relaxed max-w-2xl">
              Engineered for low-bandwidth village environments. GraminCare functions reliably on standard mobile devices, speaks 9 regional Indian languages, and helps community health facilitators verify citizen documentation without bureaucratic delays.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-1 text-xs text-brand-gold">
              <span className="flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                ICMR & WHO Aligned Protocols
              </span>
              <span className="flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                Zero Hospital Gatekeeping
              </span>
            </div>
          </div>
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
