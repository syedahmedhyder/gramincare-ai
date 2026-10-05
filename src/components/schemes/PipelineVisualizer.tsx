"use client";

import React, { useState } from "react";
import { 
  FileText, 
  ScanLine, 
  Cpu, 
  Lightbulb, 
  Volume2, 
  CheckCircle2, 
  Sparkles
} from "lucide-react";
import { TECHNOLOGY_PIPELINE_STAGES } from "@/lib/document-engine";

export default function PipelineVisualizer() {
  const [activeStage, setActiveStage] = useState<number>(3); // Default to Rule + ML check

  const icons = [FileText, ScanLine, Cpu, Lightbulb, Volume2];

  return (
    <div className="bg-white rounded-3xl border border-brand-charcoalBorder p-6 sm:p-8 shadow-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-brand-forest text-base flex items-center gap-2">
              <Cpu className="w-5 h-5 text-brand-teal" />
              Technology Processing Pipeline
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-brand-forest/10 text-brand-forest font-bold text-[11px] border border-brand-forest/20">
              PPT Innovation Flow
            </span>
          </div>
          <p className="text-xs text-brand-charcoalMuted mt-1">
            Visualized end-to-end processing pipeline from paper document scan to spoken vernacular guidance
          </p>
        </div>
        <span className="text-[11px] text-brand-charcoalMuted font-medium">
          Click any stage to inspect internal mechanics
        </span>
      </div>

      {/* 5-Step Pipeline Horizontal Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {TECHNOLOGY_PIPELINE_STAGES.map((stage, idx) => {
          const Icon = icons[idx];
          const isSelected = activeStage === stage.stageId;
          return (
            <button
              key={stage.stageId}
              onClick={() => setActiveStage(stage.stageId)}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                isSelected
                  ? "bg-brand-cream border-brand-teal ring-2 ring-brand-teal/20 shadow-xs"
                  : "bg-white border-brand-charcoalBorder hover:bg-brand-creamMuted"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${
                  isSelected ? "bg-brand-forest text-brand-cream" : "bg-brand-creamDark text-brand-charcoal"
                }`}>
                  {stage.stageId}
                </span>
                <Icon className={`w-4 h-4 ${isSelected ? "text-brand-teal" : "text-brand-charcoalMuted"}`} />
              </div>
              <p className={`font-bold text-xs ${isSelected ? "text-brand-forest" : "text-brand-charcoal"}`}>
                {stage.title}
              </p>
              <p className="text-[10px] text-brand-charcoalMuted line-clamp-1 mt-0.5">
                {stage.subtitle}
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected Stage Detail Card */}
      {TECHNOLOGY_PIPELINE_STAGES[activeStage - 1] && (
        <div className="bg-brand-forest text-brand-cream rounded-2xl p-5 border border-brand-forestLight text-xs shadow-soft">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-brand-forestLight pb-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-brand-gold text-brand-forest font-black text-xs flex items-center justify-center">
                {activeStage}
              </span>
              <span className="font-bold text-sm text-white">
                {TECHNOLOGY_PIPELINE_STAGES[activeStage - 1].title} — Architecture Breakdown
              </span>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-brand-forestDark text-brand-gold font-mono text-[11px] border border-brand-gold/30">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold" />
              {TECHNOLOGY_PIPELINE_STAGES[activeStage - 1].demoMetric}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-brand-gold font-bold mb-1 uppercase tracking-wider text-[10px]">
                Underlying Mechanism:
              </p>
              <p className="text-brand-cream/85 leading-relaxed">
                {TECHNOLOGY_PIPELINE_STAGES[activeStage - 1].technicalDetails}
              </p>
            </div>
            <div className="bg-brand-forestDark/80 rounded-xl p-3.5 border border-brand-forestLight">
              <p className="text-brand-gold font-bold mb-1 text-[11px] flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Live Expo Demo Simulation:
              </p>
              {activeStage === 1 && (
                <p className="text-brand-cream/80">
                  Sample: Ramesh Gowda's physical Aadhaar card and Ration card uploaded via ASHA worker camera module. Contrast enhanced for low-connectivity offline processing.
                </p>
              )}
              {activeStage === 2 && (
                <p className="text-brand-cream/80 font-mono text-[11px]">
                  Extracted JSON: &#123; name_aadhaar: "Ramesh Gowda", name_ration: "Ramesh G.", dob: "14/08/1976", income: 65000 &#125;
                </p>
              )}
              {activeStage === 3 && (
                <p className="text-brand-cream/80 font-mono text-[11px]">
                  Fuzzy Match: Levenshtein Distance = 4 chars (72% match). Threshold &lt; 85% flags automated mismatch warning. Income ₹65,000 matches BPL &lt; ₹1,20,000 policy.
                </p>
              )}
              {activeStage === 4 && (
                <p className="text-brand-cream/80">
                  Explainable Output: "Name mismatch prevents automatic biometric deduplication at the CSC portal. Required Action: Apply for Aadhaar Seeding Form 4."
                </p>
              )}
              {activeStage === 5 && (
                <p className="text-brand-cream/80">
                  Audio Engine: Generates spoken voice narration in the citizen's mother tongue (Kannada, Hindi, etc.) explaining exactly where to go and what documents to bring.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
