"use client";

import React, { useState } from "react";
import { 
  GitFork, 
  Layers, 
  Building2, 
  Landmark, 
  Activity, 
  MapPin, 
  Hospital, 
  CheckCircle2, 
  ArrowDown,
  ChevronRight
} from "lucide-react";

interface MindMapNode {
  id: string;
  label: string;
  badge?: string;
  description: string;
}

const NODES_DATA: Record<string, { title: string; detail: string; metric: string }> = {
  india: {
    title: "National Health Mission Ecosystem",
    detail: "Constitutional framework guaranteeing welfare under Article 21 and universal health coverage priorities.",
    metric: "1.4 Billion Citizens",
  },
  central: {
    title: "Central Health Entitlements",
    detail: "National schemes like PM-JAY, National Dialysis Programme, and RBSK funded by Government of India.",
    metric: "740+ Total Central Schemes",
  },
  state: {
    title: "State & UT Health Programs",
    detail: "State-specific healthcare insurance and regional primary health sub-centres.",
    metric: "4,340+ State/UT Schemes",
  },
  schemes: {
    title: "Statutory Financial Schemes",
    detail: "Direct cash assistance, cashless in-patient hospitalization up to ₹5 Lakh, and DBT maternal incentives.",
    metric: "296 Health Schemes",
  },
  programmes: {
    title: "Public Health Programmes",
    detail: "Non-communicable disease screening (NP-NCD), immunization drives, and Jan Aushadhi generic distribution.",
    metric: "Universal Village Delivery",
  },
  karnataka: {
    title: "Karnataka Health Framework",
    detail: "Suvarna Arogya Suraksha Trust (SAST) providing unified cashless health access across 31 districts.",
    metric: "1.84 Cr Cards Issued",
  },
  ark: {
    title: "AB-ArK Scheme Packages",
    detail: "1,650 surgical and medical packages covering tertiary dialysis, oncology, cardiac, and trauma care.",
    metric: "₹1,268 Cr Claims Settled",
  },
  publicHospitals: {
    title: "Public Health Network",
    detail: "2,965 Government Primary Health Centres (PHCs), Taluk Hospitals, and Medical Colleges.",
    metric: "2,965 Govt Facilities",
  },
  privateHospitals: {
    title: "Empanelled Private Hospitals",
    detail: "594 accredited private tertiary hospitals providing specialized cashless surgical admissions.",
    metric: "594 Private Hospitals",
  },
};

