'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FileCheck, FileText, ArrowRight, Printer, Calendar, User, Stethoscope } from 'lucide-react';
import { AppStateService } from '@/lib/store/appStore';
import { AnalysisSession } from '@/types/database';
import { BentoCard } from '@/components/ui/BentoCard';
import { TactileButton } from '@/components/ui/TactileButton';
import { TactileBadge } from '@/components/ui/TactileBadge';

export default function DoctorReportsPage() {
  const [sessions, setSessions] = useState<AnalysisSession[]>([]);

  useEffect(() => {
    AppStateService.initSeedData();
    setSessions(AppStateService.getAnalysisSessions());
  }, []);

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-sans">
              Clinical Decision Dossiers & Reports
            </h1>
            <TactileBadge variant="teal" size="sm">{sessions.length} Generated</TactileBadge>
          </div>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Archived physician reports with pharmacological mechanisms, ICD-10 contraindications, and evidence citations
          </p>
        </div>
      </div>

      {/* Reports List */}
      <div className="flex flex-col gap-4 font-mono text-xs">
        {sessions.map(s => (
          <div
            key={s.id}
            className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-300 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-teal-50 text-teal-700 shrink-0">
                <FileCheck className="w-5 h-5" />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3 className="font-bold text-slate-900 text-base font-sans">
                    Clinical Dossier #{s.id}
                  </h3>
                  <TactileBadge
                    variant={s.overall_risk === 'MAJOR / SEVERE' ? 'red' : 'green'}
                    size="sm"
                    dot
                  >
                    {s.overall_risk}
                  </TactileBadge>
                </div>

                <p className="text-slate-700 font-sans text-xs">
                  Patient: <b>{s.patient_name}</b> (ID #{s.patient_id}) • Evaluated Regimen: {s.medications.map(m => m.generic_name).join(', ')}
                </p>

                <div className="flex items-center gap-4 text-slate-500 text-[11px] mt-1">
                  <span>{s.interactions.length} DDI Matches</span>
                  <span>•</span>
                  <span>{s.contraindications.length} Disease Contraindications</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {s.created_at}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link href="/patient/reports">
                <TactileButton variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Open Clinician Dossier
                </TactileButton>
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
