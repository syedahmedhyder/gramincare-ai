import type { Metadata } from "next";
import "@/styles/globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import ExpoDemoBar from "@/components/common/ExpoDemoBar";
import Navbar from "@/components/common/Navbar";
import BrandLogo from "@/components/common/BrandLogo";
import StartupSplashScreen from "@/components/common/StartupSplashScreen";
import OfflineStateNotice from "@/components/common/OfflineStateNotice";
import { ShieldCheck, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "GraminCare AI — Bridging Care. Empowering Rural Lives.",
  description: "Official GraminCare AI platform for rural healthcare, vernacular document readiness, and clinical decision support.",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/icon-192.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-brand-cream text-brand-charcoal antialiased font-sans min-h-screen flex flex-col selection:bg-brand-gold/30 selection:text-brand-forest">
        <LanguageProvider>
          {/* Initial App/Website Startup Splash Screen (~1.2-1.4s) */}
          <StartupSplashScreen />

          {/* Network-Aware Offline Banner */}
          <OfflineStateNotice />

          <ExpoDemoBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          
          {/* Institutional Brand Footer */}
          <footer className="bg-white border-t border-brand-charcoalBorder mt-20 py-10 text-xs text-brand-charcoalMuted shadow-soft">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-brand-creamDark pb-6">
                <div>
                  <BrandLogo size="md" />
                  <p className="text-xs text-brand-charcoalMuted mt-1">
                    Student Innovation Project for National Technology Expo 2026
                  </p>
                </div>
                
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-brand-charcoal bg-brand-cream p-3 rounded-xl border border-brand-charcoalBorder">
                  <span className="flex items-center gap-1.5 font-semibold text-brand-forest">
                    <ShieldCheck className="w-4 h-4 text-brand-teal shrink-0" />
                    9 Indian Languages
                  </span>
                  <span className="text-brand-charcoalBorder">•</span>
                  <span className="font-semibold text-brand-forest">Voice-First Accessibility</span>
                  <span className="text-brand-charcoalBorder">•</span>
                  <span className="font-semibold text-brand-forest">Offline-Resilient Architecture</span>
                </div>
              </div>

              {/* Safety Disclaimers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] text-brand-charcoal bg-brand-goldMuted/60 p-4 rounded-2xl border border-brand-gold/30">
                <div className="flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-brand-goldDark shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-brand-forest font-bold">Health Decision Support Notice:</strong> GraminCare AI Health Triage provides primary clinical decision support and health guidance. It is <strong>NOT</strong> a medical diagnosis or prescription. Always consult a qualified physician or local PHC medical officer in emergencies.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-brand-goldDark shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-brand-forest font-bold">Document Readiness Notice:</strong> The Document-Gap Predictor assesses scheme application readiness and identifies potential demographic mismatches. It does not replace the statutory authority of designated government officers or CSC verifiers.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-brand-charcoalMuted pt-2">
                <p>© 2026 GraminCare AI. Bridging Care. Empowering Rural Lives.</p>
                <p className="flex items-center gap-1.5 font-medium text-brand-forest">
                  <span className="w-2 h-2 rounded-full bg-brand-teal" />
                  Deep Forest Green • Teal • Warm Gold • Soft Cream • Charcoal
                </p>
              </div>
            </div>
          </footer>
        </LanguageProvider>
      </body>
    </html>
  );
}
