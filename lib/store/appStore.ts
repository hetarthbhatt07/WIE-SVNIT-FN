// lib/store/appStore.ts - Central Reactive Application State & Persistence

import { 
  User, Patient, DoctorProfile, PatientCondition, PatientAllergy, 
  Prescription, PrescriptionDrug, AnalysisSession, AuditLog, NotificationItem, Drug
} from '@/types/database';
import { 
  CLINICAL_DRUGS, CLINICAL_MEDICAL_CONDITIONS, 
  INITIAL_DEMO_PATIENTS, INITIAL_PATIENT_CONDITIONS 
} from '@/lib/data/clinicalKnowledge';

const STORAGE_KEYS = {
  CURRENT_USER: 'medsafe_current_user',
  PATIENTS: 'medsafe_patients',
  DOCTORS: 'medsafe_doctors',
  PATIENT_CONDITIONS: 'medsafe_patient_conditions',
  PATIENT_ALLERGIES: 'medsafe_patient_allergies',
  PRESCRIPTIONS: 'medsafe_prescriptions',
  ACTIVE_MEDICATIONS: 'medsafe_active_meds',
  ANALYSIS_SESSIONS: 'medsafe_analysis_sessions',
  AUDIT_LOGS: 'medsafe_audit_logs',
  NOTIFICATIONS: 'medsafe_notifications',
};

// Initial Seed Users
const INITIAL_USERS: User[] = [
  {
    id: 'user-patient-1',
    email: 'patient@medsafe.ai',
    password_hash: 'demo123',
    role: 'patient',
    name: 'Eleanor Vance',
    patient_id: 101,
    created_at: '2026-01-02 10:30:00'
  },
  {
    id: 'user-doctor-1',
    email: 'doctor@medsafe.ai',
    password_hash: 'demo123',
    role: 'doctor',
    name: 'Dr. Sarah Mitchell, MD',
    doctor_id: 'doc-101',
    created_at: '2026-01-01 08:00:00'
  }
];

const INITIAL_DOCTORS: DoctorProfile[] = [
  {
    id: 'doc-101',
    user_id: 'user-doctor-1',
    full_name: 'Dr. Sarah Mitchell, MD',
    email: 'doctor@medsafe.ai',
    phone: '+1 (555) 345-6789',
    specialization: 'Cardiology & Internal Medicine',
    license_number: 'MD-CA-892341',
    hospital_name: 'SVNIT Memorial Healthcare & Research Institute',
    verification_status: 'Verified',
    created_at: '2026-01-01 08:00:00'
  }
];

const INITIAL_ALLERGIES: PatientAllergy[] = [
  {
    id: 'allergy-1',
    patient_id: 101,
    allergen_name: 'Penicillin / Amoxicillin',
    reaction: 'Urticaria, pruritus, mild facial angioedema',
    severity: 'Severe',
    notes: 'Developed severe hives within 2 hours of ingestion in 2019.',
    created_at: '2026-01-02'
  },
  {
    id: 'allergy-2',
    patient_id: 101,
    allergen_name: 'Sulfa Drugs (Sulfonamides)',
    reaction: 'Maculopapular rash',
    severity: 'Moderate',
    notes: 'Mild skin rash without mucosal involvement.',
    created_at: '2026-01-02'
  }
];

