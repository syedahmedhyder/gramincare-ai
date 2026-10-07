"use client";

import React from "react";
import { 
  HelpCircle, 
  Sparkles, 
  ShieldCheck, 
  FileCheck2, 
  MapPin, 
  BadgeCheck,
  ChevronRight
} from "lucide-react";

interface FlowStep {
  number: number;
  stage: string;
  sublabel: string;
  icon: React.ElementType;
  badge: string;
}

const FLOW_STEPS: FlowStep[] = [
  {
    number: 1,
    stage: "Need",
    sublabel: "Describe illness or symptom in voice/text",
    icon: HelpCircle,
    badge: "Voice-First",
  },
  {
    number: 2,
    stage: "Match",
    sublabel: "Identify central & state health entitlements",
    icon: Sparkles,
    badge: "Smart Engine",
  },
  {
    number: 3,
    stage: "Verify",
    sublabel: "Check statutory criteria & BPL eligibility",
    icon: ShieldCheck,
    badge: "SECC / ArK Rules",
  },
  {
    number: 4,
    stage: "Prepare",
    sublabel: "Pre-screen documents to fix name mismatches",
    icon: FileCheck2,
    badge: "Zero Rejection",
  },
  {
    number: 5,
    stage: "Connect",
    sublabel: "Navigate to nearest PHC or 108 transit",
    icon: MapPin,
    badge: "Rapid Routing",
  },
  {
    number: 6,
    stage: "Claim",
    sublabel: "Cashless admission via Ayushman Mitra",
    icon: BadgeCheck,
    badge: "Cashless Care",
  },
];

export default function VisualFlowDiagram() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-charcoalBorder shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-brand-creamDark pb-4">
          <div>
            <span className="text-[11px] font-black uppercase tracking-widest text-brand-teal">
              How Access Works
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-brand-forest tracking-tight">
              From Sickness to Cashless Care in 6 Clear Steps
            </h3>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-cream text-brand-forest border border-brand-charcoalBorder/60 self-start sm:self-auto">
            5-Second Overview
          </span>
        </div>

        {/* Responsive Horizontal Step Flow */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 relative">
          {FLOW_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="group relative bg-brand-cream/60 hover:bg-white rounded-2xl p-4 border border-brand-charcoalBorder/60 hover:border-brand-teal hover:shadow-card transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl bg-brand-forest text-brand-gold flex items-center justify-center font-black text-xs group-hover:scale-105 transition-transform">
                      {step.number}
                    </div>
                    <span className="text-[10px] font-bold text-brand-charcoalMuted uppercase tracking-wider">
                      {step.badge}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-2xl bg-brand-tealMuted text-brand-teal flex items-center justify-center group-hover:bg-brand-teal group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div>
                    <h4 className="font-black text-base text-brand-forest group-hover:text-brand-teal transition-colors">
                      {step.stage}
                    </h4>
                    <p className="text-[11px] text-brand-charcoalMuted leading-tight mt-1">
                      {step.sublabel}
                    </p>
                  </div>
                </div>

                {idx < FLOW_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-brand-charcoalBorder group-hover:text-brand-teal transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
