"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Search, 
  Mic, 
  MicOff, 
  Sparkles, 
  ShieldCheck, 
  FileText, 
  ExternalLink, 
  ArrowRight, 
  X, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Landmark,
  Building2,
  HelpCircle
} from "lucide-react";
import { 
  CURATED_SCHEMES_DATA, 
  searchHealthSchemes, 
  SchemeSearchResult 
} from "@/lib/schemes-finder";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const SAMPLE_SEARCHES = [
  "Kidney treatment",
  "Accident treatment",
  "Cancer care",
  "Pregnancy support",
  "Child health",
  "Dialysis",
];

export default function SmartSchemeFinder() {
  const { speechLocale } = useLanguage();

  const [query, setQuery] = useState<string>("Kidney treatment");
  const [activeTab, setActiveTab] = useState<"all" | "financial" | "programme">("all");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [voiceState, setVoiceState] = useState<"idle" | "listening" | "recognized" | "processing" | "results">("idle");
  const [recognizedText, setRecognizedText] = useState<string>("");
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [results, setResults] = useState<{
    financialSchemes: SchemeSearchResult[];
    healthProgrammes: SchemeSearchResult[];
    totalMatches: number;
  }>(() => searchHealthSchemes("Kidney treatment"));

  const recognitionRef = useRef<any>(null);

  // Debounced search evaluation
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const res = searchHealthSchemes(query);
      setResults(res);
      setIsLoading(false);
      if (voiceState === "processing") {
        setVoiceState("results");
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  // Voice recognition logic
  const handleToggleVoice = () => {
    if (typeof window === "undefined") return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechError("Speech recognition is not supported in this browser. Please use the text search box.");
      setTimeout(() => setSpeechError(null), 4000);
      return;
    }

    if (voiceState === "listening") {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setVoiceState("idle");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = speechLocale || "en-IN";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setVoiceState("listening");
        setSpeechError(null);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setRecognizedText(transcript);
        setVoiceState("recognized");

        setTimeout(() => {
          setVoiceState("processing");
          setQuery(transcript);
        }, 600);
      };

      recognition.onerror = (err: any) => {
        console.warn("Speech recognition error:", err);
        setSpeechError("Could not recognize voice. Please try typing your health concern.");
        setVoiceState("idle");
        setTimeout(() => setSpeechError(null), 4000);
      };

      recognition.onend = () => {
        setVoiceState((prev) => (prev === "listening" ? "idle" : prev));
      };

      recognition.start();
    } catch (err: any) {
      console.warn("Voice initialization exception:", err);
      setSpeechError("Microphone access unavailable. Please type your search.");
      setVoiceState("idle");
    }
  };

  const handleChipClick = (term: string) => {
    setQuery(term);
    setVoiceState("idle");
  };

  const handleClear = () => {
    setQuery("");
    setRecognizedText("");
    setVoiceState("idle");
  };

  const filteredFinancial = results.financialSchemes;
  const filteredProgrammes = results.healthProgrammes;

  const showFinancial = activeTab === "all" || activeTab === "financial";
  const showProgrammes = activeTab === "all" || activeTab === "programme";

  return (
    <section id="smart-finder" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="text-center sm:text-left space-y-2 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-forest text-brand-gold text-xs font-bold border border-brand-gold/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Smart Scheme & Entitlement Finder</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-forest tracking-tight">
          How can GraminCare help you?
        </h2>
        <p className="text-brand-charcoalMuted text-sm sm:text-base leading-relaxed">
          Describe any illness, medical test, or hospitalization need. We match verified central entitlements, state packages (AB-ArK), and primary health programmes.
        </p>
      </div>

      {/* Large Search Box with Voice Control */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-brand-charcoalBorder shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Text Input Container */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-brand-charcoalMuted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Describe your health need (e.g., Kidney treatment, Cancer, Dialysis)..."
              className="w-full pl-12 pr-10 py-3.5 sm:py-4 rounded-2xl bg-brand-cream/60 border border-brand-charcoalBorder focus:border-brand-teal focus:bg-white focus:outline-none text-sm sm:text-base text-brand-charcoal font-medium transition-all"
            />
            {query && (
              <button
                onClick={handleClear}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-charcoalMuted hover:text-brand-forest p-1 rounded-full"
                title="Clear input"
                aria-label="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Prominent Voice Button */}
          <button
            onClick={handleToggleVoice}
            className={`px-5 py-3.5 sm:py-4 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all shadow-xs shrink-0 ${
              voiceState === "listening"
                ? "bg-red-600 text-white animate-pulse"
                : voiceState === "recognized" || voiceState === "processing"
                ? "bg-brand-gold text-brand-forest"
                : "bg-brand-forest text-brand-cream hover:bg-brand-teal"
            }`}
            title="Speak your health concern in voice"
          >
            {voiceState === "listening" ? (
              <>
                <MicOff className="w-4 h-4 text-white" />
                <span>Listening...</span>
              </>
            ) : voiceState === "recognized" ? (
              <>
                <Sparkles className="w-4 h-4 text-brand-forest" />
                <span>Heard: "{recognizedText}"</span>
              </>
            ) : voiceState === "processing" ? (
              <>
                <Clock className="w-4 h-4 animate-spin text-brand-forest" />
                <span>Finding support...</span>
              </>
            ) : (
              <>
                <Mic className="w-4 h-4 text-brand-gold" />
                <span>🎙️ Speak to GraminCare</span>
              </>
            )}
          </button>
        </div>

        {/* Speech Error Banner */}
        {speechError && (
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{speechError}</span>
          </div>
        )}

        {/* Example Quick-Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="font-bold text-brand-charcoalMuted mr-1">Try asking:</span>
          {SAMPLE_SEARCHES.map((chip) => (
            <button
              key={chip}
              onClick={() => handleChipClick(chip)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all border ${
                query.toLowerCase() === chip.toLowerCase()
                  ? "bg-brand-teal text-white border-brand-teal shadow-2xs"
                  : "bg-brand-cream text-brand-forest border-brand-charcoalBorder/60 hover:border-brand-teal hover:bg-white"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs / Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-creamDark pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === "all"
                ? "bg-brand-forest text-white"
                : "bg-brand-cream text-brand-charcoalMuted hover:text-brand-forest"
            }`}
          >
            All Results ({results.totalMatches})
          </button>
          <button
            onClick={() => setActiveTab("financial")}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              activeTab === "financial"
                ? "bg-brand-forest text-white"
                : "bg-brand-cream text-brand-charcoalMuted hover:text-brand-forest"
            }`}
          >
            <Landmark className="w-3.5 h-3.5" />
            <span>Financial Schemes ({filteredFinancial.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("programme")}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              activeTab === "programme"
                ? "bg-brand-forest text-white"
                : "bg-brand-cream text-brand-charcoalMuted hover:text-brand-forest"
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Health Programmes & Services ({filteredProgrammes.length})</span>
          </button>
        </div>

        <div className="text-[11px] text-brand-charcoalMuted font-medium">
          Showing verified official matches for: <strong className="text-brand-forest">"{query || "All"}"</strong>
        </div>
      </div>

      {/* No Results Fallback */}
      {results.totalMatches === 0 && !isLoading && (
        <div className="bg-white rounded-3xl p-8 border border-dashed border-brand-charcoalBorder text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-goldMuted text-brand-goldDark flex items-center justify-center mx-auto">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div className="max-w-md mx-auto space-y-1">
            <h4 className="font-black text-lg text-brand-forest">No direct scheme matched "{query}"</h4>
            <p className="text-xs text-brand-charcoalMuted">
              Try searching with broader medical terms like <em>kidney</em>, <em>accident</em>, <em>cancer</em>, <em>surgery</em>, or <em>pregnancy</em>.
            </p>
          </div>
          <div className="flex justify-center gap-2 pt-2">
            <button
              onClick={() => setQuery("Kidney treatment")}
              className="px-4 py-2 rounded-xl bg-brand-forest text-brand-cream text-xs font-bold hover:bg-brand-teal transition-colors"
            >
              Reset to Kidney Treatment
            </button>
            <Link
              href="/triage"
              className="px-4 py-2 rounded-xl bg-brand-cream text-brand-forest text-xs font-bold border border-brand-charcoalBorder hover:border-brand-teal transition-colors"
            >
              Try Voice Health Triage
            </Link>
          </div>
        </div>
      )}

      {/* Dual Section Display */}
      <div className="space-y-10">
        {/* GROUP 1: Financial / Entitlement Schemes */}
        {showFinancial && filteredFinancial.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-brand-goldMuted text-brand-goldDark flex items-center justify-center">
                  <Landmark className="w-4 h-4" />
                </div>
                <h3 className="text-lg sm:text-xl font-black text-brand-forest">
                  Financial & Entitlement Schemes
                </h3>
              </div>
              <span className="text-xs font-bold text-brand-charcoalMuted">
                {filteredFinancial.length} potential {filteredFinancial.length === 1 ? "match" : "matches"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredFinancial.map((scheme) => (
                <div
                  key={scheme.id}
                  className="bg-white rounded-3xl p-6 border border-brand-charcoalBorder hover:border-brand-goldDark hover:shadow-card transition-all duration-300 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-brand-goldMuted text-brand-forest border border-brand-gold/30">
                        {scheme.level}
                      </span>
                      <span className="text-[11px] font-black text-brand-teal tracking-wide">
                        {scheme.code}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-lg font-black text-brand-forest leading-snug">
                        {scheme.name}
                      </h4>
                      <p className="text-xs font-bold text-brand-teal mt-0.5">
                        {scheme.coverageOrBenefit}
                      </p>
                    </div>

                    <p className="text-xs text-brand-charcoal leading-relaxed">
                      {scheme.shortBenefit}
                    </p>

                    {/* Explainable Match Reason */}
                    <div className="p-3 rounded-xl bg-brand-cream/80 border border-brand-charcoalBorder/50 text-[11px] space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-brand-forest">
                        <Sparkles className="w-3.5 h-3.5 text-brand-goldDark shrink-0" />
                        <span>Why this matched:</span>
                      </div>
                      <p className="text-brand-charcoalMuted leading-tight">
                        {scheme.matchReason}
                      </p>
                    </div>

                    {/* Eligibility Status Tag */}
                    <div className="text-[11px] font-medium text-brand-charcoalMuted flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{scheme.eligibilityStatus}</span>
                    </div>

                    {/* Documents required */}
                    {scheme.requiredDocuments.length > 0 && (
                      <div className="text-[11px] text-brand-charcoalMuted space-y-1 pt-1 border-t border-brand-creamDark">
                        <span className="font-bold text-brand-forest flex items-center gap-1">
                          <FileText className="w-3 h-3 text-brand-teal" />
                          Key Documents:
                        </span>
                        <p className="truncate">
                          {scheme.requiredDocuments.join(" • ")}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Footer Action & Source */}
                  <div className="pt-3 border-t border-brand-creamDark space-y-3">
                    <div className="flex items-center justify-between text-[10px] text-brand-charcoalMuted">
                      <span>Source: {scheme.officialSource}</span>
                      <span>{scheme.lastVerifiedDate}</span>
                    </div>

                    <Link
                      href={scheme.actionUrl}
                      className="w-full py-2.5 rounded-xl bg-brand-forest hover:bg-brand-forestLight text-brand-cream font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-2xs"
                    >
                      <span>{scheme.actionLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GROUP 2: Health Programmes & Services */}
        {showProgrammes && filteredProgrammes.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-brand-tealMuted text-brand-teal flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
                <h3 className="text-lg sm:text-xl font-black text-brand-forest">
                  Health Programmes & Public Services
                </h3>
              </div>
              <span className="text-xs font-bold text-brand-charcoalMuted">
                {filteredProgrammes.length} active {filteredProgrammes.length === 1 ? "service" : "services"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProgrammes.map((prog) => (
                <div
                  key={prog.id}
                  className="bg-white rounded-3xl p-6 border border-brand-charcoalBorder hover:border-brand-teal hover:shadow-card transition-all duration-300 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-brand-tealMuted text-brand-teal border border-brand-teal/20">
                        {prog.level}
                      </span>
                      <span className="text-[11px] font-black text-brand-forest tracking-wide">
                        {prog.code}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-lg font-black text-brand-forest leading-snug">
                        {prog.name}
                      </h4>
                      <p className="text-xs font-bold text-brand-teal mt-0.5">
                        {prog.coverageOrBenefit}
                      </p>
                    </div>

                    <p className="text-xs text-brand-charcoal leading-relaxed">
                      {prog.shortBenefit}
                    </p>

                    {/* Match reason */}
                    <div className="p-3 rounded-xl bg-brand-cream/80 border border-brand-charcoalBorder/50 text-[11px] space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-brand-forest">
                        <Sparkles className="w-3.5 h-3.5 text-brand-teal shrink-0" />
                        <span>Why this matched:</span>
                      </div>
                      <p className="text-brand-charcoalMuted leading-tight">
                        {prog.matchReason}
                      </p>
                    </div>

                    {/* Eligibility Status */}
                    <div className="text-[11px] font-medium text-brand-charcoalMuted flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{prog.eligibilityStatus}</span>
                    </div>

                    {/* Documents */}
                    {prog.requiredDocuments.length > 0 && (
                      <div className="text-[11px] text-brand-charcoalMuted space-y-1 pt-1 border-t border-brand-creamDark">
                        <span className="font-bold text-brand-forest flex items-center gap-1">
                          <FileText className="w-3 h-3 text-brand-teal" />
                          Access Requirement:
                        </span>
                        <p className="truncate">
                          {prog.requiredDocuments.join(" • ")}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Footer Action & Source */}
                  <div className="pt-3 border-t border-brand-creamDark space-y-3">
                    <div className="flex items-center justify-between text-[10px] text-brand-charcoalMuted">
                      <span>Source: {prog.officialSource}</span>
                      <span>{prog.lastVerifiedDate}</span>
                    </div>

                    <Link
                      href={prog.actionUrl}
                      className="w-full py-2.5 rounded-xl bg-brand-forest hover:bg-brand-forestLight text-brand-cream font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-2xs"
                    >
                      <span>{prog.actionLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Statutory Disclaimer Pill */}
      <div className="p-4 rounded-2xl bg-brand-cream border border-brand-charcoalBorder text-xs text-brand-charcoalMuted text-center space-y-1">
        <p className="font-medium">
          <strong className="text-brand-forest">Statutory Advisory:</strong> All results represent <em>potential matches</em> based on officially published state guidelines. Final hospital admission and cashless clearance depend on biometric verification, active BPL ration status, and doctor referral at the treating facility.
        </p>
      </div>
    </section>
  );
}
