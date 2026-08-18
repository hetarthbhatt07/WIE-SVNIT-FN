'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Stethoscope, Pill, Plus, Search, Sparkles, Trash2, 
  Layers, ArrowRight, CheckCircle2, ShieldAlert, HeartPulse 
} from 'lucide-react';
import { AppStateService } from '@/lib/store/appStore';
import { RxNormService } from '@/services/rxnorm/rxnormService';
import { InteractionEngine } from '@/services/interaction/interactionEngine';
import { AIReasoningAgent } from '@/services/ai/aiReasoningAgent';
import { AnalyzedMedication, AnalysisSession, Drug } from '@/types/database';
import { BentoCard } from '@/components/ui/BentoCard';
import { TactileButton } from '@/components/ui/TactileButton';
import { RecessedInput } from '@/components/ui/RecessedInput';
import { TactileBadge } from '@/components/ui/TactileBadge';
import { useToast } from '@/components/ui/ToastProvider';

export default function DoctorAnalysisPage() {
  const router = useRouter();
  const { success, error, info } = useToast();

  const [selectedPatientId, setSelectedPatientId] = useState<number>(101);
  const [query, setQuery] = useState('');
  const [dosage, setDosage] = useState('20 mg');
  const [frequency, setFrequency] = useState('Once daily (OD)');

  const [medications, setMedications] = useState<AnalyzedMedication[]>([
    {
      id: 'doc-m-1',
      drug_id: 1,
      rxcui: '11289',
      brand_name: 'Coumadin',
      generic_name: 'Warfarin',
      dosage: '5 mg',
      frequency: 'Once daily (OD)',
      source_type: 'manual_entry'
    },
    {
      id: 'doc-m-2',
      drug_id: 2,
      rxcui: '5640',
      brand_name: 'Advil',
      generic_name: 'Ibuprofen',
      dosage: '400 mg',
      frequency: 'Every 8 hours PRN',
      source_type: 'manual_entry'
    },
    {
      id: 'doc-m-3',
      drug_id: 5,
      rxcui: '29046',
      brand_name: 'Prinivil',
      generic_name: 'Lisinopril',
      dosage: '10 mg',
      frequency: 'Every morning (OD)',
      source_type: 'manual_entry'
    }
  ]);

  const patients = AppStateService.getPatients();
  const selectedPatient = patients.find(p => p.patient_id === selectedPatientId) || patients[0];
  const conditions = AppStateService.getPatientConditions(selectedPatientId);
  const allergies = AppStateService.getPatientAllergies(selectedPatientId);

  const handleAddDrug = (drug: Drug) => {
    if (medications.some(m => m.generic_name.toLowerCase() === drug.generic_name.toLowerCase())) {
      info('Already in Regimen', `${drug.generic_name} is already listed.`);
      return;
    }

    const newMed: AnalyzedMedication = {
      id: `doc-${Date.now()}`,
      drug_id: drug.drug_id,
      rxcui: drug.rxcui,
      brand_name: drug.brand_name,
      generic_name: drug.generic_name,
      dosage: dosage || drug.strength,
      frequency,
      form: drug.dosage_form,
      source_type: 'manual_entry'
    };

    setMedications([...medications, newMed]);
    setQuery('');
    success('Drug Added', `${drug.brand_name} added to clinician analysis queue.`);
  };

  const handleRemove = (id: string) => {
    setMedications(medications.filter(m => m.id !== id));
  };

  const handleRunDoctorAnalysis = () => {
    if (medications.length === 0) {
      error('No Drugs Added', 'Please specify at least one medication.');
      return;
    }

    const engineResult = InteractionEngine.evaluateSafety(medications, conditions);
    const aiOutput = AIReasoningAgent.generateClinicalReports({
      patient: selectedPatient,
      conditions,
      allergies,
      medications,
      interactions: engineResult.interactions,
      contraindications: engineResult.contraindications,
      warnings: engineResult.warnings,
      avoidanceList: engineResult.avoidanceList,
      overallRisk: engineResult.overallRisk
    });

    const session: AnalysisSession = {
      id: `doc-analysis-${Date.now()}`,
      patient_id: selectedPatient.patient_id,
      patient_name: selectedPatient.full_name,
      created_by_role: 'doctor',
      created_by_name: 'Dr. Sarah Mitchell, MD',
      overall_risk: engineResult.overallRisk,
      risk_score: engineResult.riskScore,
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
      status: engineResult.overallRisk === 'MAJOR / SEVERE' ? 'flagged' : 'completed',
      medications,
      interactions: engineResult.interactions,
      contraindications: engineResult.contraindications,
      warnings: engineResult.warnings,
      avoidance_list: engineResult.avoidanceList,
      patient_report: aiOutput.patientReport,
      doctor_report: aiOutput.doctorReport,
      ai_reasoning: aiOutput.aiReasoning
    };

    AppStateService.saveAnalysisSession(session);
    AppStateService.logAudit(
      'user-doctor-1',
      'doctor',
      'PHYSICIAN_SAFETY_EVALUATION',
      'AnalysisSession',
      session.id,
      `Physician safety review executed for ${selectedPatient.full_name}. Regimen Tier: ${session.overall_risk}.`,
      'FDA / CPIC Guidelines'
    );

    router.push('/patient/analysis/results');
  };

  const searched = RxNormService.searchDrugs(query).slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-sans">
              Clinical Multi-Drug Safety Workbench
            </h1>
            <TactileBadge variant="teal" size="sm">Physician Suite</TactileBadge>
          </div>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Simulate combinations, verify narrow therapeutic index risks, and review pharmacogenomic contraindications
          </p>
        </div>

        <TactileButton
          variant="success"
          size="md"
          onClick={handleRunDoctorAnalysis}
          leftIcon={<Sparkles className="w-4 h-4" />}
        >
          Execute Comprehensive Analysis
        </TactileButton>
      </div>

      {/* Target Patient Selector Strip */}
      <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="font-bold text-slate-700">Target Patient Profile:</span>
          <select
            value={selectedPatientId}
            onChange={(e) => setSelectedPatientId(parseInt(e.target.value))}
            className="py-1.5 px-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-bold"
          >
            {patients.map(p => (
              <option key={p.patient_id} value={p.patient_id}>
                {p.full_name} (Age: {p.age}, {p.blood_group}, ID #{p.patient_id})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 text-slate-500">
          <span>{conditions.length} Documented Conditions</span>
          <span>•</span>
          <span>{allergies.length} Screened Allergies</span>
        </div>
      </div>

      {/* Drug Search & Add Box */}
      <BentoCard
        title="Formulate Regimen or Add Compounds"
        subtitle="Search canonical RxNorm catalog"
        icon={<Pill className="w-5 h-5 text-teal-600" />}
      >
        <div className="flex flex-col gap-3 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <RecessedInput
                label="Drug Query"
                placeholder="Type 'Amiodarone', 'Digoxin', 'Omeprazole', 'Fluoxetine'..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <RecessedInput
                label="Dosage"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
              />
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 font-mono">Frequency</label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full py-2 px-2 text-xs rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-mono"
                >
                  <option value="Once daily (OD)">Once daily (OD)</option>
                  <option value="Twice daily (BD)">Twice daily (BD)</option>
                  <option value="Thrice daily (TDS)">Thrice daily (TDS)</option>
                  <option value="Every 8h PRN">Every 8h PRN</option>
                </select>
              </div>
            </div>
          </div>

          {/* Search Results Dropdown */}
          {query.trim().length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-md p-2 divide-y divide-slate-100 font-mono text-xs">
              {searched.map(d => (
                <div
                  key={d.drug_id}
                  onClick={() => handleAddDrug(d)}
                  className="p-2.5 hover:bg-teal-50 rounded-lg cursor-pointer flex items-center justify-between transition-colors"
                >
                  <div>
                    <span className="font-bold text-slate-900 font-sans">{d.brand_name}</span>
                    <span className="text-slate-500 ml-1.5">({d.generic_name})</span>
                  </div>
                  <TactileBadge variant="teal" size="sm">+ Add to Regimen</TactileBadge>
                </div>
              ))}
            </div>
          )}
        </div>
      </BentoCard>

      {/* Regimen Queue */}
      <BentoCard
        title={`Prescription Regimen Under Evaluation (${medications.length} Drugs)`}
        subtitle="Pairwise cross-matrices and contraindication rules will execute against this set"
        icon={<Layers className="w-5 h-5 text-[#2563EB]" />}
        headerAction={
          <TactileButton
            variant="success"
            size="sm"
            onClick={handleRunDoctorAnalysis}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Run Clinical Review
          </TactileButton>
        }
      >
        <div className="divide-y divide-slate-100 font-mono text-xs">
          {medications.map((m, idx) => (
            <div key={m.id} className="py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-teal-50 text-teal-700 font-bold">
                  #{idx + 1}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm font-sans">
                    {m.brand_name} <span className="text-slate-500 font-normal">({m.generic_name})</span>
                  </h4>
                  <p className="text-slate-600 text-xs mt-0.5">
                    Dosage: <b className="text-slate-900">{m.dosage}</b> • Frequency: <b className="text-slate-900">{m.frequency}</b>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <TactileBadge variant="blue" size="sm">RxNorm: {m.rxcui}</TactileBadge>
                <button
                  onClick={() => handleRemove(m.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 rounded hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </BentoCard>

    </div>
  );
}
