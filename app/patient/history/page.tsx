'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { History, FileText, ArrowRight, Trash2, Calendar, RefreshCw, Layers, ShieldCheck } from 'lucide-react';
import { AppStateService } from '@/lib/store/appStore';
import { AnalysisSession } from '@/types/database';
import { BentoCard } from '@/components/ui/BentoCard';
import { TactileButton } from '@/components/ui/TactileButton';
import { TactileBadge } from '@/components/ui/TactileBadge';
import { useToast } from '@/components/ui/ToastProvider';

export default function HistoryPage() {
  const { success } = useToast();
  const [sessions, setSessions] = useState<AnalysisSession[]>([]);

  const loadData = () => {
    AppStateService.initSeedData();
    const list = AppStateService.getAnalysisSessions();
    setSessions(list);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-sans">
              Medication Safety Analysis History
            </h1>
            <TactileBadge variant="blue" size="sm">{sessions.length} Previous Audits</TactileBadge>
          </div>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Historical audit logs of past interaction analyses, gatekeeper decisions, and safety reports
          </p>
        </div>

        <Link href="/patient/analysis">
          <TactileButton variant="primary" size="md" leftIcon={<RefreshCw className="w-4 h-4" />}>
            Run New Analysis
          </TactileButton>
        </Link>
      </div>

      {/* History Cards */}
      <div className="flex flex-col gap-4">
        {sessions.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col items-center gap-3">
            <History className="w-12 h-12 text-slate-300" />
            <h3 className="text-base font-bold text-slate-700 font-sans">No History Records Yet</h3>
            <p className="text-xs text-slate-500 font-mono max-w-sm">
              Your previous medication safety checks and prescriptions will appear here.
            </p>
            <Link href="/patient/analysis">
              <TactileButton variant="secondary" size="sm">
                Run First Analysis
              </TactileButton>
            </Link>
          </div>
        ) : (
          sessions.map(s => (
            <div
              key={s.id}
              className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-300 transition-all font-mono text-xs"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-50 text-blue-700 shrink-0">
                  <Layers className="w-5 h-5" />
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="font-bold text-slate-900 text-base font-sans">
                      Analysis #{s.id}
                    </h3>
                    <TactileBadge
                      variant={s.overall_risk === 'MAJOR / SEVERE' ? 'red' : 'green'}
                      size="sm"
                      dot
                    >
                      {s.overall_risk}
                    </TactileBadge>
                    <span className="text-slate-400 text-xs">Score: {s.risk_score}/100</span>
                  </div>

                  <p className="text-slate-600 font-sans text-xs">
                    Compounds: <b>{s.medications.map(m => m.generic_name).join(', ')}</b>
                  </p>

                  <div className="flex items-center gap-4 text-slate-500 text-[11px] mt-1">
                    <span>{s.interactions.length} Interactions</span>
                    <span>•</span>
                    <span>{s.contraindications.length} Contraindications</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {s.created_at}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link href="/patient/reports">
                  <TactileButton variant="secondary" size="sm" leftIcon={<FileText className="w-3.5 h-3.5" />}>
                    View Report
                  </TactileButton>
                </Link>
                <Link href="/patient/analysis/results">
                  <TactileButton variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    Matrix View
                  </TactileButton>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
