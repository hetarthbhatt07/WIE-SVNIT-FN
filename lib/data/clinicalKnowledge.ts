// lib/data/clinicalKnowledge.ts - Comprehensive Clinical Knowledge Base matching the CSV Schema

import { Drug, DrugInteraction, MedicalCondition, Contraindication, DrugWarning, DrugClass, Patient, PatientCondition } from '@/types/database';

export const CLINICAL_DRUGS: Drug[] = [
  {
    drug_id: 1,
    rxcui: "11289",
    brand_name: "Coumadin",
    generic_name: "Warfarin",
    ingredient_name: "Warfarin Sodium",
    dosage_form: "Oral Tablet",
    strength: "5 mg",
    route: "Oral",
    atc_code: "B01AA03",
    manufacturer: "Bristol-Myers Squibb",
    source: "RxNorm / OpenFDA",
    updated_at: "2026-01-15"
  },
  {
    drug_id: 2,
    rxcui: "5640",
    brand_name: "Advil",
    generic_name: "Ibuprofen",
    ingredient_name: "Ibuprofen",
    dosage_form: "Oral Tablet",
    strength: "400 mg",
    route: "Oral",
    atc_code: "M01AE01",
    manufacturer: "Pfizer / Haleon",
    source: "RxNorm / DailyMed",
    updated_at: "2026-01-15"
  },
  {
    drug_id: 3,
    rxcui: "161",
    brand_name: "Bayer Aspirin",
    generic_name: "Aspirin",
    ingredient_name: "Acetylsalicylic Acid",
    dosage_form: "Oral Tablet",
    strength: "81 mg",
    route: "Oral",
    atc_code: "B01AC06",
    manufacturer: "Bayer Healthcare",
    source: "RxNorm / OpenFDA",
    updated_at: "2026-01-15"
  },
  {
    drug_id: 4,
    rxcui: "6809",
    brand_name: "Glucophage",
    generic_name: "Metformin",
    ingredient_name: "Metformin Hydrochloride",
    dosage_form: "Oral Extended Release Tablet",
    strength: "500 mg",
    route: "Oral",
    atc_code: "A10BA02",
    manufacturer: "Merck KGaA",
    source: "RxNorm / DailyMed",
    updated_at: "2026-01-15"
  },
  {
    drug_id: 5,
    rxcui: "29046",
    brand_name: "Prinivil",
    generic_name: "Lisinopril",
    ingredient_name: "Lisinopril Anhydrous",
    dosage_form: "Oral Tablet",
    strength: "10 mg",
    route: "Oral",
    atc_code: "C09AA03",
    manufacturer: "AstraZeneca",
    source: "RxNorm / OpenFDA",
    updated_at: "2026-01-15"
  },
  {
    drug_id: 6,
    rxcui: "83367",
    brand_name: "Lipitor",
    generic_name: "Atorvastatin",
    ingredient_name: "Atorvastatin Calcium",
    dosage_form: "Oral Tablet",
    strength: "20 mg",
    route: "Oral",
    atc_code: "C10AA05",
    manufacturer: "Pfizer",
    source: "RxNorm / DailyMed",
    updated_at: "2026-01-15"
  },
  {
    drug_id: 7,
    rxcui: "36567",
    brand_name: "Plavix",
    generic_name: "Clopidogrel",
    ingredient_name: "Clopidogrel Bisulfate",
    dosage_form: "Oral Film Coated Tablet",
    strength: "75 mg",
    route: "Oral",
    atc_code: "B01AC04",
    manufacturer: "Sanofi",
    source: "RxNorm / OpenFDA",
    updated_at: "2026-01-15"
  },
  {
    drug_id: 8,
    rxcui: "7646",
    brand_name: "Prilosec",
    generic_name: "Omeprazole",
    ingredient_name: "Omeprazole Magnesium",
    dosage_form: "Oral Delayed Release Capsule",
    strength: "20 mg",
    route: "Oral",
    atc_code: "A02BC01",
    manufacturer: "Procter & Gamble",
    source: "RxNorm / DailyMed",
    updated_at: "2026-01-15"
  },
  {
    drug_id: 9,
    rxcui: "3407",
    brand_name: "Lanoxin",
    generic_name: "Digoxin",
    ingredient_name: "Digoxin",
    dosage_form: "Oral Tablet",
    strength: "0.25 mg",
    route: "Oral",
    atc_code: "C01AA05",
    manufacturer: "GlaxoSmithKline",
    source: "RxNorm / OpenFDA",
    updated_at: "2026-01-15"
  },
  {
    drug_id: 10,
    rxcui: "703",
    brand_name: "Cordarone",
    generic_name: "Amiodarone",
    ingredient_name: "Amiodarone Hydrochloride",
    dosage_form: "Oral Tablet",
    strength: "200 mg",
    route: "Oral",
    atc_code: "C01BD01",
    manufacturer: "Pfizer / Wyeth",
    source: "RxNorm / DailyMed",
    updated_at: "2026-01-15"
  },
  {
    drug_id: 11,
    rxcui: "4917",
    brand_name: "Prozac",
    generic_name: "Fluoxetine",
    ingredient_name: "Fluoxetine Hydrochloride",
    dosage_form: "Oral Capsule",
    strength: "20 mg",
    route: "Oral",
    atc_code: "N06AB03",
    manufacturer: "Eli Lilly",
    source: "RxNorm / OpenFDA",
    updated_at: "2026-01-15"
  },
  {
    drug_id: 12,
    rxcui: "10689",
    brand_name: "Ultram",
    generic_name: "Tramadol",
    ingredient_name: "Tramadol Hydrochloride",
    dosage_form: "Oral Tablet",
    strength: "50 mg",
    route: "Oral",
    atc_code: "N02AX02",
    manufacturer: "Janssen Pharmaceuticals",
    source: "RxNorm / DailyMed",
    updated_at: "2026-01-15"
  },
  {
    drug_id: 13,
    rxcui: "166445",
    brand_name: "Crestor",
    generic_name: "Rosuvastatin",
    ingredient_name: "Rosuvastatin Calcium",
    dosage_form: "Oral Tablet",
    strength: "10 mg",
    route: "Oral",
    atc_code: "C10AA07",
    manufacturer: "AstraZeneca",
    source: "RxNorm / DailyMed",
    updated_at: "2026-01-15"
  },
  {
    drug_id: 14,
    rxcui: "18631",
    brand_name: "Zithromax",
    generic_name: "Azithromycin",
    ingredient_name: "Azithromycin Monohydrate",
    dosage_form: "Oral Tablet",
    strength: "250 mg",
    route: "Oral",
    atc_code: "J01FA10",
    manufacturer: "Pfizer",
    source: "RxNorm / OpenFDA",
    updated_at: "2026-01-15"
  },
  {
    drug_id: 15,
    rxcui: "2551",
    brand_name: "Cipro",
    generic_name: "Ciprofloxacin",
    ingredient_name: "Ciprofloxacin Hydrochloride",
    dosage_form: "Oral Film Coated Tablet",
    strength: "500 mg",
    route: "Oral",
    atc_code: "J01MA02",
    manufacturer: "Bayer",
    source: "RxNorm / DailyMed",
    updated_at: "2026-01-15"
  },
  {
    drug_id: 16,
    rxcui: "38404",
    brand_name: "Diflucan",
    generic_name: "Fluconazole",
    ingredient_name: "Fluconazole",
    dosage_form: "Oral Tablet",
    strength: "150 mg",
    route: "Oral",
    atc_code: "J02AC01",
    manufacturer: "Pfizer",
    source: "RxNorm / OpenFDA",
    updated_at: "2026-01-15"
  },
  {
    drug_id: 17,
    rxcui: "6918",
    brand_name: "Lopressor",
    generic_name: "Metoprolol",
    ingredient_name: "Metoprolol Tartrate",
    dosage_form: "Oral Tablet",
    strength: "50 mg",
    route: "Oral",
    atc_code: "C07AB02",
    manufacturer: "Novartis",
    source: "RxNorm / DailyMed",
    updated_at: "2026-01-15"
  },
  {
    drug_id: 18,
    rxcui: "17767",
    brand_name: "Norvasc",
    generic_name: "Amlodipine",
    ingredient_name: "Amlodipine Besylate",
    dosage_form: "Oral Tablet",
    strength: "5 mg",
    route: "Oral",
    atc_code: "C08CA01",
    manufacturer: "Pfizer",
    source: "RxNorm / OpenFDA",
    updated_at: "2026-01-15"
  },
  {
    drug_id: 19,
    rxcui: "6585",
    brand_name: "Lasix",
    generic_name: "Furosemide",
    ingredient_name: "Furosemide",
    dosage_form: "Oral Tablet",
    strength: "40 mg",
    route: "Oral",
    atc_code: "C03CA01",
    manufacturer: "Sanofi-Aventis",
    source: "RxNorm / DailyMed",
    updated_at: "2026-01-15"
  },
  {
    drug_id: 20,
    rxcui: "9997",
    brand_name: "Aldactone",
    generic_name: "Spironolactone",
    ingredient_name: "Spironolactone",
    dosage_form: "Oral Tablet",
    strength: "25 mg",
    route: "Oral",
    atc_code: "C03DA01",
    manufacturer: "Pfizer",
    source: "RxNorm / OpenFDA",
    updated_at: "2026-01-15"
  },
  {
    drug_id: 21,
    rxcui: "723",
    brand_name: "Amoxil",
    generic_name: "Amoxicillin",
    ingredient_name: "Amoxicillin Trihydrate",
    dosage_form: "Oral Capsule",
    strength: "500 mg",
    route: "Oral",
    atc_code: "J01CA04",
    manufacturer: "GlaxoSmithKline",
    source: "RxNorm / DailyMed",
    updated_at: "2026-01-15"
  },
  {
    drug_id: 22,
    rxcui: "10582",
    brand_name: "Synthroid",
    generic_name: "Levothyroxine",
    ingredient_name: "Levothyroxine Sodium",
    dosage_form: "Oral Tablet",
    strength: "50 mcg",
    route: "Oral",
    atc_code: "H03AA01",
    manufacturer: "AbbVie",
    source: "RxNorm / OpenFDA",
    updated_at: "2026-01-15"
  },
  {
    drug_id: 23,
    rxcui: "8640",
    brand_name: "Deltasone",
    generic_name: "Prednisone",
    ingredient_name: "Prednisone",
    dosage_form: "Oral Tablet",
    strength: "10 mg",
    route: "Oral",
    atc_code: "H02AB07",
    manufacturer: "Pharmacia & Upjohn",
    source: "RxNorm / DailyMed",
    updated_at: "2026-01-15"
  },
  {
    drug_id: 24,
    rxcui: "36437",
    brand_name: "Zoloft",
    generic_name: "Sertraline",
    ingredient_name: "Sertraline Hydrochloride",
    dosage_form: "Oral Film Coated Tablet",
    strength: "50 mg",
    route: "Oral",
    atc_code: "N06AB06",
    manufacturer: "Pfizer",
    source: "RxNorm / OpenFDA",
    updated_at: "2026-01-15"
  },
  {
    drug_id: 25,
    rxcui: "161",
    brand_name: "Tylenol",
    generic_name: "Acetaminophen",
    ingredient_name: "Acetaminophen (Paracetamol)",
    dosage_form: "Oral Tablet",
    strength: "500 mg",
    route: "Oral",
    atc_code: "N02BE01",
    manufacturer: "Kenvue / Johnson & Johnson",
    source: "RxNorm / DailyMed",
    updated_at: "2026-01-15"
  }
];

