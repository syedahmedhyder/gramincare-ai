"use client";

import React, { useState } from "react";
import { X, Lock, Mail, User, ShieldCheck, Sparkles, AlertCircle } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess?: (email: string) => void;
}

export default function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGuestLogin = () => {
    if (onAuthSuccess) {
      onAuthSuccess("expo.judge@gramincare.ai");
    }
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    if (!isSupabaseConfigured() || !supabase) {
      // Offline / Unconfigured fallback
      setTimeout(() => {
        setLoading(false);
        if (onAuthSuccess) onAuthSuccess(email || "rural.citizen@gramincare.ai");
        onClose();
      }, 500);
      return;
    }

    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
          },
        });
        if (error) throw error;
        setSuccessMsg("Account created! Check your email or log in.");
        setMode("login");
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        if (onAuthSuccess && data.user?.email) {
          onAuthSuccess(data.user.email);
        }
        onClose();
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Authentication failed. Please verify credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-brand-charcoalBorder relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-brand-charcoalMuted hover:bg-brand-cream transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with symbol mark */}
        <div className="text-center mb-6">
          <img
            src="/icon-64.png"
            alt="GraminCare AI Emblem"
            className="w-12 h-12 object-contain rounded-2xl shadow-soft border border-brand-charcoalBorder mx-auto mb-3"
          />
          <h3 className="font-black text-xl text-brand-forest">
            {mode === "login" ? "Sign In to GraminCare AI" : "Create Citizen Account"}
          </h3>
          <p className="text-xs text-brand-charcoalMuted mt-1">
            Secure Supabase Auth for Household Health Records
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-brand-forest/10 border border-brand-forest/20 text-xs text-brand-forest flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {mode === "signup" && (
            <div>
              <label className="font-bold text-brand-forest block mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-brand-charcoalMuted absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Ramesh Gowda"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-brand-charcoalBorder bg-brand-cream focus:bg-white focus:border-brand-teal"
                />
              </div>
            </div>
          )}

          <div>
            <label className="font-bold text-brand-forest block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-brand-charcoalMuted absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="citizen@gramincare.ai"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-brand-charcoalBorder bg-brand-cream focus:bg-white focus:border-brand-teal"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-brand-forest block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-brand-charcoalMuted absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-brand-charcoalBorder bg-brand-cream focus:bg-white focus:border-brand-teal"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-brand-forest hover:bg-brand-forestLight text-brand-cream font-bold transition-all shadow-xs disabled:opacity-50 mt-2"
          >
            {loading ? "Authenticating..." : mode === "login" ? "Sign In" : "Register Account"}
          </button>
        </form>

        <div className="mt-4 pt-4 border-t border-brand-creamDark space-y-3 text-center text-xs">
          <button
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="text-brand-teal hover:underline font-semibold"
          >
            {mode === "login" ? "Need an account? Sign up" : "Already have an account? Sign in"}
          </button>

          {/* Quick Expo Judge Bypass Button */}
          <button
            onClick={handleGuestLogin}
            type="button"
            className="w-full py-2.5 rounded-xl bg-brand-goldMuted hover:bg-brand-gold/30 text-brand-forest font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-brand-gold/40"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-goldDark" />
            <span>Continue as Expo Judge (Instant Session)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
