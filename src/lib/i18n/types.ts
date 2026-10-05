export type SupportedLanguage = 
  | 'en' // English
  | 'kn' // Kannada (ಕನ್ನಡ)
  | 'hi' // Hindi (हिन्दी)
  | 'te' // Telugu (తెలుగు)
  | 'ta' // Tamil (தமிழ்)
  | 'ml' // Malayalam (മലയാളം)
  | 'mr' // Marathi (मराठी)
  | 'bn' // Bengali (বাংলা)
  | 'ur'; // Urdu (اردو)

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  speechLocale: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', speechLocale: 'en-IN' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', speechLocale: 'kn-IN' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', speechLocale: 'hi-IN' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', speechLocale: 'te-IN' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', speechLocale: 'ta-IN' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', speechLocale: 'ml-IN' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', speechLocale: 'mr-IN' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', speechLocale: 'bn-IN' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', speechLocale: 'ur-IN' },
];

export interface TranslationDictionary {
  // Brand & Header
  appName: string;
  tagline: string;
  expoBanner: string;
  fastDemoButton: string;
  offlineMode: string;
  curatedDataBadge: string;

  // Nav
  navHome: string;
  navSchemes: string;
  navTriage: string;
  navEmergency: string;
  navTwin: string;
  navFamily: string;
  navDemoBar: string;

  // Scheme & Document Readiness
  schemesTitle: string;
  schemesSubtitle: string;
  selectFamilyMember: string;
  selectScheme: string;
  runReadinessCheck: string;
  recheckDocuments: string;
  readyToSubmit: string;
  documentsHeading: string;
  scanSimulation: string;
  mismatchFound: string;
  recommendedFix: string;
  applyDemoFix: string;

  // Statuses
  statusReady: string;
  statusWarning: string;
  statusRisk: string;

  // Documents
  docAadhaar: string;
  docRation: string;
  docIncome: string;

  // Technology Flow Pipeline
  pipelineTitle: string;
  pipelineSubtitle: string;
  stepInput: string;
  stepOcr: string;
  stepRuleMl: string;
  stepExplain: string;
  stepVoice: string;

  // Health Triage
  triageTitle: string;
  triageSubtitle: string;
  triageDisclaimer: string;
  speakSymptomsPrompt: string;
  listening: string;
  triageSeverityGreen: string;
  triageSeverityYellow: string;
  triageSeverityRed: string;

  // Emergency
  emergencyTitle: string;
  emergencySubtitle: string;
  callAmbulance: string;
  facilityDistance: string;
  oxygenAvailable: string;
  bedsAvailable: string;
  doctorOnDuty: string;

  // Health Twin
  twinTitle: string;
  twinSubtitle: string;
  vitalsOverview: string;
  bloodPressure: string;
  pulseRate: string;
  bloodSugar: string;
  spo2: string;
  preventativeCare: string;

  // Common UI
  listenVoice: string;
  stopVoice: string;
  close: string;
  viewDetails: string;
  verifiedBadge: string;
}