export const CLINICAL_DRUG_INTERACTIONS: DrugInteraction[] = [
  {
    interaction_id: 1,
    drug1_id: 1, // Warfarin
    drug2_id: 2, // Ibuprofen
    severity: "Major",
    interaction_type: "Pharmacodynamic Synergism",
    description: "Concurrent use of Warfarin and Ibuprofen dramatically increases gastrointestinal and systemic bleeding risks due to platelet aggregation inhibition combined with anticoagulant effect.",
    clinical_effect: "Substantial elevation of INR and severe gastrointestinal hemorrhage risk.",
    recommendation: "Avoid concurrent use. Use Acetaminophen (Paracetamol) for mild-to-moderate analgesia instead of NSAIDs. If NSAID is mandatory, monitor INR closely and co-prescribe a gastroprotective agent (PPI).",
    evidence_source: "FDA Drug Safety Communication / DailyMed Black Box / CHEST Guidelines",
    reference_url: "https://www.fda.gov/drugs/drug-safety-and-availability",
    updated_at: "2026-01-10"
  },
  {
    interaction_id: 2,
    drug1_id: 1, // Warfarin
    drug2_id: 3, // Aspirin
    severity: "Major",
    interaction_type: "Dual Antiplatelet/Anticoagulant Risk",
    description: "Combination of Vitamin K antagonist (Warfarin) and COX inhibitor (Aspirin) significantly heightens major bleeding incidence including intracerebral and GI hemorrhage.",
    clinical_effect: "Additive hypoprothrombinemic response and irreversible platelet COX-1 inhibition.",
    recommendation: "Strictly avoid unless part of validated dual/triple therapy for mechanical heart valves or acute coronary syndrome under strict cardiology oversight.",
    evidence_source: "American College of Cardiology (ACC) / AHA Guidelines",
    reference_url: "https://www.acc.org/guidelines",
    updated_at: "2026-01-10"
  },
  {
    interaction_id: 3,
    drug1_id: 7, // Clopidogrel
    drug2_id: 8, // Omeprazole
    severity: "Major",
    interaction_type: "CYP2C19 Enzymatic Inhibition",
    description: "Omeprazole competitively inhibits CYP2C19 hepatic enzyme responsible for converting Clopidogrel prodrug into its active antiplatelet metabolite, reducing antiplatelet efficacy.",
    clinical_effect: "Increased risk of major adverse cardiovascular events (MACE), stent thrombosis, and recurrent myocardial infarction.",
    recommendation: "Avoid Omeprazole. Switch to a PPI with lower CYP2C19 inhibitory affinity such as Pantoprazole or Rabeprazole, or use an H2-receptor antagonist (Famotidine).",
    evidence_source: "FDA MedWatch Safety Alert / CPIC Pharmacogenomic Guidelines",
    reference_url: "https://cpicpgx.org/guidelines",
    updated_at: "2026-01-10"
  },
  {
    interaction_id: 4,
    drug1_id: 9, // Digoxin
    drug2_id: 10, // Amiodarone
    severity: "Severe",
    interaction_type: "P-Glycoprotein & Renal Clearance Blockade",
    description: "Amiodarone inhibits P-glycoprotein efflux transport and renal tubular secretion of Digoxin, causing serum Digoxin concentrations to increase by 70% to 100%.",
    clinical_effect: "Life-threatening digitalis toxicity including AV block, ventricular tachycardia, junctional rhythms, and fatal arrhythmias.",
    recommendation: "Reduce Digoxin dosage by 50% immediately when initiating Amiodarone. Closely monitor serum digoxin levels and serial ECGs.",
    evidence_source: "AHA/ESC Heart Failure Clinical Compendium",
    reference_url: "https://www.ahajournals.org",
    updated_at: "2026-01-10"
  },
  {
    interaction_id: 5,
    drug1_id: 11, // Fluoxetine
    drug2_id: 12, // Tramadol
    severity: "Severe",
    interaction_type: "Serotonergic Additive Neurotoxicity",
    description: "Co-administration increases intrasynaptic serotonin levels and inhibits Tramadol metabolic activation via CYP2D6, inducing Serotonin Syndrome and lowering seizure threshold.",
    clinical_effect: "Serotonin Syndrome (hyperthermia, autonomic instability, clonus, delirium, neuromuscular hyperactivity) and seizures.",
    recommendation: "Avoid co-prescribing. Consider alternative non-serotonergic analgesics (e.g. Paracetamol, topical NSAIDs) or alternative antidepressant.",
    evidence_source: "World Federation of Societies of Biological Psychiatry (WFSBP)",
    reference_url: "https://www.wfsbp.org",
    updated_at: "2026-01-10"
  },
  {
    interaction_id: 6,
    drug1_id: 5, // Lisinopril
    drug2_id: 20, // Spironolactone
    severity: "Moderate",
    interaction_type: "Potassium Retention Additive Effect",
    description: "Both ACE inhibitors (Lisinopril) and potassium-sparing aldosterone antagonists (Spironolactone) reduce renal excretion of potassium.",
    clinical_effect: "Risk of severe hyperkalemia leading to cardiac conduction anomalies and arrhythmias.",
    recommendation: "Monitor serum potassium and creatinine within 1-2 weeks of initiation. Instruct patient to avoid potassium supplements and high-potassium salt substitutes.",
    evidence_source: "KDIGO Clinical Practice Guideline for Acute Kidney Injury",
    reference_url: "https://kdigo.org",
    updated_at: "2026-01-10"
  },
  {
    interaction_id: 7,
    drug1_id: 6, // Atorvastatin
    drug2_id: 16, // Fluconazole
    severity: "Moderate",
    interaction_type: "CYP3A4 Inhibition",
    description: "Fluconazole inhibits CYP3A4-mediated clearance of Atorvastatin, elevating systemic statin exposure and statin-induced myopathy risk.",
    clinical_effect: "Severe myalgia, elevated creatine kinase (CK), and potential rhabdomyolysis.",
    recommendation: "Temporarily withhold Atorvastatin during short-course Fluconazole therapy, or switch to Rosuvastatin / Pravastatin (minimal CYP3A4 metabolism).",
    evidence_source: "National Lipid Association (NLA) Statin Safety Report",
    reference_url: "https://www.lipid.org",
    updated_at: "2026-01-10"
  },
  {
    interaction_id: 8,
    drug1_id: 14, // Azithromycin
    drug2_id: 10, // Amiodarone
    severity: "Severe",
    interaction_type: "Additive QTc Prolongation",
    description: "Macrolide antibiotics (Azithromycin) combined with Class III antiarrhythmics (Amiodarone) cause profound synergistic ventricular repolarization delay.",
    clinical_effect: "Prolonged QTc interval, Torsades de Pointes (TdP), ventricular fibrillation, and sudden cardiac death.",
    recommendation: "Absolute contraindication for concurrent unmonitored use. Select non-QTc prolonging antimicrobial (e.g. Amoxicillin, Doxycycline).",
    evidence_source: "CredibleMeds QTdrugs Comprehensive Database",
    reference_url: "https://www.crediblemeds.org",
    updated_at: "2026-01-10"
  },
  {
    interaction_id: 9,
    drug1_id: 15, // Ciprofloxacin
    drug2_id: 23, // Prednisone
    severity: "Major",
    interaction_type: "Tendon Rupture Synergism",
    description: "Fluoroquinolones (Ciprofloxacin) co-administered with systemic corticosteroids (Prednisone) exponentially increases tendinitis and tendon rupture incidence.",
    clinical_effect: "Achilles tendon rupture, severe arthropathy, especially in patients over 60 years old.",
    recommendation: "Avoid co-administration. Use alternative antibiotic class. Discontinue immediately if patient reports tendon pain, swelling, or stiffness.",
    evidence_source: "FDA Black Box Warning for Fluoroquinolones",
    reference_url: "https://www.fda.gov/drugs/information-drug-class/fluoroquinolones",
    updated_at: "2026-01-10"
  },
  {
    interaction_id: 10,
    drug1_id: 4, // Metformin
    drug2_id: 19, // Furosemide
    severity: "Moderate",
    interaction_type: "Fluid Volume Depletion & Lactic Acidosis Risk",
    description: "Furosemide can cause acute volume depletion, increasing peak Metformin blood concentrations and decreasing renal clearance.",
    clinical_effect: "Dehydration, impaired glomerular filtration, and elevated risk of Metformin-Associated Lactic Acidosis (MALA).",
    recommendation: "Ensure adequate hydration. Monitor estimated GFR (eGFR) and renal panel periodically. Adjust dosages if eGFR drops below 45 mL/min/1.73m².",
    evidence_source: "American Diabetes Association (ADA) Standards of Care",
    reference_url: "https://diabetesjournals.org/care",
    updated_at: "2026-01-10"
  },
  {
    interaction_id: 11,
    drug1_id: 2, // Ibuprofen
    drug2_id: 5, // Lisinopril
    severity: "Moderate",
    interaction_type: "Renal Prostaglandin Inhibition vs Vasodilation",
    description: "NSAIDs reduce renal prostaglandin synthesis causing afferent arteriolar vasoconstriction while Lisinopril inhibits efferent arteriolar vasoconstriction, degrading renal hemodynamics and attenuating antihypertensive efficacy.",
    clinical_effect: "Blunted blood pressure control, acute kidney injury (triple whammy effect if combined with diuretics), and fluid retention.",
    recommendation: "Limit NSAID duration to under 5 days. Monitor blood pressure and serum creatinine. Use Acetaminophen for routine analgesia.",
    evidence_source: "Joint National Committee on Hypertension (JNC-8) / KDIGO",
    reference_url: "https://kdigo.org",
    updated_at: "2026-01-10"
  },
  {
    interaction_id: 12,
    drug1_id: 22, // Levothyroxine
    drug2_id: 8, // Omeprazole
    severity: "Moderate",
    interaction_type: "Gastric Acidity Dependent Absorption Interference",
    description: "Levothyroxine requires an acidic gastric pH for optimal dissolution and gastrointestinal absorption. PPIs decrease gastric acid, impairing levothyroxine uptake.",
    clinical_effect: "Sub-therapeutic thyroid hormone levels, elevated serum TSH, worsening hypothyroidism symptoms.",
    recommendation: "Separate administration times by at least 4 hours. Take Levothyroxine 30-60 minutes before breakfast with a full glass of water. Monitor TSH 6-8 weeks after starting Omeprazole.",
    evidence_source: "American Thyroid Association (ATA) Guidelines",
    reference_url: "https://www.thyroid.org",
    updated_at: "2026-01-10"
  }
];

