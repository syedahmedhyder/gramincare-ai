export type TriageSeverity = "green" | "yellow" | "red";

export interface TriageConditionPreset {
  id: string;
  nameEn: string;
  nameHi: string;
  nameKn: string;
  symptoms: string[];
  severity: TriageSeverity;
  clinicalSummaryEn: string;
  clinicalSummaryHi: string;
  clinicalSummaryKn: string;
  actionPlanEn: string;
  actionPlanHi: string;
  actionPlanKn: string;
  recommendedOtcs: { genericSalt: string; indication: string; approxJanAushadhiCost: string }[];
  isRedFlag: boolean;
}

export const CLINICAL_TRIAGE_PRESETS: TriageConditionPreset[] = [
  {
    id: "chest-pain-emergency",
    nameEn: "Acute Chest Pain & Breathlessness",
    nameHi: "सीने में तेज दर्द और सांस फूलना",
    nameKn: "ಎದೆ ನೋವು ಮತ್ತು ಉಸಿರಾಟದ ತೊಂದರೆ",
    symptoms: ["chest pain", "shortness of breath", "sweating", "radiating pain to left arm"],
    severity: "red",
    clinicalSummaryEn: "Suspected Acute Coronary Syndrome (Cardiac Emergency). Potential life-threatening myocardial ischemia requiring urgent ECG and thrombolytic/tertiary evaluation.",
    clinicalSummaryHi: "तीव्र हृदय आपातकाल की संभावना। तत्काल ईसीजी और नजदीकी ट्रॉमा सेंटर में आपातकालीन उपचार आवश्यक है।",
    clinicalSummaryKn: "ತೀವ್ರ ಹೃದಯ ಸಂಬಂಧಿ ತುರ್ತುಸ್ಥಿತಿ ಶಂಕೆ. ತಕ್ಷಣ ಇಸಿಜಿ ಮತ್ತು ಹತ್ತಿರದ ತಾಲೂಕು/ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆಗೆ ದಾಖಲಿಸುವುದು ಅತ್ಯಗತ್ಯ.",
    actionPlanEn: "EMERGENCY: Call 108 Ambulance immediately! Do NOT drive or walk. Keep patient seated upright. Keep chewable Aspirin 300mg ready if guided by emergency operator.",
    actionPlanHi: "आपातकाल: तुरंत 108 एम्बुलेंस को कॉल करें! मरीज को सीधा बिठाएं। डॉक्टर की देखरेख में तुरंत बड़े अस्पताल ले जाएं।",
    actionPlanKn: "ತುರ್ತು ಪರಿಸ್ಥಿತಿ: ತಕ್ಷಣ 108 ಆಂಬ್ಯುಲೆನ್ಸ್ ಕರೆ ಮಾಡಿ! ರೋಗಿಯನ್ನು ನೆಟ್ಟಗೆ ಕುಳ್ಳಿರಿಸಿ, ತಕ್ಷಣ ತುರ್ತು ಚಿಕಿತ್ಸಾ ಕೇಂದ್ರಕ್ಕೆ ಕೊಂಡೊಯ್ಯಿರಿ.",
    recommendedOtcs: [],
    isRedFlag: true,
  },
  {
    id: "preeclampsia-maternal",
    nameEn: "Maternal Red Flag (3rd Trimester BP & Headache)",
    nameHi: "गर्भावस्था आपातकाल (सिरदर्द और उच्च रक्तचाप)",
    nameKn: "ಗರ್ಭಾವಸ್ಥೆಯ ತುರ್ತುಸ್ಥಿತಿ (ತಲೆನೋವು ಮತ್ತು ಅಧಿಕ ಬಿಪಿ)",
    symptoms: ["pregnancy 3rd trimester", "high blood pressure", "severe headache", "swollen ankles", "blurred vision"],
    severity: "red",
    clinicalSummaryEn: "Obstetric Red Flag: Clinical indicators strongly indicate Preeclampsia/Impending Eclampsia. Risk of maternal seizure and fetal distress.",
    clinicalSummaryHi: "मातृ आपातकाल: प्री-एक्लेम्पसिया का उच्च जोखिम। मां और शिशु की सुरक्षा के लिए तत्काल प्रसूति विशेषज्ञ की आवश्यकता है।",
    clinicalSummaryKn: "ತಾಯಿಯ ತುರ್ತು ಎಚ್ಚರಿಕೆ: ಪ್ರೀ-ಎಕ್ಲಾಂಪ್ಸಿಯಾ ಅಪಾಯ. ತಾಯಿ ಮತ್ತು ಮಗುವಿನ ರಕ್ಷಣೆಗೆ ತಕ್ಷಣ ಸ್ತ್ರೀರೋಗ ತಜ್ಞರ ಆಸ್ಪತ್ರೆಗೆ ಕಳುಹಿಸಿ.",
    actionPlanEn: "URGENT REDIRECTION: Escort to nearest First Referral Unit (FRU) / Sub-District Hospital with 24x7 Obstetrician and Magnesium Sulfate availability.",
    actionPlanHi: "तत्काल रेफरल: नजदीकी सामुदायिक स्वास्थ्य केंद्र या जिला अस्पताल ले जाएं जहां 24 घंटे डिलीवरी की सुविधा उपलब्ध हो।",
    actionPlanKn: "ತಕ್ಷಣ ವರ್ಗಾವಣೆ: 24x7 ಹೆರಿಗೆ ಸೌಲಭ್ಯವಿರುವ ಸಮುದಾಯ ಆರೋಗ್ಯ ಕೇಂದ್ರ ಅಥವಾ ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆಗೆ ಕರೆದೊಯ್ಯಿರಿ.",
    recommendedOtcs: [],
    isRedFlag: true,
  },
  {
    id: "persistent-cough-fever",
    nameEn: "Persistent Cough (>2 Weeks) & Low Fever",
    nameHi: "लगातार खांसी (2 सप्ताह से अधिक) और हल्का बुखार",
    nameKn: "ಎರಡು ವಾರಗಳಿಗೂ ಹೆಚ್ಚು ಕೆಮ್ಮು ಮತ್ತು ಸಂಜೆ ಜ್ವರ",
    symptoms: ["chronic cough", "evening fever", "weight loss", "night sweats"],
    severity: "yellow",
    clinicalSummaryEn: "Suspected Pulmonary Tuberculosis / Chronic Respiratory Infection. Requires Sputum Smear / NAAT test (GeneXpert) under National TB Elimination Program (NTEP).",
    clinicalSummaryHi: "फेफड़ों के संक्रमण या टीबी की संभावना। राष्ट्रीय टीबी उन्मूलन कार्यक्रम के तहत बलगम जांच आवश्यक है।",
    clinicalSummaryKn: "ಶ್ವಾಸಕೋಶದ ಸೋಂಕು ಅಥವಾ ಟಿಬಿ ಶಂಕೆ. ರಾಷ್ಟ್ರೀಯ ಟಿಬಿ ನಿರ್ಮೂಲನಾ ಯೋಜನೆಯಡಿ ಉಚಿತ ಕಫ ಪರೀಕ್ಷೆ ಮಾಡಿಸಿಕೊಳ್ಳಿ.",
    actionPlanEn: "Visit the nearest Primary Health Center (PHC) for a free sputum test. Ensure patient covers mouth while coughing. ASHA worker will facilitate Nikshay registration.",
    actionPlanHi: "मुफ्त बलगम जांच के लिए नजदीकी प्राथमिक स्वास्थ्य केंद्र जाएं। आशा कार्यकर्ता निक्षय पोषण योजना में सहायता करेंगी।",
    actionPlanKn: "ಉಚಿತ ಕಫ ಪರೀಕ್ಷೆಗಾಗಿ ಹತ್ತಿರದ ಪ್ರಾಥಮಿಕ ಆರೋಗ್ಯ ಕೇಂದ್ರಕ್ಕೆ ಭೇಟಿ ನೀಡಿ. ಆಶಾ ಕಾರ್ಯಕರ್ತೆಯ ನೆರವು ಪಡೆಯಿರಿ.",
    recommendedOtcs: [
      { genericSalt: "Paracetamol 500mg", indication: "Fever and body pain", approxJanAushadhiCost: "₹ 10.50 (10 tablets)" },
      { genericSalt: "Ambroxol Hydrochloride Cough Syrup", indication: "Mucus relief", approxJanAushadhiCost: "₹ 24.00 (100ml)" },
    ],
    isRedFlag: false,
  },
  {
    id: "mild-dehydration-fever",
    nameEn: "Acute Mild Fever & Dehydration",
    nameHi: "हल्का मौसमी बुखार और दस्त/निर्जलीकरण",
    nameKn: "ಸಾಮಾನ್ಯ ಜ್ವರ ಮತ್ತು ಅತಿಸಾರ / ನಿರ್ಜಲೀಕರಣ",
    symptoms: ["mild fever", "loose motions", "fatigue", "dry mouth"],
    severity: "green",
    clinicalSummaryEn: "Acute self-limiting viral gastrointestinal episode with mild dehydration. High recovery potential with oral rehydration therapy.",
    clinicalSummaryHi: "सामान्य मौसमी वायरल और निर्जलीकरण। ओआरएस और पर्याप्त तरल पदार्थों से त्वरित सुधार संभव है।",
    clinicalSummaryKn: "ಸಾಮಾನ್ಯ ವೈರಲ್ ಸೋಂಕು ಮತ್ತು ನಿರ್ಜಲೀಕರಣ. ಒಆರ್‌ಎಸ್ ಮತ್ತು ದ್ರವಾಹಾರ ಸೇವನೆಯಿಂದ ಸುಲಭವಾಗಿ ಚೇತರಿಸಿಕೊಳ್ಳಬಹುದು.",
    actionPlanEn: "Administer 1 packet of WHO-formula Oral Rehydration Salts (ORS) dissolved in 1 liter of clean boiled water. Continue frequent sips. Rest adequately.",
    actionPlanHi: "1 लीटर उबले पानी में 1 पैकेट ओआरएस घोलकर पिएं। हल्का भोजन लें और आराम करें।",
    actionPlanKn: "1 ಲೀಟರ್ ಕುದಿಸಿ ಆರಿಸಿದ ನೀರಿನಲ್ಲಿ ಒಂದು ಪ್ಯಾಕೆಟ್ ಒಆರ್‌ಎಸ್ ಬೆರೆಸಿ ಕುಡಿಯಿರಿ. ಸಾಕಷ್ಟು ವಿಶ್ರಾಂತಿ ಪಡೆಯಿರಿ.",
    recommendedOtcs: [
      { genericSalt: "Oral Rehydration Salts (WHO Formula)", indication: "Electrolyte restoration", approxJanAushadhiCost: "₹ 4.50 (sachet)" },
      { genericSalt: "Zinc Sulfate 20mg", indication: "Mucosal recovery", approxJanAushadhiCost: "₹ 14.00 (10 tablets)" },
      { genericSalt: "Paracetamol 500mg", indication: "Temperature control", approxJanAushadhiCost: "₹ 10.50 (10 tablets)" },
    ],
    isRedFlag: false,
  },
];

