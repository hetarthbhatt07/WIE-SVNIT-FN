# MedSafe AI — Intelligent Medication Safety & Drug Interaction Platform
### SVNIT WIE Hackathon 2026

MedSafe AI is a **production-grade, full-stack medication safety, prescription OCR analysis, drug-drug interaction detection, contraindication evaluation, and dual-recipient clinical reporting platform**.

The application is built strictly according to:
1. **Architecture Blueprint**: `FINAL_SVNIT_ARCHITECTURE-FINAL_FLOW.drawio.svg`
2. **Clinical Database Schema**: `data-1786955744718.csv`
3. **Design System**: **Paperweight Tactile UI System** (Light theme `#FAFAFA`, tactile buttons with top bevel highlights, recessed wells, blueprint grid overlay, and accessible contrast).

---

## 1. System Architecture & End-to-End Workflow

```
Patient / Doctor
       │
       ▼
Authentication (Credentials / DigiLocker ABHA Gateway)
       │
       ▼
Role-Based Dashboard (Patient Portal vs Doctor Clinical Workbench)
       │
       ▼
Prescription Ingestion (Image/PDF Upload, Manual Entry, Package Scanner)
       │
       ▼
5-Stage Image Pre-Processing (Noise Removal, Skew Correction, Contrast Enhancement)
       │
       ▼
Neural OCR Processing (Tesseract.js Engine + Medical Text Cleaning)
       │
       ▼
Medicine Name Extraction (NER / Tokenization / Pattern Matching)
       │
       ▼
RxNorm Normalization (Brand-to-Generic Mapping, RxCUI Codes, Dosage Forms)
       │
       ▼
Patient Context Integration (ICD-10 Diagnoses, Weight, Age, Allergies)
       │
       ▼
Clinical Safety Engines:
 ├── Drug-Drug Interaction Matrix (Severity: Low, Moderate, Major, Severe)
 ├── Drug-Disease Contraindications (ICD-10 Condition Matching)
 ├── Drug Warnings & Black-Box Alerts
 └── Drug Avoidance Engine (Unsafe Drug Detection & Safer Alternatives)
       │
       ▼
AI Reasoning Core & Decision Layer (Anti-Hallucination Safety Gatekeeper)
       │
       ▼
Dual Recipient Output Synthesis:
 ├── Patient Report (Plain English, Timetable, Food Instructions, Safety Warnings)
 └── Doctor Report (Pharmacological Mechanisms, ICD-10 Codes, Monitoring Parameters, Citations)
       │
       ▼
Immutable Interaction History & Regulatory Audit Logging
```

---

## 2. Technology Stack

- **Framework**: Next.js 14+ (App Router, TypeScript, React 18)
- **Styling**: Tailwind CSS configured with the **Paperweight Tactile UI System** (`#FAFAFA` paper canvas, `#2563EB` blueprint blue, tactile bevels `shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)]`, active mechanical click physics `active:scale-[0.98]`).
- **Icons**: Lucide React
- **OCR Engine**: Tesseract.js Neural Optical Character Recognition with Bilateral Pre-Processing Filters.
- **Data Store**: Reactive Local State Store with seed datasets directly derived from `data-1786955744718.csv` with full localStorage persistence.
- **Reporting**: Native browser print and PDF export with dedicated print media stylesheets.

---

## 3. Database Schema Mapping (CSV + Extensions)

### Baseline Provided Schema (from `data-1786955744718.csv`):
1. `drugs`: `drug_id`, `rxcui`, `brand_name`, `generic_name`, `ingredient_name`, `dosage_form`, `strength`, `route`, `atc_code`, `manufacturer`, `source`, `updated_at`
2. `drug_interactions`: `interaction_id`, `drug1_id`, `drug2_id`, `severity`, `interaction_type`, `description`, `clinical_effect`, `recommendation`, `evidence_source`, `reference_url`, `updated_at`
3. `contraindications`: `contraindication_id`, `drug_id`, `medical_condition_id`, `severity`, `description`, `source`, `reference_url`, `created_at`
4. `medical_conditions`: `medical_condition_id`, `icd10_code`, `condition_name`, `category`, `description`, `created_at`, `updated_at`
5. `patient_conditions`: `patient_condition_id`, `patient_id`, `medical_condition_id`, `severity`, `status`, `diagnosed_on`, `notes`, `created_at`
6. `patients`: `patient_id`, `full_name`, `age`, `gender`, `date_of_birth`, `weight`, `height`, `blood_group`, `created_at`, `email`, `phone_number`, `password_hash`
7. `prescriptions`: `prescription_id`, `patient_id`, `doctor_name`, `hospital_name`, `uploaded_file`, `prescription_date`, `ocr_text`, `created_at`
8. `prescription_drugs`: `prescription_drug_id`, `prescription_id`, `drug_id`, `original_text`, `dosage`, `frequency`, `duration`, `instructions`
9. `drug_warnings`: `warning_id`, `drug_id`, `warning_type`, `warning_text`, `source`
10. `drug_classes`: `class_id`, `drug_id`, `class_name`, `class_type`

### Application Extension Tables:
11. `users`: Role-based authentication (`patient`, `doctor`, `admin`)
12. `doctor_profiles`: Physician credentials, licensing numbers, affiliations
13. `patient_allergies`: Allergy cross-screening records
14. `analysis_sessions`: Stored clinical safety evaluations with risk scores
15. `patient_reports`: Dual patient/doctor synthesized summaries
16. `audit_logs`: Immutable decision and evidence audit trail
17. `notifications`: Real-time severity alert notifications