export const CLINICAL_MEDICAL_CONDITIONS: MedicalCondition[] = [
  {
    medical_condition_id: 1,
    icd10_code: "I10",
    condition_name: "Essential (Primary) Hypertension",
    category: "Cardiovascular",
    description: "High blood pressure not attributed to any secondary medical cause, requiring careful vascular risk management.",
    created_at: "2026-01-01",
    updated_at: "2026-01-01"
  },
  {
    medical_condition_id: 2,
    icd10_code: "E11.9",
    condition_name: "Type 2 Diabetes Mellitus",
    category: "Endocrine & Metabolic",
    description: "Metabolic disorder characterized by insulin resistance and relative insulin deficiency with glycemic variability.",
    created_at: "2026-01-01",
    updated_at: "2026-01-01"
  },
  {
    medical_condition_id: 3,
    icd10_code: "K25.9",
    condition_name: "Peptic Ulcer Disease (Active / History)",
    category: "Gastrointestinal",
    description: "Ulceration of stomach or duodenal mucosa prone to bleeding, exacerbation with ulcerogenic medications.",
    created_at: "2026-01-01",
    updated_at: "2026-01-01"
  },
  {
    medical_condition_id: 4,
    icd10_code: "N18.3",
    condition_name: "Chronic Kidney Disease, Stage 3 (Moderate)",
    category: "Renal & Urological",
    description: "Moderate reduction in glomerular filtration rate (eGFR 30-59 mL/min/1.73m²) necessitating dose adjustment.",
    created_at: "2026-01-01",
    updated_at: "2026-01-01"
  },
  {
    medical_condition_id: 5,
    icd10_code: "I48.91",
    condition_name: "Atrial Fibrillation",
    category: "Cardiovascular",
    description: "Supraventricular tachyarrhythmia with uncoordinated atrial activation and elevated thromboembolism risk.",
    created_at: "2026-01-01",
    updated_at: "2026-01-01"
  },
  {
    medical_condition_id: 6,
    icd10_code: "J45.909",
    condition_name: "Bronchial Asthma",
    category: "Respiratory",
    description: "Chronic airway inflammatory condition with bronchospasm hyperresponsiveness to triggers including NSAIDs and non-selective beta-blockers.",
    created_at: "2026-01-01",
    updated_at: "2026-01-01"
  },
  {
    medical_condition_id: 7,
    icd10_code: "I50.9",
    condition_name: "Congestive Heart Failure",
    category: "Cardiovascular",
    description: "Impaired ventricular filling or ejection fraction leading to systemic venous congestion and fluid retention.",
    created_at: "2026-01-01",
    updated_at: "2026-01-01"
  },
  {
    medical_condition_id: 8,
    icd10_code: "K76.9",
    condition_name: "Hepatic Impairment / Cirrhosis",
    category: "Hepatic",
    description: "Chronic liver damage leading to impaired CYP450 metabolism and clearance of hepatically cleared drugs.",
    created_at: "2026-01-01",
    updated_at: "2026-01-01"
  },
  {
    medical_condition_id: 9,
    icd10_code: "E03.9",
    condition_name: "Hypothyroidism",
    category: "Endocrine & Metabolic",
    description: "Deficiency in thyroid hormone production causing decreased metabolic rate and altered drug clearance.",
    created_at: "2026-01-01",
    updated_at: "2026-01-01"
  }
];

