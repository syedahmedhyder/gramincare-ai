"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  Stethoscope, 
  Mic, 
  MicOff, 
  Volume2, 
  AlertOctagon, 
  CheckCircle2, 
  AlertTriangle, 
  Pill, 
  Ambulance, 
  Info, 
  ArrowRight,
  Sparkles
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { CLINICAL_TRIAGE_PRESETS, performClinicalTriage, TriageConditionPreset } from "@/lib/clinical-triage";
import ModuleLoading from "@/components/common/ModuleLoading";
import GraminCareErrorBoundary from "@/components/common/GraminCareErrorBoundary";

function TriageContent() {
  const searchParams = useSearchParams();
  const demoParam = searchParams.get("demo");

  const { t, speak, language, speechLocale } = useLanguage();

  const [inputQuery, setInputQuery] = useState<string>("");
  const [activeResult, setActiveResult] = useState<TriageConditionPreset>(CLINICAL_TRIAGE_PRESETS[3]);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [speechSupported, setSpeechSupported] = useState<boolean>(true);

  // Check demo query parameter
  useEffect(() => {
    if (demoParam === "maternal") {
      setActiveResult(CLINICAL_TRIAGE_PRESETS[1]);
      setInputQuery("Pregnancy 3rd trimester with high BP, headache, swollen ankles");
    } else if (demoParam === "cardiac") {
      setActiveResult(CLINICAL_TRIAGE_PRESETS[0]);
      setInputQuery("Chest pain, sweating and breathlessness");
    }
  }, [demoParam]);

  // Voice recognition setup
  const toggleListening = () => {
    if (typeof window === "undefined") return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechSupported(false);
      setInputQuery("Chest discomfort and breathing difficulty");
      const res = performClinicalTriage("chest discomfort");
      setActiveResult(res);
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = speechLocale;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputQuery(transcript);
        const evaluated = performClinicalTriage(transcript);
        setActiveResult(evaluated);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const handleSelectPreset = (preset: TriageConditionPreset) => {
    setActiveResult(preset);
    setInputQuery(preset.nameEn);
    // Asynchronously log to full-stack triage audit endpoint
    fetch("/api/triage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: preset.nameEn, language }),
    }).catch((err) => console.warn("Logged triage locally:", err));
  };

  const handleVoiceRead = () => {
    const summary = language === "kn" 
      ? activeResult.clinicalSummaryKn 
      : language === "hi" 
      ? activeResult.clinicalSummaryHi 
      : activeResult.clinicalSummaryEn;

    const plan = language === "kn" 
      ? activeResult.actionPlanKn 
      : language === "hi" 
      ? activeResult.actionPlanHi 
      : activeResult.actionPlanEn;

    speak(`${summary}. ${plan}`);
  };

  const getLocalizedSummary = () => {
    if (language === "kn") return activeResult.clinicalSummaryKn;
    if (language === "hi") return activeResult.clinicalSummaryHi;
    return activeResult.clinicalSummaryEn;
  };

  const getLocalizedPlan = () => {
    if (language === "kn") return activeResult.actionPlanKn;
    if (language === "hi") return activeResult.actionPlanHi;
    return activeResult.actionPlanEn;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header: Deep Forest Green & Warm Gold */}
      <div className="bg-brand-forest rounded-3xl p-6 sm:p-8 text-brand-cream border border-brand-forestLight shadow-soft">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-forestDark text-brand-gold border border-brand-gold/30 text-xs font-bold mb-3">
            <Stethoscope className="w-3.5 h-3.5 text-brand-gold" />
            <span>Vernacular Decision Support Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            {t("triageTitle")}
          </h1>
          <p className="text-brand-cream/80 text-sm mt-2 leading-relaxed font-normal">
            {t("triageSubtitle")}
          </p>
        </div>
      </div>

      {/* Safety Non-Diagnostic Disclaimer Banner */}
      <div className="bg-brand-goldMuted rounded-2xl p-4 border border-brand-gold/40 text-xs text-brand-charcoal flex items-start gap-3">
        <Info className="w-5 h-5 text-brand-goldDark shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="font-bold text-brand-forest">Medical Disclaimer: </strong>
          {t("triageDisclaimer")}
        </p>
      </div>

      {/* Voice Input & Search Bar */}
      <div className="bg-white rounded-3xl p-6 border border-brand-charcoalBorder shadow-card space-y-4">
        <label className="text-xs font-bold text-brand-forest block">
          {t("speakSymptomsPrompt")}
        </label>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => {
                setInputQuery(e.target.value);
                if (e.target.value.length > 2) {
                  setActiveResult(performClinicalTriage(e.target.value));
                }
              }}
              placeholder="e.g. Chest pain and breathlessness / खांसी और बुखार / ಎದೆ ನೋವು..."
              className="w-full px-4 py-3 rounded-xl border border-brand-charcoalBorder text-sm text-brand-charcoal bg-brand-cream focus:bg-white focus:border-brand-teal transition-colors"
            />
          </div>

          {/* Voice Microphone Control */}
          <button
            onClick={toggleListening}
            className={`w-full sm:w-auto px-5 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs ${
              isListening
                ? "bg-rose-600 text-white animate-pulse"
                : "bg-brand-forest hover:bg-brand-forestLight text-brand-cream"
            }`}
          >
            {isListening ? (
              <>
                <MicOff className="w-4 h-4" />
                <span>{t("listening")}</span>
                <span className="flex items-center gap-0.5 ml-1">
                  <span className="w-1 h-3 bg-white animate-soundwave-1 rounded-full" />
                  <span className="w-1 h-4 bg-white animate-soundwave-2 rounded-full" />
                  <span className="w-1 h-2 bg-white animate-soundwave-3 rounded-full" />
                </span>
              </>
            ) : (
              <>
                <Mic className="w-4 h-4 text-brand-gold" />
                <span>Speak Symptoms</span>
              </>
            )}
          </button>
        </div>

        {/* Preset Clinical Scenarios */}
        <div>
          <span className="text-[11px] font-bold text-brand-charcoalMuted uppercase tracking-wider block mb-2">
            Demo Presets (One-Click Clinical Evaluation):
          </span>
          <div className="flex flex-wrap gap-2">
            {CLINICAL_TRIAGE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                  activeResult.id === preset.id
                    ? preset.severity === "red"
                      ? "bg-rose-50 border-rose-500 text-rose-950 ring-1 ring-rose-500"
                      : preset.severity === "yellow"
                      ? "bg-brand-goldMuted border-brand-gold text-brand-forest ring-1 ring-brand-gold"
                      : "bg-brand-cream border-brand-teal text-brand-forest ring-1 ring-brand-teal"
                    : "bg-white border-brand-charcoalBorder text-brand-charcoal hover:bg-brand-cream"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${
                  preset.severity === "red" ? "bg-rose-600" : preset.severity === "yellow" ? "bg-brand-goldDark" : "bg-brand-teal"
                }`} />
                <span>{preset.nameEn}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Triage Output Card */}
      <div className={`rounded-3xl p-6 sm:p-8 border transition-all ${
        activeResult.severity === "red"
          ? "bg-brand-charcoal text-white border-rose-800 shadow-card"
          : activeResult.severity === "yellow"
          ? "bg-brand-forest text-brand-cream border-brand-gold shadow-card ring-1 ring-brand-gold/30"
          : "bg-brand-forest text-brand-cream border-brand-forestLight shadow-card"
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/15 pb-4 mb-6">
          <div className="flex items-center gap-3.5">
            <div className={`p-3 rounded-2xl ${
              activeResult.severity === "red"
                ? "bg-rose-600 text-white"
                : activeResult.severity === "yellow"
                ? "bg-brand-gold text-brand-forest"
                : "bg-brand-teal text-white"
            }`}>
              {activeResult.severity === "red" ? (
                <AlertOctagon className="w-6 h-6" />
              ) : activeResult.severity === "yellow" ? (
                <AlertTriangle className="w-6 h-6" />
              ) : (
                <CheckCircle2 className="w-6 h-6" />
              )}
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-gold">
                Triage Assessment Result
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {activeResult.severity === "red"
                  ? t("triageSeverityRed")
                  : activeResult.severity === "yellow"
                  ? t("triageSeverityYellow")
                  : t("triageSeverityGreen")}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleVoiceRead}
              className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold flex items-center gap-2 transition-colors"
            >
              <Volume2 className="w-4 h-4 text-brand-gold" />
              <span>{t("listenVoice")}</span>
            </button>

            {activeResult.severity === "red" && (
              <Link
                href="/emergency"
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all animate-bounce"
              >
                <Ambulance className="w-4 h-4" />
                <span>Emergency Hospital Radar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>

        {/* Clinical Summary & Immediate Action */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="bg-black/25 rounded-2xl p-5 border border-white/10 space-y-2">
            <span className="text-xs font-bold text-brand-gold uppercase tracking-wider block">
              Clinical Assessment Brief:
            </span>
            <p className="text-brand-cream/90 leading-relaxed font-medium">
              {getLocalizedSummary()}
            </p>
          </div>

          <div className="bg-black/25 rounded-2xl p-5 border border-white/10 space-y-2">
            <span className="text-xs font-bold text-brand-gold uppercase tracking-wider block">
              Immediate Protocol & Action:
            </span>
            <p className="text-brand-cream/90 leading-relaxed font-medium">
              {getLocalizedPlan()}
            </p>
          </div>
        </div>

        {/* Pradhan Mantri Jan Aushadhi OTC Generic Recommendations */}
        {activeResult.recommendedOtcs.length > 0 && (
          <div className="mt-6 pt-6 border-t border-white/15">
            <div className="flex items-center gap-2 mb-3">
              <Pill className="w-4 h-4 text-brand-gold" />
              <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                Jan Aushadhi Generic Medicine Options (Low-Cost Rural OTC):
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {activeResult.recommendedOtcs.map((otc, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 rounded-2xl p-3.5 border border-white/10 text-xs"
                >
                  <p className="font-bold text-white">{otc.genericSalt}</p>
                  <p className="text-[11px] text-brand-cream/70 mt-0.5">{otc.indication}</p>
                  <div className="mt-2 inline-block px-2 py-0.5 rounded-md bg-brand-gold text-brand-forest font-mono text-[10px] font-black">
                    Est. Cost: {otc.approxJanAushadhiCost}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TriagePage() {
  return (
    <GraminCareErrorBoundary moduleName="AI Health Triage">
      <Suspense fallback={
        <div className="max-w-7xl mx-auto px-4 py-16">
          <ModuleLoading label="Loading AI Health Triage Engine..." />
        </div>
      }>
        <TriageContent />
      </Suspense>
    </GraminCareErrorBoundary>
  );
}
