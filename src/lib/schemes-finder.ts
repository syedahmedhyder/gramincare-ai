export interface SchemeSearchResult {
  id: string;
  name: string;
  code: string;
  category: "financial" | "programme";
  level: "Central" | "State (Karnataka)" | "Universal / State";
  coverageOrBenefit: string;
  shortBenefit: string;
  matchReason: string;
  eligibilityStatus: string;
  requiredDocuments: string[];
  officialSource: string;
  sourceUrl?: string;
  lastVerifiedDate: string;
  actionUrl: string;
  actionLabel: string;
  tags: string[];
}

export interface NationalSchemeStats {
  totalSchemes: string;
  healthWellnessSchemes: string;
  centralSchemes: string;
  stateUtSchemes: string;
  source: string;
  sourceUrl: string;
}

export interface KarnatakaArKStats {
  reportingPeriod: string;
  treatmentPackages: string;
  totalEmpanelledHospitals: string;
  governmentHospitals: string;
  privateHospitals: string;
  cardsIssued: string;
  claimsPaid: string;
  claimsPaidClarification: string;
  amountPaidCrores: string;
  source: string;
  lastVerifiedDate: string;
}

export const NATIONAL_STATS: NationalSchemeStats = {
  totalSchemes: "5,090+",
  healthWellnessSchemes: "296",
  centralSchemes: "740+",
  stateUtSchemes: "4,340+",
  source: "Official myScheme Portal (MeitY & NeGD, Govt of India)",
  sourceUrl: "https://www.myscheme.gov.in",
};

export const KARNATAKA_ARK_STATS: KarnatakaArKStats = {
  reportingPeriod: "April 2024 – January 2025",
  treatmentPackages: "1,650",
  totalEmpanelledHospitals: "3,559",
  governmentHospitals: "2,965",
  privateHospitals: "594",
  cardsIssued: "1.84 crore",
  claimsPaid: "24.38 lakh",
  claimsPaidClarification: "Note: 'claims paid' refers to individual medical treatment claims filed and settled, not unique beneficiaries.",
  amountPaidCrores: "₹1,268.15 crore",
  source: "Suvarna Arogya Suraksha Trust (SAST), Dept of Health & Family Welfare, Govt of Karnataka",
  lastVerifiedDate: "January 2025 (Official Government Report)",
};

