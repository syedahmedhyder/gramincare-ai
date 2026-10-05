"use client";

import React, { useState, useEffect } from "react";
import { 
  HeartPulse, 
  Activity, 
  Droplet, 
  Wind, 
  ShieldCheck, 
  AlertTriangle, 
  Volume2, 
  CheckCircle2,
  Database
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { DEMO_HEALTH_TWINS } from "@/lib/demo-data";
import { HealthTwinMetrics } from "@/lib/types";
import GraminCareErrorBoundary from "@/components/common/GraminCareErrorBoundary";

export default function HealthTwinPage() {
  const { t, speak } = useLanguage();
  const [selectedMemberId, setSelectedMemberId] = useState<string>("mem-ramesh");
  const [twin, setTwin] = useState<HealthTwinMetrics>(DEMO_HEALTH_TWINS["mem-ramesh"]);
  const [dataSource, setDataSource] = useState<"database" | "demo">("demo");

  useEffect(() => {
    fetch(`/api/health-twin?memberId=${selectedMemberId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.twin) {
          setTwin(data.twin);
          setDataSource(data.source || "demo");
        }
      })
      .catch((err) => console.warn("Using fallback health twin metrics:", err));
  }, [selectedMemberId]);

  const handleVoiceSummary = () => {
    let text = `Health Twin profile for ${twin.memberName}. `;
    text += `Blood pressure is ${twin.vitals.bpSystolic} over ${twin.vitals.bpDiastolic}. `;
    text += `Heart rate is ${twin.vitals.pulseRate} beats per minute. `;
    text += `Blood oxygen is ${twin.vitals.spo2} percent. `;
    if (twin.clinicalAlerts.length > 0) {
      text += `Active alert: ${twin.clinicalAlerts[0].title}.`;
    }
    speak(text);
  };

  return (
    <GraminCareErrorBoundary moduleName="Rural Health Twin">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner: Deep Forest Green & Warm Gold */}
      <div className="bg-brand-forest rounded-3xl p-6 sm:p-8 text-brand-cream border border-brand-forestLight shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-forestDark text-brand-gold border border-brand-gold/30 text-xs font-bold mb-3">
              <HeartPulse className="w-3.5 h-3.5 text-brand-gold" />
              <span>Digital Health Avatar & Chronic Indicator Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {t("twinTitle")}
            </h1>
            <p className="text-brand-cream/80 text-sm mt-2 leading-relaxed font-normal">
              {t("twinSubtitle")}
            </p>
          </div>

          {/* Member Switcher */}
          <div className="flex items-center gap-2 bg-brand-forestDark p-1.5 rounded-2xl border border-brand-forestLight">
            <button
              onClick={() => setSelectedMemberId("mem-ramesh")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedMemberId === "mem-ramesh"
                  ? "bg-brand-gold text-brand-forest shadow-xs font-black"
                  : "text-brand-cream/70 hover:text-white"
              }`}
            >
              Ramesh Gowda (48M)
            </button>
            <button
              onClick={() => setSelectedMemberId("mem-sunita")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedMemberId === "mem-sunita"
                  ? "bg-brand-gold text-brand-forest shadow-xs font-black"
                  : "text-brand-cream/70 hover:text-white"
              }`}
            >
              Sunita Devi (24F)
            </button>
          </div>
        </div>
      </div>

      {/* Patient Baseline Identity Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-charcoalBorder shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-forest text-brand-gold flex items-center justify-center font-black text-xl shadow-xs">
            {twin.memberName.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-brand-forest">{twin.memberName}</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-brand-cream text-brand-forest text-xs font-bold border border-brand-charcoalBorder">
                Blood Group: {twin.bloodGroup}
              </span>
            </div>
            <p className="text-xs text-brand-charcoalMuted mt-0.5">
              {twin.age} years • {twin.gender} • Baseline linked via ASHA Field Screening
            </p>
          </div>
        </div>

        <button
          onClick={handleVoiceSummary}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-cream hover:bg-brand-creamMuted text-brand-forest border border-brand-charcoalBorder text-xs font-bold transition-colors shadow-2xs"
        >
          <Volume2 className="w-4 h-4 text-brand-teal" />
          <span>{t("listenVoice")}</span>
        </button>
      </div>

      {/* Vitals Overview Cards (4 Key Rural Metrics) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Blood Pressure */}
        <div className="bg-white rounded-2xl p-5 border border-brand-charcoalBorder shadow-soft">
          <div className="flex items-center justify-between text-brand-charcoalMuted mb-2">
            <span className="text-xs font-bold text-brand-forest">{t("bloodPressure")}</span>
            <Activity className="w-4 h-4 text-brand-teal" />
          </div>
          <div className="text-2xl font-black text-brand-forest">
            {twin.vitals.bpSystolic} / {twin.vitals.bpDiastolic}
            <span className="text-xs font-normal text-brand-charcoalMuted ml-1">mmHg</span>
          </div>
          <span className={`inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
            twin.vitals.bpSystolic > 140
              ? "bg-rose-50 text-rose-700 border border-rose-200"
              : twin.vitals.bpSystolic > 130
              ? "bg-brand-goldMuted text-brand-goldDark border border-brand-gold/40"
              : "bg-brand-forest/10 text-brand-forest border border-brand-forest/20"
          }`}>
            {twin.vitals.bpSystolic > 140 ? "Hypertensive Alert" : twin.vitals.bpSystolic > 130 ? "Pre-Hypertension" : "Normal"}
          </span>
        </div>

        {/* Pulse Rate */}
        <div className="bg-white rounded-2xl p-5 border border-brand-charcoalBorder shadow-soft">
          <div className="flex items-center justify-between text-brand-charcoalMuted mb-2">
            <span className="text-xs font-bold text-brand-forest">{t("pulseRate")}</span>
            <HeartPulse className="w-4 h-4 text-brand-teal" />
          </div>
          <div className="text-2xl font-black text-brand-forest">
            {twin.vitals.pulseRate}
            <span className="text-xs font-normal text-brand-charcoalMuted ml-1">BPM</span>
          </div>
          <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-forest/10 text-brand-forest border border-brand-forest/20">
            Steady Rhythm
          </span>
        </div>

        {/* SpO2 */}
        <div className="bg-white rounded-2xl p-5 border border-brand-charcoalBorder shadow-soft">
          <div className="flex items-center justify-between text-brand-charcoalMuted mb-2">
            <span className="text-xs font-bold text-brand-forest">{t("spo2")}</span>
            <Wind className="w-4 h-4 text-brand-teal" />
          </div>
          <div className="text-2xl font-black text-brand-forest">
            {twin.vitals.spo2}
            <span className="text-xs font-normal text-brand-charcoalMuted ml-1">%</span>
          </div>
          <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-forest/10 text-brand-forest border border-brand-forest/20">
            Adequate Oxygenation
          </span>
        </div>

        {/* Blood Sugar */}
        <div className="bg-white rounded-2xl p-5 border border-brand-charcoalBorder shadow-soft">
          <div className="flex items-center justify-between text-brand-charcoalMuted mb-2">
            <span className="text-xs font-bold text-brand-forest">{t("bloodSugar")}</span>
            <Droplet className="w-4 h-4 text-brand-goldDark" />
          </div>
          <div className="text-2xl font-black text-brand-forest">
            {twin.vitals.bloodSugar}
            <span className="text-xs font-normal text-brand-charcoalMuted ml-1">mg/dL</span>
          </div>
          <span className={`inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
            twin.vitals.bloodSugar > 140
              ? "bg-brand-goldMuted text-brand-goldDark border border-brand-gold/40"
              : "bg-brand-forest/10 text-brand-forest border border-brand-forest/20"
          }`}>
            {twin.vitals.bloodSugar > 140 ? "Elevated Glucose" : "Normal"}
          </span>
        </div>
      </div>

      {/* Chronic Organ Risk Radar & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Clinical Alerts Timeline */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-charcoalBorder shadow-card space-y-4">
          <h3 className="font-bold text-brand-forest text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-brand-goldDark" />
            Active Clinical Indicators & ASHA Follow-up
          </h3>

          <div className="space-y-3">
            {twin.clinicalAlerts.map((alert, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border text-xs ${
                  alert.severity === "red"
                    ? "bg-rose-50 border-rose-200 text-rose-950"
                    : "bg-brand-goldMuted border-brand-gold/50 text-brand-charcoal"
                }`}
              >
                <div className="font-bold text-sm mb-1 text-brand-forest">{alert.title}</div>
                <p className="leading-relaxed mb-2 opacity-90">{alert.description}</p>
                <div className="bg-white p-2.5 rounded-xl border border-brand-charcoalBorder/60 font-semibold text-[11px] text-brand-charcoal">
                  ⚡ Recommended Protocol: {alert.action}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Immunizations & Preventative Care */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-charcoalBorder shadow-card space-y-4">
          <h3 className="font-bold text-brand-forest text-sm flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-teal" />
            {t("preventativeCare")}
          </h3>

          <div className="space-y-2.5">
            {twin.immunizations.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-brand-cream border border-brand-charcoalBorder text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-forest shrink-0" />
                  <div>
                    <div className="font-bold text-brand-forest">{item.vaccine}</div>
                    <div className="text-[10px] text-brand-charcoalMuted">Record: {item.dateOrDue}</div>
                  </div>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                  item.status === "Completed"
                    ? "bg-brand-forest/10 text-brand-forest"
                    : "bg-brand-goldMuted text-brand-goldDark"
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </GraminCareErrorBoundary>
  );
}
