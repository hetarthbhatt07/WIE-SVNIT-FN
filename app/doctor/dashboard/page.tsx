'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, Stethoscope, AlertTriangle, FileCheck, ShieldCheck, 
  ArrowRight, Search, Activity, HeartPulse, Clock, Sparkles 
} from 'lucide-react';
import { AppStateService } from '@/lib/store/appStore';
import { Patient, AnalysisSession, NotificationItem } from '@/types/database';
import { BentoCard } from '@/components/ui/BentoCard';
import { TactileButton } from '@/components/ui/TactileButton';
import { TactileBadge } from '@/components/ui/TactileBadge';

export default function DoctorDashboard() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [analyses, setAnalyses] = useState<AnalysisSession[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    AppStateService.initSeedData();
    setPatients(AppStateService.getPatients());
    setAnalyses(AppStateService.getAnalysisSessions());
    setNotifications(AppStateService.getNotifications('user-doctor-1'));
  }, []);

  const criticalAlerts = notifications.filter(n => n.severity === 'critical');

  return (
    <div className="flex flex-col gap-6">
      
      {/* Welcome Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-600 to-teal-800 text-white flex items-center justify-center font-bold text-xl shadow-md">
            <Stethoscope className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-sans">
                Clinician Decision Workbench
              </h1>
              <TactileBadge variant="teal" size="sm">Cardiology / Internal Med</TactileBadge>
            </div>
            <p className="text-xs text-slate-500 font-mono mt-1">
              Dr. Sunita Rao, MD • License: GMC-GUJ-892341 • SVNIT Memorial Healthcare
            </p>
          </div>
        </div>

        <Link href="/doctor/analysis">
          <TactileButton
            variant="success"
            size="md"
            leftIcon={<Stethoscope className="w-4 h-4" />}
            rightIcon={<Sparkles className="w-3.5 h-3.5" />}
          >
            New Multi-Drug Safety Review
          </TactileButton>
        </Link>
      </div>

      {/* Metrics Row (Section 42 of prompt) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-mono font-semibold text-slate-500">Total Patients</span>
          <p className="text-2xl font-bold text-slate-900 mt-2 font-mono">{patients.length}</p>
          <span className="text-[10px] text-blue-600 font-mono">Assigned Roster</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-mono font-semibold text-slate-500">Safety Analyses</span>
          <p className="text-2xl font-bold text-slate-900 mt-2 font-mono">{analyses.length}</p>
          <span className="text-[10px] text-teal-600 font-mono">DDI Matrices Evaluated</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-mono font-semibold text-slate-500">Critical Alerts</span>
          <p className="text-2xl font-bold text-red-600 mt-2 font-mono">{criticalAlerts.length}</p>
          <span className="text-[10px] text-red-600 font-mono font-semibold">Immediate Review</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-mono font-semibold text-slate-500">Moderate Cautions</span>
          <p className="text-2xl font-bold text-amber-600 mt-2 font-mono">2</p>
          <span className="text-[10px] text-amber-700 font-mono">Dose Monitoring</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-mono font-semibold text-slate-500">Pending Reviews</span>
          <p className="text-2xl font-bold text-slate-900 mt-2 font-mono">1</p>
          <span className="text-[10px] text-slate-400 font-mono">Prescriptions Ingested</span>
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Patient Directory */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          <BentoCard
            title="Patient Clinical Directory"
            subtitle="Select a patient to access their complete Patient 360 Record"
            icon={<Users className="w-5 h-5 text-teal-600 text-teal-600" />}
            headerAction={
              <Link href="/doctor/patients">
                <TactileButton variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  View All Patients
                </TactileButton>
              </Link>
            }
          >
            <div className="divide-y divide-slate-100 font-mono text-xs">
              {patients.map(p => {
                const conds = AppStateService.getPatientConditions(p.patient_id);
                return (
                  <div
                    key={p.patient_id}
                    className="py-3.5 flex items-center justify-between gap-3 hover:bg-slate-50 p-2 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-sm font-sans">
                        {p.full_name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 text-sm font-sans">
                            {p.full_name}
                          </h4>
                          <TactileBadge variant="blue" size="sm">ID #{p.patient_id}</TactileBadge>
                        </div>
                        <p className="text-slate-500 text-xs mt-0.5">
                          Age: {p.age} • {p.gender} • Blood: {p.blood_group} • Weight: {p.weight} kg
                        </p>
                        <p className="text-slate-600 text-[11px] mt-0.5">
                          Conditions: <b>{conds.map(c => c.medical_condition?.condition_name).join(', ') || 'None'}</b>
                        </p>
                      </div>
                    </div>

                    <Link href={`/doctor/patients/${p.patient_id}`}>
                      <TactileButton variant="secondary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                        Patient 360 Record
                      </TactileButton>
                    </Link>
                  </div>
                );
              })}
            </div>
          </BentoCard>

        </div>

        {/* Right 1 Col: Critical Clinical Flags */}
        <div className="flex flex-col gap-6">
          
          <BentoCard
            title="Critical Clinical Flags"
            subtitle="Immediate contraindications requiring physician sign-off"
            icon={<AlertTriangle className="w-5 h-5 text-red-600" />}
            badge={<TactileBadge variant="red" size="sm">Action Priority</TactileBadge>}
          >
            <div className="flex flex-col gap-3 pt-2 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-900 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 font-sans text-xs">Ananya Sharma (#101)</span>
                  <TactileBadge variant="red" size="sm">Major DDI</TactileBadge>
                </div>
                <p className="text-red-700 text-xs leading-relaxed">
                  Warfarin 5mg + Ibuprofen 400mg flagged with active Peptic Ulcer Disease.
                </p>
                <Link href="/doctor/patients/101" className="text-blue-700 font-bold hover:underline mt-1">
                  Open Patient 360 & Prescribe Alternative →
                </Link>
              </div>
            </div>
          </BentoCard>

          {/* RxNorm Knowledge Base Health Status */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col gap-3 font-mono text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h4 className="font-bold text-slate-900 font-sans text-sm">Regulatory Safety Engine</h4>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed">
              All interaction rules and contraindications strictly validated against FDA DailyMed, RxNorm concepts, and CHEST guidelines.
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-slate-400 text-[10px]">
              <span>CDSS Certified Engine</span>
              <span>SVNIT WIE Platform</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
