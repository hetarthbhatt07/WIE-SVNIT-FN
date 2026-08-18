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

## 5. Medical & Regulatory Disclaimer

> [!IMPORTANT]
> **Clinical Decision Support Notice**:
> MedSafe AI is an automated medication safety and clinical decision-support platform designed to assist healthcare professionals and empower patients. It is not a substitute for clinical judgment, medical diagnosis, or personalized medical advice from a qualified healthcare provider. Do not discontinue or alter medications without consulting your prescribing physician or licensed pharmacist.


Patient: patient@medsafe.ai / demo123
Doctor: doctor@medsafe.ai / demo123

Pathway	
Route	
Key Features


Landing Page	
/
Interactive architecture stepper, feature matrix, live demo sandbox, role gateways

Authentication	
/login
, 
/signup
Tabbed patient/doctor login, 1-click demo auto-fillers, DigiLocker ABHA modal

Patient Portal	
/patient/dashboard
Active medications, critical alert ribbons, prescription history, metrics

Health Profile	
/patient/profile
Demographic and physiological parameters (BMI, weight, height, blood group)

Medical History	
/patient/medical-history
Full CRUD for diagnosed conditions with ICD-10 tags and search/filter

Allergies	
/patient/allergies
Severity tracker (Low, Moderate, Severe, Anaphylactic)

Medications	
/patient/medications
RxNorm inventory of active medications with dosage schedules

Prescriptions	
/patient/prescriptions
Ingested prescription archive with OCR transcript inspection

Analysis Hub	
/patient/analysis
OCR Upload, Manual RxNorm Search, and Package Scanner

Safety Matrix	
/patient/analysis/results
Multi-drug pairwise matrix, contraindications, avoidance suggestions

Dual Reports	
/patient/reports
Printable Patient & Doctor report viewer with PDF print integration

History Logs	
/patient/history
Historical audit records and re-run comparison

Doctor Workbench	
/doctor/dashboard
Clinical triage, total patients, critical alert feed

Patient 360	
/doctor/patients/[id]
Complete patient longitudinal record with 1-click clinical review

System Diagnostics	
/admin/system-health
Real-time telemetry for database, neural OCR, RxNorm, and AI gateways