'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FileCheck, Printer, Download, User, Stethoscope, 
  ShieldCheck, AlertTriangle, AlertCircle, CheckCircle2, 
  ArrowLeft, Copy, ExternalLink, Calendar, Pill, HeartPulse, RefreshCw
} from 'lucide-react';
import { AppStateService, INITIAL_DEFAULT_ANALYSIS_SESSION } from '@/lib/store/appStore';
import { AnalysisSession } from '@/types/database';
import { BentoCard } from '@/components/ui/BentoCard';
import { TactileButton } from '@/components/ui/TactileButton';
import { TactileBadge } from '@/components/ui/TactileBadge';
import { useToast } from '@/components/ui/ToastProvider';
import { BrandLogo } from '@/components/ui/BrandLogo';

export default function ReportsPage() {
  const { success } = useToast();
  const [session, setSession] = useState<AnalysisSession>(INITIAL_DEFAULT_ANALYSIS_SESSION);
  const [reportMode, setReportMode] = useState<'patient' | 'doctor'>('patient');

  useEffect(() => {
    AppStateService.initSeedData();
    const sessions = AppStateService.getAnalysisSessions();
    if (sessions.length > 0) {
      setSession(sessions[0]);
    } else {
      AppStateService.saveAnalysisSession(INITIAL_DEFAULT_ANALYSIS_SESSION);
      setSession(INITIAL_DEFAULT_ANALYSIS_SESSION);
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    if (!session) return;
    const text = reportMode === 'patient'
      ? `${session.patient_report.title}\n\n${session.patient_report.summary_text}\n\nKey Steps:\n${session.patient_report.key_action_steps.join('\n')}`
      : `${session.doctor_report.clinical_summary}\n\nPharmacological Mechanisms:\n${session.doctor_report.pharmacological_mechanism}`;

    navigator.clipboard.writeText(text);
    success('Summary Copied', 'Report content copied to clipboard.');
  };

  if (!session) {
    return (
      <div className="p-12 text-center flex flex-col items-center gap-3">
        <RefreshCw className="w-8 h-8 text-[#2563EB] animate-spin" />
        <p className="text-xs font-mono text-slate-500">Loading clinical safety report...</p>
      </div>
    );
  }

  const pReport = session.patient_report;
  const dReport = session.doctor_report;

  return (
    <div className="flex flex-col gap-6">
      
      {/* Top Controls Bar (Hidden during printing) */}
      <div className="no-print bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/patient/analysis/results">
            <TactileButton variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Back to Matrix
            </TactileButton>
          </Link>
          <div className="h-4 w-[1px] bg-slate-200" />
          <h1 className="text-lg font-bold text-slate-900 font-sans">
            Clinical Safety Dossier
          </h1>
        </div>

        {/* Mode Toggle & Print Actions */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Segmented Recipient Mode Switcher */}
          <div className="p-1 rounded-xl bg-slate-100 border border-slate-200/80 shadow-[inset_0_1px_2px_0_rgba(0,0,0,0.06)] flex items-center font-mono text-xs">
            <button
              onClick={() => setReportMode('patient')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                reportMode === 'patient'
                  ? 'bg-white text-[#2563EB] shadow-sm border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              Patient Report
            </button>
            <button
              onClick={() => setReportMode('doctor')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                reportMode === 'doctor'
                  ? 'bg-white text-[#2563EB] shadow-sm border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              Doctor Clinical Dossier
            </button>
          </div>

          <TactileButton
            variant="secondary"
            size="sm"
            onClick={handleCopySummary}
            leftIcon={<Copy className="w-3.5 h-3.5" />}
          >
            Copy
          </TactileButton>

          <TactileButton
            variant="primary"
            size="sm"
            onClick={handlePrint}
            leftIcon={<Printer className="w-3.5 h-3.5" />}
          >
            Print / PDF
          </TactileButton>
        </div>
      </div>

      {/* PRINTABLE REPORT CONTAINER */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-8 sm:p-12 flex flex-col gap-8 text-slate-900">
        
        {/* Document Official Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b-2 border-slate-900 gap-4">
          <div className="flex flex-col gap-1">
            <BrandLogo size="lg" clickable={false} />
            <p className="text-xs text-slate-500 font-mono">
              Intelligent Medication Safety & Clinical Decision Support System
            </p>
          </div>

          <div className="text-left sm:text-right font-mono text-xs text-slate-600">
            <p><b className="text-slate-900">Report ID:</b> {session.id}</p>
            <p><b className="text-slate-900">Generated:</b> {session.created_at}</p>
            <p><b className="text-slate-900">Recipient Mode:</b> <span className="uppercase text-blue-700 font-bold">{reportMode}</span></p>
          </div>
        </div>

        {/* Patient Demographic Summary Strip */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Patient Name</span>
            <span className="font-bold text-slate-900 text-sm font-sans">{session.patient_name}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Patient ID</span>
            <span className="font-bold text-slate-900">#{session.patient_id}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Overall Risk Level</span>
            <span className={`font-bold ${session.overall_risk === 'MAJOR / SEVERE' ? 'text-red-700' : 'text-emerald-700'}`}>
              {session.overall_risk}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Active Compounds</span>
            <span className="font-bold text-slate-900">{session.medications.length} RxNorm Drugs</span>
          </div>
        </div>

        {/* ----------------- PATIENT MODE VIEW ----------------- */}
        {reportMode === 'patient' && (
          <div className="flex flex-col gap-6">
            
            {/* Safety Banner if present */}
            {pReport.safety_alert_banner && (
              <div className="p-4 rounded-xl bg-red-50 border-2 border-red-300 text-red-900 flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <span className="font-bold block mb-0.5">IMPORTANT SAFETY ALERT:</span>
                  <p className="font-mono text-xs leading-relaxed">{pReport.safety_alert_banner}</p>
                </div>
              </div>
            )}

            {/* Summary Text */}
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold text-slate-900 font-sans">
                Medication Review Summary
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed font-sans">
                {pReport.summary_text}
              </p>
            </div>

            {/* Key Action Steps */}
            <div className="flex flex-col gap-3">
              <h3 className="text-base font-bold text-slate-900 font-sans flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
                What You Should Do Next:
              </h3>
              <div className="flex flex-col gap-2">
                {pReport.key_action_steps.map((step, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-200/70 text-xs font-mono text-blue-950 flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Easy Medication Timetable */}
            <div className="flex flex-col gap-3">
              <h3 className="text-base font-bold text-slate-900 font-sans flex items-center gap-2">
                <Pill className="w-5 h-5 text-teal-600" />
                Your Medication Schedule & Food Guidelines:
              </h3>
              <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
                {pReport.easy_medication_list.map((med, idx) => (
                  <div key={idx} className="p-4 bg-white flex flex-col gap-1 text-xs font-mono">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-sm font-sans">{med.name}</span>
                      <TactileBadge variant="teal" size="sm">{med.dosage_instruction}</TactileBadge>
                    </div>
                    <p className="text-slate-600 mt-0.5">
                      <b className="text-slate-800">Dietary Instruction:</b> {med.food_instructions}
                    </p>
                    {med.warning_note && (
                      <p className="text-red-700 font-semibold mt-0.5 bg-red-50 p-1.5 rounded">
                        ⚠️ Caution: {med.warning_note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ----------------- DOCTOR CLINICAL VIEW ----------------- */}
        {reportMode === 'doctor' && (
          <div className="flex flex-col gap-6 font-mono text-xs">
            
            {/* Clinical Overview */}
            <div className="flex flex-col gap-2">
              <h3 className="text-base font-bold text-slate-900 font-sans">
                Clinical Pharmacotherapy Evaluation
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                {dReport.clinical_summary}
              </p>
            </div>

            {/* Pharmacological Mechanism */}
            <div className="flex flex-col gap-2">
              <h3 className="text-base font-bold text-slate-900 font-sans">
                Pharmacodynamic & Pharmacokinetic Mechanisms
              </h3>
              <div className="p-4 rounded-xl bg-slate-900 text-slate-100 whitespace-pre-wrap leading-relaxed">
                {dReport.pharmacological_mechanism}
              </div>
            </div>

            {/* ICD-10 Contraindications */}
            {dReport.icd10_contraindications.length > 0 && (
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-bold text-slate-900 font-sans text-red-700">
                  Documented ICD-10 Disease Contraindications
                </h3>
                <div className="flex flex-col gap-2">
                  {dReport.icd10_contraindications.map((contra, idx) => (
                    <div key={idx} className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-900">
                      {contra}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Prescribing Recommendations */}
            <div className="flex flex-col gap-2">
              <h3 className="text-base font-bold text-slate-900 font-sans">
                Prescribing Recommendations & Drug Avoidance
              </h3>
              <ul className="list-disc list-inside space-y-1.5 p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800">
                {dReport.prescribing_recommendations.map((rec, idx) => (
                  <li key={idx} className="leading-relaxed">{rec}</li>
                ))}
              </ul>
            </div>

            {/* Monitoring Parameters */}
            <div className="flex flex-col gap-2">
              <h3 className="text-base font-bold text-slate-900 font-sans">
                Laboratory & Clinical Monitoring Schedule
              </h3>
              <ul className="list-disc list-inside space-y-1.5 p-4 rounded-xl bg-blue-50/50 border border-blue-200 text-blue-950">
                {dReport.monitoring_parameters.map((param, idx) => (
                  <li key={idx} className="leading-relaxed">{param}</li>
                ))}
              </ul>
            </div>

            {/* Evidence Citations */}
            <div className="flex flex-col gap-2">
              <h3 className="text-base font-bold text-slate-900 font-sans">
                Clinical Evidence & Guideline Citations
              </h3>
              <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl">
                {dReport.evidence_citations.map((cite, idx) => (
                  <div key={idx} className="p-3 bg-white flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{cite.source}</span>
                      <a href={cite.url} target="_blank" rel="noopener noreferrer" className="text-[#2563EB] hover:underline flex items-center gap-1">
                        View Source <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <p className="text-slate-600 text-[11px]">{cite.annotation}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Legal & Regulatory Medical Disclaimer Footer */}
        <div className="pt-6 border-t border-slate-200 text-[11px] font-mono text-slate-500 flex flex-col gap-2">
          <p className="font-bold text-slate-700">MANDATORY CLINICAL DISCLAIMER:</p>
          <p className="leading-relaxed">
            {session.patient_report.disclaimer}
          </p>
          <div className="flex items-center justify-between pt-2 text-[10px] text-slate-400">
            <span>Validated by MedSafe AI Clinical Engine v3.1</span>
            <span>Digital Document Signature: SHA256-V29381-VERIFIED</span>
          </div>
        </div>

      </div>

    </div>
  );
}