export function performClinicalTriage(inputQuery: string): TriageConditionPreset {
  const query = inputQuery.toLowerCase();

  // Red Flag 1: Cardiac / Chest Pain
  if (
    query.includes("chest") ||
    query.includes("heart") ||
    query.includes("breath") ||
    query.includes("छाती") ||
    query.includes("दिल") ||
    query.includes("ಎದೆ") ||
    query.includes("ಉಸಿರಾಟ")
  ) {
    return CLINICAL_TRIAGE_PRESETS[0];
  }

  // Red Flag 2: Maternal
  if (
    query.includes("pregnant") ||
    query.includes("pregnancy") ||
    query.includes("गर्भवती") ||
    query.includes("ಗರ್ಭ") ||
    query.includes("headache") && (query.includes("swelling") || query.includes("ankle") || query.includes("bp"))
  ) {
    return CLINICAL_TRIAGE_PRESETS[1];
  }

  // Yellow: Chronic Cough / Fever
  if (
    query.includes("cough") ||
    query.includes("tb") ||
    query.includes("खांसी") ||
    query.includes("ಕೆಮ್ಮು") ||
    query.includes("weeks") ||
    query.includes("night sweat")
  ) {
    return CLINICAL_TRIAGE_PRESETS[2];
  }

  // Default / Green
  return CLINICAL_TRIAGE_PRESETS[3];
}
