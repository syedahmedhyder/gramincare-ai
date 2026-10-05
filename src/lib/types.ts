export type DocumentStatus = "ready" | "warning" | "risk";

export interface DocumentField {
  label: string;
  value: string;
  verified: boolean;
  mismatchNote?: string;
}

export interface DocumentItem {
  id: string;
  type: "aadhaar" | "ration" | "income";
  title: string;
  issuingAuthority: string;
  documentNumber: string;
  status: DocumentStatus;
  statusLabel: string;
  issueReason?: string;
  fixGuidance?: string;
  fields: DocumentField[];
}

export interface DocumentReadinessReport {
  overallStatus: DocumentStatus;
  readinessScore: number; // 0 to 100
  documents: DocumentItem[];
  mismatchSummary: string;
  fixActionPlan: string[];
  canSubmit: boolean;
  correctedFieldsSimulated?: boolean;
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: "Self" | "Spouse" | "Child" | "Parent";
  age: number;
  gender: "Male" | "Female" | "Other";
  village: string;
  district: string;
  state: string;
  aadhaarNumber: string;
  rationCardNumber: string;
  annualIncome: number;
  healthConditions: string[];
  documents: DocumentItem[];
}

export interface FamilyProfile {
  id: string;
  familyName: string;
  village: string;
  district: string;
  state: string;
  headOfHousehold: string;
  rationCategory: "BPL" | "AAY (Antyodaya)" | "APL";
  members: FamilyMember[];
}

export interface GovernmentScheme {
  id: string;
  code: string;
  name: string;
  department: string;
  stateScope: string; // e.g. "Pan-India" or "Karnataka"
  coverageAmount: string;
  description: string;
  eligibilityCriteria: string[];
  requiredDocs: string[];
  directBenefit: string;
}

export interface HealthcareFacility {
  id: string;
  name: string;
  type: "PHC" | "CHC" | "Sub-District Hospital" | "District Hospital";
  distanceKm: number;
  travelTimeMin: number;
  phone: string;
  location: string;
  doctorOnDuty: string;
  emergencyBeds: number;
  oxygenCylinders: number;
  antivenomStock: number;
  bloodUnitsStock: number;
  is24x7: boolean;
}

export interface HealthTwinMetrics {
  memberId: string;
  memberName: string;
  age: number;
  gender: string;
  bloodGroup: string;
  vitals: {
    bpSystolic: number;
    bpDiastolic: number;
    pulseRate: number;
    bloodSugar: number;
    spo2: number;
    temperatureF: number;
    bmi: number;
  };
  chronicRiskScores: {
    cardiovascular: "Low" | "Moderate" | "High";
    respiratory: "Low" | "Moderate" | "High";
    diabetes: "Low" | "Moderate" | "High";
    maternal?: "Low" | "Moderate" | "Critical";
  };
  clinicalAlerts: {
    title: string;
    description: string;
    severity: "green" | "yellow" | "red";
    action: string;
  }[];
  immunizations: {
    vaccine: string;
    status: "Completed" | "Due Soon" | "Overdue";
    dateOrDue: string;
  }[];
}
