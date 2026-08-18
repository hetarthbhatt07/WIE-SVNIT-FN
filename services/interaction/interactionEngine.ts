// services/interaction/interactionEngine.ts - Clinical Drug Interaction & Avoidance Engine

import { 
  AnalyzedMedication, DetectedInteraction, DetectedContraindication, 
  DetectedWarning, DrugAvoidanceItem, PatientCondition 
} from '@/types/database';
import { 
  CLINICAL_DRUG_INTERACTIONS, CLINICAL_CONTRAINDICATIONS, 
  CLINICAL_DRUG_WARNINGS, CLINICAL_DRUGS 
} from '@/lib/data/clinicalKnowledge';

export interface InteractionEngineResult {
  interactions: DetectedInteraction[];
  contraindications: DetectedContraindication[];
  warnings: DetectedWarning[];
  avoidanceList: DrugAvoidanceItem[];
  overallRisk: 'LOW / NONE' | 'MODERATE' | 'MAJOR / SEVERE';
  riskScore: number; // 0 - 100
  summary: string;
}

export class InteractionEngine {
  /**
   * Evaluate complete medication safety for a list of medications and patient conditions
   */
  public static evaluateSafety(
    medications: AnalyzedMedication[],
    patientConditions: PatientCondition[] = []
  ): InteractionEngineResult {
    const interactions: DetectedInteraction[] = [];
    const contraindications: DetectedContraindication[] = [];
    const warnings: DetectedWarning[] = [];
    const avoidanceList: DrugAvoidanceItem[] = [];

    // Resolve drug IDs
    const resolvedMeds = medications.map(m => {
      if (m.drug_id) return { ...m, resolvedId: m.drug_id };
      const found = CLINICAL_DRUGS.find(d => 
        d.generic_name.toLowerCase() === m.generic_name.toLowerCase() ||
        d.brand_name.toLowerCase() === m.brand_name.toLowerCase()
      );
      return { ...m, resolvedId: found ? found.drug_id : undefined };
    });

    // 1. DRUG-DRUG INTERACTIONS (Pairwise Matrix Comparison)
    for (let i = 0; i < resolvedMeds.length; i++) {
      for (let j = i + 1; j < resolvedMeds.length; j++) {
        const medA = resolvedMeds[i];
        const medB = resolvedMeds[j];

        if (!medA.resolvedId || !medB.resolvedId) continue;

        const match = CLINICAL_DRUG_INTERACTIONS.find(rule => 
          (rule.drug1_id === medA.resolvedId && rule.drug2_id === medB.resolvedId) ||
          (rule.drug1_id === medB.resolvedId && rule.drug2_id === medA.resolvedId)
        );

        if (match) {
          interactions.push({
            id: `int-${match.interaction_id}-${i}-${j}`,
            drug1_name: medA.brand_name || medA.generic_name,
            drug2_name: medB.brand_name || medB.generic_name,
            drug1_rxcui: medA.rxcui,
            drug2_rxcui: medB.rxcui,
            severity: match.severity,
            interaction_type: 'Drug-Drug',
            description: match.description,
            clinical_effect: match.clinical_effect,
            recommendation: match.recommendation,
            evidence_source: match.evidence_source,
            reference_url: match.reference_url
          });

          // Check if avoidance item should be generated
          if (match.severity === 'Major' || match.severity === 'Severe') {
            const isWarfarinIbu = (medA.generic_name.toLowerCase().includes('warfarin') && medB.generic_name.toLowerCase().includes('ibuprofen')) ||
                                  (medB.generic_name.toLowerCase().includes('warfarin') && medA.generic_name.toLowerCase().includes('ibuprofen'));
            
            avoidanceList.push({
              id: `avoid-${avoidanceList.length + 1}`,
              drug_name: isWarfarinIbu ? 'Ibuprofen (NSAID)' : medB.generic_name,
              reason: `Severe synergistic risk with ${medA.generic_name}: ${match.clinical_effect}`,
              severity: match.severity === 'Severe' ? 'Critical' : 'Severe',
              recommended_action: isWarfarinIbu ? 'Avoid completely' : 'Consider Alternative',
              safe_alternatives: isWarfarinIbu ? ['Acetaminophen (Paracetamol)', 'Topical Analgesics'] : ['Consult physician for safer therapeutic class'],
              monitoring_guidance: match.recommendation
            });
          }
        }
      }
    }

    // 2. DRUG-DISEASE CONTRAINDICATIONS
    for (const med of resolvedMeds) {
      if (!med.resolvedId) continue;

      for (const pCond of patientConditions) {
        const contraMatch = CLINICAL_CONTRAINDICATIONS.find(c => 
          c.drug_id === med.resolvedId && c.medical_condition_id === pCond.medical_condition_id
        );

        if (contraMatch) {
          contraindications.push({
            id: `contra-${contraMatch.contraindication_id}-${pCond.patient_condition_id}`,
            drug_name: med.brand_name || med.generic_name,
            condition_name: pCond.medical_condition?.condition_name || 'Diagnosed Condition',
            icd10_code: pCond.medical_condition?.icd10_code || 'ICD-10',
            severity: contraMatch.severity === 'Absolute Contraindication' ? 'Absolute Contraindication' : 'Severe',
            description: contraMatch.description,
            source: contraMatch.source,
            reference_url: contraMatch.reference_url
          });

          // Add to avoidance list if not already present
          if (!avoidanceList.some(a => a.drug_name.toLowerCase() === med.generic_name.toLowerCase())) {
            avoidanceList.push({
              id: `avoid-contra-${avoidanceList.length + 1}`,
              drug_name: med.generic_name,
              reason: `Contraindicated with active patient condition: ${pCond.medical_condition?.condition_name}`,
              severity: contraMatch.severity === 'Absolute Contraindication' ? 'Critical' : 'Severe',
              recommended_action: 'Avoid completely',
              safe_alternatives: med.generic_name.toLowerCase().includes('ibuprofen') ? ['Acetaminophen (Paracetamol)'] : ['Review therapeutic alternative with specialist'],
              monitoring_guidance: contraMatch.description
            });
          }
        }
      }
    }

    // 3. DRUG WARNINGS & BLACK BOX ALERTS
    for (const med of resolvedMeds) {
      if (!med.resolvedId) continue;
      const warnMatches = CLINICAL_DRUG_WARNINGS.filter(w => w.drug_id === med.resolvedId);
      for (const w of warnMatches) {
        warnings.push({
          id: `warn-${w.warning_id}`,
          drug_name: med.brand_name || med.generic_name,
          warning_type: w.warning_type,
          warning_text: w.warning_text,
          source: w.source
        });
      }
    }

    // 4. RISK SCORE & SEVERITY CLASSIFICATION
    let score = 5; // Baseline low risk
    const hasSevereInteraction = interactions.some(i => i.severity === 'Severe');
    const hasMajorInteraction = interactions.some(i => i.severity === 'Major');
    const hasModerateInteraction = interactions.some(i => i.severity === 'Moderate');
    const hasSevereContra = contraindications.some(c => c.severity === 'Absolute Contraindication' || c.severity === 'Severe');

    if (hasSevereInteraction || hasSevereContra) {
      score = Math.max(score, 92);
    } else if (hasMajorInteraction) {
      score = Math.max(score, 78);
    } else if (hasModerateInteraction || contraindications.length > 0) {
      score = Math.max(score, 48);
    } else if (warnings.length > 0) {
      score = Math.max(score, 25);
    }

    let overallRisk: 'LOW / NONE' | 'MODERATE' | 'MAJOR / SEVERE' = 'LOW / NONE';
    let summary = 'No significant drug interactions or contraindications detected. Routine medication monitoring recommended.';

    if (score >= 70) {
      overallRisk = 'MAJOR / SEVERE';
      summary = `Critical safety alert: ${interactions.length} significant drug interaction(s) and ${contraindications.length} clinical contraindication(s) detected. Immediate physician review and drug avoidance required.`;
    } else if (score >= 40) {
      overallRisk = 'MODERATE';
      summary = `Moderate clinical caution: ${interactions.length} interaction(s) or clinical precautions detected. Dose adjustments or closer monitoring advised.`;
    }

    return {
      interactions,
      contraindications,
      warnings,
      avoidanceList,
      overallRisk,
      riskScore: score,
      summary
    };
  }
}