const INITIAL_PRESCRIPTIONS: Prescription[] = [
  {
    prescription_id: 501,
    patient_id: 101,
    doctor_name: 'Dr. Robert Jenkins, FACC',
    hospital_name: 'St. Jude Heart & Vascular Center',
    uploaded_file: '/samples/prescription_sample_1.png',
    prescription_date: '2026-01-14',
    ocr_text: 'Rx: Warfarin 5mg daily. Ibuprofen 400mg PO PRN for joint pain. Lisinopril 10mg morning.',
    created_at: '2026-01-14 11:20:00'
  },
  {
    prescription_id: 502,
    patient_id: 101,
    doctor_name: 'Dr. Sarah Mitchell, MD',
    hospital_name: 'SVNIT Memorial Healthcare',
    uploaded_file: '/samples/prescription_sample_2.pdf',
    prescription_date: '2026-01-28',
    ocr_text: 'Rx: Warfarin 5mg tablet OD. Acetaminophen 500mg PO PRN (Avoid NSAIDs). Lisinopril 10mg tablet OD.',
    created_at: '2026-01-28 16:45:00'
  }
];

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    user_id: 'user-patient-1',
    title: 'High Risk Drug Interaction Detected',
    message: 'Warfarin + Ibuprofen interaction poses a Major Bleeding risk. Consult your physician immediately.',
    severity: 'critical',
    is_read: false,
    link_url: '/patient/analysis/results',
    created_at: '2026-02-01 10:15:00'
  },
  {
    id: 'notif-2',
    user_id: 'user-patient-1',
    title: 'Prescription OCR Cleaned & Verified',
    message: 'Prescription #502 text extraction completed with 98% confidence.',
    severity: 'low',
    is_read: true,
    link_url: '/patient/prescriptions',
    created_at: '2026-01-28 16:46:00'
  },
  {
    id: 'notif-3',
    user_id: 'user-doctor-1',
    title: 'Critical Patient Interaction Flag',
    message: 'Patient Eleanor Vance submitted prescription with contraindicated NSAID (Peptic Ulcer + Warfarin).',
    severity: 'critical',
    is_read: false,
    link_url: '/doctor/patients/101',
    created_at: '2026-02-01 10:16:00'
  }
];

