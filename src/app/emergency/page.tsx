"use client";

import React, { useState, useEffect } from "react";
import { 
  Ambulance, 
  PhoneCall, 
  MapPin, 
  Clock, 
  Bed, 
  Wind, 
  ShieldAlert, 
  Stethoscope, 
  CheckCircle2, 
  Sparkles,
  Database
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { DEMO_FACILITIES } from "@/lib/demo-data";
import { HealthcareFacility } from "@/lib/types";
import GraminCareErrorBoundary from "@/components/common/GraminCareErrorBoundary";

export default function EmergencyPage() {
  const { t, speak } = useLanguage();
  const [facilities, setFacilities] = useState<HealthcareFacility[]>(DEMO_FACILITIES);
  const [dataSource, setDataSource] = useState<"database" | "demo">("demo");
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<HealthcareFacility>(DEMO_FACILITIES[0]);

  useEffect(() => {
    fetch("/api/emergency")
      .then((res) => res.json())
      .then((data) => {
        if (data.facilities && data.facilities.length > 0) {
          setFacilities(data.facilities);
          setSelectedFacility(data.facilities[0]);
          setDataSource(data.source || "demo");
        }
      })
      .catch((err) => console.warn("Using fallback facilities:", err));
  }, []);

  const handleSosTrigger = () => {
    setSosModalOpen(true);
    speak("Emergency ambulance dispatch simulated. Patient GPS location transmitted to nearest Community Health Center.");
  };

  return (
    <GraminCareErrorBoundary moduleName="Emergency Assistance Radar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner: Deep Forest Green & Warm Gold */}
      <div className="bg-brand-forest rounded-3xl p-6 sm:p-8 text-brand-cream border border-brand-forestLight shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-forestDark text-brand-gold border border-brand-gold/30 text-xs font-bold mb-3">
              <Ambulance className="w-3.5 h-3.5 text-brand-gold" />
              <span>Rural Emergency Redirection Radar</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {t("emergencyTitle")}
            </h1>
            <p className="text-brand-cream/80 text-sm mt-2 leading-relaxed font-normal">
              {t("emergencySubtitle")}
            </p>
          </div>

          <button
            onClick={handleSosTrigger}
            className="px-6 py-4 rounded-2xl bg-brand-gold hover:bg-brand-goldLight text-brand-forest font-black text-sm flex items-center justify-center gap-2 shadow-card transition-all hover:scale-105 active:scale-95 shrink-0"
          >
            <PhoneCall className="w-5 h-5 text-brand-forest" />
            <span>{t("callAmbulance")} (Simulate SOS)</span>
          </button>
        </div>
      </div>

      {/* Benchmark notice */}
      <div className="bg-white rounded-2xl p-4 text-xs text-brand-charcoal flex items-center gap-2.5 border border-brand-charcoalBorder shadow-soft">
        <ShieldAlert className="w-4 h-4 text-brand-teal shrink-0" />
        <span>
          <strong className="text-brand-forest">Dataset Notice: </strong> All rural PHC/CHC distance matrices, doctor rosters, and oxygen stock counts use curated Indian healthcare benchmark data.
        </span>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {facilities.map((facility) => {
          const isSelected = selectedFacility.id === facility.id;
          return (
            <div
              key={facility.id}
              onClick={() => setSelectedFacility(facility)}
              className={`rounded-3xl border p-6 transition-all cursor-pointer bg-white ${
                isSelected
                  ? "border-brand-forest shadow-card ring-2 ring-brand-forest/20"
                  : "border-brand-charcoalBorder hover:border-brand-teal shadow-soft"
              }`}
            >
              {/* Type Badge & Distance */}
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                  facility.type === "District Hospital"
                    ? "bg-brand-forest text-brand-cream"
                    : facility.type === "CHC"
                    ? "bg-brand-tealMuted text-brand-teal"
                    : "bg-brand-goldMuted text-brand-goldDark"
                }`}>
                  {facility.type}
                </span>

                <div className="flex items-center gap-2 text-xs font-semibold text-brand-charcoal">
                  <Clock className="w-3.5 h-3.5 text-brand-charcoalMuted" />
                  <span>{facility.travelTimeMin} mins</span>
                  <span className="text-brand-charcoalBorder">•</span>
                  <span>{facility.distanceKm} km</span>
                </div>
              </div>

              <h3 className="font-bold text-brand-forest text-base mb-1">
                {facility.name}
              </h3>
              <p className="text-xs text-brand-charcoalMuted flex items-center gap-1.5 mb-4">
                <MapPin className="w-3.5 h-3.5 text-brand-teal shrink-0" />
                <span className="line-clamp-1">{facility.location}</span>
              </p>

              {/* Vitals / Capacity Radar */}
              <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                <div className="bg-brand-cream rounded-xl p-2.5 border border-brand-charcoalBorder">
                  <div className="flex items-center gap-1 text-brand-charcoalMuted text-[11px] mb-0.5">
                    <Bed className="w-3 h-3 text-brand-teal" />
                    <span>Emergency Beds</span>
                  </div>
                  <div className="font-bold text-brand-forest text-sm">
                    {facility.emergencyBeds} available
                  </div>
                </div>

                <div className="bg-brand-cream rounded-xl p-2.5 border border-brand-charcoalBorder">
                  <div className="flex items-center gap-1 text-brand-charcoalMuted text-[11px] mb-0.5">
                    <Wind className="w-3 h-3 text-brand-teal" />
                    <span>Oxygen Cylinders</span>
                  </div>
                  <div className="font-bold text-brand-forest text-sm">
                    {facility.oxygenCylinders} units
                  </div>
                </div>
              </div>

              {/* Doctor on Duty */}
              <div className="bg-brand-tealMuted rounded-xl p-3 border border-brand-teal/20 text-xs mb-4">
                <div className="flex items-center gap-1.5 text-brand-forest font-bold mb-0.5">
                  <Stethoscope className="w-3.5 h-3.5 text-brand-teal" />
                  <span>{t("doctorOnDuty")}</span>
                </div>
                <div className="text-brand-charcoal text-[11px]">
                  {facility.doctorOnDuty}
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="flex items-center justify-between text-xs pt-2 border-t border-brand-creamDark text-brand-charcoalMuted">
                <span className="font-mono text-[11px]">{facility.phone}</span>
                <span className="text-brand-forest font-bold flex items-center gap-1">
                  {facility.is24x7 ? "24x7 Operational" : "Daytime OPD"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* SOS Modal Simulator */}
      {sosModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-brand-charcoalBorder text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-brand-forest text-brand-gold mx-auto flex items-center justify-center shadow-card">
              <Ambulance className="w-8 h-8" />
            </div>

            <h3 className="font-black text-xl text-brand-forest">
              108 Emergency Dispatch Simulated
            </h3>

            <div className="bg-brand-cream rounded-2xl p-4 text-xs text-left space-y-2 border border-brand-charcoalBorder">
              <div className="flex justify-between">
                <span className="text-brand-charcoalMuted">Target Facility:</span>
                <strong className="text-brand-forest font-bold">{selectedFacility.name}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-charcoalMuted">GPS Coordinates:</span>
                <span className="font-mono text-brand-teal font-bold">12.5244° N, 76.8958° E</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-charcoalMuted">Estimated Ambulance ETA:</span>
                <strong className="text-brand-forest font-bold">8 - 12 Minutes</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-charcoalMuted">ASHA Alerted:</span>
                <span className="text-brand-forest font-bold">Sumitra Bai (Keragodu Ward)</span>
              </div>
            </div>

            <p className="text-xs text-brand-charcoalMuted">
              This simulation verifies the emergency dispatch protocol for offline and low-bandwidth rural setups.
            </p>

            <button
              onClick={() => setSosModalOpen(false)}
              className="w-full py-3.5 rounded-xl bg-brand-forest hover:bg-brand-forestLight text-brand-cream font-bold text-xs transition-colors"
            >
              Close Simulation
            </button>
          </div>
        </div>
      )}
    </div>
  </GraminCareErrorBoundary>
  );
}