export const CURATED_SCHEMES_DATA: SchemeSearchResult[] = [
  // 1. Financial / Entitlement Schemes
  {
    id: "scheme-pmjay",
    name: "Ayushman Bharat PM-JAY",
    code: "PM-JAY",
    category: "financial",
    level: "Central",
    coverageOrBenefit: "₹ 5,00,000 / family / year",
    shortBenefit: "Cashless secondary and tertiary hospitalization across 28,000+ network hospitals.",
    matchReason: "Covers complex medical treatments including oncology, cardiac surgery, trauma, and ICU admissions.",
    eligibilityStatus: "Potential match • BPL / SECC 2011 rural deprivation criteria",
    requiredDocuments: ["Aadhaar Card", "Ration Card (BPL/AAY)", "Valid Income Certificate"],
    officialSource: "National Health Authority (NHA) / myScheme",
    sourceUrl: "https://pmjay.gov.in",
    lastVerifiedDate: "Oct 2026 (NHA Baseline)",
    actionUrl: "/schemes?scheme=pmjay",
    actionLabel: "Readiness Check",
    tags: ["kidney", "dialysis", "cancer", "oncology", "accident", "trauma", "surgery", "heart", "icu", "cardiac", "hospitalization"],
  },
  {
    id: "scheme-ark",
    name: "Arogya Karnataka (Ayushman Bharat - ArK)",
    code: "AB-ArK",
    category: "financial",
    level: "State (Karnataka)",
    coverageOrBenefit: "₹ 5,00,000 (BPL) / 30% Concession (APL)",
    shortBenefit: "1,650 treatment packages covered at 3,559 empanelled Karnataka hospitals (2,965 govt, 594 private).",
    matchReason: "Direct match for Karnataka residents needing specialty surgeries, kidney dialysis, cancer care, or trauma treatment.",
    eligibilityStatus: "Potential match • Karnataka resident with Food Security BPL card",
    requiredDocuments: ["Aadhaar Card", "Karnataka Ahara Ration Card", "PHC/CHC Medical Officer Referral"],
    officialSource: "Suvarna Arogya Suraksha Trust (SAST), Govt of Karnataka",
    sourceUrl: "https://arogya.karnataka.gov.in",
    lastVerifiedDate: "Jan 2025 (SAST Official Data)",
    actionUrl: "/schemes?scheme=arogya-ka",
    actionLabel: "Readiness Check",
    tags: ["karnataka", "kidney", "dialysis", "cancer", "accident", "trauma", "surgery", "mandya", "bangalore", "ark"],
  },
  {
    id: "scheme-pmndp",
    name: "Pradhan Mantri National Dialysis Programme",
    code: "PMNDP",
    category: "financial",
    level: "Central",
    coverageOrBenefit: "100% Free Hemodialysis for BPL Patients",
    shortBenefit: "Cashless dialysis sessions at district hospitals under National Health Mission PPP framework.",
    matchReason: "Direct match for renal failure, elevated creatinine, and chronic kidney disease requiring regular dialysis.",
    eligibilityStatus: "Potential match • BPL cardholders diagnosed with End-Stage Renal Disease (ESRD)",
    requiredDocuments: ["Aadhaar Card", "BPL Ration Card", "Nephrologist / Medical Officer Prescription"],
    officialSource: "Ministry of Health & Family Welfare (MoHFW) / NHM",
    sourceUrl: "https://nhm.gov.in",
    lastVerifiedDate: "Oct 2026 (NHM Portal)",
    actionUrl: "/schemes?scheme=pmndp",
    actionLabel: "Check Dialysis Centres",
    tags: ["kidney", "dialysis", "renal", "creatinine", "kidney failure", "kidney treatment"],
  },
  {
    id: "scheme-jsy-pmmvy",
    name: "Janani Suraksha Yojana & PMMVY",
    code: "JSY / PMMVY",
    category: "financial",
    level: "Central",
    coverageOrBenefit: "₹ 1,400 Cash Incentive + Free Drop-back + Up to ₹5,000 DBT",
    shortBenefit: "Cash assistance promoting institutional delivery, maternal nutrition, and safe childbirth.",
    matchReason: "Direct match for pregnant mothers, antenatal care, delivery costs, and postnatal nutritional support.",
    eligibilityStatus: "Potential match • Rural pregnant women delivering in government health facilities",
    requiredDocuments: ["Aadhaar Card", "Mother and Child Protection (MCP) Card", "Aadhaar-linked Bank Account"],
    officialSource: "Ministry of Health & Family Welfare (MoHFW)",
    sourceUrl: "https://nhm.gov.in",
    lastVerifiedDate: "Oct 2026 (NHM Guidelines)",
    actionUrl: "/schemes?scheme=jsy",
    actionLabel: "Check Maternity Benefit",
    tags: ["pregnancy", "pregnant", "maternal", "delivery", "childbirth", "baby", "infant", "antenatal", "nutrition"],
  },
  {
    id: "scheme-rbsk",
    name: "Rashtriya Bal Swasthya Karyakram (RBSK)",
    code: "RBSK",
    category: "financial",
    level: "Central",
    coverageOrBenefit: "100% Free Screening & Tertiary Care for 30 Conditions",
    shortBenefit: "Zero out-of-pocket medical & surgical care for children (0–18 years) covering defects, deficiencies, and diseases.",
    matchReason: "Direct match for child health concerns including congenital heart disease, cleft lip, clubfoot, and vision impairments.",
    eligibilityStatus: "Potential match • Children 0–18 yrs enrolled in rural Anganwadis or government schools",
    requiredDocuments: ["Child Birth Certificate / Aadhaar", "Anganwadi or School Registration ID"],
    officialSource: "Ministry of Health & Family Welfare (MoHFW)",
    sourceUrl: "https://rbsk.gov.in",
    lastVerifiedDate: "Oct 2026 (RBSK Mission)",
    actionUrl: "/family",
    actionLabel: "Check Child Health Care",
    tags: ["child", "children", "pediatric", "infant", "congenital", "birth defect", "malnutrition", "child health"],
  },
  {
    id: "scheme-ran-hmdg",
    name: "Rashtriya Arogya Nidhi (RAN) & HMDG",
    code: "RAN / HMDG",
    category: "financial",
    level: "Central",
    coverageOrBenefit: "Up to ₹ 15,00,000 One-time Emergency Grant",
    shortBenefit: "Financial grant for BPL patients suffering from life-threatening diseases receiving treatment in government super-specialties.",
    matchReason: "Matched for severe oncology (cancer), organ transplants, and specialized tertiary procedures.",
    eligibilityStatus: "Potential match • Patients living below state poverty line treated at apex central hospitals",
    requiredDocuments: ["BPL Certificate", "Ration Card", "Treating Government Hospital Estimate & Medical Superintendent Endorsement"],
    officialSource: "Ministry of Health & Family Welfare (MoHFW Grants)",
    sourceUrl: "https://mohfw.gov.in",
    lastVerifiedDate: "Oct 2026 (Official Portal)",
    actionUrl: "/schemes?scheme=ran",
    actionLabel: "Check Grant Eligibility",
    tags: ["cancer", "oncology", "transplant", "life threatening", "super specialty", "cancer care"],
  },

  // 2. Health Programmes & Services
  {
    id: "prog-108",
    name: "National Emergency Medical Transport (Dial 108)",
    code: "Dial 108",
    category: "programme",
    level: "Universal / State",
    coverageOrBenefit: "Free 24x7 Emergency Ambulance & Paramedic Transit",
    shortBenefit: "Trained emergency medical technicians, onboard oxygen, and GPS-dispatched emergency transport.",
    matchReason: "Direct match for accidents, acute trauma, sudden cardiac distress, and urgent obstetric deliveries.",
    eligibilityStatus: "Universal access • No income or card eligibility restriction",
    requiredDocuments: ["None required at dispatch (Immediate emergency assistance)"],
    officialSource: "National Health Mission (NHM) / State Emergency Services",
    sourceUrl: "https://nhm.gov.in",
    lastVerifiedDate: "Oct 2026 (Live Emergency Dispatch)",
    actionUrl: "/emergency",
    actionLabel: "Dial Emergency 108",
    tags: ["accident", "trauma", "emergency", "ambulance", "cardiac", "fracture", "accident treatment", "108"],
  },
  {
    id: "prog-jan-aushadhi",
    name: "Pradhan Mantri Bharatiya Janaushadhi Pariyojana",
    code: "PMBJP",
    category: "programme",
    level: "Central",
    coverageOrBenefit: "50% to 90% Cheaper Essential Generic Medicines",
    shortBenefit: "Access to 1,965 quality-tested generic medicines and 293 surgical consumables at local Jan Aushadhi Kendras.",
    matchReason: "Direct match for chronic disease prescriptions including diabetes, hypertension, renal care, and pain management.",
    eligibilityStatus: "Universal access • Available to all citizens over the counter",
    requiredDocuments: ["Valid Doctor Prescription (for Rx medications)"],
    officialSource: "Pharmaceuticals & Medical Devices Bureau of India (PMBI)",
    sourceUrl: "https://janaushadhi.gov.in",
    lastVerifiedDate: "Oct 2026 (PMBI Portal)",
    actionUrl: "/triage",
    actionLabel: "Find Generic Medicines",
    tags: ["medicine", "medicines", "pills", "pharmacy", "diabetes", "hypertension", "blood pressure", "dialysis pills"],
  },
  {
    id: "prog-aam-hコンピュータ",
    name: "Ayushman Arogya Mandir (Health & Wellness Centres)",
    code: "AAM",
    category: "programme",
    level: "Universal / State",
    coverageOrBenefit: "Free Comprehensive Primary Care & 105 Diagnostic Tests",
    shortBenefit: "Free primary consultation, maternal-child wellness clinics, and screening for hypertension, diabetes, and cancers.",
    matchReason: "First point of contact for village-level health screening, regular checkups, and teleconsultation with specialists.",
    eligibilityStatus: "Universal walk-in access for rural communities",
    requiredDocuments: ["ABHA Health ID (Recommended, walk-in also supported)"],
    officialSource: "Ministry of Health & Family Welfare (MoHFW)",
    sourceUrl: "https://ab-hコンピュータ.mohfw.gov.in",
    lastVerifiedDate: "Oct 2026 (AAM Portal)",
    actionUrl: "/health-twin",
    actionLabel: "Locate Health Centre",
    tags: ["clinic", "primary health", "doctor", "fever", "checkup", "antenatal", "blood test", "sugar test", "child health"],
  },
  {
    id: "prog-npncd",
    name: "National Programme for Prevention & Control of NCDs",
    code: "NP-NCD",
    category: "programme",
    level: "Central",
    coverageOrBenefit: "Free Population Screening for Cancer, Diabetes & Hypertension",
    shortBenefit: "Frontline screening conducted by ASHA workers and Community Health Officers (CHOs) with referral to district clinics.",
    matchReason: "Direct match for early detection of oral, breast, and cervical cancers as well as chronic diabetes and stroke risk.",
    eligibilityStatus: "All rural citizens aged 30 years and above",
    requiredDocuments: ["Aadhaar or local village ASHA enumeration"],
    officialSource: "Directorate General of Health Services (DGHS) / MoHFW",
    sourceUrl: "https://dghs.gov.in",
    lastVerifiedDate: "Oct 2026 (DGHS NCD Guidelines)",
    actionUrl: "/triage",
    actionLabel: "Check NCD Risk",
    tags: ["cancer", "cancer care", "breast cancer", "oral cancer", "diabetes", "hypertension", "screening", "ncd"],
  },
];