export default function ResearchMindMap() {
  const [activeNode, setActiveNode] = useState<string>("ark");

  const currentInfo = NODES_DATA[activeNode] || NODES_DATA.ark;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-brand-creamDark pb-4">
        <div>
          <span className="text-[11px] font-black uppercase tracking-widest text-brand-teal">
            Research Architecture
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-brand-forest tracking-tight">
            Healthcare Benefit Taxonomy Mind Map
          </h3>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-cream text-brand-forest border border-brand-charcoalBorder/60 self-start sm:self-auto">
          Interactive Hierarchy
        </span>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-charcoalBorder shadow-soft space-y-8">
        {/* Mind Map Tree Nodes */}
        <div className="flex flex-col items-center space-y-4">
          {/* Level 1: INDIA */}
          <button
            onClick={() => setActiveNode("india")}
            className={`px-6 py-2.5 rounded-2xl font-black text-sm tracking-wider transition-all border flex items-center gap-2 ${
              activeNode === "india"
                ? "bg-brand-forest text-brand-gold border-brand-forest shadow-card scale-105"
                : "bg-brand-cream text-brand-forest border-brand-charcoalBorder/60 hover:border-brand-forest"
            }`}
          >
            <Landmark className="w-4 h-4 text-brand-gold" />
            <span>INDIA</span>
          </button>

          <ArrowDown className="w-4 h-4 text-brand-teal" />

          {/* Level 2: Government */}
          <div className="px-5 py-1.5 rounded-xl bg-brand-forestLight/10 text-brand-forest text-xs font-bold border border-brand-forestLight/20">
            Government of India & State Authorities
          </div>

          <ArrowDown className="w-4 h-4 text-brand-teal" />

          {/* Level 3: Central / State */}
          <div className="grid grid-cols-2 gap-3 w-full max-w-md">
            <button
              onClick={() => setActiveNode("central")}
              className={`p-3 rounded-2xl text-center text-xs font-bold border transition-all ${
                activeNode === "central"
                  ? "bg-brand-teal text-white border-brand-teal shadow-xs"
                  : "bg-brand-cream text-brand-forest border-brand-charcoalBorder/60 hover:border-brand-teal"
              }`}
            >
              <div className="text-[10px] uppercase font-black tracking-wide text-brand-goldDark">Central Tier</div>
              <div className="font-black text-sm">740+ Schemes</div>
            </button>

            <button
              onClick={() => setActiveNode("state")}
              className={`p-3 rounded-2xl text-center text-xs font-bold border transition-all ${
                activeNode === "state"
                  ? "bg-brand-teal text-white border-brand-teal shadow-xs"
                  : "bg-brand-cream text-brand-forest border-brand-charcoalBorder/60 hover:border-brand-teal"
              }`}
            >
              <div className="text-[10px] uppercase font-black tracking-wide text-brand-goldDark">State / UT Tier</div>
              <div className="font-black text-sm">4,340+ Schemes</div>
            </button>
          </div>

          <ArrowDown className="w-4 h-4 text-brand-teal" />

          {/* Level 4: Health & Wellness (296) */}
          <div className="px-4 py-1.5 rounded-xl bg-brand-tealMuted text-brand-teal text-xs font-black border border-brand-teal/30">
            Health & Wellness Schemes (296 Total)
          </div>

          <ArrowDown className="w-4 h-4 text-brand-teal" />

          {/* Level 5: Schemes / Programmes / Services */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 w-full max-w-xl">
            <button
              onClick={() => setActiveNode("schemes")}
              className={`p-2.5 rounded-xl text-center text-xs font-bold border transition-all ${
                activeNode === "schemes"
                  ? "bg-brand-forest text-brand-gold border-brand-forest"
                  : "bg-brand-cream text-brand-forest border-brand-charcoalBorder/60 hover:border-brand-forest"
              }`}
            >
              <div className="font-black">Financial Schemes</div>
              <div className="text-[10px] text-brand-charcoalMuted">PM-JAY, JSY, RAN</div>
            </button>

            <button
              onClick={() => setActiveNode("programmes")}
              className={`p-2.5 rounded-xl text-center text-xs font-bold border transition-all ${
                activeNode === "programmes"
                  ? "bg-brand-forest text-brand-gold border-brand-forest"
                  : "bg-brand-cream text-brand-forest border-brand-charcoalBorder/60 hover:border-brand-forest"
              }`}
            >
              <div className="font-black">Health Programmes</div>
              <div className="text-[10px] text-brand-charcoalMuted">RBSK, NP-NCD, Dialysis</div>
            </button>

            <button
              onClick={() => setActiveNode("karnataka")}
              className={`col-span-2 sm:col-span-1 p-2.5 rounded-xl text-center text-xs font-bold border transition-all ${
                activeNode === "karnataka"
                  ? "bg-brand-forest text-brand-gold border-brand-forest"
                  : "bg-brand-cream text-brand-forest border-brand-charcoalBorder/60 hover:border-brand-forest"
              }`}
            >
              <div className="font-black">Karnataka Focus</div>
              <div className="text-[10px] text-brand-charcoalMuted">SAST / AB-ArK</div>
            </button>
          </div>

          <ArrowDown className="w-4 h-4 text-brand-gold" />

          {/* Level 6: Karnataka Detailed Network Branches */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
            <button
              onClick={() => setActiveNode("ark")}
              className={`p-3.5 rounded-2xl text-left border transition-all space-y-1 ${
                activeNode === "ark"
                  ? "bg-brand-goldMuted border-brand-goldDark shadow-xs"
                  : "bg-white border-brand-charcoalBorder/60 hover:border-brand-gold"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-black text-xs text-brand-forest">AB-ArK Packages</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-brand-gold text-brand-forest">1,650</span>
              </div>
              <p className="text-[11px] text-brand-charcoalMuted leading-tight">
                Dialysis, Oncology, Cardiac & Trauma surgery packages
              </p>
            </button>

            <button
              onClick={() => setActiveNode("publicHospitals")}
              className={`p-3.5 rounded-2xl text-left border transition-all space-y-1 ${
                activeNode === "publicHospitals"
                  ? "bg-brand-tealMuted border-brand-teal shadow-xs"
                  : "bg-white border-brand-charcoalBorder/60 hover:border-brand-teal"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-black text-xs text-brand-forest">Public Hospitals</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-brand-teal text-white">2,965</span>
              </div>
              <p className="text-[11px] text-brand-charcoalMuted leading-tight">
                Government PHCs, CHCs, Taluk and District hospitals
              </p>
            </button>

            <button
              onClick={() => setActiveNode("privateHospitals")}
              className={`p-3.5 rounded-2xl text-left border transition-all space-y-1 ${
                activeNode === "privateHospitals"
                  ? "bg-brand-creamMuted border-brand-forest shadow-xs"
                  : "bg-white border-brand-charcoalBorder/60 hover:border-brand-forest"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-black text-xs text-brand-forest">Private Empanelled</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-brand-forest text-brand-cream">594</span>
              </div>
              <p className="text-[11px] text-brand-charcoalMuted leading-tight">
                Specialized network hospitals for complex tertiary referral
              </p>
            </button>
          </div>
        </div>

        {/* Selected Node Summary Callout */}
        <div className="p-4 sm:p-5 rounded-2xl bg-brand-cream/80 border border-brand-charcoalBorder flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-teal" />
              <h4 className="font-black text-sm text-brand-forest">{currentInfo.title}</h4>
            </div>
            <p className="text-xs text-brand-charcoalMuted max-w-2xl">{currentInfo.detail}</p>
          </div>
          <div className="px-4 py-2 rounded-xl bg-white border border-brand-charcoalBorder/60 text-xs font-black text-brand-forest shrink-0 self-start sm:self-auto">
            {currentInfo.metric}
          </div>
        </div>
      </div>
    </section>
  );
}
