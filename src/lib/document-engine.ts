import { DocumentItem, DocumentReadinessReport, GovernmentScheme } from "./types";

/**
 * Calculates string similarity using Levenshtein distance
 */
export function calculateStringSimilarity(str1: string, str2: string): number {
  const s1 = str1.trim().toLowerCase();
  const s2 = str2.trim().toLowerCase();
  if (s1 === s2) return 1.0;
  if (!s1.length || !s2.length) return 0.0;

  const track = Array(s2.length + 1)
    .fill(null)
    .map(() => Array(s1.length + 1).fill(null));

  for (let i = 0; i <= s1.length; i += 1) track[0][i] = i;
  for (let j = 0; j <= s2.length; j += 1) track[j][0] = j;

  for (let j = 1; j <= s2.length; j += 1) {
    for (let i = 1; i <= s1.length; i += 1) {
      const indicator = s1[i - 1] === s2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1, // deletion
        track[j - 1][i] + 1, // insertion
        track[j - 1][i - 1] + indicator // substitution
      );
    }
  }

  const distance = track[s2.length][s1.length];
  const maxLength = Math.max(s1.length, s2.length);
  return Math.round((1 - distance / maxLength) * 100) / 100;
}

/**
 * Evaluates document readiness against a target scheme
 */
export function evaluateDocumentReadiness(
  docs: DocumentItem[],
  scheme: GovernmentScheme,
  simulatedFixApplied: boolean = false
): DocumentReadinessReport {
  if (!docs || docs.length === 0) {
    return {
      overallStatus: "risk",
      readinessScore: 20,
      documents: [],
      mismatchSummary: "No documents available for verification.",
      fixActionPlan: ["Please scan or upload basic identity documents."],
      canSubmit: false,
    };
  }

  // If simulated correction was applied for demo purposes
  if (simulatedFixApplied) {
    const fixedDocs: DocumentItem[] = docs.map((doc) => ({
      ...doc,
      status: "ready",
      statusLabel: "Verified & Matched",
      issueReason: undefined,
      fixGuidance: undefined,
      fields: doc.fields.map((f) => ({
        ...f,
        verified: true,
        mismatchNote: undefined,
      })),
    }));

    return {
      overallStatus: "ready",
      readinessScore: 98,
      documents: fixedDocs,
      mismatchSummary: "All document discrepancies successfully reconciled. Demographic and income criteria match scheme policy.",
      fixActionPlan: [
        "Identity verified: Aadhaar biometric deduplication passed.",
        "Ration card head-of-household linkage verified.",
        "Income certificate renewed within current fiscal year.",
      ],
      canSubmit: true,
      correctedFieldsSimulated: true,
    };
  }

  // Normal evaluation
  let hasRisk = false;
  let hasWarning = false;
  let matchedPoints = 0;
  const totalPoints = docs.length * 30;
  const issues: string[] = [];
  const actionPlan: string[] = [];

  docs.forEach((doc) => {
    if (doc.status === "risk") {
      hasRisk = true;
      matchedPoints += 5;
      if (doc.issueReason) issues.push(`[${doc.title}] ${doc.issueReason}`);
      if (doc.fixGuidance) actionPlan.push(doc.fixGuidance);
    } else if (doc.status === "warning") {
      hasWarning = true;
      matchedPoints += 18;
      if (doc.issueReason) issues.push(`[${doc.title}] ${doc.issueReason}`);
      if (doc.fixGuidance) actionPlan.push(doc.fixGuidance);
    } else {
      matchedPoints += 30;
    }
  });

  const readinessScore = Math.min(100, Math.round((matchedPoints / totalPoints) * 100));

  const overallStatus = hasRisk ? "risk" : hasWarning ? "warning" : "ready";
  const canSubmit = overallStatus === "ready";

  const mismatchSummary = issues.length > 0
    ? issues.join(" | ")
    : "All scanned documents conform to " + scheme.name + " validation rules.";

  return {
    overallStatus,
    readinessScore,
    documents: docs,
    mismatchSummary,
    fixActionPlan: actionPlan.length > 0 ? actionPlan : ["Proceed to Gram Panchayat / CSC counter with original photocopies."],
    canSubmit,
    correctedFieldsSimulated: false,
  };
}

export interface PipelineStageInfo {
  stageId: number;
  title: string;
  subtitle: string;
  technicalDetails: string;
  demoMetric: string;
}

export const TECHNOLOGY_PIPELINE_STAGES: PipelineStageInfo[] = [
  {
    stageId: 1,
    title: "Document Input",
    subtitle: "Mobile Camera / Flatbed Scanner / ASHA Tablet Upload",
    technicalDetails: "Accepts low-resolution photographs, uneven lighting, skew correction, and grayscale contrast enhancement optimized for Indian identity cards.",
    demoMetric: "Edge Detection & Perspective Warp Complete",
  },
  {
    stageId: 2,
    title: "OCR Extraction",
    subtitle: "Multilingual Optical Character Recognition",
    technicalDetails: "Detects Devanagari, Kannada, and Latin scripts; extracts Name, Date of Birth, Gender, Address, Father's Name, and UID token.",
    demoMetric: "Confidence Score: 94.6% across 8 fields",
  },
  {
    stageId: 3,
    title: "Rule + ML Discrepancy Check",
    subtitle: "Deterministic Policy Matrix & Fuzzy Matching",
    technicalDetails: "Levenshtein distance calculation, phonetic name matching (Soundex / Metaphone for Indian names), DOB parity verification, and scheme income threshold filters.",
    demoMetric: "Flagged: 'Ramesh G.' vs 'Ramesh Gowda' (Similarity: 0.72)",
  },
  {
    stageId: 4,
    title: "Explainable Gap Generation",
    subtitle: "Root-Cause Reason & Citizen Remediation Plan",
    technicalDetails: "Transforms technical deduplication failure into clear, actionable civic advice: which government office to visit, which form number to request.",
    demoMetric: "Remediation: Form 4 (Aadhaar Seeding) at Grama One",
  },
  {
    stageId: 5,
    title: "Vernacular Voice Output",
    subtitle: "Local Language Speech Synthesis & Audio Assist",
    technicalDetails: "Synthesizes clear spoken audio instructions in Kannada, Hindi, Tamil, Telugu, etc., for rural citizens and low-literacy beneficiaries.",
    demoMetric: "Audio Rendered in Selected Regional Locale",
  },
];
