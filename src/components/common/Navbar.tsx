"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Globe, 
  Volume2, 
  VolumeX, 
  Menu, 
  X, 
  FileCheck2, 
  Stethoscope, 
  Ambulance, 
  HeartPulse, 
  Users, 
  ChevronDown,
  User
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { SUPPORTED_LANGUAGES, SupportedLanguage } from "@/lib/i18n/types";
import { supabase } from "@/lib/supabase/client";
import BrandLogo from "./BrandLogo";
import AuthModal from "./AuthModal";

export default function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage, t, isSpeaking, stopSpeaking } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>("Judge / Guest Session");

  React.useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.email) {
        setUserEmail(session.user.email);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user?.email) {
        setUserEmail(session.user.email);
      } else if (!session) {
        setUserEmail("Judge / Guest Session");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const navLinks = [
    { href: "/schemes", label: t("navSchemes"), icon: FileCheck2 },
    { href: "/triage", label: t("navTriage"), icon: Stethoscope },
    { href: "/emergency", label: t("navEmergency"), icon: Ambulance },
    { href: "/health-twin", label: t("navTwin"), icon: HeartPulse },
    { href: "/family", label: t("navFamily"), icon: Users },
  ];

  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-brand-charcoalBorder shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo with actual GraminCare AI emblem */}
          <div className="shrink-0 py-2">
            <BrandLogo size="md" />
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-brand-forest text-brand-cream shadow-xs"
                      : "text-brand-charcoal hover:text-brand-forest hover:bg-brand-creamMuted"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-brand-gold" : "text-brand-teal"}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Controls: Audio indicator & Language Switcher */}
          <div className="flex items-center gap-2.5">
            {/* Audio Speech Playing Badge */}
            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-goldMuted text-brand-goldDark border border-brand-gold/40 text-xs font-semibold hover:bg-brand-gold/20 transition-colors"
                title="Stop Audio"
              >
                <Volume2 className="w-3.5 h-3.5 text-brand-goldDark animate-pulse" />
                <span className="hidden sm:inline">Speaking</span>
                <VolumeX className="w-3 h-3 ml-1" />
              </button>
            )}

            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-brand-charcoalBorder hover:border-brand-teal bg-brand-cream/60 hover:bg-white text-xs font-semibold text-brand-charcoal transition-all shadow-2xs"
                aria-label="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-brand-teal" />
                <span className="font-bold text-brand-forest">{currentLangObj.nativeName}</span>
                <span className="text-brand-charcoalMuted text-[10px]">({currentLangObj.name})</span>
                <ChevronDown className="w-3 h-3 text-brand-charcoalMuted" />
              </button>

              {langMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setLangMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-white shadow-dropdown border border-brand-charcoalBorder p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-1.5 text-[11px] font-bold text-brand-charcoalMuted uppercase tracking-wider border-b border-brand-creamDark mb-1">
                      Vernacular Languages (9)
                    </div>
                    <div className="max-h-72 overflow-y-auto space-y-0.5">
                      {SUPPORTED_LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setLangMenuOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors ${
                            language === lang.code
                              ? "bg-brand-forest text-brand-cream font-bold"
                              : "text-brand-charcoal hover:bg-brand-creamMuted"
                          }`}
                        >
                          <div className="flex flex-col">
                            <span className="text-sm font-bold">{lang.nativeName}</span>
                            <span className={`text-[10px] ${language === lang.code ? "text-brand-gold" : "text-brand-charcoalMuted"}`}>
                              {lang.name}
                            </span>
                          </div>
                          {language === lang.code && (
                            <span className="w-2 h-2 rounded-full bg-brand-gold" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* User Account / Auth Trigger */}
            <button
              onClick={() => setAuthModalOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-brand-cream border border-brand-charcoalBorder hover:border-brand-teal text-xs font-semibold text-brand-forest transition-colors shadow-2xs"
              title="Citizen / Judge Account"
            >
              <User className="w-3.5 h-3.5 text-brand-teal" />
              <span className="max-w-[120px] truncate">{userEmail ? userEmail.split("@")[0] : "Sign In"}</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-brand-charcoal hover:bg-brand-creamMuted transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={(email) => setUserEmail(email)}
      />

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-brand-charcoalBorder bg-white px-4 pt-3 pb-5 space-y-1.5 shadow-lg">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-brand-forest text-brand-cream"
                    : "text-brand-charcoal hover:bg-brand-creamMuted"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-brand-gold" : "text-brand-teal"}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