export const CLINICAL_CONTRAINDICATIONS: Contraindication[] = [
  {
    contraindication_id: 1,
    drug_id: 2, // Ibuprofen
    medical_condition_id: 3, // Peptic Ulcer Disease
    severity: "Absolute Contraindication",
    description: "NSAIDs inhibit gastric protective prostaglandins (PGE2, PGI2), inducing mucosal damage, recurrent ulceration, perforation, and massive GI hemorrhage.",
    source: "FDA NSAID Boxed Warning / American Gastroenterological Association (AGA)",
    reference_url: "https://gastro.org",
    created_at: "2026-01-05"
  },
  {
    contraindication_id: 2,
    drug_id: 2, // Ibuprofen
    medical_condition_id: 4, // Chronic Kidney Disease
    severity: "Severe",
    description: "Inhibition of renal prostaglandins reduces renal blood flow and causes acute renal decompensation and electrolyte retention in CKD patients.",
    source: "KDIGO Clinical Practice Guideline for CKD",
    reference_url: "https://kdigo.org",
    created_at: "2026-01-05"
  },
  {
    contraindication_id: 3,
    drug_id: 4, // Metformin
    medical_condition_id: 4, // Chronic Kidney Disease (severe)
    severity: "Severe",
    description: "Metformin accumulation in renal insufficiency significantly amplifies the risk of life-threatening lactic acidosis. Contraindicated if eGFR < 30 mL/min/1.73m².",
    source: "FDA Drug Safety Communication / ADA Guidelines",
    reference_url: "https://www.fda.gov",
    created_at: "2026-01-05"
  },
  {
    contraindication_id: 4,
    drug_id: 17, // Metoprolol
    medical_condition_id: 6, // Bronchial Asthma
    severity: "Moderate",
    description: "Beta-blockade, even with beta-1 selective agents at higher doses, can antagonize beta-2 bronchodilator receptors and trigger acute bronchospasm.",
    source: "Global Initiative for Asthma (GINA)",
    reference_url: "https://ginasthma.org",
    created_at: "2026-01-05"
  },
  {
    contraindication_id: 5,
    drug_id: 1, // Warfarin
    medical_condition_id: 3, // Peptic Ulcer Disease
    severity: "Severe",
    description: "Active ulceration combined with systemic anticoagulation creates extreme vulnerability to non-compressible life-threatening gastrointestinal bleed.",
    source: "CHEST Antithrombotic Guidelines",
    reference_url: "https://journal.chestnet.org",
    created_at: "2026-01-05"
  },
  {
    contraindication_id: 6,
    drug_id: 25, // Acetaminophen
    medical_condition_id: 8, // Hepatic Impairment
    severity: "Moderate",
    description: "Impaired hepatic glutathione stores reduce NAPQI detoxification, lowering threshold for acetaminophen-induced hepatotoxicity. Daily dose must not exceed 2g/day.",
    source: "AASLD Guidelines for Liver Disease",
    reference_url: "https://www.aasld.org",
    created_at: "2026-01-05"
  }
];

