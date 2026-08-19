# 🏥 MedSafe AI — Final Project Walkthrough
### Team VEDIORA | LDRP Institute of Technology and Research | IEEE WIE ILS SVNIT 2026

---

## 🧭 What Was Built

A **31-route, production-grade full-stack web application** for AI-powered medication safety, prescription analysis, drug-drug interaction detection, and dual-recipient clinical reporting — built with Next.js 14, TypeScript, Tailwind CSS (Paperweight Tactile UI), Tesseract.js OCR, and a reactive local clinical data store.

**Build Status**: ✅ `npm run build`

---

## 🗺️ Application Map

```
http://localhost:3000
│
├── /                           Landing Page (Architecture + DDI demo sandbox)
├── /login                      Sign In (Patient / Doctor / Admin)
├── /signup                     Create Account
├── /forgot-password            Password Reset
│
├── /patient/*  ────────────── 11 Patient Workspace Pages
│   ├── /dashboard              Clinical overview + alerts
│   ├── /profile                Demographics + physiological metrics
│   ├── /medical-history        ICD-10 condition tracker (CRUD)
│   ├── /allergies              Hypersensitivity registry
│   ├── /medications            Active RxNorm medication inventory
│   ├── /prescriptions          OCR prescription archive
│   ├── /analysis               ⭐ Safety Hub (OCR / Manual / Scanner)
│   ├── /analysis/results       ⭐ Pairwise DDI matrix + Drug Avoidance
│   ├── /reports                ⭐ Dual-recipient dossier + Print/PDF
│   ├── /history                Longitudinal analysis audit trail
│   └── /settings               Account security & notifications
│
├── /doctor/*  ─────────────── 8 Doctor Workspace Pages
│   ├── /dashboard              Triage metrics + patient roster
│   ├── /patients               Searchable patient directory
│   ├── /patients/[id]          ⭐ Patient 360 Record (full longitudinal view)
│   ├── /analysis               Multi-drug regimen workbench
│   ├── /reports                Clinical pharmacotherapy dossier archive
│   ├── /alerts                 Critical DDI alerts inbox
│   ├── /audit-logs             HIPAA/CDSCO immutable decision logs
│   └── /settings               Physician credentials & licensure
│
└── /admin/*  ──────────────── 6 Admin Workspace Pages
    ├── /system-health          ⭐ Live engine telemetry (DB, OCR, RxNorm, AI)
    ├── /patients               Admin patient clinical registry
    ├── /audit-logs             System-wide security audit ledger
    ├── /clinical-engine        Drug / DDI / Contraindication knowledge catalog
    ├── /reports                System-wide reports archive
    └── /settings               OCR thresholds, AI strictness, audit retention
```

---

## 🔑 Demo Credentials

| Portal | URL | Email | Password |
|:-------|:----|:------|:---------|
| 🟦 **Patient** | `/patient/dashboard` | `patient@medsafe.in` | `start123` |
| 🟩 **Doctor** | `/doctor/dashboard` | `doctor@medsafe.in` | `start123` |
| 🟥 **Admin** | `/admin/system-health` | `admin@medsafe.in` | `start123` |

> **Demo patient pre-loaded with**: Warfarin + Ibuprofen (**Major DDI**), Peptic Ulcer Disease (ICD-10: K27), and 2 ingested OCR prescriptions — every feature demonstrates immediately.
>
> ```bash
> npm run dev
> # Open http://localhost:3000
> # Login: patient@medsafe.in / start123
> ```

---

## ⭐ Key Demo Flow (For Judges)

### 1. Login as Patient → `/patient/analysis`
- Upload a prescription image **or** type a drug name (e.g. `Warfarin`, `Ibuprofen`)
- Watch the 5-stage OCR pipeline process the image in real time
- Hit **Analyze Safety** — observe pairwise DDI matrix generation

### 2. View Results → `/patient/analysis/results`
- See the **Major DDI** flagged between Warfarin ↔ Ibuprofen
- See the **ICD-10 Contraindication** (Ibuprofen ↔ Peptic Ulcer Disease K27)
- See the **Drug Avoidance recommendation** (Acetaminophen as safer alternative)

### 3. Read Report → `/patient/reports`
- Toggle between **Patient Friendly** (plain English) and **Doctor Clinical Dossier** views
- Click **Print / Save as PDF** — fully functional native export