export const INITIAL_DEFAULT_ANALYSIS_SESSION: AnalysisSession = {
  id: 'analysis-seed-501',
  patient_id: 101,
  patient_name: 'Eleanor Vance',
  created_by_role: 'patient',
  created_by_name: 'Eleanor Vance',
  overall_risk: 'MAJOR / SEVERE',
  risk_score: 92,
  created_at: '2026-02-01 10:15:00',
  status: 'flagged',
  medications: [
    { id: '1', drug_id: 1, rxcui: '11289', brand_name: 'Coumadin', generic_name: 'Warfarin', dosage: '5 mg', frequency: 'Once daily (OD)', source_type: 'prescription_ocr' },
    { id: '2', drug_id: 2, rxcui: '5640', brand_name: 'Advil', generic_name: 'Ibuprofen', dosage: '400 mg', frequency: 'Every 8 hours PRN', source_type: 'prescription_ocr' },
    { id: '3', drug_id: 5, rxcui: '29046', brand_name: 'Prinivil', generic_name: 'Lisinopril', dosage: '10 mg', frequency: 'Every morning (OD)', source_type: 'prescription_ocr' }
  ],
  interactions: [
    {
      id: 'int-1',
      drug1_name: 'Warfarin',
      drug2_name: 'Ibuprofen',
      drug1_rxcui: '11289',
      drug2_rxcui: '5640',
      severity: 'Major',
      interaction_type: 'Drug-Drug',
      description: 'Concurrent use of Warfarin and Ibuprofen dramatically increases gastrointestinal and systemic bleeding risks due to platelet aggregation inhibition combined with anticoagulant effect.',
      clinical_effect: 'Substantial elevation of INR and severe gastrointestinal hemorrhage risk.',
      recommendation: 'Avoid concurrent use. Use Acetaminophen (Paracetamol) for mild-to-moderate analgesia instead of NSAIDs. If NSAID is mandatory, monitor INR closely and co-prescribe a gastroprotective agent (PPI).',
      evidence_source: 'FDA Drug Safety Communication / DailyMed Black Box / CHEST Guidelines',
      reference_url: 'https://www.fda.gov/drugs/drug-safety-and-availability'
    }
  ],
  contraindications: [
    {
      id: 'contra-1',
      drug_name: 'Ibuprofen',
      condition_name: 'Peptic Ulcer Disease (Active / History)',
      icd10_code: 'K25.9',
      severity: 'Absolute Contraindication',
      description: 'NSAIDs inhibit gastric protective prostaglandins (PGE2, PGI2), inducing mucosal damage, recurrent ulceration, perforation, and massive GI hemorrhage.',
      source: 'FDA NSAID Boxed Warning / American Gastroenterological Association',
      reference_url: 'https://gastro.org'
    }
  ],
  warnings: [
    {
      id: 'warn-1',
      drug_name: 'Warfarin',
      warning_type: 'Black Box Warning',
      warning_text: 'Bleeding Risk: Warfarin can cause major or fatal bleeding. Regular INR monitoring is essential. Drugs, dietary changes, and other factors affect INR.',
      source: 'FDA Prescribing Information'
    }
  ],
  avoidance_list: [
    {
      id: 'avoid-1',
      drug_name: 'Ibuprofen (NSAID)',
      reason: 'Severe synergistic risk with Warfarin and active Peptic Ulcer Disease: Substantial elevation of INR and severe gastrointestinal hemorrhage risk.',
      severity: 'Critical',
      recommended_action: 'Avoid completely',
      safe_alternatives: ['Acetaminophen (Paracetamol)', 'Topical Analgesics'],
      monitoring_guidance: 'Avoid concurrent use. Use Acetaminophen (Paracetamol) for mild-to-moderate analgesia instead of NSAIDs.'
    }
  ],
  patient_report: {
    title: 'Medication Safety & Guidance Summary for Eleanor Vance',
    summary_text: 'We analyzed your 3 medications (Warfarin, Ibuprofen, Lisinopril). ⚠️ IMPORTANT: Our safety check identified critical combinations that may increase your risk of bleeding or severe side effects. Please review the alerts below with your doctor.',
    safety_alert_banner: 'CRITICAL CAUTION: Do NOT take Ibuprofen together with Warfarin without speaking directly to your doctor or pharmacist.',
    key_action_steps: [
      'Avoid taking Ibuprofen (NSAID). Reason: Severe synergistic bleeding risk with Warfarin. Ask your doctor about safer choices like Acetaminophen (Paracetamol).',
      'Contact your prescribing doctor to confirm if a safer pain relief alternative can replace NSAIDs.',
      'Watch for symptoms such as unusual bruising, dark stools, dizziness, or stomach pain.'
    ],
    easy_medication_list: [
      { name: 'Coumadin (Warfarin) - 5 mg', dosage_instruction: '5 mg Once daily (OD)', food_instructions: 'Maintain consistent intake of green leafy vegetables. Avoid cranberry juice.', warning_note: 'Requires regular INR blood clotting checks.' },
      { name: 'Advil (Ibuprofen) - 400 mg', dosage_instruction: '400 mg Every 8 hours PRN', food_instructions: 'Always take with meals or milk.', warning_note: 'Avoid if you have stomach ulcers or kidney issues.' },
      { name: 'Prinivil (Lisinopril) - 10 mg', dosage_instruction: '10 mg Every morning (OD)', food_instructions: 'Take at the same time each morning.', warning_note: undefined }
    ],
    disclaimer: 'This automated safety report is an AI-assisted decision-support summary and is not a substitute for professional clinical medical advice, diagnosis, or treatment. Never stop or modify prescription doses without consulting your doctor or pharmacist.'
  },
  doctor_report: {
    clinical_summary: 'Comprehensive drug safety evaluation completed for patient Eleanor Vance, Age: 64 (Female), Weight: 68.5kg. Regimen includes 3 active compounds. Regimen Risk Tier: MAJOR / SEVERE. Identified 1 significant drug-drug interaction. Identified 1 disease-specific contraindication against documented medical history (Essential Hypertension, Peptic Ulcer Disease, Atrial Fibrillation).',
    pharmacological_mechanism: '[MAJOR] Warfarin ↔ Ibuprofen: Concurrent use of Warfarin and Ibuprofen dramatically increases gastrointestinal and systemic bleeding risks due to platelet aggregation inhibition combined with anticoagulant effect. | Clinical Effect: Substantial elevation of INR and severe gastrointestinal hemorrhage risk.',
    risk_level: 'MAJOR / SEVERE',
    icd10_contraindications: ['[K25.9] Peptic Ulcer Disease (Active / History) with Ibuprofen: NSAIDs inhibit gastric protective prostaglandins (PGE2, PGI2), inducing mucosal damage, recurrent ulceration, perforation, and massive GI hemorrhage.'],
    monitoring_parameters: [
      'Baseline & bi-weekly Complete Blood Count (CBC) and Platelet Count',
      'Serial Prothrombin Time (PT) / International Normalized Ratio (INR) target 2.0 - 3.0',
      'Comprehensive Metabolic Panel (CMP): Serum Creatinine, eGFR, Blood Urea Nitrogen (BUN), Potassium',
      'Periodic stool guaiac / fecal occult blood test for occult GI hemorrhage'
    ],
    evidence_citations: [
      { source: 'FDA Drug Safety Communication / DailyMed Black Box / CHEST Guidelines', url: 'https://www.fda.gov/drugs/drug-safety-and-availability', annotation: 'Guideline recommendation: Avoid concurrent use. Use Acetaminophen (Paracetamol) for mild-to-moderate analgesia instead of NSAIDs.' }
    ],
    prescribing_recommendations: [
      'DISCONTINUE / REPLACE: Ibuprofen (NSAID). Recommended alternative: Acetaminophen (Paracetamol), Topical Analgesics. Action: Avoid completely.',
      'Co-prescribe gastroprotective agent (Proton Pump Inhibitor / H2RA) if antiplatelet/anticoagulant therapy is mandatory.',
      'Re-evaluate renal clearance and electrolyte balance every 3 to 6 months.'
    ]
  },
  ai_reasoning: {
    intent_analysis: 'Evaluate medication regimen (3 drugs) against patient history for Eleanor Vance (64y/o, Female).',
    planning_steps: [
      'Step 1: Extracted and normalized 3 drug entities via RxNorm standard.',
      'Step 2: Cross-referenced pairwise interaction rules against FDA/DailyMed database (1 interaction found).',
      'Step 3: Evaluated active patient conditions for clinical contraindications (1 identified).',
      'Step 4: Checked allergy registry for cross-reactivity.',
      'Step 5: Executed Drug Avoidance engine to formulate safe therapeutic alternatives.',
      'Step 6: Verified Safety Gatekeeper constraints and synthesized recipient-specific reports.'
    ],
    safety_gate_passed: true,
    evidence_retrieved_count: 3
  }
};

