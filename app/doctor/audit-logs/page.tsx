'use client';

import React, { useState, useEffect } from 'react';
import { History, ShieldCheck, Search, Calendar, User, FileText, Database } from 'lucide-react';
import { AppStateService } from '@/lib/store/appStore';
import { AuditLog } from '@/types/database';
import { BentoCard } from '@/components/ui/BentoCard';
import { TactileButton } from '@/components/ui/TactileButton';
import { RecessedInput } from '@/components/ui/RecessedInput';
import { TactileBadge } from '@/components/ui/TactileBadge';

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    AppStateService.initSeedData();
    setLogs(AppStateService.getAuditLogs());
  }, []);

  const filtered = logs.filter(l => 
    l.action.toLowerCase().includes(query.toLowerCase()) ||
    l.decision_summary.toLowerCase().includes(query.toLowerCase()) ||
    l.evidence_ref.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-sans">
              Regulatory Audit & Safety Logs
            </h1>
            <TactileBadge variant="teal" size="sm">Immutable Ledger</TactileBadge>
          </div>
          <p className="text-xs text-slate-500 font-mono mt-1">
            HIPAA and CDSCO-compliant immutable decision records with guideline evidence citations
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="w-full">
        <RecessedInput
          placeholder="Filter audit entries by action, entity ID, or evidence standard..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          leftIcon={<Search className="w-4 h-4" />}
        />
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden font-mono text-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <span className="font-bold text-slate-900 font-sans">Recorded Decision Transactions</span>
          <span className="text-slate-500">{filtered.length} Entries Logged</span>
        </div>

        <div className="divide-y divide-slate-100">
          {filtered.map(log => (
            <div key={log.id} className="p-4 hover:bg-slate-50/80 transition-colors flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <TactileBadge variant="blue" size="sm">{log.action}</TactileBadge>
                  <span className="font-bold text-slate-900">{log.entity_type} #{log.entity_id}</span>
                </div>
                <span className="text-slate-400 text-[11px] flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {log.timestamp}
                </span>
              </div>

              <p className="text-slate-700 font-sans leading-relaxed">
                {log.decision_summary}
              </p>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>Actor: <b className="text-slate-800">{log.user_role} ({log.user_id})</b></span>
                <span>Evidence Baseline: <b className="text-blue-700">{log.evidence_ref}</b></span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
