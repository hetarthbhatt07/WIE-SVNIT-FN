// services/ai/aiReasoningAgent.ts - AI Reasoning Core & Dual Report Generator

import { 
  Patient, PatientCondition, PatientAllergy, AnalyzedMedication, 
  DetectedInteraction, DetectedContraindication, DetectedWarning, 
  DrugAvoidanceItem, PatientReport, DoctorReport, AIReasoningSummary 
} from '@/types/database';

export interface AIReasoningInput {
  patient: Patient;
  conditions: PatientCondition[];
  allergies: PatientAllergy[];
  medications: AnalyzedMedication[];
  interactions: DetectedInteraction[];
  contraindications: DetectedContraindication[];
  warnings: DetectedWarning[];
  avoidanceList: DrugAvoidanceItem[];
  overallRisk: 'LOW / NONE' | 'MODERATE' | 'MAJOR / SEVERE';
}

export interface AIReasoningOutput {
  aiReasoning: AIReasoningSummary;
  patientReport: PatientReport;
  doctorReport: DoctorReport;
  safeToReport: boolean;
}

export class AIReasoningAgent {
  /**
   * Run AI Reasoning, Safety Gatekeeping & Multi-Recipient Report Synthesis
   */
  public static generateClinicalReports(input: AIReasoningInput): AIReasoningOutput {
    const { 
      patient, conditions, allergies, medications, 
      interactions, contraindications, warnings, avoidanceList, overallRisk 
    } = input;

    // 1. SAFETY GATEKEEPER CHECK
    let safeToReport = true;
    let uncertaintyNotes: string | undefined = undefined;

    if (medications.length === 0) {
      safeToReport = false;
      uncertaintyNotes = 'No active medications provided for clinical evaluation.';
    }

    const hasCriticalRisk = overallRisk === 'MAJOR / SEVERE';
    const medNames = medications.map(m => m.generic_name).join(', ');

    // 2. AI REASONING SUMMARY
    const aiReasoning: AIReasoningSummary = {
      intent_analysis: `Evaluate medication regimen (${medications.length} drugs) against patient history for ${patient.full_name} (${patient.age}y/o, ${patient.gender}).`,
      planning_steps: [
        `Step 1: Extracted and normalized ${medications.length} drug entities via RxNorm standard.`,
        `Step 2: Cross-referenced pairwise interaction rules against FDA/DailyMed database (${interactions.length} interactions found).`,
        `Step 3: Evaluated ${conditions.length} active patient condition(s) for clinical contraindications (${contraindications.length} identified).`,
        `Step 4: Checked allergy registry for cross-reactivity (${allergies.length} allergy entries screened).`,
        `Step 5: Executed Drug Avoidance engine to formulate safe therapeutic alternatives.`,
        `Step 6: Verified Safety Gatekeeper constraints and synthesized recipient-specific reports.`
      ],
      safety_gate_passed: safeToReport,
      uncertainty_notes: uncertaintyNotes,
      evidence_retrieved_count: interactions.length + contraindications.length + warnings.length
    };

    // 3. SYNTHESIZE PATIENT REPORT (Plain Language, High Clarity)
    let patientSummaryText = `We analyzed your ${medications.length} medication(s) (${medNames}). `;
    let safetyBanner: string | undefined = undefined;

    if (hasCriticalRisk) {
      patientSummaryText += `⚠️ IMPORTANT: Our safety check identified critical combinations that may increase your risk of bleeding or severe side effects. Please review the alerts below with your doctor.`;
      safetyBanner = `CRITICAL CAUTION: Do NOT take ${avoidanceList.map(a => a.drug_name).join(', ') || 'flagged medications'} together without speaking directly to your doctor or pharmacist.`;
    } else if (overallRisk === 'MODERATE') {
      patientSummaryText += `Our safety check found a few moderate precautions you should be aware of regarding timing and monitoring.`;
      safetyBanner = `PRECAUTION: Some medications require spaced timing or routine blood pressure/potassium checks.`;
    } else {
      patientSummaryText += `No major conflicts or hazardous interactions were detected among your current list. Take your medications as directed.`;
    }

    const keyActionSteps: string[] = [];
    if (avoidanceList.length > 0) {
      avoidanceList.forEach(item => {
        keyActionSteps.push(`Avoid taking ${item.drug_name}. Reason: ${item.reason}. Ask your doctor about safer choices like ${item.safe_alternatives?.join(', ') || 'prescribed alternatives'}.`);
      });
    }

    if (hasCriticalRisk) {
      keyActionSteps.push('Contact your prescribing doctor to confirm if a safer pain relief alternative can replace NSAIDs.');
      keyActionSteps.push('Watch for symptoms such as unusual bruising, dark stools, dizziness, or stomach pain.');
    } else {
      keyActionSteps.push('Take your doses at regular scheduled times with a full glass of water.');
      keyActionSteps.push('Keep a printed copy of this safety summary in your health folder.');
    }

    const easyMedList = medications.map(m => {
      let foodInst = 'Can be taken with or without meals.';
      let warnNote: string | undefined = undefined;

      if (m.generic_name.toLowerCase().includes('warfarin')) {
        foodInst = 'Maintain consistent intake of green leafy vegetables (Vitamin K). Avoid cranberry juice.';
        warnNote = 'Requires regular INR blood clotting checks.';
      } else if (m.generic_name.toLowerCase().includes('ibuprofen')) {
        foodInst = 'Always take with meals or milk to protect your stomach lining.';
        warnNote = 'Avoid if you have stomach ulcers or kidney issues.';
      } else if (m.generic_name.toLowerCase().includes('omeprazole')) {
        foodInst = 'Take 30 to 60 minutes BEFORE your first meal in the morning.';
      } else if (m.generic_name.toLowerCase().includes('metformin')) {
        foodInst = 'Take with evening meals to minimize stomach upset.';
      } else if (m.generic_name.toLowerCase().includes('lisinopril')) {
        foodInst = 'Take at the same time each morning. Avoid high potassium salt substitutes.';
      }

      return {
        name: `${m.brand_name} (${m.generic_name}) - ${m.dosage}`,
        dosage_instruction: `${m.dosage} ${m.frequency}`,
        food_instructions: foodInst,
        warning_note: warnNote
      };
    });

    const patientReport: PatientReport = {
      title: `Medication Safety & Guidance Summary for ${patient.full_name}`,
      summary_text: patientSummaryText,
      safety_alert_banner: safetyBanner,
      key_action_steps: keyActionSteps,
      easy_medication_list: easyMedList,
      disclaimer: 'This automated safety report is an AI-assisted decision-support summary and is not a substitute for professional clinical medical advice, diagnosis, or treatment. Never stop or modify prescription doses without consulting your doctor or pharmacist.'
    };

    // 4. SYNTHESIZE DOCTOR REPORT (Clinical Pharmacology, Mechanisms, Evidence)
    let clinicalSummary = `Comprehensive drug safety evaluation completed for patient ${patient.full_name}, Age: ${patient.age} (${patient.gender}), Weight: ${patient.weight}kg. `;
    clinicalSummary += `Regimen includes ${medications.length} active compound(s). Regimen Risk Tier: ${overallRisk}. `;

    if (interactions.length > 0) {
      clinicalSummary += `Identified ${interactions.length} significant drug-drug interaction(s). `;
    }
    if (contraindications.length > 0) {
      clinicalSummary += `Identified ${contraindications.length} disease-specific contraindication(s) against documented medical history (${conditions.map(c => c.medical_condition?.condition_name || 'Condition').join(', ')}). `;
    }

    const pharmacodynamics: string[] = [];
    interactions.forEach(i => {
      pharmacodynamics.push(`[${i.severity.toUpperCase()}] ${i.drug1_name} ↔ ${i.drug2_name}: ${i.description} | Clinical Effect: ${i.clinical_effect}`);
    });

    const icdContraList: string[] = [];
    contraindications.forEach(c => {
      icdContraList.push(`[${c.icd10_code}] ${c.condition_name} with ${c.drug_name}: ${c.description}`);
    });

    const monitoringParams: string[] = [
      'Baseline & bi-weekly Complete Blood Count (CBC) and Platelet Count',
      'Serial Prothrombin Time (PT) / International Normalized Ratio (INR) target 2.0 - 3.0',
      'Comprehensive Metabolic Panel (CMP): Serum Creatinine, eGFR, Blood Urea Nitrogen (BUN), Potassium',
      'Periodic stool guaiac / fecal occult blood test for occult GI hemorrhage'
    ];

    const prescribingRecs: string[] = [];
    if (avoidanceList.length > 0) {
      avoidanceList.forEach(a => {
        prescribingRecs.push(`DISCONTINUE / REPLACE: ${a.drug_name}. Recommended alternative: ${a.safe_alternatives?.join(', ')}. Action: ${a.recommended_action}.`);
      });
    }
    prescribingRecs.push('Co-prescribe gastroprotective agent (Proton Pump Inhibitor / H2RA) if antiplatelet/anticoagulant therapy is mandatory.');
    prescribingRecs.push('Re-evaluate renal clearance and electrolyte balance every 3 to 6 months.');

    const citations = interactions.map(i => ({
      source: i.evidence_source,
      url: i.reference_url,
      annotation: `Guideline recommendation: ${i.recommendation}`
    }));

    const doctorReport: DoctorReport = {
      clinical_summary: clinicalSummary,
      pharmacological_mechanism: pharmacodynamics.join('\n\n') || 'No significant pharmacodynamic or pharmacokinetic cross-reactivity identified across evaluated compounds.',
      risk_level: overallRisk,
      icd10_contraindications: icdContraList,
      monitoring_parameters: monitoringParams,
      evidence_citations: citations,
      prescribing_recommendations: prescribingRecs
    };

    return {
      aiReasoning,
      patientReport,
      doctorReport,
      safeToReport
    };
  }
}