export const CLINICAL_DRUG_WARNINGS: DrugWarning[] = [
  {
    warning_id: 1,
    drug_id: 1, // Warfarin
    warning_type: "Black Box Warning",
    warning_text: "Bleeding Risk: Warfarin can cause major or fatal bleeding. Regular INR monitoring is essential. Drugs, dietary changes, and other factors affect INR.",
    source: "FDA Prescribing Information"
  },
  {
    warning_id: 2,
    drug_id: 2, // Ibuprofen
    warning_type: "Black Box Warning",
    warning_text: "Cardiovascular & Gastrointestinal Risk: NSAIDs cause an increased risk of serious cardiovascular thrombotic events, myocardial infarction, stroke, and serious GI bleeding/perforation.",
    source: "FDA Prescribing Information"
  },
  {
    warning_id: 3,
    drug_id: 15, // Ciprofloxacin
    warning_type: "Black Box Warning",
    warning_text: "Tendinitis, Tendon Rupture, Peripheral Neuropathy, and CNS Effects. Avoid in patients with myasthenia gravis.",
    source: "FDA Prescribing Information"
  },
  {
    warning_id: 4,
    drug_id: 4, // Metformin
    warning_type: "Black Box Warning",
    warning_text: "Lactic Acidosis: Rare but serious condition that can occur due to metformin accumulation during acute illness, hypoperfusion, or renal impairment.",
    source: "FDA Prescribing Information"
  },
  {
    warning_id: 5,
    drug_id: 11, // Fluoxetine
    warning_type: "Black Box Warning",
    warning_text: "Suicidality: Antidepressants increased the risk of suicidal thoughts and behaviors in pediatric and young adult patients during initial treatment.",
    source: "FDA Prescribing Information"
  }
];

