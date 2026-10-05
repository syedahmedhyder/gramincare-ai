"use client";

import React from "react";
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Volume2, 
  FileText, 
  Building2, 
  Wrench,
  ShieldCheck
} from "lucide-react";
import { DocumentItem } from "@/lib/types";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface DocumentCardProps {
  document: DocumentItem;
}

export default function DocumentCard({ document }: DocumentCardProps) {
  const { speak, isSpeaking, t } = useLanguage();

  const getStatusBadge = () => {
    switch (document.status) {
      case "ready":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-forest/10 text-brand-forest border border-brand-forest/20 shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-brand-forest" />
            {t("statusReady")}
          </span>
        );
      case "warning":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-goldMuted text-brand-goldDark border border-brand-gold/40 shadow-2xs">
            <AlertTriangle className="w-3.5 h-3.5 text-brand-goldDark" />
            {t("statusWarning")}
          </span>
        );
      case "risk":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-800 border border-rose-300 shadow-2xs">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            {t("statusRisk")}
          </span>
        );
    }
  };

  const handleVoiceRead = () => {
    let textToSpeak = `${document.title}. `;
    if (document.status === "ready") {
      textToSpeak += `${t("statusReady")}. No discrepancies found.`;
    } else {
      if (document.issueReason) {
        textToSpeak += `${t("mismatchFound")}: ${document.issueReason}. `;
      }
      if (document.fixGuidance) {
        textToSpeak += `${t("recommendedFix")}: ${document.fixGuidance}.`;
      }
    }
    speak(textToSpeak);
  };

  return (
    <div className={`rounded-2xl border p-5 transition-all shadow-card ${
      document.status === "ready"
        ? "bg-white border-brand-forest/30"
        : document.status === "warning"
        ? "bg-white border-brand-gold ring-1 ring-brand-gold/20"
        : "bg-white border-rose-300 ring-1 ring-rose-100"
    }`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-brand-creamDark pb-3 mb-4">
        <div className="flex items-start gap-3">
          <div className={`p-2.5 rounded-xl shrink-0 ${
            document.status === "ready"
              ? "bg-brand-tealMuted text-brand-teal"
              : document.status === "warning"
              ? "bg-brand-goldMuted text-brand-goldDark"
              : "bg-rose-50 text-rose-700"
          }`}>
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-brand-forest text-sm">{document.title}</h4>
            <div className="flex items-center gap-2 text-xs text-brand-charcoalMuted mt-0.5">
              <Building2 className="w-3.5 h-3.5 text-brand-charcoalMuted" />
              <span>{document.issuingAuthority}</span>
              <span className="font-mono text-brand-charcoal text-[11px] bg-brand-cream px-1.5 py-0.5 rounded border border-brand-charcoalBorder">
                {document.documentNumber}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {getStatusBadge()}
          <button
            onClick={handleVoiceRead}
            className="p-1.5 rounded-lg bg-brand-cream hover:bg-brand-creamMuted text-brand-charcoal hover:text-brand-forest border border-brand-charcoalBorder transition-colors"
            title={t("listenVoice")}
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Extracted Fields Matrix */}
      <div className="bg-brand-cream/60 rounded-xl p-3 mb-4 border border-brand-charcoalBorder/60">
        <div className="text-[11px] font-bold text-brand-forest mb-2 uppercase tracking-wider">
          Extracted Baseline Fields
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {document.fields.map((field, idx) => (
            <div
              key={idx}
              className={`p-2.5 rounded-lg border flex items-start justify-between gap-2 ${
                field.verified
                  ? "bg-white border-brand-charcoalBorder/80"
                  : "bg-brand-goldMuted border-brand-gold text-brand-charcoal font-semibold"
              }`}
            >
              <div>
                <span className="text-[10px] text-brand-charcoalMuted block">{field.label}</span>
                <span className="font-medium text-brand-charcoal">{field.value}</span>
                {field.mismatchNote && (
                  <span className="block text-[10px] text-brand-goldDark font-normal mt-0.5">
                    ⚠ {field.mismatchNote}
                  </span>
                )}
              </div>
              {field.verified ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-forest shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-3.5 h-3.5 text-brand-goldDark shrink-0 mt-0.5" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Exact Mismatch Reason Box (if warning or risk) */}
      {document.issueReason && (
        <div className="mb-3 rounded-xl p-3 text-xs bg-brand-goldMuted border border-brand-gold/50">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-brand-goldDark shrink-0 mt-0.5" />
            <div>
              <strong className="text-brand-forest block font-bold mb-0.5">
                {t("mismatchFound")}:
              </strong>
              <p className="text-brand-charcoal leading-relaxed">{document.issueReason}</p>
            </div>
          </div>
        </div>
      )}

      {/* Fix Guidance Action Box */}
      {document.fixGuidance && (
        <div className="rounded-xl p-3 text-xs bg-brand-tealMuted border border-brand-teal/30">
          <div className="flex items-start gap-2">
            <Wrench className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
            <div>
              <strong className="text-brand-forest block font-bold mb-0.5">
                {t("recommendedFix")}:
              </strong>
              <p className="text-brand-charcoal leading-relaxed">{document.fixGuidance}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