### 4. Switch to Doctor View (top navbar → Doctor View)
- → `/doctor/patients` — browse the patient directory
- → `/doctor/patients/1` — open full **Patient 360 Record** with all history
- → `/doctor/analysis` — compose a custom multi-drug regimen

### 5. Switch to Admin View (top navbar → Admin View)
- → `/admin/system-health` — live telemetry cards for all 6 system engines
- → `/admin/clinical-engine` — browse the Drugs / DDIs / Contraindications catalog
- → `/admin/settings` — configure OCR confidence, RxNorm sync, AI strictness

---

## 🛠️ Technical Architecture

| Stage | Engine | Status |
|:------|:-------|:------:|
| **[1] Authentication** | Role-based login (Patient / Doctor / Admin) | ✅ |
| **[2] Prescription Ingestion** | OCR Upload, Manual Search, Package Scanner | ✅ |
| **[3] 5-Stage OCR Preprocessing** | Denoising → Deskewing → Otsu → NER tokenization | ✅ |
| **[4] RxNorm Normalization** | Brand→Generic, RxCUI codes, ATC classification | ✅ |
| **[5] Patient Context Fusion** | ICD-10 diagnoses + allergies + weight/age | ✅ |
| **[6] DDI Safety Matrix** | Pairwise combinatorial evaluation (Low/Moderate/Major) | ✅ |
| **[7] Drug Avoidance Engine** | Hazard detection + safer alternative recommendations | ✅ |
| **[8] AI Safety Gatekeeper** | Anti-hallucination context builder + dual-report synthesizer | ✅ |
| **[9] Audit Ledger** | Immutable HIPAA/CDSCO evidence trail with citations | ✅ |

---

## 📦 Files & Structure

```
NF/
├── app/
│   ├── page.tsx                     Landing Page
│   ├── login/page.tsx               Sign In
│   ├── signup/page.tsx              Create Account
│   ├── forgot-password/page.tsx     Password Reset
│   ├── patient/
│   │   ├── layout.tsx               Patient workspace shell
│   │   ├── dashboard/page.tsx
│   │   ├── profile/page.tsx
│   │   ├── medical-history/page.tsx
│   │   ├── allergies/page.tsx
│   │   ├── medications/page.tsx
│   │   ├── prescriptions/page.tsx
│   │   ├── analysis/page.tsx        ⭐ OCR / Safety Hub
│   │   ├── analysis/results/page.tsx⭐ DDI Matrix
│   │   ├── reports/page.tsx         ⭐ Dual Report + Print
│   │   ├── history/page.tsx
│   │   └── settings/page.tsx
│   ├── doctor/
│   │   ├── layout.tsx               Doctor workspace shell
│   │   ├── dashboard/page.tsx
│   │   ├── patients/page.tsx
│   │   ├── patients/[id]/page.tsx   ⭐ Patient 360 Record
│   │   ├── analysis/page.tsx
│   │   ├── reports/page.tsx
│   │   ├── alerts/page.tsx
│   │   ├── audit-logs/page.tsx
│   │   └── settings/page.tsx
│   └── admin/
│       ├── layout.tsx               Admin workspace shell
│       ├── system-health/page.tsx   ⭐ Live Telemetry
│       ├── patients/page.tsx
│       ├── audit-logs/page.tsx
│       ├── clinical-engine/page.tsx
│       ├── reports/page.tsx
│       └── settings/page.tsx
├── components/
│   ├── navigation/
│   │   ├── Navbar.tsx               Role switcher (Patient/Doctor/Admin)
│   │   └── Sidebar.tsx              Role-aware navigation drawer
│   └── ui/
│       ├── BrandLogo.tsx            MS initials badge
│       ├── TactileButton.tsx        Bevel button with pressed physics
│       ├── BentoCard.tsx            Modular dashboard card
│       ├── RecessedInput.tsx        Inset input field
│       └── TactileBadge.tsx         Severity/status chip
├── lib/
│   ├── store/appStore.ts            Reactive local data store + seed data
│   ├── data/clinicalKnowledge.ts   25+ drugs, 12+ DDI rules, ICD-10 contraindications
│   └── ocr/                         Tesseract.js pipeline
└── types/database.ts               Full TypeScript schema types
```

---