export const CLINICAL_DRUG_CLASSES: DrugClass[] = [
  { class_id: 1, drug_id: 1, class_name: "Anticoagulant (Vitamin K Antagonist)", class_type: "Therapeutic" },
  { class_id: 2, drug_id: 2, class_name: "Non-Steroidal Anti-Inflammatory Drug (NSAID)", class_type: "Chemical / Pharmacologic" },
  { class_id: 3, drug_id: 3, class_name: "Antiplatelet / Salicylate", class_type: "Therapeutic" },
  { class_id: 4, drug_id: 4, class_name: "Biguanide Antidiabetic Agent", class_type: "Therapeutic" },
  { class_id: 5, drug_id: 5, class_name: "Angiotensin-Converting Enzyme (ACE) Inhibitor", class_type: "Cardiovascular" },
  { class_id: 6, drug_id: 6, class_name: "HMG-CoA Reductase Inhibitor (Statin)", class_type: "Lipid-lowering" },
  { class_id: 7, drug_id: 7, class_name: "P2Y12 Platelet Inhibitor", class_type: "Antiplatelet" },
  { class_id: 8, drug_id: 8, class_name: "Proton Pump Inhibitor (PPI)", class_type: "Gastrointestinal" },
  { class_id: 9, drug_id: 9, class_name: "Cardiac Glycoside", class_type: "Inotropic" },
  { class_id: 10, drug_id: 10, class_name: "Class III Antiarrhythmic", class_type: "Electrophysiological" },
  { class_id: 11, drug_id: 11, class_name: "Selective Serotonin Reuptake Inhibitor (SSRI)", class_type: "Psychiatric" },
  { class_id: 12, drug_id: 12, class_name: "Synthetic Opioid Analgesic / SNRI Activity", class_type: "Analgesic" },
  { class_id: 13, drug_id: 14, class_name: "Macrolide Antibiotic", class_type: "Antimicrobial" },
  { class_id: 14, drug_id: 15, class_name: "Fluoroquinolone Antibacterial", class_type: "Antimicrobial" },
  { class_id: 15, drug_id: 16, class_name: "Triazole Antifungal", class_type: "Antimycotic" },
  { class_id: 16, drug_id: 17, class_name: "Beta-1 Adrenergic Receptor Blocker", class_type: "Cardiovascular" },
  { class_id: 17, drug_id: 18, class_name: "Dihydropyridine Calcium Channel Blocker", class_type: "Cardiovascular" },
  { class_id: 18, drug_id: 19, class_name: "Loop Diuretic", class_type: "Renal / Diuretic" },
  { class_id: 19, drug_id: 20, class_name: "Aldosterone Receptor Antagonist (K-Sparing Diuretic)", class_type: "Cardiovascular / Renal" },
  { class_id: 20, drug_id: 21, class_name: "Aminopenicillin Antibiotic", class_type: "Antimicrobial" },
  { class_id: 21, drug_id: 22, class_name: "Synthetic Thyroid Hormone (T4)", class_type: "Endocrine" },
  { class_id: 22, drug_id: 23, class_name: "Glucocorticoid Corticosteroid", class_type: "Anti-inflammatory / Immunosuppressant" },
  { class_id: 23, drug_id: 24, class_name: "Selective Serotonin Reuptake Inhibitor (SSRI)", class_type: "Psychiatric" },
  { class_id: 24, drug_id: 25, class_name: "Analgesic / Antipyretic (Non-Opioid, Non-NSAID)", class_type: "Analgesic" }
];

