'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  User, HeartPulse, ShieldAlert, Pill, FileText, 
  Stethoscope, ArrowLeft, ArrowRight, Sparkles, AlertTriangle, 
  Calendar, CheckCircle2, RefreshCw, FileCheck
} from 'lucide-react';
import { AppStateService } from '@/lib/store/appStore';
import { Patient, PatientCondition, PatientAllergy, Prescription, AnalysisSession } from '@/types/database';
import { BentoCard } from '@/components/ui/BentoCard';
import { TactileButton } from '@/components/ui/TactileButton';
import { TactileBadge } from '@/components/ui/TactileBadge';

export default function PatientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const patientId = parseInt(params.id as string) || 101;

  const [patient, setPatient] = useState<Patient | null>(null);
  const [conditions, setConditions] = useState<PatientCondition[]>([]);
  const [allergies, setAllergies] = useState<PatientAllergy[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [analyses, setAnalyses] = useState<AnalysisSession[]>([]);

  useEffect(() => {
    AppStateService.initSeedData();
    const p = AppStateService.getPatientById(patientId) || AppStateService.getPatients()[0];
    setPatient(p);
    if (p) {
      setConditions(AppStateService.getPatientConditions(p.patient_id));
      setAllergies(AppStateService.getPatientAllergies(p.patient_id));
      setPrescriptions(AppStateService.getPrescriptions(p.patient_id));
      setAnalyses(AppStateService.getAnalysisSessions(p.patient_id));
    }
  }, [patientId]);

  if (!patient) {
    return (
      <div className="p-12 text-center flex flex-col items-center gap-3">
        <RefreshCw className="w-8 h-8 text-[#2563EB] animate-spin" />
        <p className="text-xs font-mono text-slate-500">Loading Patient 360 Record...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      
      {/* Top Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/doctor/patients">
            <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>

          <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-700 font-bold text-2xl flex items-center justify-center border border-teal-200 shadow-xs">
            {patient.full_name.charAt(0)}
          </div>

          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-sans">
                {patient.full_name}
              </h1>
              <TactileBadge variant="teal" size="sm">Patient 360 Record</TactileBadge>
              <TactileBadge variant="blue" size="sm">ID #{patient.patient_id}</TactileBadge>
            </div>
            <p className="text-xs text-slate-500 font-mono mt-1">
              Age: {patient.age} • {patient.gender} • DOB: {patient.date_of_birth} • Weight: {patient.weight}kg • Height: {patient.height}cm • Blood: {patient.blood_group}
            </p>
          </div>
        </div>

        {/* 1-Click Clinical Review CTA */}
        <Link href="/doctor/analysis">
          <TactileButton
            variant="success"
            size="md"
            leftIcon={<Stethoscope className="w-4 h-4" />}
            rightIcon={<Sparkles className="w-3.5 h-3.5" />}
          >
            Initiate Clinical Safety Review
          </TactileButton>
        </Link>
      </div>

      {/* 2-Column Clinical Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono text-xs">
        
        {/* Left 2 Columns */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Active Diagnosed Conditions */}
          <BentoCard
            title="Diagnosed Medical Conditions (ICD-10)"
            subtitle="Cross-matched against medication contraindications"
            icon={<HeartPulse className="w-5 h-5 text-teal-600" />}
          >
            <div className="divide-y divide-slate-100">
              {conditions.map(c => (
                <div key={c.patient_condition_id} className="py-3 flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm font-sans">
                        {c.medical_condition?.condition_name}
                      </span>
                      <TactileBadge variant="teal" size="sm">
                        {c.medical_condition?.icd10_code}
                      </TactileBadge>
                      <TactileBadge variant={c.status === 'Active' ? 'red' : 'green'} size="sm">
                        {c.status}
                      </TactileBadge>
                    </div>
                    <p className="text-slate-600 mt-1 leading-relaxed">
                      {c.notes || c.medical_condition?.description}
                    </p>
                  </div>
                  <span className="text-slate-400 text-[10px] shrink-0">
                    Diagnosed: {c.diagnosed_on}
                  </span>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* Active Medication Regimen */}
          <BentoCard
            title="Active Prescription Medications"
            subtitle="RxNorm standardized formulations"
            icon={<Pill className="w-5 h-5 text-blue-600" />}
          >
            <div className="divide-y divide-slate-100">
              <div className="py-3 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm font-sans">Warfarin (Coumadin) 5mg</h4>
                  <p className="text-slate-600">1 tablet orally once daily at 6 PM • RxCUI: 11289</p>
                </div>
                <TactileBadge variant="blue" size="sm">Anticoagulant</TactileBadge>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm font-sans">Ibuprofen (Advil) 400mg</h4>
                  <p className="text-slate-600">1 tablet PO PRN for joint pain • RxCUI: 5640</p>
                </div>
                <TactileBadge variant="red" size="sm">Flagged Bleeding Risk</TactileBadge>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm font-sans">Lisinopril (Prinivil) 10mg</h4>
                  <p className="text-slate-600">1 tablet PO every morning for BP • RxCUI: 29046</p>
                </div>
                <TactileBadge variant="teal" size="sm">ACE Inhibitor</TactileBadge>
              </div>
            </div>
          </BentoCard>

          {/* Ingested Prescriptions Archive */}
          <BentoCard
            title="Prescription Archival Documents"
            subtitle="Ingested doctor prescriptions with OCR text transcripts"
            icon={<FileText className="w-5 h-5" />}
          >
            <div className="divide-y divide-slate-100">
              {prescriptions.map(rx => (
                <div key={rx.prescription_id} className="py-3 flex items-center justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm font-sans">{rx.doctor_name}</h4>
                    <p className="text-slate-500">{rx.hospital_name} • Date: {rx.prescription_date}</p>
                    <p className="text-slate-600 text-[11px] mt-1 bg-slate-50 p-2 rounded">
                      OCR: {rx.ocr_text}
                    </p>
                  </div>
                  <TactileBadge variant="blue" size="sm">Verified</TactileBadge>
                </div>
              ))}
            </div>
          </BentoCard>

        </div>

        {/* Right 1 Column */}
        <div className="flex flex-col gap-6">
          
          {/* Allergies */}
          <BentoCard
            title="Allergies & Sensitivities"
            subtitle="Cross-screened substances"
            icon={<ShieldAlert className="w-5 h-5 text-red-600" />}
          >
            <div className="flex flex-col gap-2.5">
              {allergies.map(a => (
                <div key={a.id} className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-900 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 font-sans text-xs">{a.allergen_name}</span>
                    <TactileBadge variant="red" size="sm">{a.severity}</TactileBadge>
                  </div>
                  <span className="text-[11px] text-slate-700">Reaction: {a.reaction}</span>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* Previous Clinical Reports */}
          <BentoCard
            title="Safety Audits & Reports"
            subtitle="Longitudinal decision records"
            icon={<FileCheck className="w-5 h-5 text-teal-600" />}
          >
            <div className="flex flex-col gap-2.5">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block font-sans">Major Interaction Flag</span>
                  <span className="text-slate-400 text-[10px]">Warfarin + Ibuprofen</span>
                </div>
                <Link href="/patient/reports">
                  <TactileButton variant="outline" size="sm">
                    View Dossier
                  </TactileButton>
                </Link>
              </div>
            </div>
          </BentoCard>

        </div>

      </div>

    </div>
  );
}
