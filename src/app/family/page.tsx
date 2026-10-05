"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Users, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  Database,
  Plus,
  X,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { DEMO_FAMILIES } from "@/lib/demo-data";
import { FamilyProfile } from "@/lib/types";
import GraminCareErrorBoundary from "@/components/common/GraminCareErrorBoundary";

export default function FamilyPage() {
  const { t } = useLanguage();

  const [familyData, setFamilyData] = useState<FamilyProfile>(DEMO_FAMILIES[0]);
  const [dataSource, setDataSource] = useState<"database" | "demo">("demo");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New member form state
  const [newName, setNewName] = useState("");
  const [newRelation, setNewRelation] = useState<"Self" | "Spouse" | "Child" | "Parent">("Child");
  const [newAge, setNewAge] = useState("");
  const [newGender, setNewGender] = useState<"Male" | "Female" | "Other">("Male");

  useEffect(() => {
    fetch("/api/family")
      .then((res) => res.json())
      .then((data) => {
        if (data.family) {
          setFamilyData(data.family);
          setDataSource(data.source || "demo");
        }
      })
      .catch((err) => console.warn("Using fallback family dataset:", err));
  }, []);

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newAge) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/family", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: newName,
          relation: newRelation,
          age: Number(newAge),
          gender: newGender,
          village: familyData.village,
          district: familyData.district,
          state: familyData.state,
        }),
      });

      const data = await res.json();
      if (data.member) {
        setFamilyData((prev) => ({
          ...prev,
          members: [...prev.members, data.member],
        }));
        setAddModalOpen(false);
        setNewName("");
        setNewAge("");
      }
    } catch (err) {
      console.warn("Failed to add member to database, updating local state:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <GraminCareErrorBoundary moduleName="Household Family Profiles">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header Banner: Deep Forest Green & Warm Gold */}
        <div className="bg-brand-forest rounded-3xl p-6 sm:p-8 text-brand-cream border border-brand-forestLight shadow-soft">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-forestDark text-brand-gold border border-brand-gold/30 text-xs font-bold">
                  <Users className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Household Health & Entitlement Locker</span>
                </span>
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                  dataSource === "database"
                    ? "bg-brand-forestDark text-brand-gold border border-brand-gold/40"
                    : "bg-white/10 text-brand-cream/80 border border-white/20"
                }`}>
                  <Database className="w-3 h-3 text-brand-gold" />
                  <span>{dataSource === "database" ? "PostgreSQL Active" : "Curated Benchmark"}</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {t("navFamily")} — {familyData.familyName}
              </h1>
              <p className="text-brand-cream/80 text-sm mt-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-gold" />
                <span>{familyData.village}, {familyData.district}, {familyData.state}</span>
                <span className="text-brand-gold">•</span>
                <span className="font-bold text-brand-gold">Ration Tier: {familyData.rationCategory}</span>
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setAddModalOpen(true)}
                className="px-4 py-3 rounded-xl bg-brand-forestDark hover:bg-brand-forestLight text-brand-cream font-bold text-xs flex items-center gap-1.5 border border-brand-forestLight transition-colors shadow-2xs"
              >
                <Plus className="w-4 h-4 text-brand-gold" />
                <span>Add Member</span>
              </button>

              <Link
                href="/schemes"
                className="px-5 py-3 rounded-xl bg-brand-gold hover:bg-brand-goldLight text-brand-forest font-black text-xs flex items-center gap-2 shadow-card transition-all hover:scale-105 shrink-0"
              >
                <span>Check Scheme Readiness</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Household Members Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-brand-forest flex items-center gap-2">
              <Users className="w-5 h-5 text-brand-teal" />
              Registered Household Members ({familyData.members.length})
            </h2>
            <span className="text-xs text-brand-charcoalMuted">Linked to Food & Civil Supplies Database</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {familyData.members.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-brand-charcoalBorder shadow-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-brand-forest/10 text-brand-forest border border-brand-forest/20">
                      {member.relation}
                    </span>
                    <span className="text-xs font-semibold text-brand-charcoalMuted">
                      {member.age} years • {member.gender}
                    </span>
                  </div>

                  <h3 className="font-bold text-brand-forest text-base mb-1">
                    {member.name}
                  </h3>

                  <div className="space-y-1.5 text-xs text-brand-charcoal my-4 bg-brand-cream p-3.5 rounded-2xl border border-brand-charcoalBorder">
                    <div className="flex justify-between">
                      <span className="text-brand-charcoalMuted">Aadhaar:</span>
                      <span className="font-mono text-brand-forest font-semibold">{member.aadhaarNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-charcoalMuted">Ration ID:</span>
                      <span className="font-mono text-brand-forest font-semibold">{member.rationCardNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-charcoalMuted">Annual Income:</span>
                      <span className="font-bold text-brand-forest">₹ {member.annualIncome.toLocaleString()}</span>
                    </div>
                  </div>

                  {member.healthConditions && member.healthConditions.length > 0 && (
                    <div className="mb-4">
                      <span className="text-[11px] font-bold text-brand-forest uppercase tracking-wider block mb-1">
                        Health Indicators:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {member.healthConditions.map((cond, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-brand-tealMuted text-brand-teal text-[11px] font-semibold border border-brand-teal/20"
                          >
                            {cond}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-brand-creamDark flex items-center justify-between text-xs">
                  <Link
                    href={`/health-twin`}
                    className="text-brand-forest hover:text-brand-teal font-bold flex items-center gap-1 transition-colors"
                  >
                    <span>View Health Twin</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-teal" />
                  </Link>
                  <Link
                    href={`/schemes`}
                    className="text-brand-charcoalMuted hover:text-brand-forest font-semibold transition-colors"
                  >
                    Verify Docs
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Member Modal */}
        {addModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-brand-charcoalBorder relative">
              <button
                onClick={() => setAddModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-xl text-brand-charcoalMuted hover:bg-brand-cream"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-black text-xl text-brand-forest mb-1">
                Add Family Member
              </h3>
              <p className="text-xs text-brand-charcoalMuted mb-5">
                Register new household beneficiary to {familyData.familyName}
              </p>

              <form onSubmit={handleAddMember} className="space-y-3.5 text-xs">
                <div>
                  <label className="font-bold text-brand-forest block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Ananya Gowda"
                    className="w-full p-2.5 rounded-xl border border-brand-charcoalBorder bg-brand-cream focus:bg-white focus:border-brand-teal"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-brand-forest block mb-1">Relation</label>
                    <select
                      value={newRelation}
                      onChange={(e) => setNewRelation(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl border border-brand-charcoalBorder bg-brand-cream focus:bg-white"
                    >
                      <option value="Self">Self</option>
                      <option value="Spouse">Spouse</option>
                      <option value="Child">Child</option>
                      <option value="Parent">Parent</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-brand-forest block mb-1">Age</label>
                    <input
                      type="number"
                      required
                      min="0"
                      max="120"
                      value={newAge}
                      onChange={(e) => setNewAge(e.target.value)}
                      placeholder="16"
                      className="w-full p-2.5 rounded-xl border border-brand-charcoalBorder bg-brand-cream focus:bg-white"
                    >
                    </input>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-brand-forest block mb-1">Gender</label>
                  <select
                    value={newGender}
                    onChange={(e) => setNewGender(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-brand-charcoalBorder bg-brand-cream focus:bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-brand-forest hover:bg-brand-forestLight text-brand-cream font-bold transition-all shadow-xs mt-3 disabled:opacity-50"
                >
                  {isSubmitting ? "Adding Record..." : "Save Member to Household"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </GraminCareErrorBoundary>
  );
}