// Pre-seeded patient profiles for live demo and testing
export const INITIAL_DEMO_PATIENTS: Patient[] = [
  {
    patient_id: 101,
    full_name: "Ananya Sharma",
    age: 64,
    gender: "Female",
    date_of_birth: "1962-04-12",
    weight: 68.5,
    height: 162.0,
    blood_group: "O+",
    created_at: "2026-01-02 10:30:00",
    email: "patient@medsafe.in",
    phone_number: "+91 98980 12345",
    password_hash: "start123"
  },
  {
    patient_id: 102,
    full_name: "Rajesh Kumar",
    age: 48,
    gender: "Male",
    date_of_birth: "1978-09-24",
    weight: 84.0,
    height: 178.0,
    blood_group: "A+",
    created_at: "2026-01-12 14:15:00",
    email: "rajesh.k@example.in",
    phone_number: "+91 98251 98765",
    password_hash: "start123"
  },
  {
    patient_id: 103,
    full_name: "Priya Sharma",
    age: 56,
    gender: "Female",
    date_of_birth: "1970-11-05",
    weight: 61.2,
    height: 157.0,
    blood_group: "B+",
    created_at: "2026-01-20 09:45:00",
    email: "priya.sharma@example.in",
    phone_number: "+91 97123 45678",
    password_hash: "start123"
  }
];

