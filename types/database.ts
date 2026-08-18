// types/database.ts - Database Schema Definitions matching the provided CSV & System Extensions

export interface Drug {
  drug_id: number;
  rxcui: string;
  brand_name: string;
  generic_name: string;
  ingredient_name: string;
  dosage_form: string;
  strength: string;
  route: string;
  atc_code: string;
  manufacturer: string;
  source: string;
  updated_at: string;
}

export interface DrugInteraction {
  interaction_id: number;
  drug1_id: number;
  drug2_id: number;
  severity: 'Low' | 'Moderate' | 'Major' | 'Severe';
  interaction_type: string;
  description: string;
  clinical_effect: string;
  recommendation: string;
  evidence_source: string;
  reference_url: string;
  updated_at: string;
}

export interface MedicalCondition {
  medical_condition_id: number;
  icd10_code: string;
  condition_name: string;
  category: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface Contraindication {
  contraindication_id: number;
  drug_id: number;
  medical_condition_id: number;
  severity: 'Low' | 'Moderate' | 'Severe' | 'Absolute Contraindication';
  description: string;
  source: string;
  reference_url: string;
  created_at: string;
}

export interface DrugWarning {
  warning_id: number;
  drug_id: number;
  warning_type: string;
  warning_text: string;
  source: string;
}

export interface DrugClass {
  class_id: number;
  drug_id: number;
  class_name: string;
  class_type: string;
}

export interface Patient {
  patient_id: number;
  full_name: string;
  age: number;
  gender: string;
  date_of_birth: string;
  weight: number;
  height: number;
  blood_group: string;
  created_at: string;
  email: string;
  phone_number: string;
  password_hash: string;
}

export interface PatientCondition {
  patient_condition_id: number;
  patient_id: number;
  medical_condition_id: number;
  severity: 'Mild' | 'Moderate' | 'Severe' | 'Critical';
  status: 'Active' | 'Managed' | 'Resolved' | 'Chronic';
  diagnosed_on: string;
  notes: string;
  created_at: string;
  // Joined relation helper
  medical_condition?: MedicalCondition;
}

export interface Prescription {
  prescription_id: number;
  patient_id: number;
  doctor_name: string;
  hospital_name: string;
  uploaded_file: string;
  prescription_date: string;
  ocr_text: string;
  created_at: string;
  drugs?: PrescriptionDrug[];
}

export interface PrescriptionDrug {
  prescription_drug_id: number;
  prescription_id: number;
  drug_id: number;
  original_text: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  drug?: Drug;
}

// Application Extension Types
export interface User {
  id: string;
  email: string;
  password_hash: string;
  role: 'patient' | 'doctor' | 'admin';
  name: string;
  created_at: string;
  patient_id?: number;
  doctor_id?: string;
}

export interface DoctorProfile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone: string;
  specialization: string;
  license_number: string;
  hospital_name: string;
  verification_status: 'Verified' | 'Pending Verification' | 'Rejected';
  created_at: string;
}

export interface PatientAllergy {
  id: string;
  patient_id: number;
  allergen_name: string;
  reaction: string;
  severity: 'Low' | 'Moderate' | 'Severe' | 'Anaphylactic';
  notes: string;
  created_at: string;
}

export interface AnalysisSession {
  id: string;
  patient_id: number;
  patient_name: string;
  created_by_role: 'patient' | 'doctor' | 'admin';
  created_by_name: string;
  overall_risk: 'LOW / NONE' | 'MODERATE' | 'MAJOR / SEVERE';
  risk_score: number; // 0 - 100
  created_at: string;
  status: 'completed' | 'flagged' | 'in_progress';
  medications: AnalyzedMedication[];
  interactions: DetectedInteraction[];
  contraindications: DetectedContraindication[];
  warnings: DetectedWarning[];
  avoidance_list: DrugAvoidanceItem[];
  patient_report: PatientReport;
  doctor_report: DoctorReport;
  ai_reasoning: AIReasoningSummary;
}

export interface AnalyzedMedication {
  id: string;
  drug_id?: number;
  rxcui?: string;
  brand_name: string;
  generic_name: string;
  dosage: string;
  frequency: string;
  route?: string;
  form?: string;
  source_type: 'prescription_ocr' | 'manual_entry' | 'package_scan';
  confidence?: number;
}

export interface DetectedInteraction {
  id: string;
  drug1_name: string;
  drug2_name: string;
  drug1_rxcui?: string;
  drug2_rxcui?: string;
  severity: 'Low' | 'Moderate' | 'Major' | 'Severe';
  interaction_type: 'Drug-Drug' | 'Drug-Food' | 'Drug-Herbal';
  description: string;
  clinical_effect: string;
  recommendation: string;
  evidence_source: string;
  reference_url: string;
}

export interface DetectedContraindication {
  id: string;
  drug_name: string;
  condition_name: string;
  icd10_code: string;
  severity: 'Moderate' | 'Severe' | 'Absolute Contraindication';
  description: string;
  source: string;
  reference_url: string;
}

export interface DetectedWarning {
  id: string;
  drug_name: string;
  warning_type: string;
  warning_text: string;
  source: string;
}

export interface DrugAvoidanceItem {
  id: string;
  drug_name: string;
  reason: string;
  severity: 'Moderate' | 'Severe' | 'Critical';
  recommended_action: 'Avoid completely' | 'Consider Alternative' | 'Dose Adjustment Required' | 'Close Clinical Monitoring';
  safe_alternatives?: string[];
  monitoring_guidance?: string;
}

export interface PatientReport {
  title: string;
  summary_text: string;
  safety_alert_banner?: string;
  key_action_steps: string[];
  easy_medication_list: Array<{
    name: string;
    dosage_instruction: string;
    food_instructions: string;
    warning_note?: string;
  }>;
  disclaimer: string;
}

export interface DoctorReport {
  clinical_summary: string;
  pharmacological_mechanism: string;
  risk_level: string;
  icd10_contraindications: string[];
  monitoring_parameters: string[];
  evidence_citations: Array<{
    source: string;
    url: string;
    annotation: string;
  }>;
  prescribing_recommendations: string[];
}

export interface AIReasoningSummary {
  intent_analysis: string;
  planning_steps: string[];
  safety_gate_passed: boolean;
  uncertainty_notes?: string;
  evidence_retrieved_count: number;
}

export interface AuditLog {
  id: string;
  user_id: string;
  user_role: string;
  action: string;
  entity_type: string;
  entity_id: string;
  decision_summary: string;
  evidence_ref: string;
  timestamp: string;
  ip_address?: string;
}

export interface NotificationItem {
  id: string;
  user_id: string;
  title: string;
  message: string;
  severity: 'low' | 'moderate' | 'critical';
  is_read: boolean;
  link_url?: string;
  created_at: string;
}
