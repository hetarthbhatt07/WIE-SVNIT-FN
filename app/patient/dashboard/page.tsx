'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Pill, FileText, AlertTriangle, ShieldCheck, HeartPulse, 
  ScanLine, ArrowRight, Activity, Plus, Clock, ExternalLink, 
  ShieldAlert, Sparkles, ChevronRight, Stethoscope
} from 'lucide-react';
import { AppStateService } from '@/lib/store/appStore';
import { Patient, PatientCondition, PatientAllergy, Prescription, AnalysisSession, NotificationItem } from '@/types/database';
import { BentoCard } from '@/components/ui/BentoCard';
import { TactileButton } from '@/components/ui/TactileButton';
import { TactileBadge } from '@/components/ui/TactileBadge';

export default function PatientDashboard() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [conditions, setConditions] = useState<PatientCondition[]>([]);
  const [allergies, setAllergies] = useState<PatientAllergy[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [recentAnalyses, setRecentAnalyses] = useState<AnalysisSession[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    AppStateService.initSeedData();
    const user = AppStateService.getCurrentUser();
    const pId = user?.patient_id || 101;
    const p = AppStateService.getPatientById(pId) || AppStateService.getPatients()[0];
    setPatient(p);

    if (p) {
      setConditions(AppStateService.getPatientConditions(p.patient_id));
      setAllergies(AppStateService.getPatientAllergies(p.patient_id));
      setPrescriptions(AppStateService.getPrescriptions(p.patient_id));
      setRecentAnalyses(AppStateService.getAnalysisSessions(p.patient_id));
      setNotifications(AppStateService.getNotifications(user?.id || 'user-patient-1'));
    }
  }, []);

  const criticalAlerts = notifications.filter(n => n.severity === 'critical' && !n.is_read);

  return (
    <div className="flex flex-col gap-6">
      
      {/* Top Welcome Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] text-white flex items-center justify-center font-bold text-xl shadow-md">
            {patient?.full_name?.charAt(0) || 'P'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-sans">
                Welcome back, {patient?.full_name || 'Patient'}
              </h1>
              <TactileBadge variant="teal" size="sm">Active Profile</TactileBadge>
            </div>
            <p className="text-xs text-slate-500 font-mono mt-1">
              Patient ID: #{patient?.patient_id} • Age: {patient?.age} • Blood Group: {patient?.blood_group} • Weight: {patient?.weight} kg
            </p>
          </div>
        </div>

        {/* Quick Launch CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/patient/analysis">
            <TactileButton
              variant="primary"
              size="md"
              leftIcon={<ScanLine className="w-4 h-4" />}
              rightIcon={<Sparkles className="w-3.5 h-3.5" />}
            >
              Analyze New Prescription
            </TactileButton>
          </Link>
        </div>
      </div>

      {/* Critical Interaction Warning Banner if present */}
      {criticalAlerts.length > 0 && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 shadow-xs flex items-start justify-between gap-3 text-red-900">
          <div className="flex items-start gap-3">
            <div className="p-1.5 rounded-lg bg-red-100 text-red-700 mt-0.5 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-red-800">
                Critical Safety Alert Detected
              </h4>
              <p className="text-xs text-red-700 font-mono mt-0.5 leading-relaxed">
                {criticalAlerts[0].message}
              </p>
            </div>
          </div>
          <Link href="/patient/analysis/results">
            <TactileButton variant="danger" size="sm">
              Review Safety Action
            </TactileButton>
          </Link>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-slate-500">Prescriptions</span>
            <FileText className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2 font-mono">{prescriptions.length}</p>
          <span className="text-[10px] text-slate-400 font-mono">Digitized via OCR</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-slate-500">Conditions</span>
            <HeartPulse className="w-4 h-4 text-teal-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2 font-mono">{conditions.length}</p>
          <span className="text-[10px] text-teal-600 font-mono font-semibold">ICD-10 Synchronized</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-slate-500">Allergies Tracked</span>
            <ShieldAlert className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2 font-mono">{allergies.length}</p>
          <span className="text-[10px] text-amber-700 font-mono">Cross-screened</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-slate-500">Safety Status</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-lg font-bold text-emerald-700 mt-2 font-mono truncate">
            {criticalAlerts.length > 0 ? 'Action Needed' : 'Monitored'}
          </p>
          <span className="text-[10px] text-slate-400 font-mono">RxNorm Gatekeeper</span>
        </div>
      </div>

      {/* Main Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Active Medications & Recent Analyses */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Current Medications Card */}
          <BentoCard
            title="Current Active Medications"
            subtitle="Extracted from verified prescriptions and normalized via RxNorm standard"
            icon={<Pill className="w-5 h-5" />}
            headerAction={
              <Link href="/patient/analysis">
                <TactileButton variant="secondary" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>
                  Add / Scan Drug
                </TactileButton>
              </Link>
            }
          >
            <div className="divide-y divide-slate-100">
              <div className="py-3 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-700 font-bold">Rx</div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm font-sans">Warfarin (Coumadin) 5mg</h4>
                    <p className="text-slate-500 text-xs">1 tablet orally once daily at 6 PM • RxCUI: 11289</p>
                  </div>
                </div>
                <TactileBadge variant="blue" size="sm">Anticoagulant</TactileBadge>
              </div>

              <div className="py-3 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-50 text-amber-700 font-bold">Rx</div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm font-sans">Ibuprofen (Advil) 400mg</h4>
                    <p className="text-slate-500 text-xs">1 tablet PO PRN for joint pain • RxCUI: 5640</p>
                  </div>
                </div>
                <TactileBadge variant="amber" size="sm">Flagged with Warfarin</TactileBadge>
              </div>

              <div className="py-3 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-teal-50 text-teal-700 font-bold">Rx</div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm font-sans">Lisinopril (Prinivil) 10mg</h4>
                    <p className="text-slate-500 text-xs">1 tablet PO every morning for BP • RxCUI: 29046</p>
                  </div>
                </div>
                <TactileBadge variant="teal" size="sm">ACE Inhibitor</TactileBadge>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-500">Showing 3 active compounds</span>
              <Link href="/patient/analysis" className="text-[#2563EB] hover:underline font-bold">
                Run Safety Re-Check →
              </Link>
            </div>
          </BentoCard>

          {/* Recent Prescription Uploads */}
          <BentoCard
            title="Prescription Documents"
            subtitle="Uploaded handwritten & digital prescriptions with OCR text transcripts"
            icon={<FileText className="w-5 h-5" />}
            headerAction={
              <Link href="/patient/prescriptions">
                <TactileButton variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  View All ({prescriptions.length})
                </TactileButton>
              </Link>
            }
          >
            <div className="divide-y divide-slate-100">
              {prescriptions.map(rx => (
                <div key={rx.prescription_id} className="py-3 flex items-center justify-between gap-3 text-xs font-mono">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-slate-100 text-slate-600 shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-900 text-sm font-sans truncate">
                        {rx.doctor_name}
                      </h4>
                      <p className="text-slate-500 text-xs truncate">
                        {rx.hospital_name} • Date: {rx.prescription_date}
                      </p>
                    </div>
                  </div>

                  <Link href="/patient/analysis/results">
                    <TactileButton variant="outline" size="sm">
                      View Analysis
                    </TactileButton>
                  </Link>
                </div>
              ))}
            </div>
          </BentoCard>

        </div>

        {/* Right 1 Col: Medical Profile, Conditions & Allergies */}
        <div className="flex flex-col gap-6">
          
          {/* Medical Conditions */}
          <BentoCard
            title="Diagnosed Conditions"
            subtitle="Active ICD-10 medical history"
            icon={<HeartPulse className="w-5 h-5" />}
            headerAction={
              <Link href="/patient/medical-history">
                <TactileButton variant="ghost" size="sm">Edit</TactileButton>
              </Link>
            }
          >
            <div className="flex flex-col gap-2.5">
              {conditions.map(c => (
                <div key={c.patient_condition_id} className="p-3 rounded-lg bg-slate-50 border border-slate-200/90 text-xs font-mono flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 font-sans text-xs">
                      {c.medical_condition?.condition_name || 'Medical Condition'}
                    </span>
                    <TactileBadge variant="teal" size="sm">{c.medical_condition?.icd10_code || 'ICD-10'}</TactileBadge>
                  </div>
                  <span className="text-[11px] text-slate-500">{c.notes}</span>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* Allergies Registry */}
          <BentoCard
            title="Allergy Registry"
            subtitle="Substances screened against medicines"
            icon={<ShieldAlert className="w-5 h-5" />}
            headerAction={
              <Link href="/patient/allergies">
                <TactileButton variant="ghost" size="sm">Manage</TactileButton>
              </Link>
            }
          >
            <div className="flex flex-col gap-2.5">
              {allergies.map(a => (
                <div key={a.id} className="p-3 rounded-lg bg-red-50/50 border border-red-200/80 text-xs font-mono flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 font-sans text-xs">{a.allergen_name}</span>
                    <TactileBadge variant={a.severity === 'Severe' ? 'red' : 'amber'} size="sm">
                      {a.severity}
                    </TactileBadge>
                  </div>
                  <span className="text-[11px] text-slate-600">{a.reaction}</span>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* AI Decision Support Disclaimer */}
          <div className="p-4 rounded-xl bg-slate-100/80 border border-slate-200 text-xs font-mono text-slate-500 leading-relaxed">
            <span className="font-bold text-slate-700 block mb-1">💡 Clinical Safety Protocol:</span>
            MedSafe AI cross-checks every prescription drug with your specific liver/kidney parameters and allergy records. Always confirm updates with your physician.
          </div>

        </div>

      </div>

    </div>
  );
}