export class AppStateService {
  private static isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  // Get or Initialize Storage
  private static getItem<T>(key: string, defaultVal: T): T {
    if (!this.isBrowser()) return defaultVal;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultVal;
    } catch {
      return defaultVal;
    }
  }

  private static setItem<T>(key: string, val: T): void {
    if (!this.isBrowser()) return;
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.error('Failed saving to localStorage', e);
    }
  }

  // Initializer
  public static initSeedData(): void {
    if (!this.isBrowser()) return;
    if (!localStorage.getItem(STORAGE_KEYS.PATIENTS)) {
      this.setItem(STORAGE_KEYS.PATIENTS, INITIAL_DEMO_PATIENTS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.DOCTORS)) {
      this.setItem(STORAGE_KEYS.DOCTORS, INITIAL_DOCTORS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.PATIENT_CONDITIONS)) {
      this.setItem(STORAGE_KEYS.PATIENT_CONDITIONS, INITIAL_PATIENT_CONDITIONS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.PATIENT_ALLERGIES)) {
      this.setItem(STORAGE_KEYS.PATIENT_ALLERGIES, INITIAL_ALLERGIES);
    }
    if (!localStorage.getItem(STORAGE_KEYS.PRESCRIPTIONS)) {
      this.setItem(STORAGE_KEYS.PRESCRIPTIONS, INITIAL_PRESCRIPTIONS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
      this.setItem(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.ANALYSIS_SESSIONS) || JSON.parse(localStorage.getItem(STORAGE_KEYS.ANALYSIS_SESSIONS) || '[]').length === 0) {
      this.setItem(STORAGE_KEYS.ANALYSIS_SESSIONS, [INITIAL_DEFAULT_ANALYSIS_SESSION]);
    }
    if (!localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS)) {
      this.setItem(STORAGE_KEYS.AUDIT_LOGS, [
        {
          id: 'log-1',
          user_id: 'user-patient-1',
          user_role: 'patient',
          action: 'ANALYSIS_EXECUTION',
          entity_type: 'Prescription',
          entity_id: '501',
          decision_summary: 'Evaluated Warfarin 5mg + Ibuprofen 400mg. Identified Major Synergistic Bleeding Risk. Gatekeeper passed with Critical Alert.',
          evidence_ref: 'FDA Boxed Warning / CHEST Guidelines',
          timestamp: '2026-02-01 10:15:00'
        }
      ]);
    }
  }

  // Auth & Session
  public static getCurrentUser(): User | null {
    const user = this.getItem<User | null>(STORAGE_KEYS.CURRENT_USER, null);
    if (!user) {
      // Default to patient for seamless preview if not logged in
      return INITIAL_USERS[0];
    }
    return user;
  }

  public static setCurrentUser(user: User | null): void {
    this.setItem(STORAGE_KEYS.CURRENT_USER, user);
  }

  public static authenticateUser(email: string, pass: string): { success: boolean; user?: User; error?: string } {
    const users = INITIAL_USERS;
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
    if (!found) {
      return { success: false, error: 'No account found with this email address.' };
    }
    if (found.password_hash !== pass && pass !== 'demo123') {
      return { success: false, error: 'Incorrect password.' };
    }
    this.setCurrentUser(found);
    this.logAudit(found.id, found.role, 'USER_LOGIN', 'User', found.id, 'User successfully authenticated via credentials.', 'Session Auth');
    return { success: true, user: found };
  }

  // Patients
  public static getPatients(): Patient[] {
    return this.getItem<Patient[]>(STORAGE_KEYS.PATIENTS, INITIAL_DEMO_PATIENTS);
  }

  public static getPatientById(id: number): Patient | undefined {
    const patients = this.getPatients();
    return patients.find(p => p.patient_id === id);
  }

  public static updatePatient(updated: Patient): void {
    const patients = this.getPatients();
    const idx = patients.findIndex(p => p.patient_id === updated.patient_id);
    if (idx !== -1) {
      patients[idx] = updated;
      this.setItem(STORAGE_KEYS.PATIENTS, patients);
    }
  }

  // Medical Conditions
  public static getPatientConditions(patientId: number): PatientCondition[] {
    const list = this.getItem<PatientCondition[]>(STORAGE_KEYS.PATIENT_CONDITIONS, INITIAL_PATIENT_CONDITIONS);
    const filtered = list.filter(c => c.patient_id === patientId);
    return filtered.map(c => ({
      ...c,
      medical_condition: CLINICAL_MEDICAL_CONDITIONS.find(m => m.medical_condition_id === c.medical_condition_id)
    }));
  }

  public static addPatientCondition(cond: Omit<PatientCondition, 'patient_condition_id' | 'created_at'>): PatientCondition {
    const list = this.getItem<PatientCondition[]>(STORAGE_KEYS.PATIENT_CONDITIONS, INITIAL_PATIENT_CONDITIONS);
    const newCond: PatientCondition = {
      ...cond,
      patient_condition_id: Date.now(),
      created_at: new Date().toISOString().split('T')[0]
    };
    list.push(newCond);
    this.setItem(STORAGE_KEYS.PATIENT_CONDITIONS, list);
    return newCond;
  }

  public static removePatientCondition(conditionId: number): void {
    const list = this.getItem<PatientCondition[]>(STORAGE_KEYS.PATIENT_CONDITIONS, INITIAL_PATIENT_CONDITIONS);
    const updated = list.filter(c => c.patient_condition_id !== conditionId);
    this.setItem(STORAGE_KEYS.PATIENT_CONDITIONS, updated);
  }

  // Allergies
  public static getPatientAllergies(patientId: number): PatientAllergy[] {
    const list = this.getItem<PatientAllergy[]>(STORAGE_KEYS.PATIENT_ALLERGIES, INITIAL_ALLERGIES);
    return list.filter(a => a.patient_id === patientId);
  }

  public static addPatientAllergy(allergy: Omit<PatientAllergy, 'id' | 'created_at'>): PatientAllergy {
    const list = this.getItem<PatientAllergy[]>(STORAGE_KEYS.PATIENT_ALLERGIES, INITIAL_ALLERGIES);
    const newAllergy: PatientAllergy = {
      ...allergy,
      id: `allergy-${Date.now()}`,
      created_at: new Date().toISOString().split('T')[0]
    };
    list.push(newAllergy);
    this.setItem(STORAGE_KEYS.PATIENT_ALLERGIES, list);
    return newAllergy;
  }

  public static removePatientAllergy(id: string): void {
    const list = this.getItem<PatientAllergy[]>(STORAGE_KEYS.PATIENT_ALLERGIES, INITIAL_ALLERGIES);
    const updated = list.filter(a => a.id !== id);
    this.setItem(STORAGE_KEYS.PATIENT_ALLERGIES, updated);
  }

  // Prescriptions
  public static getPrescriptions(patientId?: number): Prescription[] {
    const list = this.getItem<Prescription[]>(STORAGE_KEYS.PRESCRIPTIONS, INITIAL_PRESCRIPTIONS);
    if (patientId) {
      return list.filter(p => p.patient_id === patientId);
    }
    return list;
  }

  public static addPrescription(rx: Omit<Prescription, 'prescription_id' | 'created_at'>): Prescription {
    const list = this.getItem<Prescription[]>(STORAGE_KEYS.PRESCRIPTIONS, INITIAL_PRESCRIPTIONS);
    const newRx: Prescription = {
      ...rx,
      prescription_id: Date.now(),
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    list.unshift(newRx);
    this.setItem(STORAGE_KEYS.PRESCRIPTIONS, list);
    return newRx;
  }

  public static deletePrescription(rxId: number): void {
    const list = this.getItem<Prescription[]>(STORAGE_KEYS.PRESCRIPTIONS, INITIAL_PRESCRIPTIONS);
    const updated = list.filter(p => p.prescription_id !== rxId);
    this.setItem(STORAGE_KEYS.PRESCRIPTIONS, updated);
  }

  // Analysis Sessions
  public static getAnalysisSessions(patientId?: number): AnalysisSession[] {
    const list = this.getItem<AnalysisSession[]>(STORAGE_KEYS.ANALYSIS_SESSIONS, []);
    if (patientId) {
      return list.filter(s => s.patient_id === patientId);
    }
    return list;
  }

  public static saveAnalysisSession(session: AnalysisSession): void {
    const list = this.getItem<AnalysisSession[]>(STORAGE_KEYS.ANALYSIS_SESSIONS, []);
    const idx = list.findIndex(s => s.id === session.id);
    if (idx !== -1) {
      list[idx] = session;
    } else {
      list.unshift(session);
    }
    this.setItem(STORAGE_KEYS.ANALYSIS_SESSIONS, list);
  }

  public static getAnalysisSessionById(id: string): AnalysisSession | undefined {
    const list = this.getAnalysisSessions();
    return list.find(s => s.id === id);
  }

  // Notifications
  public static getNotifications(userId?: string): NotificationItem[] {
    const list = this.getItem<NotificationItem[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    if (userId) {
      return list.filter(n => n.user_id === userId);
    }
    return list;
  }

  public static markNotificationRead(id: string): void {
    const list = this.getItem<NotificationItem[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    const item = list.find(n => n.id === id);
    if (item) {
      item.is_read = true;
      this.setItem(STORAGE_KEYS.NOTIFICATIONS, list);
    }
  }

  public static markAllNotificationsRead(userId: string): void {
    const list = this.getItem<NotificationItem[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    list.forEach(n => {
      if (n.user_id === userId) n.is_read = true;
    });
    this.setItem(STORAGE_KEYS.NOTIFICATIONS, list);
  }

  public static addNotification(notif: Omit<NotificationItem, 'id' | 'created_at' | 'is_read'>): void {
    const list = this.getItem<NotificationItem[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    list.unshift({
      ...notif,
      id: `notif-${Date.now()}`,
      is_read: false,
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
    });
    this.setItem(STORAGE_KEYS.NOTIFICATIONS, list);
  }

  // Audit Logs
  public static getAuditLogs(): AuditLog[] {
    return this.getItem<AuditLog[]>(STORAGE_KEYS.AUDIT_LOGS, []);
  }

  public static logAudit(
    userId: string, 
    role: string, 
    action: string, 
    entityType: string, 
    entityId: string, 
    decisionSummary: string, 
    evidenceRef: string
  ): void {
    const logs = this.getItem<AuditLog[]>(STORAGE_KEYS.AUDIT_LOGS, []);
    const newLog: AuditLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      user_id: userId,
      user_role: role,
      action,
      entity_type: entityType,
      entity_id: entityId,
      decision_summary: decisionSummary,
      evidence_ref: evidenceRef,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    logs.unshift(newLog);
    this.setItem(STORAGE_KEYS.AUDIT_LOGS, logs);
  }
}
