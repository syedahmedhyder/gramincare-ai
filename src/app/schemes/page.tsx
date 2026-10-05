"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { 
  FileCheck2, 
  Users, 
  ScrollText, 
  ScanLine, 
  RotateCcw, 
  Volume2, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck,
  Database
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { DEMO_FAMILIES, DEMO_SCHEMES } from "@/lib/demo-data";
import { evaluateDocumentReadiness } from "@/lib/document-engine";
import { GovernmentScheme } from "@/lib/types";
import DocumentCard from "@/components/schemes/DocumentCard";
import PipelineVisualizer from "@/components/schemes/PipelineVisualizer";
import GraminCareErrorBoundary from "@/components/common/GraminCareErrorBoundary";

export default function SchemesPage() {
  const { t, speak } = useLanguage();

  const [schemesList, setSchemesList] = useState<GovernmentScheme[]>(DEMO_SCHEMES);
  const [dataSource, setDataSource] = useState<"database" | "demo">("demo");
  const [selectedFamilyId, setSelectedFamilyId] = useState<string>("fam-gowda-01");
  const [selectedMemberId, setSelectedMemberId] = useState<string>("mem-ramesh");
  const [selectedSchemeId, setSelectedSchemeId] = useState<string>("scheme-pmjay");
  const [simulatedFixApplied, setSimulatedFixApplied] = useState<boolean>(false);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  // Fetch schemes from full-stack API on mount
  useEffect(() => {
    fetch("/api/schemes")
      .then((res) => res.json())
      .then((data) => {
        if (data.schemes && data.schemes.length > 0) {
          setSchemesList(data.schemes);
          setDataSource(data.source || "demo");
          if (!data.schemes.some((s: any) => s.id === selectedSchemeId)) {
            setSelectedSchemeId(data.schemes[0].id);
          }
        }
      })
      .catch((err) => console.warn("Using curated fallback schemes:", err));
  }, []);

  // Active family & member
  const currentFamily = DEMO_FAMILIES.find((f) => f.id === selectedFamilyId) || DEMO_FAMILIES[0];
  const currentMember = currentFamily.members.find((m) => m.id === selectedMemberId) || currentFamily.members[0];
  const currentScheme = schemesList.find((s) => s.id === selectedSchemeId) || schemesList[0] || DEMO_SCHEMES[0];

  // Evaluate readiness
  const report = evaluateDocumentReadiness(currentMember.documents, currentScheme, simulatedFixApplied);

  const handleApplyFix = () => {
    setSimulatedFixApplied(true);
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // Ignore
    }
  };

  const handleResetCheck = () => {
    setSimulatedFixApplied(false);
  };

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 1000);
  };

  const handleVoiceSummary = () => {
    let text = `${report.canSubmit ? t("readyToSubmit") : t("mismatchFound")}. `;
    text += `Readiness score is ${report.readinessScore} percent. `;
    if (!report.canSubmit) {
      text += report.mismatchSummary;
    }
    speak(text);
  };

  return (
    <GraminCareErrorBoundary moduleName="Document Readiness & Scheme Matcher">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header: Deep Forest Green with Warm Gold */}
      <div className="bg-brand-forest rounded-3xl p-6 sm:p-8 text-brand-cream border border-brand-forestLight shadow-soft relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-forestDark text-brand-gold border border-brand-gold/30 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>PPT Flow: Family & Scheme Readiness</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            {t("schemesTitle")}
          </h1>
          <p className="text-brand-cream/80 text-sm mt-2 leading-relaxed font-normal">
            {t("schemesSubtitle")}
          </p>
        </div>
      </div>

      {/* Stepper Visual Ribbon */}
      <div className="bg-white rounded-2xl p-4 border border-brand-charcoalBorder shadow-soft">
        <div className="flex items-center justify-between text-xs font-bold text-brand-charcoalMuted overflow-x-auto pb-1 gap-2">
          <div className="flex items-center gap-2 text-brand-forest shrink-0">
            <span className="w-6 h-6 rounded-full bg-brand-forest text-brand-cream flex items-center justify-center font-bold text-[11px]">1</span>
            <span>Select Family & Scheme</span>
            <ArrowRight className="w-3.5 h-3.5 text-brand-charcoalBorder" />
          </div>
          <div className="flex items-center gap-2 text-brand-forest shrink-0">
            <span className="w-6 h-6 rounded-full bg-brand-forest text-brand-cream flex items-center justify-center font-bold text-[11px]">2</span>
            <span>Scan / Photo Documents</span>
            <ArrowRight className="w-3.5 h-3.5 text-brand-charcoalBorder" />
          </div>
          <div className="flex items-center gap-2 text-brand-forest shrink-0">
            <span className="w-6 h-6 rounded-full bg-brand-forest text-brand-cream flex items-center justify-center font-bold text-[11px]">3</span>
            <span>Readiness & Mismatch</span>
            <ArrowRight className="w-3.5 h-3.5 text-brand-charcoalBorder" />
          </div>
          <div className="flex items-center gap-2 text-brand-forest shrink-0">
            <span className="w-6 h-6 rounded-full bg-brand-forest text-brand-cream flex items-center justify-center font-bold text-[11px]">4</span>
            <span>Fix Guidance</span>
            <ArrowRight className="w-3.5 h-3.5 text-brand-charcoalBorder" />
          </div>
          <div className={`flex items-center gap-2 shrink-0 ${report.canSubmit ? "text-brand-forest font-black" : "text-brand-charcoalMuted"}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] ${
              report.canSubmit ? "bg-brand-gold text-brand-forest" : "bg-brand-creamDark"
            }`}>5</span>
            <span>Ready to Submit</span>
          </div>
        </div>
      </div>

      {/* Selectors Bar: Family Member & Scheme Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Family Member Selection */}
        <div className="bg-white rounded-2xl p-5 border border-brand-charcoalBorder shadow-soft">
          <label className="text-xs font-bold text-brand-forest flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-brand-teal" />
            {t("selectFamilyMember")}
          </label>
          <div className="grid grid-cols-2 gap-2">
            {currentFamily.members.map((member) => (
              <button
                key={member.id}
                onClick={() => {
                  setSelectedMemberId(member.id);
                  setSimulatedFixApplied(false);
                }}
                className={`p-3 rounded-xl border text-left transition-all text-xs ${
                  selectedMemberId === member.id
                    ? "bg-brand-cream border-brand-forest shadow-xs font-bold text-brand-forest ring-1 ring-brand-forest/20"
                    : "bg-white border-brand-charcoalBorder hover:bg-brand-creamMuted text-brand-charcoal"
                }`}
              >
                <div className="font-bold text-sm">{member.name}</div>
                <div className="text-[11px] text-brand-charcoalMuted mt-0.5">
                  {member.relation} • {member.age} yrs • {currentFamily.village}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Scheme Selection */}
        <div className="bg-white rounded-2xl p-5 border border-brand-charcoalBorder shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-brand-forest flex items-center gap-2">
              <ScrollText className="w-4 h-4 text-brand-teal" />
              {t("selectScheme")}
            </label>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
              dataSource === "database"
                ? "bg-brand-forest/10 text-brand-forest border border-brand-forest/20"
                : "bg-brand-goldMuted text-brand-goldDark border border-brand-gold/30"
            }`}>
              <Database className="w-3 h-3" />
              <span>{dataSource === "database" ? "PostgreSQL Live" : "Curated Benchmark"}</span>
            </span>
          </div>
          <select
            value={selectedSchemeId}
            onChange={(e) => setSelectedSchemeId(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-brand-charcoalBorder text-xs font-semibold text-brand-charcoal bg-brand-cream focus:bg-white focus:border-brand-teal"
          >
            {schemesList.map((scheme) => (
              <option key={scheme.id} value={scheme.id}>
                {scheme.name} ({scheme.coverageAmount})
              </option>
            ))}
          </select>
          <p className="text-[11px] text-brand-charcoalMuted mt-2 line-clamp-2">
            {currentScheme.description}
          </p>
        </div>
      </div>

      {/* Readiness Assessment Hero Card */}
      <div className={`rounded-3xl p-6 sm:p-8 border transition-all ${
        report.overallStatus === "ready"
          ? "bg-brand-forest text-brand-cream border-brand-forestLight shadow-card"
          : report.overallStatus === "warning"
          ? "bg-brand-forest text-brand-cream border-brand-gold shadow-card ring-1 ring-brand-gold/30"
          : "bg-brand-charcoal text-white border-rose-800 shadow-card"
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                report.overallStatus === "ready"
                  ? "bg-brand-forestDark text-brand-gold border border-brand-gold/30"
                  : report.overallStatus === "warning"
                  ? "bg-brand-gold text-brand-forest font-black"
                  : "bg-rose-500/20 text-rose-300 border border-rose-400/30"
              }`}>
                {report.overallStatus === "ready" ? t("statusReady") : report.overallStatus === "warning" ? t("statusWarning") : t("statusRisk")}
              </span>
              <span className="text-brand-cream/70 text-xs font-mono">
                Scheme: {currentScheme.code}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white">
              {report.overallStatus === "ready"
                ? t("readyToSubmit")
                : t("mismatchFound")}
            </h2>

            <p className="text-xs text-brand-cream/80 leading-relaxed font-normal">
              {report.mismatchSummary}
            </p>
          </div>

          {/* Readiness Score Radial Gauge */}
          <div className="flex items-center gap-4 bg-black/25 p-4 rounded-2xl border border-white/10 shrink-0">
            <div className="text-center">
              <div className="text-3xl font-black tracking-tight text-white">
                {report.readinessScore}%
              </div>
              <div className="text-[10px] text-brand-gold uppercase tracking-wider font-bold">
                Readiness Score
              </div>
            </div>

            <div className="h-10 w-px bg-white/15" />

            {/* Quick Action Controls */}
            <div className="flex flex-col gap-2">
              <button
                onClick={handleVoiceSummary}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-semibold transition-colors"
              >
                <Volume2 className="w-3.5 h-3.5 text-brand-gold" />
                <span>{t("listenVoice")}</span>
              </button>

              {!simulatedFixApplied ? (
                <button
                  onClick={handleApplyFix}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-gold hover:bg-brand-goldLight text-brand-forest text-xs font-black shadow-card transition-all hover:scale-105 active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5 text-brand-forest" />
                  <span>{t("applyDemoFix")}</span>
                </button>
              ) : (
                <button
                  onClick={handleResetCheck}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-semibold transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Demo</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Document Cards Section (Aadhaar, Ration Card, Income Proof) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-brand-forest flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-brand-teal" />
              {t("documentsHeading")} ({report.documents.length})
            </h3>
            <p className="text-xs text-brand-charcoalMuted">
              Evaluated against statutory {currentScheme.name} validation checklist
            </p>
          </div>

          <button
            onClick={handleSimulateScan}
            disabled={isScanning}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-forest hover:bg-brand-forestLight text-brand-cream text-xs font-bold transition-all shadow-card disabled:opacity-50"
          >
            <ScanLine className={`w-4 h-4 text-brand-gold ${isScanning ? "animate-spin" : ""}`} />
            <span>{isScanning ? "Processing OCR..." : t("scanSimulation")}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {report.documents.map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>
      </div>

      {/* Actionable Submission Checklist */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-charcoalBorder shadow-card">
        <h4 className="font-bold text-sm text-brand-forest mb-3 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-brand-teal" />
          Pre-Submission Action Steps for Common Service Center (CSC / Grama One)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
          {report.fixActionPlan.map((step, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-brand-cream border border-brand-charcoalBorder flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-brand-forest text-brand-cream font-bold flex items-center justify-center shrink-0 text-[11px]">
                {idx + 1}
              </span>
              <p className="text-brand-charcoal leading-relaxed font-medium">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Pipeline Visualizer (PPT Architecture Requirement) */}
      <PipelineVisualizer />
    </div>
  </GraminCareErrorBoundary>
  );
}