---

## 4. Getting Started Locally

### Prerequisites
- Node.js >= 18.x
- npm >= 8.x

### Installation & Run Commands
```bash
# 1. Clone repository & install dependencies
npm install

# 2. Start the local development server
npm run dev

# 3. Open browser at http://localhost:3000
```

### Pre-Configured Demo Accounts:
| Role | Email | Password | Features |
| :--- | :--- | :--- | :--- |
| **Patient** | `patient@medsafe.ai` | `demo123` | Active prescriptions, Peptic Ulcer + Warfarin history, OCR analysis, Patient Reports |
| **Doctor** | `doctor@medsafe.ai` | `demo123` | Patient 360 Records, Clinical Regimen Builder, Pharmacological Dossiers |

---

## 5. Complete Application Route Directory

### A. Public & Authentication Routes
| Route | Page Name | Key Features & Functionality |
| :--- | :--- | :--- |
| `/` | **Landing Page** | 6-step architecture visualizer, interactive DDI test sandbox, feature matrix, role gateways |
| `/login` | **Sign In** | Tabbed patient/doctor login, 1-click demo credentials auto-filler, DigiLocker ABHA modal |
| `/signup` | **Create Account** | Multi-step registration, baseline health calibration (patient) / medical council verification (doctor) |
| `/forgot-password` | **Password Reset** | Token-based security recovery flow |

---

### B. Patient Workspace Routes (`/patient/*`)
| Route | Page Name | Key Features & Functionality |
| :--- | :--- | :--- |
| `/patient/dashboard` | **Patient Dashboard** | Real-time clinical metrics, active medications schedule, critical alert banners, prescription history |
| `/patient/profile` | **Health Profile** | Personal demographics, physiological metrics (BMI auto-calc, weight, height, blood group) |
| `/patient/medical-history` | **Medical Conditions** | Full CRUD condition tracker with WHO ICD-10 tagging and search/filter |
| `/patient/allergies` | **Allergy Registry** | Severity-coded hypersensitivity tracking (`Low`, `Moderate`, `Severe`, `Anaphylactic`) |
| `/patient/medications` | **My Medications** | RxNorm standardized compound inventory with dosage, frequency, and 1-click safety check |
| `/patient/prescriptions` | **Prescription Archives** | Ingested prescription documents with raw OCR and cleaned text transcript viewer |
| `/patient/analysis` | **Medication Safety Hub** | Multi-mode ingestion: 5-Stage OCR Upload, Manual RxNorm Search Autocomplete, Package Scanner |
| `/patient/analysis/results` | **Safety Matrix Results** | Combinatorial pairwise DDI matrix, ICD-10 contraindications, Drug Avoidance recommendations |
| `/patient/reports` | **Safety Dossier Viewer** | Dual-recipient report (Patient Plain English vs Clinician Dossier) with 1-click **Print / PDF** |
| `/patient/history` | **Interaction History** | Longitudinal audit trail of previous analysis sessions with re-run & comparison |
| `/patient/settings` | **Account & Security** | Password change, critical SMS/email notification toggles, active sessions |

---

### C. Doctor / Clinician Workspace Routes (`/doctor/*`)
| Route | Page Name | Key Features & Functionality |
| :--- | :--- | :--- |
| `/doctor/dashboard` | **Clinician Workbench** | Triage metrics, assigned patient roster, critical contraindication flags, pending reviews |
| `/doctor/patients` | **Patient Directory** | Searchable patient registry with condition badges, blood groups, and quick triage actions |
| `/doctor/patients/[id]` | **Patient 360 Record** | Complete longitudinal patient record (diagnoses, allergies, meds, rxs) with 1-click Clinical Review |
| `/doctor/analysis` | **Multi-Drug Workbench** | Advanced regimen simulator, custom compound combinations, and instant DDI matrix calculation |
| `/doctor/reports` | **Clinical Dossiers** | Archive of physician-grade pharmacotherapy reports with evidence citations |
| `/doctor/alerts` | **Critical Alerts Inbox** | High-priority clinical feed for dangerous drug interactions across all rostered patients |
| `/doctor/audit-logs` | **Regulatory Audit Logs** | Immutable HIPAA/CDSCO decision audit logs with evidence guidelines (FDA, CHEST, CPIC) |
| `/doctor/settings` | **Physician Credentials** | Medical registration/licensure numbers, primary specialty, and hospital affiliations |

---

### D. System Diagnostics Routes (`/admin/*`)
| Route | Page Name | Key Features & Functionality |
| :--- | :--- | :--- |
| `/admin/system-health` | **System Health & Diagnostics** | Live telemetry checks for Database, Neural OCR Engine, RxNorm Service, and AI Reasoning Layer |

---

## 6. Medical & Regulatory Disclaimer

> [!IMPORTANT]
> **Clinical Decision Support Notice**:
> MedSafe AI is an automated medication safety and clinical decision-support platform designed to assist healthcare professionals and empower patients. It is not a substitute for clinical judgment, medical diagnosis, or personalized medical advice from a qualified healthcare provider. Do not discontinue or alter medications without consulting your prescribing physician or licensed pharmacist.