export const INITIAL_PATIENT_CONDITIONS: PatientCondition[] = [
  {
    patient_condition_id: 1,
    patient_id: 101,
    medical_condition_id: 1, // Hypertension
    severity: "Moderate",
    status: "Active",
    diagnosed_on: "2018-05-14",
    notes: "Maintained on Lisinopril 10mg. Blood pressure monitored bi-weekly.",
    created_at: "2026-01-02"
  },
  {
    patient_condition_id: 2,
    patient_id: 101,
    medical_condition_id: 3, // Peptic Ulcer Disease
    severity: "Severe",
    status: "Active",
    diagnosed_on: "2022-08-20",
    notes: "Documented history of bleeding duodenal ulcer. Avoid NSAIDs.",
    created_at: "2026-01-02"
  },
  {
    patient_condition_id: 3,
    patient_id: 101,
    medical_condition_id: 5, // Atrial Fibrillation
    severity: "Moderate",
    status: "Active",
    diagnosed_on: "2023-01-10",
    notes: "Requires Warfarin anticoagulation with therapeutic INR target 2.0-3.0.",
    created_at: "2026-01-02"
  },
  {
    patient_condition_id: 4,
    patient_id: 102,
    medical_condition_id: 2, // Type 2 Diabetes
    severity: "Moderate",
    status: "Active",
    diagnosed_on: "2020-03-11",
    notes: "HbA1c 7.2%. Controlled with diet and Metformin 500mg BD.",
    created_at: "2026-01-12"
  },
  {
    patient_condition_id: 5,
    patient_id: 102,
    medical_condition_id: 4, // CKD Stage 3
    severity: "Mild",
    status: "Active",
    diagnosed_on: "2024-06-18",
    notes: "Baseline eGFR 48 mL/min/1.73m². Requires renal dose monitoring.",
    created_at: "2026-01-12"
  }
];
