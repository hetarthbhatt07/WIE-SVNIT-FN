<div align="center">

<br/>

<img src="https://img.shields.io/badge/MedSafe_AI-Intelligent_Drug_Safety-2563EB?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyTDMgN3YxMGw5IDUgOS01VjdsLTktNXptMCAyLjI0TDE5LjMgOC41IDEyIDE0IDE0LjcgOC41IDEyIDQuMjR6Ii8+PC9zdmc+" alt="MedSafe AI"/>

# 🏥 MedSafe AI
## Intelligent Medication Safety & Drug Interaction Platform

**IEEE WIE ILS 2026**

---

[![Next.js](https://img.shields.io/badge/Next.js-14+-000000?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Tesseract.js](https://img.shields.io/badge/Tesseract.js-v5-FF6F61?style=flat-square)](https://tesseract.projectnaptha.com)
[![RxNorm](https://img.shields.io/badge/RxNorm-API-4CAF50?style=flat-square)](https://www.nlm.nih.gov/research/umls/rxnorm)
[![Build](https://img.shields.io/badge/Build-31_Routes_Verified-22C55E?style=flat-square&logo=vercel)](https://github.com/hetarthbhatt07/WIE-SVNIT-FN)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

<br/>

> **Preventing adverse drug events before they happen.**
>
> MedSafe AI is a production-grade, full-stack clinical decision support platform that combines  
> Neural OCR, RxNorm normalization, deterministic safety matrices, and AI reasoning  
> to deliver real-time medication safety intelligence to patients and healthcare professionals.

<br/>

</div>

---

## 👥 Team VEDIORA

**🏫 Institution:** LDRP Institute of Technology and Research &nbsp;|&nbsp; **🏆 Event:** IEEE WIE ILS 2026

| # | Name | Role |
|:--|:-----|:-----|
| 👑 | **Avani Rajendrabhai Darji** | Team Leader |
| 🥈 | **Janvi Navinbhai Darji** | Co-Leader |
| 🧑‍💻 | **Bhavarth Jitendra Dobariya** | Member |
| 🧑‍💻 | **Ayanuddin Ayazuddin Shaikh** | Member |
| 🧑‍💻 | **Kunj Shaileshbhai Darji** | Member |
| 🧑‍💻 | **Hetarth Umang Bhatt** | Member |

---

## 📋 Table of Contents

| # | Section |
|:--|:--------|
| 1 | [🎯 Project Objective](#-project-objective) |
| 2 | [✨ Key Features](#-key-features) |
| 3 | [🛠️ Technology Stack](#%EF%B8%8F-technology-stack) |
| 4 | [⚙️ Setup & Installation](#%EF%B8%8F-setup--installation) |
| 5 | [📊 Implementation Status](#-implementation-status) |
| 6 | [🗺️ Complete Route Directory](#%EF%B8%8F-complete-route-directory) |
| 7 | [📐 System Architecture](#-system-architecture) |
| 8 | [🗄️ Database Schema](#%EF%B8%8F-database-schema) |
| 9 | [⚖️ Disclaimer](#%EF%B8%8F-medical--regulatory-disclaimer) |

---

## 🎯 Project Objective

Adverse drug events (ADEs) affect **125,000 patients annually** and account for over **$3.5 billion** in preventable healthcare costs in India alone. Medication errors from dangerous drug-drug interactions (DDIs) and disease contraindications remain a leading cause of preventable hospital admissions.

**MedSafe AI** addresses this gap by providing an intelligent, automated clinical decision-support system that:

- 🔬 **Analyzes prescriptions** using multi-stage OCR and RxNorm canonical normalization
- ⚡ **Detects interactions** via a deterministic pairwise DDI safety matrix (WHO/FDA evidence-graded)
- 🛡️ **Flags contraindications** against WHO ICD-10 disease registries and patient allergy profiles
- 📋 **Generates dual-recipient reports** — plain English summaries for patients and pharmacological dossiers for physicians
- 🔐 **Maintains an immutable audit trail** compliant with HIPAA and CDSCO regulatory frameworks

> *"Between the prescription pad and the patient, MedSafe AI is the safety net."*

---

## ✨ Key Features

<details open>
<summary><b>🩻 Multi-Source Prescription Ingestion Pipeline</b></summary>
<br/>

| Mode | Description |
|:-----|:------------|
| 📄 **OCR Upload** | Drag-and-drop JPG/PNG/PDF with 5-stage bilateral pre-processing (denoising, deskewing, Otsu binarization) |
| 🔍 **Manual Search** | Live RxNorm concept autocomplete with brand-to-generic resolution and RxCUI indexing |
| 📦 **Package Scanner** | Optical medicine package scanning with OCR-assisted compound extraction |

</details>

<details open>
<summary><b>💊 RxNorm Canonical Normalization Engine</b></summary>
<br/>

Standardizes brand names (e.g. *Coumadin → Warfarin*, *Advil → Ibuprofen*, *Glucophage → Metformin*) into:
- ✅ Generic compounds with RxCUI codes
- ✅ Standard dosage forms and administration routes
- ✅ ATC pharmacological class classification

</details>

<details open>
<summary><b>⚠️ Clinical Interaction & Avoidance Engine</b></summary>
<br/>

| Engine | Capability |
|:-------|:-----------|
| 🔴 **Pairwise DDI Matrix** | Combinatorial evaluation of every drug pair in the regimen |
| 🟡 **Severity Classification** | `LOW / NONE` → `MODERATE` → `MAJOR / SEVERE` |
| 🟠 **Drug Avoidance Detector** | Flags hazardous compounds and recommends safer therapeutic alternatives |
| 🟣 **ICD-10 Contraindication Check** | Cross-references active conditions (WHO ICD-10) with drug database |
| 🔵 **Allergy Cross-Screener** | Validates prescriptions against patient hypersensitivity registries |

</details>

<details open>
<summary><b>📑 Dual-Recipient Clinical Reports</b></summary>
<br/>

| Report Type | Audience | Contents |
|:------------|:---------|:---------|
| 👤 **Patient Friendly Report** | Patient | Plain English explanation, medication schedule, food guidelines, safety warnings |
| 🩺 **Physician Dossier** | Doctor | Pharmacological mechanisms, ICD-10 codes, monitoring parameters, PubMed/FDA citations |

Both reports support native 1-click **Print / PDF export**.

</details>

<details open>
<summary><b>🏢 Role-Based Clinical Workspaces (3 Portals)</b></summary>
<br/>

| Portal | Users | Key Capabilities |
|:-------|:------|:----------------|
| 🟦 **Patient Portal** | Patients | Dashboard, Health Profile, Medications, Prescriptions, OCR Analysis, Safety Reports |
| 🟩 **Doctor Portal** | Physicians | Patient 360 Records, Multi-Drug Workbench, Clinical Dossiers, Critical Alerts |
| 🟥 **Admin Workspace** | Administrators | Live System Telemetry, Clinical Knowledge Catalog, Patient Registry, Audit Ledger |

</details>

<details>
<summary><b>🔐 Regulatory Audit Logging & Security</b></summary>
<br/>

- Immutable **HIPAA/CDSCO-compliant** decision logs with evidence citations (FDA, CHEST, CPIC)
- **DigiLocker / ABHA** National Health ID gateway integration
- Role-based access control with session management

</details>

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|:------|:-----------|:--------|
| **Framework** | Next.js 14+ (App Router) | Full-stack React framework with SSR/SSG |
| **Language** | TypeScript 5.0 | Type-safe application code |
| **Styling** | Tailwind CSS + Paperweight Tactile UI | `#FAFAFA` canvas, `#2563EB` blueprint blue, tactile bevel physics |
| **Icons** | Lucide React | Consistent clinical iconography |
| **OCR Engine** | Tesseract.js v5 | Neural optical character recognition with bilateral preprocessing |
| **Drug Database** | RxNorm / FDA Open Data | Canonical drug normalization and interaction evidence |
| **Data Layer** | Reactive Local Store | Seed datasets from `data.csv` with full localStorage persistence |
| **Reporting** | Browser Print API | Native print/PDF with dedicated media stylesheets |
| **Architecture** | `FINAL_SVNIT_ARCHITECTURE.drawio.svg` | 9-stage clinical decision pipeline |

### Design System: Paperweight Tactile UI
```
Canvas Color  ─── #FAFAFA  (Blueprint paper white)
Primary Blue  ─── #2563EB  (Clinical action blue)
Bevel Effect  ─── shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)]
Click Physics ─── active:scale-[0.98] transition-transform
Font Families ─── Inter (sans) + JetBrains Mono (mono)
```

---

## ⚙️ Setup & Installation

### Prerequisites

```
Node.js  ≥  18.x
npm      ≥  8.x
```

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/hetarthbhatt07/WIE-SVNIT-FN.git
cd WIE-SVNIT-FN

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open your browser
open http://localhost:3000
```

> **Production Build**
> ```bash
> npm run build   # Compiles 31 routes with 0 errors ✓
> ```

### 🔑 Pre-Configured Demo Accounts

| Role | Email | Password | Workspace |
|:-----|:------|:---------|:----------|
| 🟦 **Patient** | `patient@medsafe.ai` | `demo123` | `/patient/dashboard` |
| 🟩 **Doctor** | `doctor@medsafe.ai` | `demo123` | `/doctor/dashboard` |
| 🟥 **Admin** | `admin@medsafe.ai` | `demo123` | `/admin/system-health` |

> **Demo patient is pre-loaded with:** Warfarin + Ibuprofen (Major DDI), Peptic Ulcer Disease (ICD-10: K27), and 2 ingested OCR prescriptions — so every feature is immediately demonstrable.

---

## 📊 Implementation Status

```
Total Routes Compiled ───── 31 / 31   ✅
Build Errors ────────────── 0         ✅
Type Errors ─────────────── 0         ✅
Patient Portal Pages ─────── 11 / 11  ✅
Doctor Portal Pages ──────── 8 / 8    ✅
Admin Workspace Pages ─────── 6 / 6    ✅
```

| # | Milestone | Status | Details |
|:--|:----------|:------:|:--------|
| 1 | **Paperweight Tactile UI Design System** | ✅ | `#FAFAFA` canvas, bevel highlights, pressed physics, blueprint grid |
| 2 | **Clinical Knowledge Layer** | ✅ | 25+ standard drugs, 12+ DDI rules, ICD-10 contraindications seeded |
| 3 | **RxNorm Normalization Service** | ✅ | Brand-to-generic mapping, RxCUI concept index, autocomplete |
| 4 | **Multi-Stage OCR Pipeline** | ✅ | 5-stage preprocessing (Denoising, Deskewing, Otsu) + Tesseract.js v5 |
| 5 | **Drug Interaction & Avoidance Engine** | ✅ | Pairwise DDI matrix, ICD-10 checks, safe alternative recommendations |
| 6 | **AI Reasoning & Decision Layer** | ✅ | Safety Gatekeeper (Anti-Hallucination), dual-recipient report synthesizer |
| 7 | **Patient Portal — 11 Pages** | ✅ | Dashboard, Profile, Conditions, Allergies, Medications, Prescriptions, Analysis, Results, Reports, History, Settings |
| 8 | **Doctor Portal — 8 Pages** | ✅ | Dashboard, Directory, Patient 360, Drug Workbench, Reports, Alerts, Audit Logs, Settings |
| 9 | **Admin Workspace — 6 Pages** | ✅ | System Telemetry, Patient Registry, Audit Ledger, Clinical KB, Reports Archive, Settings |
| 10 | **Production Build Verification** | ✅ | `npm run build` — 0 errors across all **31 routes** |

---

## 🗺️ Complete Route Directory

### 🔓 A. Public & Authentication Routes

| Route | Page | Description |
|:------|:-----|:------------|
| `/` | **Landing Page** | 6-step architecture visualizer, interactive DDI sandbox, feature matrix, role gateways |
| `/login` | **Sign In** | Tabbed patient/doctor login, 1-click demo credential auto-fill, DigiLocker ABHA modal |
| `/signup` | **Create Account** | Multi-step registration with patient health calibration / doctor council verification |
| `/forgot-password` | **Password Reset** | Token-based security recovery flow |

---

### 🟦 B. Patient Workspace — `/patient/*`

| Route | Page | Description |
|:------|:-----|:------------|
| `/patient/dashboard` | **Patient Dashboard** | Real-time clinical metrics, active medications schedule, critical alert banners |
| `/patient/profile` | **Health Profile** | Personal demographics, physiological metrics (BMI auto-calc, weight, height, blood group) |
| `/patient/medical-history` | **Medical Conditions** | Full CRUD condition tracker with WHO ICD-10 tagging and search/filter |
| `/patient/allergies` | **Allergy Registry** | Severity-coded hypersensitivity tracking (`Low`, `Moderate`, `Severe`, `Anaphylactic`) |
| `/patient/medications` | **My Medications** | RxNorm standardized compound inventory with dosage, frequency, and 1-click safety check |
| `/patient/prescriptions` | **Prescription Archives** | Ingested prescription documents with raw OCR and cleaned text transcript viewer |
| `/patient/analysis` | **Medication Safety Hub** | Multi-mode ingestion: 5-Stage OCR Upload, Manual RxNorm Search, Package Scanner |
| `/patient/analysis/results` | **Safety Matrix Results** | Combinatorial pairwise DDI matrix, ICD-10 contraindications, Drug Avoidance |
| `/patient/reports` | **Safety Dossier Viewer** | Dual-recipient report (Patient Plain English vs Clinician Dossier) with 1-click Print / PDF |
| `/patient/history` | **Interaction History** | Longitudinal audit trail of previous analysis sessions with re-run & comparison |
| `/patient/settings` | **Account & Security** | Password change, critical SMS/email notification toggles, active sessions |

---

### 🟩 C. Doctor / Clinician Workspace — `/doctor/*`

| Route | Page | Description |
|:------|:-----|:------------|
| `/doctor/dashboard` | **Clinician Workbench** | Triage metrics, assigned patient roster, critical contraindication flags, pending reviews |
| `/doctor/patients` | **Patient Directory** | Searchable patient registry with condition badges, blood groups, and quick triage actions |
| `/doctor/patients/[id]` | **Patient 360 Record** | Complete longitudinal patient record (diagnoses, allergies, meds, rxs) with 1-click Clinical Review |
| `/doctor/analysis` | **Multi-Drug Workbench** | Advanced regimen simulator, custom compound combinations, instant DDI matrix calculation |
| `/doctor/reports` | **Clinical Dossiers** | Archive of physician-grade pharmacotherapy reports with evidence citations |
| `/doctor/alerts` | **Critical Alerts Inbox** | High-priority clinical feed for dangerous drug interactions across all rostered patients |
| `/doctor/audit-logs` | **Regulatory Audit Logs** | Immutable HIPAA/CDSCO decision audit logs with evidence guidelines (FDA, CHEST, CPIC) |
| `/doctor/settings` | **Physician Credentials** | Medical registration/licensure numbers, primary specialty, and hospital affiliations |

---

### 🟥 D. Admin Workspace — `/admin/*`

| Route | Page | Description |
|:------|:-----|:------------|
| `/admin/system-health` | **System Diagnostics & Telemetry** | Live telemetry checks for Database, Neural OCR Engine, RxNorm Service, and AI Reasoning Layer |
| `/admin/patients` | **Admin Patient Registry** | Registered patient directory with condition badges, blood group indicators, and inspection |
| `/admin/audit-logs` | **Regulatory Audit Ledger** | System-wide security traces, user activity logs, and evidence baseline citations |
| `/admin/clinical-engine` | **Clinical Knowledge Catalog** | Catalog of pharmaceutical compounds, pairwise DDI rules, and ICD-10 disease contraindications |
| `/admin/reports` | **System Reports Archive** | Central archive of synthesized patient summaries and physician pharmacological dossiers |
| `/admin/settings` | **System Preferences** | OCR confidence thresholds, RxNorm sync frequency, AI Safety Gatekeeper strictness, audit retention |

---

## 📐 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    MedSafe AI — 9-Stage Pipeline                │
└─────────────────────────────────────────────────────────────────┘

  Patient / Doctor
        │
        ▼
  [1] Authentication ── Credentials / DigiLocker ABHA National ID
        │
        ▼
  [2] Role-Based Dashboard ── Patient Portal │ Doctor Workbench │ Admin
        │
        ▼
  [3] Prescription Ingestion ── OCR Upload │ Manual Search │ Scanner
        │
        ▼
  [4] 5-Stage Image Pre-Processing
         ├── Bilateral Noise Removal
         ├── Skew Detection & Correction
         ├── Otsu Contrast Binarization
         ├── Morphological Cleaning
         └── Region-of-Interest Cropping
        │
        ▼
  [5] Neural OCR Engine ── Tesseract.js v5 + Medical NER Tokenizer
        │
        ▼
  [6] RxNorm Normalization ── Brand → Generic │ RxCUI │ ATC Class
        │
        ▼
  [7] Patient Context Fusion ── ICD-10 Diagnoses │ Weight │ Allergies
        │
        ▼
  [8] Clinical Safety Matrix ─────────────────────────────────────
         ├── Drug-Drug Interaction Matrix  (LOW │ MODERATE │ MAJOR)
         ├── ICD-10 Disease Contraindications
         ├── Black-Box Drug Warnings (FDA)
         └── Drug Avoidance Engine + Safer Alternatives
        │
        ▼
  [9] AI Reasoning Core ── Anti-Hallucination Safety Gatekeeper
        │
        ▼
  Dual Recipient Output Synthesis
   ├── 👤 Patient Report  (Plain English, Schedule, Food, Alerts)
   └── 🩺 Doctor Dossier  (Mechanisms, ICD-10, Monitoring, Citations)
        │
        ▼
  Immutable Interaction History & Regulatory Audit Log
```

---

## 🗄️ Database Schema

### Baseline CSV Schema (`data-1786955744718.csv`)

| # | Table | Key Columns |
|:--|:------|:------------|
| 1 | `drugs` | `drug_id`, `rxcui`, `brand_name`, `generic_name`, `dosage_form`, `strength`, `route`, `atc_code` |
| 2 | `drug_interactions` | `interaction_id`, `drug1_id`, `drug2_id`, `severity`, `description`, `recommendation`, `evidence_source` |
| 3 | `contraindications` | `contraindication_id`, `drug_id`, `medical_condition_id`, `severity`, `description` |
| 4 | `medical_conditions` | `medical_condition_id`, `icd10_code`, `condition_name`, `category` |
| 5 | `patient_conditions` | `patient_condition_id`, `patient_id`, `medical_condition_id`, `severity`, `status` |
| 6 | `patients` | `patient_id`, `full_name`, `age`, `gender`, `weight`, `height`, `blood_group`, `email` |
| 7 | `prescriptions` | `prescription_id`, `patient_id`, `doctor_name`, `hospital_name`, `ocr_text` |
| 8 | `prescription_drugs` | `prescription_drug_id`, `prescription_id`, `drug_id`, `dosage`, `frequency`, `duration` |
| 9 | `drug_warnings` | `warning_id`, `drug_id`, `warning_type`, `warning_text`, `source` |
| 10 | `drug_classes` | `class_id`, `drug_id`, `class_name`, `class_type` |

### Application Extension Tables

| # | Table | Purpose |
|:--|:------|:--------|
| 11 | `users` | Role-based authentication (`patient`, `doctor`, `admin`) |
| 12 | `doctor_profiles` | Physician credentials, licensing numbers, hospital affiliations |
| 13 | `patient_allergies` | Allergy cross-screening records with severity tiers |
| 14 | `analysis_sessions` | Stored clinical safety evaluations with risk scores |
| 15 | `patient_reports` | Dual patient/doctor synthesized report content |
| 16 | `audit_logs` | Immutable HIPAA-compliant decision and evidence trail |
| 17 | `notifications` | Real-time severity alert delivery registry |

---

## ⚖️ Medical & Regulatory Disclaimer

> [!IMPORTANT]
> **Clinical Decision Support Notice**
>
> MedSafe AI is an automated medication safety and clinical decision-support platform designed to assist healthcare professionals and empower patients with medication safety intelligence. **It is not a substitute for clinical judgment, professional medical diagnosis, or personalized medical advice from a qualified healthcare provider.**
>
> - Do not discontinue or alter medications without consulting your prescribing physician or licensed pharmacist.
> - All clinical outputs are intended as decision-support aids, not clinical directives.
> - Evidence citations reference FDA, WHO, CHEST, and CPIC clinical guidelines.

---

<div align="center">

**Built for SVNIT WIE Hackathon 2026** 🏆

*Empowering patients. Augmenting physicians. Preventing harm.*

[![GitHub](https://img.shields.io/badge/GitHub-hetarthbhatt07%2FWIE--SVNIT--FN-181717?style=flat-square&logo=github)](https://github.com/hetarthbhatt07/WIE-SVNIT-FN)

</div>