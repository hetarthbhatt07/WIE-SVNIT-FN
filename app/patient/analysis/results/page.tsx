'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, AlertTriangle, AlertCircle, CheckCircle2, Pill, 
  HeartPulse, FileText, ArrowRight, Printer, Download, Sparkles, 
  ExternalLink, Layers, RefreshCw, ChevronDown, ChevronUp, Stethoscope
} from 'lucide-react';
import { AppStateService } from '@/lib/store/appStore';
import { AnalysisSession } from '@/types/database';
import { BentoCard } from '@/components/ui/BentoCard';
import { TactileButton } from '@/components/ui/TactileButton';
import { TactileBadge } from '@/components/ui/TactileBadge';

export default function AnalysisResultsPage() {
  const router = useRouter();
  const [session, setSession] = useState<AnalysisSession | null>(null);
  const [expandedInteraction, setExpandedInteraction] = useState<string | null>(null);

  useEffect(() => {
    AppStateService.initSeedData();
    const sessions = AppStateService.getAnalysisSessions();
    if (sessions.length > 0) {
      setSession(sessions[0]);
    } else {
      // Default fallback demo session if navigated directly
      const mockSession: AnalysisSession = {
        id: 'analysis-demo-1',
        patient_id: 101,
        patient_name: 'Eleanor Vance',
        created_by_role: 'patient',
        created_by_name: 'Eleanor Vance',
        overall_risk: 'MAJOR / SEVERE',
        risk_score: 92,
        created_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
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
            recommendation: 'Avoid concurrent use. Use Acetaminophen (Paracetamol) for mild-to-moderate analgesia instead of NSAIDs.',
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
            description: 'NSAIDs inhibit gastric protective prostaglandins (PGE2, PGI2), inducing mucosal damage, recurrent ulceration, and massive GI hemorrhage.',
            source: 'FDA NSAID Boxed Warning / American Gastroenterological Association',
            reference_url: 'https://gastro.org'
          }
        ],
        warnings: [
          {
            id: 'warn-1',
            drug_name: 'Warfarin',
            warning_type: 'Black Box Warning',
            warning_text: 'Bleeding Risk: Warfarin can cause major or fatal bleeding. Regular INR monitoring is essential.',
            source: 'FDA Prescribing Information'
          }
        ],
        avoidance_list: [
          {
            id: 'avoid-1',
            drug_name: 'Ibuprofen (NSAID)',
            reason: 'Severe synergistic bleeding risk with Warfarin and documented Peptic Ulcer Disease.',
            severity: 'Critical',
            recommended_action: 'Avoid completely',
            safe_alternatives: ['Acetaminophen (Paracetamol)', 'Topical Analgesics'],
            monitoring_guidance: 'Do not take OTC NSAIDs like Advil, Motrin, or Aleve without direct physician authorization.'
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
          disclaimer: 'This automated safety report is an AI-assisted decision-support summary and is not a substitute for professional clinical medical advice.'
        },
        doctor_report: {
          clinical_summary: 'Comprehensive drug safety evaluation completed for patient Eleanor Vance, Age: 64 (Female), Weight: 68.5kg. Regimen includes 3 active compounds. Regimen Risk Tier: MAJOR / SEVERE.',
          pharmacological_mechanism: '[MAJOR] Warfarin ↔ Ibuprofen: Concurrent use dramatically increases gastrointestinal and systemic bleeding risks due to platelet aggregation inhibition combined with anticoagulant effect.',
          risk_level: 'MAJOR / SEVERE',
          icd10_contraindications: ['[K25.9] Peptic Ulcer Disease (Active / History) with Ibuprofen: NSAIDs inhibit gastric protective prostaglandins (PGE2, PGI2), inducing mucosal damage.'],
          monitoring_parameters: [
            'Baseline & bi-weekly Complete Blood Count (CBC) and Platelet Count',
            'Serial Prothrombin Time (PT) / International Normalized Ratio (INR) target 2.0 - 3.0',
            'Periodic stool guaiac / fecal occult blood test for occult GI hemorrhage'
          ],
          evidence_citations: [
            { source: 'FDA Drug Safety Communication / DailyMed Black Box / CHEST Guidelines', url: 'https://www.fda.gov/drugs/drug-safety-and-availability', annotation: 'Avoid concurrent use. Use Acetaminophen for mild-to-moderate analgesia.' }
          ],
          prescribing_recommendations: [
            'DISCONTINUE / REPLACE: Ibuprofen (NSAID). Recommended alternative: Acetaminophen (Paracetamol). Action: Avoid completely.',
            'Co-prescribe gastroprotective agent (PPI) if antiplatelet/anticoagulant therapy is mandatory.'
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
      setSession(mockSession);
    }
  }, []);

  if (!session) {
    return (
      <div className="p-12 text-center flex flex-col items-center gap-3">
        <RefreshCw className="w-8 h-8 text-[#2563EB] animate-spin" />
        <p className="text-xs font-mono text-slate-500">Retrieving safety analysis results...</p>
      </div>
    );
  }

  const isMajor = session.overall_risk === 'MAJOR / SEVERE';
  const isModerate = session.overall_risk === 'MODERATE';

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-sans">
              Medication Safety Analysis
            </h1>
            <TactileBadge
              variant={isMajor ? 'red' : isModerate ? 'amber' : 'green'}
              size="md"
              dot
            >
              Overall Risk: {session.overall_risk}
            </TactileBadge>
          </div>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Patient: <b className="text-slate-900">{session.patient_name}</b> • Date: {session.created_at} • Evaluated Compounds: {session.medications.length}
          </p>
        </div>

        {/* Report Launch Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Link href="/patient/reports">
            <TactileButton
              variant="primary"
              size="md"
              leftIcon={<FileText className="w-4 h-4" />}
            >
              View Full Safety Report
            </TactileButton>
          </Link>
          <Link href="/patient/analysis">
            <TactileButton variant="secondary" size="md">
              Re-Run Check
            </TactileButton>
          </Link>
        </div>
      </div>

      {/* Critical Alert Ribbon if Major Risk */}
      {isMajor && (
        <div className="p-4 rounded-xl bg-red-50 border-2 border-red-200 text-red-900 shadow-sm flex items-start gap-3.5">
          <div className="p-2 rounded-lg bg-red-100 text-red-700 shrink-0 mt-0.5">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-red-800">
              Immediate Clinical Alert: High-Risk Combination Detected
            </h3>
            <p className="text-xs text-red-700 font-mono mt-1 leading-relaxed">
              {session.avoidance_list.length > 0
                ? `Avoid taking ${session.avoidance_list.map(a => a.drug_name).join(', ')}. ${session.avoidance_list[0].reason}`
                : 'Severe interaction identified between active compounds. Consult physician prior to administration.'}
            </p>
          </div>
        </div>
      )}

      {/* 3 Summary Risk Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <span className="text-xs text-slate-500 font-bold uppercase">Evaluated Drugs</span>
          <p className="text-2xl font-bold text-slate-900 mt-2">{session.medications.length}</p>
          <span className="text-[10px] text-blue-600 font-semibold">RxNorm Normalized</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <span className="text-xs text-slate-500 font-bold uppercase">Drug-Drug Interactions</span>
          <p className="text-2xl font-bold text-slate-900 mt-2">{session.interactions.length}</p>
          <span className="text-[10px] text-red-600 font-semibold">
            {session.interactions.filter(i => i.severity === 'Major' || i.severity === 'Severe').length} Major / Severe
          </span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <span className="text-xs text-slate-500 font-bold uppercase">Contraindications & Warnings</span>
          <p className="text-2xl font-bold text-slate-900 mt-2">
            {session.contraindications.length + session.warnings.length}
          </p>
          <span className="text-[10px] text-amber-700 font-semibold">ICD-10 Cross-Matched</span>
        </div>
      </div>

      {/* SECTION 1: DRUG AVOIDANCE & SAFE ALTERNATIVES (Section 30 of prompt) */}
      {session.avoidance_list.length > 0 && (
        <BentoCard
          title="Drug Avoidance & Safe Alternative Suggestions"
          subtitle="Clinical engine recommendations to prevent adverse drug events"
          icon={<ShieldCheck className="w-5 h-5 text-red-600" />}
          badge={<TactileBadge variant="red" size="sm">Action Required</TactileBadge>}
        >
          <div className="flex flex-col gap-3 pt-2">
            {session.avoidance_list.map(avoid => (
              <div
                key={avoid.id}
                className="p-4 rounded-xl bg-red-50/70 border border-red-200 text-xs font-mono flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm font-sans">
                    Flagged Compound: <span className="text-red-700">{avoid.drug_name}</span>
                  </span>
                  <TactileBadge variant="red" size="sm">{avoid.recommended_action}</TactileBadge>
                </div>

                <p className="text-slate-700 leading-relaxed">
                  <b className="text-slate-900">Clinical Mechanism:</b> {avoid.reason}
                </p>

                {avoid.safe_alternatives && (
                  <div className="p-3 rounded-lg bg-white border border-emerald-200/90 text-emerald-900 flex items-center justify-between">
                    <span>
                      <b className="text-emerald-800">Safer Clinical Alternatives:</b> {avoid.safe_alternatives.join(', ')}
                    </span>
                    <TactileBadge variant="green" size="sm">Evidence Supported</TactileBadge>
                  </div>
                )}

                {avoid.monitoring_guidance && (
                  <p className="text-slate-500 text-[11px] italic">
                    Physician Guidance: {avoid.monitoring_guidance}
                  </p>
                )}
              </div>
            ))}
          </div>
        </BentoCard>
      )}

      {/* SECTION 2: DRUG-DRUG INTERACTIONS MATRIX (Section 25 of prompt) */}
      <BentoCard
        title={`Drug-Drug Interactions Matrix (${session.interactions.length})`}
        subtitle="Pairwise pharmacokinetic and pharmacodynamic synergistic risk evaluation"
        icon={<Layers className="w-5 h-5 text-blue-600" />}
      >
        <div className="flex flex-col gap-3 pt-2">
          {session.interactions.length === 0 ? (
            <div className="p-6 text-center text-xs font-mono text-slate-500 bg-slate-50 rounded-lg">
              No significant drug-drug interactions detected between evaluated compounds.
            </div>
          ) : (
            session.interactions.map(int => {
              const isExpanded = expandedInteraction === int.id;
              return (
                <div
                  key={int.id}
                  className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col gap-2 font-mono text-xs hover:border-slate-300 transition-all"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 font-sans font-bold text-slate-900 text-sm">
                      <span>{int.drug1_name}</span>
                      <span className="text-slate-400">↔</span>
                      <span>{int.drug2_name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <TactileBadge
                        variant={int.severity === 'Major' || int.severity === 'Severe' ? 'red' : 'amber'}
                        size="sm"
                        dot
                      >
                        {int.severity} Interaction
                      </TactileBadge>

                      <button
                        onClick={() => setExpandedInteraction(isExpanded ? null : int.id)}
                        className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <p className="text-slate-700 leading-relaxed font-sans">
                    {int.description}
                  </p>

                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex flex-col gap-1 text-[11px]">
                    <p><b className="text-slate-900">Clinical Effect:</b> {int.clinical_effect}</p>
                    <p><b className="text-slate-900">Recommendation:</b> {int.recommendation}</p>
                  </div>

                  {isExpanded && (
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span>Evidence: <b className="text-slate-700">{int.evidence_source}</b></span>
                      {int.reference_url && (
                        <a
                          href={int.reference_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#2563EB] hover:underline inline-flex items-center gap-1"
                        >
                          FDA Citation <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </BentoCard>

      {/* SECTION 3: DRUG-DISEASE CONTRAINDICATIONS (Section 27 of prompt) */}
      {session.contraindications.length > 0 && (
        <BentoCard
          title={`Disease Contraindications (${session.contraindications.length})`}
          subtitle="Cross-matched with patient's active medical diagnoses"
          icon={<HeartPulse className="w-5 h-5 text-teal-600" />}
        >
          <div className="flex flex-col gap-3 pt-2">
            {session.contraindications.map(contra => (
              <div
                key={contra.id}
                className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 text-xs font-mono flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm font-sans">
                      {contra.drug_name} with {contra.condition_name}
                    </span>
                    <TactileBadge variant="teal" size="sm">{contra.icd10_code}</TactileBadge>
                  </div>
                  <TactileBadge variant="red" size="sm">{contra.severity}</TactileBadge>
                </div>

                <p className="text-slate-700 leading-relaxed font-sans">
                  {contra.description}
                </p>

                <span className="text-[10px] text-slate-500">
                  Source: {contra.source}
                </span>
              </div>
            ))}
          </div>
        </BentoCard>
      )}

      {/* SECTION 4: AI REASONING GATEKEEPER AUDIT (Section 35 & 37 of prompt) */}
      <BentoCard
        title="AI Reasoning Core & Decision Layer"
        subtitle="Anti-hallucination validation and safety gatekeeper audit trail"
        icon={<Sparkles className="w-5 h-5 text-[#2563EB]" />}
        badge={
          <TactileBadge variant="green" size="sm">
            Gatekeeper: Safe To Report
          </TactileBadge>
        }
      >
        <div className="flex flex-col gap-3 pt-2 font-mono text-xs">
          <div className="p-3 rounded-lg bg-slate-900 text-slate-100 flex flex-col gap-1.5 shadow-inner">
            <span className="text-slate-400 uppercase text-[10px] font-bold">Execution Plan & Reasoning Chain:</span>
            {session.ai_reasoning?.planning_steps?.map((step, idx) => (
              <p key={idx} className="leading-relaxed text-slate-300">
                • {step}
              </p>
            ))}
          </div>

          <div className="flex items-center justify-between text-slate-500 pt-1 text-[11px]">
            <span>Retrieved Structured Evidence Citations: {session.ai_reasoning?.evidence_retrieved_count}</span>
            <span>Deterministic Clinical Rules Engine</span>
          </div>
        </div>
      </BentoCard>

      {/* Footer Navigation CTA */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-slate-900 text-base font-sans">Ready to View Recipient Reports?</h4>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Access plain-English patient instructions or full clinician pharmacological dossiers.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link href="/patient/reports">
            <TactileButton variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Open Printable Report Viewer
            </TactileButton>
          </Link>
        </div>
      </div>

    </div>
  );
}