export function searchHealthSchemes(query: string): {
  financialSchemes: SchemeSearchResult[];
  healthProgrammes: SchemeSearchResult[];
  totalMatches: number;
} {
  const cleaned = query.trim().toLowerCase();

  if (!cleaned) {
    // Return all schemes by category
    const financial = CURATED_SCHEMES_DATA.filter((s) => s.category === "financial");
    const programme = CURATED_SCHEMES_DATA.filter((s) => s.category === "programme");
    return {
      financialSchemes: financial,
      healthProgrammes: programme,
      totalMatches: CURATED_SCHEMES_DATA.length,
    };
  }

  // Tokenize query words
  const terms = cleaned.split(/\s+/).filter((t) => t.length > 1);

  const matched = CURATED_SCHEMES_DATA.filter((item) => {
    // Direct match against tags
    const tagMatch = item.tags.some((tag) =>
      tag.toLowerCase().includes(cleaned) || terms.some((t) => tag.toLowerCase().includes(t))
    );
    if (tagMatch) return true;

    // Match against title, code, benefit, matchReason
    const fullText = `${item.name} ${item.code} ${item.shortBenefit} ${item.matchReason} ${item.coverageOrBenefit}`.toLowerCase();
    return terms.some((term) => fullText.includes(term));
  });

  const financial = matched.filter((s) => s.category === "financial");
  const programme = matched.filter((s) => s.category === "programme");

  return {
    financialSchemes: financial,
    healthProgrammes: programme,
    totalMatches: matched.length,
  };
}
